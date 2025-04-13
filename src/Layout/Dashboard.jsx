import React from 'react';
import { HomeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { LuUsersRound } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
import useAuth from '../hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';

//TODO:


const Dashboard = () => {
    const {user} = useAuth();
    const isAdmin = true;
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const items = [

        ...(isAdmin
            ? [
                {
                    key: '1',
                    icon: <UserOutlined className='bar-item' />,
                    label: <Link className='font-semibold text-base' to="/dashboard/profile">Profile</Link>,
                },
                {
                  key: '2',
                  icon: <UploadOutlined className='bar-item' />,
                  label: <Link className='font-semibold text-base' to="/dashboard/addProducts">Add Products</Link>,
                },
                {
                  key: '3',
                  icon: <LuUsersRound className='bar-item' />,
                  label: <Link className='font-semibold text-base' to="/dashboard/users">Users</Link>,
                },
              ]
            : [
                {
                  key: '4',
                  icon: <BsCart4 className='bar-item' />,
                  label: <Link className='font-semibold text-base' to="/dashboard/cart">My Cart</Link>,
                },
              ]),
        {
            // key: '2',
            icon: <HomeOutlined className='bar-item' />,
            label: <Link className='font-semibold text-base' to="/">Back to Home</Link>,
        }
      ];

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
                    <Menu className="custom-menu grid items-center" defaultSelectedKeys={['1']}
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