import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { useStore } from '@/stores';
import Header from './header';
import SideMenu from './side-menu';
import Breadcrumb from './breadcrumb';

const PageLayout = memo(() => {
  const loading = useStore((state) => state.loading);

  return (
    <Spin className="min-h-screen" spinning={loading}>
      <Layout className="h-screen">
        <Layout.Header className="!bg-white !h-auto !px-0">
          <Header />
        </Layout.Header>
        <Layout>
          <Layout.Sider
            theme="light"
            width={208}
            className="h-[calc(100vh-48px)] overflow-y-auto border-r border-slate-200 "
          >
            <SideMenu />
          </Layout.Sider>
          <Layout className="px-4 py-5 h-[calc(100vh-48px)] overflow-y-auto">
            <Breadcrumb />
            <Layout.Content className="p-5 bg-white !min-h-min">
              <Suspense fallback={<Spin />}>
                <Outlet />
              </Suspense>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </Spin>
  );
});

export default PageLayout;
