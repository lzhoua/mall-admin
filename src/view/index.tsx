import React, { useState } from 'react'
import { Button, Layout, Avatar, Popover } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Switch, Route } from 'react-router-dom';
import SideBar from '../components/sideBar';
import BreadCrumb from '../components/breadCrumb'
import Home from './home/home';

import './index.less';

const { Header, Content } = Layout;

interface HeaderContentProps {
  onToggleCollapsed: () => void  // 头部点击sider按钮事件
}

function AvatorPopover () {
  return (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )
}

function HeaderContent (props: HeaderContentProps) {
  const { onToggleCollapsed } = props
  const [menuFold, setMenuFold] = useState(false)

  const onClickToggleCollapsed = () => {
    setMenuFold(!menuFold)
    onToggleCollapsed()
  }
  return (
    <Header className='content-header'>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={onClickToggleCollapsed}>
        {React.createElement(menuFold ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Popover 
        content={<AvatorPopover/>}
        trigger="click"
      >
      <div className='avatar-box'>
        <span className='avator-name'>欢迎你: 用户名</span>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </Popover>
    </Header>
  )
}

function Index () {
  const [ sideBarCollapsed, setSideBarCollapsed ] = useState(false)
  // 点击头部的关闭sider按钮回调
  const onToggleCollapsed = () => {
    setSideBarCollapsed(!sideBarCollapsed)
  }
  return (
    <Layout className='app-contain'>
      <SideBar collapsed={sideBarCollapsed}/>
      <Layout>
        <HeaderContent onToggleCollapsed={onToggleCollapsed}/>
        <Content className='app-content'>
          <BreadCrumb/>
          <Switch>
            <Route path='/home' component={Home}/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
