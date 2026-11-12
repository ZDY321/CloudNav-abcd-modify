export type SnapshotSyncStatus = 'saving' | 'saved' | 'error';

export interface SnapshotSyncQueue<T> {
  pending: Promise<boolean>;
  baseData: T | null;
  pendingCount?: number;
  onStatusChange?: (status: SnapshotSyncStatus) => void;
}

/** Serialize writes and compare each snapshot with the last successful local write. */
export const enqueueSnapshotSync = <T>(
  queue: SnapshotSyncQueue<T>,
  snapshot: T,
  save: (snapshot: T, baseData: T | null) => Promise<boolean>,
  fallbackBase: T | null = null
): Promise<boolean> => {
  queue.pendingCount = (queue.pendingCount ?? 0) + 1;
  queue.onStatusChange?.('saving');
  queue.pending = queue.pending
    .catch(() => false)
    .then(async () => {
      let success = false;
      try {
        // Read the base when this write starts, after earlier writes have finished.
        queue.baseData ??= fallbackBase;
        success = await save(snapshot, queue.baseData);
        if (success) {
          // Keep the submitted snapshot as the base. Server-only records must not
          // become apparent local deletions in the next snapshot.
          queue.baseData = snapshot;
        }
        return success;
      } finally {
        queue.pendingCount = (queue.pendingCount ?? 1) - 1;
        // A completed earlier write must not turn the indicator green while
        // newer edits are still queued or awaiting their response.
        if (!queue.pendingCount) queue.onStatusChange?.(success ? 'saved' : 'error');
      }
    });
  return queue.pending;
};
