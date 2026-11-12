import type { Category, LinkItem } from '../types';

type DataSnapshot = { links: LinkItem[]; categories: Category[] };

const valuesEqual = (left: unknown, right: unknown): boolean => {
  if (left === right) return true;
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') return false;
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right) && left.length === right.length &&
      left.every((value, index) => valuesEqual(value, right[index]));
  }
  const leftKeys = Object.keys(left).filter(key => left[key] !== undefined);
  const rightKeys = Object.keys(right).filter(key => right[key] !== undefined);
  return leftKeys.length === rightKeys.length && leftKeys.every(key => (
    Object.prototype.hasOwnProperty.call(right, key) && valuesEqual(left[key], right[key])
  ));
};

const collectionChangesSaved = (
  submitted: { id: string }[],
  base: { id: string }[],
  saved: { id: string }[]
) => {
  const baseById = new Map(base.map(item => [item.id, item]));
  const submittedById = new Map(submitted.map(item => [item.id, item]));
  const savedById = new Map(saved.map(item => [item.id, item]));
  return submitted.every(item => (
    valuesEqual(item, baseById.get(item.id)) || valuesEqual(item, savedById.get(item.id))
  )) && base.every(item => submittedById.has(item.id) || !savedById.has(item.id));
};

/** A successful merge can still reject local edits because of a conflict. */
export const areSnapshotChangesSaved = (
  submitted: DataSnapshot,
  base: DataSnapshot | null,
  saved: DataSnapshot | undefined
): boolean => (
  Array.isArray(saved?.links) && Array.isArray(saved?.categories) &&
  collectionChangesSaved(submitted.links, base?.links || [], saved.links) &&
  collectionChangesSaved(submitted.categories, base?.categories || [], saved.categories)
);
