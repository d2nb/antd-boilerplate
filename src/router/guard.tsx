import { FC } from 'react';
import { Navigate, useLocation, matchPath } from 'react-router-dom';
import { Spin } from 'antd';
import { useBasicData } from '@/hooks';
import { getItem } from '@/utils/storage';

interface GuardProps {
  children: React.ReactNode;
}

export const TokenGuard: FC<GuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const token = getItem('token');

  if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return <Navigate to="/" />;
  }

  if (!token && pathname !== '/sign-in' && pathname !== '/sign-up') {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export const PathGuard: FC<GuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { navList } = useBasicData();

  if (!navList) {
    return (
      <Spin className="!flex w-screen h-screen justify-center items-center" />
    );
  }

  if (navList && !navList.find((item) => matchPath(item.path, pathname))) {
    return <Navigate to="/403" />;
  }

  return children;
};
