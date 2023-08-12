import { FC } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ResultProps {
  status: '403' | '404' | '500';
  desc?: string;
}

const Exception: FC<ResultProps> = ({ status, desc }) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <Result
      status={status}
      title={status}
      subTitle={desc}
      extra={
        <Button type="primary" onClick={handleBackHome}>
          返回首页
        </Button>
      }
    />
  );
};

export const Forbidden = () => (
  <Exception status="403" desc="抱歉，您无权访问此页面。" />
);

export const NotFound = () => (
  <Exception status="404" desc="抱歉，您访问的页面不存在。" />
);
