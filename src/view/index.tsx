import React, { useState } from 'react'
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import SideBar from '../components/sideBar'
import { Switch, Route, HashRouter } from 'react-router-dom';
import Home from './home/home'

const { Header, Content } = Layout;

interface HeaderContentProps {
  onToggleCollapsed: () => void
}

function HeaderContent (props: HeaderContentProps) {
  const { onToggleCollapsed } = props
  const [menuFold, setMenuFold] = useState(false)

  const onClickToggleCollapsed = () => {
    setMenuFold(!menuFold)
    onToggleCollapsed()
  }
  return (
    <Header>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={onClickToggleCollapsed}>
        {React.createElement(menuFold ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
    </Header>
  )
}

function Index () {
  const [ sideBarCollapsed, setSideBarCollapsed ] = useState(false)

  const onToggleCollapsed = () => {
    setSideBarCollapsed(!sideBarCollapsed)
  }
  return (
    <Layout className='app-contain'>
      <SideBar collapsed={sideBarCollapsed} history={HashRouter}/>
      <Layout>
        <HeaderContent onToggleCollapsed={onToggleCollapsed}/>
        <Content className='app-content'>
          <Switch>
            <Route path='/home' component={Home}/>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
