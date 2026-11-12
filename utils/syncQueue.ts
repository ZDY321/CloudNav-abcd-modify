export interface SnapshotSyncQueue<T> {
  pending: Promise<boolean>;
  baseData: T | null;
}

/** Serialize writes and compare each snapshot with the last successful local write. */
export const enqueueSnapshotSync = <T>(
  queue: SnapshotSyncQueue<T>,
  snapshot: T,
  save: (snapshot: T, baseData: T | null) => Promise<boolean>,
  fallbackBase: T | null = null
): Promise<boolean> => {
  queue.pending = queue.pending
    .catch(() => false)
    .then(async () => {
      // Read the base when this write starts, after earlier writes have finished.
      queue.baseData ??= fallbackBase;
      const success = await save(snapshot, queue.baseData);
      if (success) {
        // Keep the submitted snapshot as the base. Server-only records must not
        // become apparent local deletions in the next snapshot.
        queue.baseData = snapshot;
      }
      return success;
    });
  return queue.pending;
};
