import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import {
  ProLayout,
  PageContainer,
  ProCard
} from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import { useState } from 'react'

const routes = {
  path: '/',
  routes: [
    {
      path: '/list1',
      name: '列表页面-1'
    },
    {
      path: '/list2',
      name: '列表页面-2'
    },
    {
      path: '/list3',
      name: '列表页面-3'
    }
  ]
}

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        title="Remax"
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        layout="mix"
        route={routes}
        fixSiderbar
        location={{
          pathname: location.pathname
        }}
        avatarProps={{
          src: '',
          title: '冬二',
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录',
                      onClick: () => {
                        console.log('logout')
                      }
                    }
                  ]
                }}
              >
                {dom}
              </Dropdown>
            )
          }
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              navigate(item.path || '/')
            }}
          >
            {dom}
          </div>
        )}
      >
        <PageContainer title={false}>
          <ProCard>
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default Layout
