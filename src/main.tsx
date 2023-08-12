import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#FA617B',
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
