import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useBasicData } from '@/hooks';

function listToTree(list: any[]) {
  const tree: any[] = [];
  const map: any = {};
  list.forEach((item) => {
    map[item.id] = item;
  });
  list.forEach((item) => {
    const parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      tree.push(item);
    }
  });
  return tree;
}

const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { navList = [] } = useBasicData();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menuList = useMemo(
    () => navList.filter((item) => item.type === 'menu'),
    [navList],
  );

  const menu = useMemo(() => {
    return listToTree(
      menuList.map((item) => ({
        ...item,
        key: item.path,
        label: item.name,
      })),
    );
  }, [menuList]);

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    const route = menuList.find((item) => item.path === key);
    if (route && route.path !== pathname) {
      navigate(route.path);
    }
  };

  useEffect(() => {
    const parentKeys = pathname
      .split('/')
      .filter((item, index, arr) => index !== arr.length - 1 && item)
      .map((item, index, arr) => {
        return `/${arr.slice(0, index + 1).join('/')}`;
      });

    setOpenKeys((prevOpenKeys) => {
      const newOpenKeys = [...prevOpenKeys, ...parentKeys];
      return Array.from(new Set(newOpenKeys));
    });

    if (!menuList.find((item) => item.path === pathname)) {
      setSelectedKeys([parentKeys[parentKeys.length - 1]]);
    } else {
      setSelectedKeys([pathname]);
    }
  }, [pathname, menuList]);

  return (
    <Menu
      mode="inline"
      items={menu}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClick={handleClick}
      onOpenChange={(keys) => setOpenKeys(keys as string[])}
    />
  );
};

export default SideMenu;
