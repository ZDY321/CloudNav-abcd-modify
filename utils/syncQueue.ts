export interface SnapshotSyncJournal<T> {
  baseData: T | null;
  outbox: { snapshot: T }[];
}

export interface SnapshotSyncQueue<T> {
  pending: Promise<boolean>;
  baseData: T | null;
  outbox?: SnapshotSyncJournal<T>['outbox'];
  onChange?: (queue: SnapshotSyncQueue<T>) => void;
  scheduledCount?: number;
}

const scheduleSnapshotSync = <T>(
  queue: SnapshotSyncQueue<T>,
  entry: { snapshot: T },
  save: (snapshot: T, baseData: T | null) => Promise<boolean>
): Promise<boolean> => {
  queue.scheduledCount = (queue.scheduledCount ?? 0) + 1;
  queue.pending = queue.pending
    .catch(() => false)
    .then(async () => {
      // Read the base when this write starts, after earlier writes have finished.
      const success = await save(entry.snapshot, queue.baseData);
      if (success) {
        // Keep the submitted snapshot as the base. Server-only records must not
        // become apparent local deletions in the next snapshot.
        queue.baseData = entry.snapshot;
        const index = queue.outbox?.indexOf(entry) ?? -1;
        if (index >= 0) queue.outbox!.splice(0, index + 1);
        queue.onChange?.(queue);
      }
      return success;
    })
    .finally(() => { queue.scheduledCount = (queue.scheduledCount ?? 1) - 1; });
  return queue.pending;
};

/** Persist the intent synchronously, before the browser can interrupt a write. */
export const enqueueSnapshotSync = <T>(
  queue: SnapshotSyncQueue<T>,
  snapshot: T,
  save: (snapshot: T, baseData: T | null) => Promise<boolean>,
  fallbackBase: T | null = null
): Promise<boolean> => {
  queue.baseData ??= fallbackBase;
  const entry = { snapshot };
  (queue.outbox ??= []).push(entry);
  queue.onChange?.(queue);
  return scheduleSnapshotSync(queue, entry, save);
};

/** Replay all interrupted writes in order, including an unacknowledged write. */
export const resumeSnapshotSync = <T>(
  queue: SnapshotSyncQueue<T>,
  journal: SnapshotSyncJournal<T>,
  save: (snapshot: T, baseData: T | null) => Promise<boolean>
): Promise<boolean> => {
  // React may start initialization twice. Reuse a recovery already in progress.
  if (queue.scheduledCount) return queue.pending;
  queue.baseData = journal.baseData;
  queue.outbox = [...journal.outbox];
  queue.onChange?.(queue);
  for (const entry of queue.outbox.slice()) {
    scheduleSnapshotSync(queue, entry, save);
  }
  return queue.pending;
};
