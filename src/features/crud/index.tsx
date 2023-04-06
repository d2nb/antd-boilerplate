import type { ProColumns, ProTableProps } from '@ant-design/pro-components'
import {
  ProTable,
  TableDropdown,
  BetaSchemaForm,
  DrawerForm,
  ProDescriptions
} from '@ant-design/pro-components'
import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'

interface Props<T> {
  columns: ProColumns<T>[],
  request: ProTableProps<T, any>['request'],
  pagination?: ProTableProps<T, any>['pagination']
  onCreate?: (values: T) => Promise<void>
  onEdit?: (values: T) => Promise<void>
}

function CRUD<T extends Record<string, any>> ({
  columns,
  request,
  pagination,
  onCreate,
  onEdit
}: Props<T>) {
  const actionColumn: ProColumns<T> = {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <BetaSchemaForm<T>
        key="editButton"
        layoutType="DrawerForm"
        title="编辑"
        initialValues={record}
        columns={columns as T[]}
        drawerProps={{
          destroyOnClose: true
        }}
        trigger={<a>编辑</a>}
        onFinish={async (values) => {
          if (onEdit) {
            await onEdit(values)
            action?.reload()
          }
          return true
        }}
      />,
      <DrawerForm<T>
        key="viewButton"
        title="查看"
        drawerProps={{
          destroyOnClose: true
        }}
        trigger={<a>查看</a>}
        submitter={false}
      >
        <ProDescriptions<T>
          columns={columns as T[]}
        />
      </DrawerForm>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'delete', name: '删除' }
        ]}
      />
    ]
  }

  const tableColumns = [...columns, actionColumn]

  return (
    <ProTable<T>
      columns={tableColumns}
      request={request}
      pagination={pagination || {
        pageSize: 10
      }}
      cardBordered
      rowKey="id"
      toolBarRender={() => [
        <BetaSchemaForm<T>
          key="createButton"
          layoutType="DrawerForm"
          title="新建"
          columns={columns as T[]}
          drawerProps={{
            destroyOnClose: true
          }}
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建
            </Button>
          }
          onFinish={async (values) => {
            console.log(values)
          }}
        />
      ]}
    />
  )
}

export default CRUD
