import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  AccountBookOutlined, 
  CarryOutOutlined, 
  UserOutlined 
} from '@ant-design/icons';
 
const { SubMenu } = Menu;
const { Header, Sider } = Layout;

interface Props {
  collapsed: boolean
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
    icon: HomeOutlined,
    name: '首页',
    limit: true,
    path: '/home',
  }, {
    key: 'commodity_admin',
    icon: AppstoreOutlined,
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
    icon: CarryOutOutlined,
    name: '订单管理',
    limit: true,
    path: '/',
  }, {
    key: 'activity_admin',
    icon: AccountBookOutlined,
    name: '活动管理',
    limit: true,
    path: '/',
  }, {
    key: 'account_admin',
    icon: UserOutlined,
    name: '账号管理',
    limit: true,
    path: '/',
  }
]

function SideBar (props: Props) {
  const { collapsed } = props
  const [memuList, setMenuList]: [SideConfig[], any] = useState([{
    key: '',
    icon: '',
    name: '',
    limit: false,
    path: '',
    subMenu: []
  }])
  let history = useHistory()

  useEffect(() => {
    setMenuList(sideConfig)
  }, [])

  const onPushRouter = (path: string) => {
    console.log(path)
    history.push(path)
  }

  return (
    <Sider 
      theme='dark' 
      collapsed={collapsed}
      collapsible
      >
      <Header style={{padding: '0px'}}>
      </Header>
      <Menu
        theme='dark'
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