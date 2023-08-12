import useSWR from 'swr';
import { getApiUserMe, getApiUserNavs } from '@/api';

export function useBasicData() {
  const { data = [] } = useSWR(
    '/user/me',
    () => Promise.all([getApiUserMe(), getApiUserNavs()]),
    {
      revalidateOnFocus: false,
    },
  );

  const [userInfo, navList] = data;

  return {
    userInfo,
    navList,
  };
}
