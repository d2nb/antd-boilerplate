import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useBasicData } from '@/hooks';
import { NavItem } from '@/api';

function getNavMap(navList: NavItem[]) {
  return navList.reduce(
    (acc, item) => {
      acc[item.path] = item;
      return acc;
    },
    {} as { [key: string]: NavItem },
  );
}

function getBreadcrumbItems(path: string, navMap: { [key: string]: NavItem }) {
  const items = path.split('/').filter((item) => item);
  return items.reduce(
    (acc, item) => {
      const prev = acc[acc.length - 1];
      const current = navMap[prev ? `${prev.href}/${item}` : `/${item}`];
      if (current) {
        acc.push({
          title: current.name,
          href: current.path,
        });
      }
      return acc;
    },
    [] as { title: string; href: string }[],
  );
}

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const { navList = [] } = useBasicData();

  const breadcrumbItems = useMemo(() => {
    const navMap = getNavMap(navList);
    return getBreadcrumbItems(pathname, navMap);
  }, [pathname, navList]);

  return (
    <AntdBreadcrumb
      className="!mb-5"
      items={breadcrumbItems}
      itemRender={(item) => <span>{item.title}</span>}
    ></AntdBreadcrumb>
  );
};

export default Breadcrumb;
