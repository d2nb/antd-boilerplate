import React, { lazy } from 'react'
import {
  createBrowserRouter,
  useLocation,
  matchRoutes,
  Navigate
} from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import App from '../App'
import Layout from '../features/layout'

import CRUD from '../pages/crud'

interface Meta {
  title?: string
  roles?: string[]
}

declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: Meta
  }
  interface NonIndexRouteObject {
    meta?: Meta
  }
}

const userRoles = ['a', 'b']

const BeforeEach = ({ children }: {
  children: React.ReactNode
}) => {
  const location = useLocation()
  const matchedRoutes = matchRoutes(routes, location.pathname)
  if (matchedRoutes) {
    const { route } = matchedRoutes[matchedRoutes.length - 1]
    const roles = route?.meta?.roles
    if (roles) {
      const auth = roles.every(role => userRoles.includes(role))
      if (!auth) {
        return <Navigate to="/login" />
      }
    }
  }

  return (
    <>
      {children}
    </>
  )
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <BeforeEach>
        <App />
      </BeforeEach>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/crud" />
          },
          {
            path: '/crud',
            element: <CRUD />
          },
          {
            path: '/list2',
            element: <div>list2</div>,
            meta: {
              roles: ['a', 'b']
            }
          },
          {
            path: '/list3',
            element: <div>list3</div>
          }
        ]
      },
      {
        path: '/login',
        element: <div>login</div>
      }
    ]
  }
]

const router = createBrowserRouter(routes)

export default router
