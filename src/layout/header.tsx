import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Dropdown } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useBasicData } from '@/hooks/useBasicData';
import { removeItem } from '@/utils/storage';

const dropdownItems: MenuProps['items'] = [
  {
    key: '0',
    label: '个人设置',
    icon: <SettingOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '1',
    label: '退出登录',
    icon: <LogoutOutlined />,
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useBasicData();

  const handleDropdownClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '0':
        navigate('/account/settings');
        break;
      case '1':
        removeItem('token');
        navigate('/sign-in');
    }
  };

  return (
    <div className="flex items-center h-[48px] border-b border-slate-200 px-4">
      <div className="text-xl">
        <Link to="/" className="!text-black">
          React Admin
        </Link>
      </div>
      <div className="ml-auto">
        <Dropdown
          menu={{
            items: dropdownItems,
            onClick: handleDropdownClick,
          }}
        >
          <Avatar className="!bg-[#fde3cf] !text-[#f56a00] cursor-pointer">
            {userInfo?.username.charAt(0)}
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
