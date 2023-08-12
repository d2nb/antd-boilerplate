import { createHashRouter, Navigate } from 'react-router-dom';
import Layout from '@/layout';
import { Forbidden, NotFound } from '@/pages/exception';
import Auth from '@/pages/auth';
import { TokenGuard, PathGuard } from './guard';
import { Dashboard, List, Form, Account } from './lazy';

const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard/workplace" />,
  },
  {
    path: '/sign-in',
    element: (
      <TokenGuard>
        <Auth />
      </TokenGuard>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <TokenGuard>
        <Auth />
      </TokenGuard>
    ),
  },
  {
    path: '/403',
    element: <Forbidden />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    element: (
      <TokenGuard>
        <PathGuard>
          <Layout />
        </PathGuard>
      </TokenGuard>
    ),
    children: [
      {
        path: '/dashboard',
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/workplace" />,
          },
          {
            path: '/dashboard/workplace',
            element: <Dashboard />,
          },
        ],
      },
      {
        path: '/list',
        children: [
          {
            index: true,
            element: <Navigate to="/list/table" />,
          },
          {
            path: '/list/table',
            element: <List />,
          },
          {
            path: '/list/table/:id',
            element: <div>详情页</div>,
          },
        ],
      },
      {
        path: '/form',
        children: [
          {
            index: true,
            element: <Navigate to="/form/step-form" />,
          },
          {
            path: '/form/step-form',
            element: <Form />,
          },
        ],
      },
      {
        path: '/account',
        children: [
          {
            index: true,
            element: <Navigate to="/account/settings" />,
          },
          {
            path: '/account/settings',
            element: <Account />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

const router = createHashRouter(routes);

export default router;
