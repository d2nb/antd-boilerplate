import type { ProColumns } from '@ant-design/pro-components'
import { Space, Tag } from 'antd'
import axios from 'axios'
import CRUD from '../../features/crud'

type GithubIssueItem = {
  url?: string;
  id?: number;
  number?: number;
  title?: string;
  labels?: string[];
  state?: string;
  comments?: number;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      open: {
        text: '未解决',
        status: 'Error'
      },
      closed: {
        text: '已解决',
        status: 'Success'
      },
      processing: {
        text: '解决中',
        status: 'Processing'
      }
    }
  },
  {
    title: '标签',
    dataIndex: 'labels',
    search: false,
    valueType: 'select',
    fieldProps: {
      mode: 'multiple'
    },
    valueEnum: {
      question: {
        text: 'question',
        status: 'question'
      },
      bug: {
        text: 'bug',
        status: 'bug'
      },
      dependencies: {
        text: 'dependencies',
        status: 'dependencies'
      }
    },
    render: (_, record) => (
      <Space>
        {record?.labels?.map((label) => (
          <Tag key={label}>
            {label}
          </Tag>
        ))}
      </Space>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    hideInForm: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1]
        }
      }
    }
  }
]

const CRUDPage = () => {
  return (
    <CRUD<GithubIssueItem>
      columns={columns}
      request={async (params = {}) => {
        return axios.get<{
          data: GithubIssueItem[];
          total: number
        }>('https://proapi.azurewebsites.net/github/issues', {
          params
        }).then((res) => {
          return {
            data: res.data?.data.map(item => {
              return {
                ...item,
                labels: item.labels?.map(label => label?.name)
              }
            }),
            total: res.data?.total
          }
        })
      }}
    />
  )
}

export default CRUDPage
