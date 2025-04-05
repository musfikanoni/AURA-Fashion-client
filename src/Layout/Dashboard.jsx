import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import useAuth from '../hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';
const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/dashboard/profile">Profile</Link>,
    },
    {
      key: '2',
      icon: <UploadOutlined />,
      label: 'Add',
    },
    {
      key: '3',
      icon: <VideoCameraOutlined />,
      label: 'My Orders',
    },
    {
      key: '4',
      icon: <UserOutlined />,
      label: 'Profile',
    },
  ];
  


const Dashboard = () => {
    const {user} = useAuth() ;
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
        <div>
            <Layout>
                <Sider
                    style={{ backgroundColor: '#66D7B1' }}
                    
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                    console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                    }}
                >
                    <div className="pt-10 pb-7"> 
                        <div className="avatar grid justify-center">
                            <div className="ring-teal-600 ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                        <p className='text-white text-center pt-5'>{user?.displayName}</p>
                    </div>
                    <Menu className="custom-menu" defaultSelectedKeys={['1']}
                    theme='none' mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                        padding: 24,
                        minHeight: '90vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;