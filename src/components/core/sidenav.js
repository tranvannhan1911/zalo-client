import { 
  MessageOutlined, UserOutlined
  } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd';
import React, { useState } from 'react';
//   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  const { Title } = Typography;
  
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  const items = [
    getItem('Nhắn tin', 'nhan-tin', <MessageOutlined />),
    getItem('Danh sách bạn bè', 'ban-be', <UserOutlined />)
  ];
  
  const rootSubmenuKeys = ['nhan-tin', 'ban-be'];
  
  const SideNav = (props) => {
    const [openKeys, setOpenKeys] = useState();
    const navigate = useNavigate();
  
    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };
  
    const onSelect = (selected) => {
      navigate(`/${selected.key}`)
    }
  
    const onClick = (selected) => {
      navigate(`/${selected.key}`)
    }
  
    return (
      <div 
      >
        <div style={{
            padding: '20px',
            color: 'white'
        }}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
        <Menu
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
          onSelect={onSelect}
          onClick={onClick}
        />
      </div>
    );
  };
  
  export default SideNav;