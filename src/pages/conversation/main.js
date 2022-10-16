import { Col, Layout, Row } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import SideNav from '../../components/core/sidenav';
import { Content } from 'antd/lib/layout/layout';
import Cookies from 'js-cookie';
import { lazy } from "react";
import UserModal from '../../components/basics/user/user_modal';

const ConversationPage = lazy(() => import("./conversation"));
const FriendPage = lazy(() => import("./friend"));

const { Sider } = Layout;

const MainPage = () => {
  const navigate = useNavigate();
  const [hasPerms, setHasPerms] = useState(true);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [page, setPage] = useState("conversation");

  const handleAuthentication = async () => {
    const access = Cookies.get("access")
    const refresh = Cookies.get("refresh")
    if (access == null || refresh == null) {
      navigate('/dang-nhap')
      return
    }
  }

  useEffect(() => {
    handleAuthentication()
  }, []);

  const _props = {
    page: page,
    setPage: setPage,
    openUserModal: openUserModal,
    setOpenUserModal: setOpenUserModal
  }

  const content = () => {
    if(page == "conversation"){
      return (
        <ConversationPage {..._props}/>
      )
    }

    if(page == "friend" || page == "friend-list" || page == "add-friend" || page == "group" ){
      return (
        <FriendPage {..._props}/>
      )
    }
  }


  return (
    <Layout>{hasPerms == false ? null : (
      <>
        <Sider trigger={null} collapsed={true}
          style={{
            height: "100vh",
            overflow: 'auto',
          }}>
          <SideNav {..._props}></SideNav>
        </Sider>
        <Layout className="site-layout"
          style={{
            height: "100vh",
          }}>
          <Content style={{
            height: "90vh",
          }}>
            {content()}
            <UserModal {..._props}/>
          </Content>
        </Layout>
      </>
    )}
    </Layout>
  );
}

export default MainPage;