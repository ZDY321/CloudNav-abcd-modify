import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Run the actual TypeScript handlers without adding a test runtime dependency.
const loadTypeScript = async path => {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};

const { onRequestGet, onRequestPost } = await loadTypeScript('../functions/api/storage.ts');
const { onRequestPost: saveExtensionLink } = await loadTypeScript('../functions/api/link.ts');
const { enqueueSnapshotSync } = await loadTypeScript('../utils/syncQueue.ts');
const { areSnapshotChangesSaved } = await loadTypeScript('../utils/syncConfirmation.ts');
const clone = value => JSON.parse(JSON.stringify(value));
const category = id => ({ id, name: id, icon: 'Folder' });
const subcategory = id => ({ id, name: id, icon: 'Tag' });
const initialData = () => ({
  links: [{ id: 'saved', title: 'Saved card', url: 'https://example.com', categoryId: 'common', createdAt: 1 }],
  categories: [category('common'), category('other')]
});

const createStorage = (data = initialData()) => {
  const kv = new Map([['app_data', JSON.stringify(data)]]);
  const env = {
    PASSWORD: 'local-test-password',
    CLOUDNAV_KV: { get: async key => kv.get(key) ?? null, put: async (key, value) => kv.set(key, value) }
  };
  const request = body => new Request('https://local.test/api/storage', {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-password': env.PASSWORD },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const read = async () => {
    const response = await onRequestGet({ env, request: request() });
    assert.equal(response.status, 200);
    return response.json();
  };
  const save = async (snapshot, baseData) => {
    const response = await onRequestPost({ env, request: request({ ...snapshot, ...(baseData ? { baseData } : {}) }) });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.success, true);
    return true;
  };
  const extend = async link => {
    const response = await saveExtensionLink({ env, request: request(link) });
    assert.equal(response.status, 200);
    return response.json();
  };
  return { read, save, extend, replace: snapshot => kv.set('app_data', JSON.stringify(snapshot)) };
};

const createClient = (storage, baseData, save = storage.save) => {
  const queue = { pending: Promise.resolve(true), baseData };
  return { queue, save: snapshot => enqueueSnapshotSync(queue, clone(snapshot), save) };
};

test('queued category creation and moving an existing card survive a reload', async () => {
  const storage = createStorage();
  const local = await storage.read();
  const client = createClient(storage, clone(local));
  local.categories[0].subcategories = [subcategory('first')];
  const firstSave = client.save(local);
  local.categories[0].subcategories.push(subcategory('new-sub'));
  const secondSave = client.save(local);
  local.links[0].subCategoryId = 'new-sub';
  const moveSave = client.save(local);
  await Promise.all([firstSave, secondSave, moveSave]);

  const reloaded = await storage.read();
  assert.deepEqual(reloaded.categories[0].subcategories.map(sub => sub.id), ['first', 'new-sub']);
  assert.equal(reloaded.links[0].subCategoryId, 'new-sub');
});

test('moving to a newly created first-level category survives repeated queued edits', async () => {
  const storage = createStorage();
  const local = await storage.read();
  const client = createClient(storage, clone(local));
  local.categories.push(category('new-parent'));
  const createSave = client.save(local);
  local.links[0].description = 'Edited before moving';
  const editSave = client.save(local);
  local.links[0].categoryId = 'new-parent';
  const moveSave = client.save(local);
  await Promise.all([createSave, editSave, moveSave]);

  const reloaded = await storage.read();
  assert.equal(reloaded.links[0].categoryId, 'new-parent');
  assert.equal(reloaded.links[0].description, 'Edited before moving');
});

test('moving between new subcategories and back to the parent persists', async () => {
  const storage = createStorage();
  const local = await storage.read();
  const client = createClient(storage, clone(local));
  local.categories[0].subcategories = [subcategory('one'), subcategory('two')];
  const saves = [client.save(local)];
  for (const subCategoryId of ['one', 'two', undefined]) {
    local.links[0].subCategoryId = subCategoryId;
    saves.push(client.save(local));
  }
  await Promise.all(saves);
  assert.equal((await storage.read()).links[0].subCategoryId, undefined);
});

for (const legacyFields of [
  { additionalCategoryIds: [] },
  { additionalCategoryIds: ['other'] },
  { subCategoryId: 'deleted-sub' },
  { additionalCategoryLocations: [{ categoryId: 'other', subCategoryId: 'deleted-sub' }] }
]) {
  test(`moving a legacy card survives normalization: ${JSON.stringify(legacyFields)}`, async () => {
    const data = initialData();
    Object.assign(data.links[0], legacyFields);
    const storage = createStorage(data);
    const base = await storage.read();
    const moved = clone(base);
    moved.categories[0].subcategories = [subcategory('new-sub')];
    moved.links[0].subCategoryId = 'new-sub';
    await storage.save(moved, base);
    const reloaded = await storage.read();
    assert.equal(reloaded.links[0].subCategoryId, 'new-sub');
    assert.deepEqual(reloaded.links[0].additionalCategoryLocations, base.links[0].additionalCategoryLocations);
  });
}

test('object property order does not create a false edit conflict', async () => {
  const storage = createStorage();
  const base = await storage.read();
  base.links[0] = Object.fromEntries(Object.entries(base.links[0]).reverse());
  base.categories = base.categories.map(item => Object.fromEntries(Object.entries(item).reverse()));
  const moved = clone(base);
  moved.links[0].categoryId = 'other';
  await storage.save(moved, base);
  assert.equal((await storage.read()).links[0].categoryId, 'other');
});

test('an additional location in a newly created subcategory persists', async () => {
  const storage = createStorage();
  const local = await storage.read();
  const client = createClient(storage, clone(local));
  local.categories[1].subcategories = [subcategory('first')];
  const firstSave = client.save(local);
  local.categories[1].subcategories.push(subcategory('new-sub'));
  const createSave = client.save(local);
  local.links[0].additionalCategoryLocations = [{ categoryId: 'other', subCategoryId: 'new-sub' }];
  const locationSave = client.save(local);
  await Promise.all([firstSave, createSave, locationSave]);
  assert.deepEqual((await storage.read()).links[0].additionalCategoryLocations, local.links[0].additionalCategoryLocations);
});

test('extension saves into a new subcategory and survives subsequent page edits', async () => {
  const storage = createStorage();
  const local = await storage.read();
  const client = createClient(storage, clone(local));
  local.categories[0].subcategories = [subcategory('new-sub')];
  await client.save(local);
  const extensionResult = await storage.extend({
    title: 'From extension', url: 'https://extension.example.com', categoryId: 'common', subCategoryId: 'new-sub'
  });
  local.links[0].subCategoryId = 'new-sub';
  await client.save(local);
  local.links[0].description = 'Another page edit';
  await client.save(local);

  const reloaded = await storage.read();
  assert.equal(reloaded.links.length, 2);
  assert.equal(reloaded.links.find(link => link.id === extensionResult.link.id).subCategoryId, 'new-sub');
  assert.equal(reloaded.links.find(link => link.id === 'saved').subCategoryId, 'new-sub');
  assert.equal(reloaded.links.find(link => link.id === 'saved').description, 'Another page edit');
});

for (const throws of [false, true]) {
  test(`a failed save does not advance the base or prevent the next save (throws=${throws})`, async () => {
    const storage = createStorage();
    const local = await storage.read();
    let attempts = 0;
    const client = createClient(storage, clone(local), async (snapshot, baseData) => {
      if (++attempts === 1) {
        if (throws) throw new Error('Temporary network failure');
        return false;
      }
      return storage.save(snapshot, baseData);
    });
    local.categories[0].subcategories = [subcategory('new-sub')];
    const failedSave = client.save(local);
    local.links[0].subCategoryId = 'new-sub';
    const nextSave = client.save(local);
    if (throws) await assert.rejects(failedSave, /Temporary network failure/);
    else assert.equal(await failedSave, false);
    assert.equal(await nextSave, true);
    assert.equal((await storage.read()).links[0].subCategoryId, 'new-sub');
  });
}

test('real concurrent server edits and newly added records remain protected', async () => {
  const storage = createStorage();
  const base = await storage.read();
  const server = clone(base);
  server.links[0].title = 'Edited by another device';
  server.links.push({ ...server.links[0], id: 'server-only', url: 'https://server.example.com' });
  storage.replace(server);
  const staleClient = clone(base);
  staleClient.links[0].categoryId = 'other';
  await storage.save(staleClient, base);
  const reloaded = await storage.read();
  assert.equal(reloaded.links.find(link => link.id === 'saved').title, 'Edited by another device');
  assert.equal(reloaded.links.find(link => link.id === 'saved').categoryId, 'common');
  assert.ok(reloaded.links.some(link => link.id === 'server-only'));
});

test('the initial fallback base is retained if the first offline-cache save fails', async () => {
  const storage = createStorage();
  const initial = await storage.read();
  const local = clone(initial);
  const queue = { pending: Promise.resolve(true), baseData: null };
  local.categories[0].subcategories = [subcategory('new-sub')];
  const firstSnapshot = clone(local);
  const failedSave = enqueueSnapshotSync(queue, firstSnapshot, async () => false, initial);
  local.links[0].subCategoryId = 'new-sub';
  const nextSave = enqueueSnapshotSync(queue, clone(local), storage.save, firstSnapshot);
  assert.equal(await failedSave, false);
  assert.equal(await nextSave, true);
  assert.equal((await storage.read()).links[0].subCategoryId, 'new-sub');
});

const deferred = () => {
  let resolve;
  const promise = new Promise(complete => { resolve = complete; });
  return { promise, resolve };
};

test('the indicator changes immediately and stays saving until the server response arrives', async () => {
  const storage = createStorage();
  const snapshot = await storage.read();
  const baseData = clone(snapshot);
  snapshot.links[0].categoryId = 'other';
  const statuses = [];
  const response = deferred();
  const committed = deferred();
  const queue = { pending: Promise.resolve(true), baseData, onStatusChange: status => statuses.push(status) };
  const saving = enqueueSnapshotSync(queue, snapshot, async (...args) => {
    await storage.save(...args);
    committed.resolve();
    return response.promise;
  });
  assert.deepEqual(statuses, ['saving']);
  await committed.promise;
  assert.deepEqual(statuses, ['saving']);
  response.resolve(true);
  await saving;
  assert.deepEqual(statuses, ['saving', 'saved']);
  assert.equal((await storage.read()).links[0].categoryId, 'other');
});

test('completing an earlier write does not show saved while newer changes are pending', async () => {
  const storage = createStorage();
  const snapshot = await storage.read();
  const statuses = [];
  const queue = { pending: Promise.resolve(true), baseData: clone(snapshot), onStatusChange: status => statuses.push(status) };
  const responses = [deferred(), deferred()];
  const started = [deferred(), deferred()];
  let requests = 0;
  const save = async (...args) => {
    const index = requests++;
    await storage.save(...args);
    started[index].resolve();
    return responses[index].promise;
  };
  snapshot.links[0].description = 'First edit';
  const firstSave = enqueueSnapshotSync(queue, clone(snapshot), save);
  snapshot.links[0].categoryId = 'other';
  const secondSave = enqueueSnapshotSync(queue, clone(snapshot), save);
  await started[0].promise;
  responses[0].resolve(true);
  await firstSave;
  await started[1].promise;
  assert.deepEqual(statuses, ['saving', 'saving']);
  responses[1].resolve(true);
  await secondSave;
  assert.deepEqual(statuses, ['saving', 'saving', 'saved']);
  assert.equal((await storage.read()).links[0].categoryId, 'other');
});

for (const throws of [false, true]) {
  test(`a failed final write shows error and a later successful edit clears it (throws=${throws})`, async () => {
    const storage = createStorage();
    const snapshot = await storage.read();
    const statuses = [];
    const queue = { pending: Promise.resolve(true), baseData: clone(snapshot), onStatusChange: status => statuses.push(status) };
    snapshot.links[0].categoryId = 'other';
    const failedSave = enqueueSnapshotSync(queue, clone(snapshot), async () => {
      if (throws) throw new Error('Network failure');
      return false;
    });
    if (throws) await assert.rejects(failedSave, /Network failure/);
    else assert.equal(await failedSave, false);
    assert.deepEqual(statuses, ['saving', 'error']);
    snapshot.links[0].description = 'Next edit';
    await enqueueSnapshotSync(queue, clone(snapshot), storage.save);
    assert.deepEqual(statuses, ['saving', 'error', 'saving', 'saved']);
    assert.equal((await storage.read()).links[0].categoryId, 'other');
  });
}

test('a successful API response which discarded a move shows error', async () => {
  const storage = createStorage();
  const baseData = await storage.read();
  const moved = clone(baseData);
  moved.links[0].categoryId = 'other';
  const server = clone(baseData);
  server.links[0].title = 'Changed on another device';
  storage.replace(server);
  const statuses = [];
  const queue = { pending: Promise.resolve(true), baseData, onStatusChange: status => statuses.push(status) };
  const success = await enqueueSnapshotSync(queue, moved, async (snapshot, base) => {
    await storage.save(snapshot, base);
    return areSnapshotChangesSaved(snapshot, base, await storage.read());
  });
  assert.equal(success, false);
  assert.deepEqual(statuses, ['saving', 'error']);
});

test('confirmation accepts local edits alongside records added on another device', async () => {
  const baseData = initialData();
  const moved = clone(baseData);
  moved.links[0].categoryId = 'other';
  const saved = clone(moved);
  saved.links.push({ ...saved.links[0], id: 'extension', title: 'From extension' });
  saved.categories.push(category('server-only'));
  saved.links[0] = Object.fromEntries(Object.entries(saved.links[0]).reverse());
  assert.equal(areSnapshotChangesSaved(moved, baseData, saved), true);
  assert.equal(areSnapshotChangesSaved(moved, baseData, undefined), false);
});

test('confirmation detects rejected category edits and deletions', async () => {
  const baseData = initialData();
  const edited = clone(baseData);
  edited.categories[0].subcategories = [subcategory('new-sub')];
  assert.equal(areSnapshotChangesSaved(edited, baseData, baseData), false);
  assert.equal(areSnapshotChangesSaved(edited, baseData, clone(edited)), true);
  const deleted = clone(baseData);
  deleted.links = [];
  assert.equal(areSnapshotChangesSaved(deleted, baseData, baseData), false);
  assert.equal(areSnapshotChangesSaved(deleted, baseData, clone(deleted)), true);
});
