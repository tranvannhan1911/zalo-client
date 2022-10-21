import React, { Component } from 'react';
import {
  UserOutlined, UserAddOutlined, UsergroupAddOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { PageHeader, Button, Menu, Dropdown, Input, Space, Avatar, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { truncate } from '../../utils/utils';
const { Search } = Input;



const Header = (props) => {

  const navigate = useNavigate();

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a rel="noopener noreferrer" onClick={() => {
              // navigate("/dang-nhap")
            }}>
              Chỉnh sửa cuộc hội thoại
            </a>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          label: (
            <a rel="noopener noreferrer" onClick={() => {
              // navigate("/dang-nhap")
            }}>
              Thoát khỏi cuộc hội thoại
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <PageHeader
      ghost={false}
      title={
        <Space>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
          />
          <Typography.Text  numberOfLines={1} style={{
            maxWidth: '250px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{props.currentConv ? truncate(props.currentConv.name, 50) : ""}</Typography.Text>
        </Space>
      }
      extra={[

        <Dropdown overlay={menu} placement="bottomRight">
          <Button key="1" type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ]}
    ></PageHeader>
  )
}


export default Header;