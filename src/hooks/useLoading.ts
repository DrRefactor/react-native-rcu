import {useMemo, useState} from 'react';
import {useFunction} from './useFunction';

export function useLoading() {
  const [loadingIds, setLoadingIds] = useState(new Set<symbol>());
  const loading = useMemo(() => loadingIds.size > 0, [loadingIds.size]);

  const setLoadingOn = useFunction((uid: symbol) => {
    const idsClone = new Set(loadingIds);
    idsClone.add(uid);
    setLoadingIds(idsClone);
  });

  const setLoadingOff = useFunction((uid: symbol) => {
    const idsClone = new Set(loadingIds);
    idsClone.delete(uid);
    setLoadingIds(idsClone);
  });

  return [
    loading,
    {
      on: setLoadingOn,
      off: setLoadingOff,
    },
  ];
}
