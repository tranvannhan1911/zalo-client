import { Col, Layout, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd';
import Header from '../../components/core/header';
import SideNav from '../../components/core/sidenav';
import Conversations from '../../components/core/conversations';
import { Content } from 'antd/lib/layout/layout';
import Messages from '../../components/core/messages';
import MessageSection from '../../components/core/message_section';
// import { AccountApi } from "../../api/apis"
const { Sider } = Layout;

const HomePage = () => {
  //   const accountApi = new AccountApi();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  //   const [hasPerms, setHasPerms] = useState(false);
  const [hasPerms, setHasPerms] = useState(true);

  //   const handleAuthentication = async () => {
  //     const token = accountApi.get_token()
  //     if(token.access == null || token.refresh == null){
  //       navigate('/dang-nhap')
  //       return
  //     }

  //     try{
  //       const response = await accountApi.get_info()
  //       console.log("account", response)
  //       if(response.data.code!=1 || !response.data.data.is_superuser){
  //         navigate('/dang-nhap')
  //       }else{
  //         setHasPerms(true)
  //         sessionStorage.setItem("idStaff", response.data.data.id);
  //         sessionStorage.setItem("nameStaff", response.data.data.fullname);
  //         sessionStorage.setItem("phoneStaff", response.data.data.phone);
  //       }
  //     }catch(error){
  //       navigate('/dang-nhap')
  //     }
  //   }

  //   useEffect(() => {
  //     handleAuthentication()
  //   }, []);

  return (
    <Layout>{hasPerms == false ? null : (
      <>
        <Sider trigger={null} collapsed={true}
          style={{
            height: "100vh",
            overflow: 'auto',
          }}>
          <SideNav ></SideNav>
        </Sider>
        <Layout className="site-layout"
          style={{
            height: "100vh",
          }}>
          <Content style={{
            height: "90vh", 
          }}> 
            <Row style={{height: "90vh"}}>
              <Col span={6} style={{
                  borderRight: '1px solid #ddd',
                  height: "90vh"
                }}>
                <Conversations style={{
                  width: '300px',
                }}></Conversations>
              </Col>
              <Col span={18} style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <Header />
                  <Messages />
                </div>
                <MessageSection />
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    )}
    </Layout>
  );
};

export default HomePage;
