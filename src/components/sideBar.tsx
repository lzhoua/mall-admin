import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
// import { withRouter } from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

interface Props {
  collapsed: boolean
  history: any
}

interface SideConfig {
  key: string // key 同时对应权限树
  icon?: any // 图标
  name: string 
  limit: boolean // 权限
  path: string
  subMenu?: SideConfig[]
}

const sideConfig: SideConfig[] = [
  {
    key: 'home',
    icon: AppstoreOutlined,
    name: '首页',
    limit: true,
    path: '/home',
  }, {
    key: 'commodity_admin',
    icon: MailOutlined,
    name: '商品管理',
    limit: true,
    path: '/',
    subMenu: [
      {
        key: 'goods_menu',
        icon: '',
        name: '菜单管理',
        limit: true,
        path: '/',
      }
    ]
  }, {
    key: 'order_admin',
    icon: AppstoreOutlined,
    name: '订单管理',
    limit: true,
    path: '/',
  }, {
    key: 'activity_admin',
    icon: AppstoreOutlined,
    name: '活动管理',
    limit: true,
    path: '/',
  }, {
    key: 'account_admin',
    icon: AppstoreOutlined,
    name: '账号管理',
    limit: true,
    path: '/',
  }
]

function SideBar (props: Props) {
  const { collapsed, history } = props
  const [memuList, setMenuList]: [SideConfig[], any] = useState([{
    key: '',
    icon: '',
    name: '',
    limit: false,
    path: '',
    subMenu: []
  }])

  useEffect(() => {
    setMenuList(sideConfig)
  }, [])

  const onPushRouter = (path: string) => {
    console.log(path, history)
    // props.history(path)
  }

  return (
    <Sider 
      theme='light' 
      collapsed={collapsed}
      collapsible
      >
      <Header className='side-header'>
      </Header>
      <Menu
        theme='light'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        >
          {
            memuList.map(menu => {
              const { subMenu =[] } = menu!
              if (subMenu.length) {
                return (
                  <SubMenu
                    key={menu.key}
                    title={
                      <span>
                        { menu.icon && React.createElement(menu.icon) }
                        <span>{menu.name}</span>
                      </span>
                    }
                  >
                    {
                      subMenu.map(item => {
                        return <Menu.Item 
                          key={item.key}
                          onClick={() => onPushRouter(item.path)}
                        >
                          {item.name}
                        </Menu.Item>
                      })
                    }
                  </SubMenu>
                )
              }
              return <Menu.Item key={menu.key} onClick={() => onPushRouter(menu.path)}>
                { menu.icon && React.createElement(menu.icon) }
                <span>{menu.name}</span>
              </Menu.Item>
            })
          }
      </Menu>
    </Sider>
  )
}

export default React.memo(SideBar)