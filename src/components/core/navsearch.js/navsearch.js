import { Avatar, Button, List, Skeleton, Space, Input, Divider, Typography, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    UserOutlined, UserAddOutlined, UsergroupAddOutlined,
    MoreOutlined, UndoOutlined, DeleteOutlined, ArrowLeftOutlined,
    ExclamationCircleOutlined, TeamOutlined
} from '@ant-design/icons';
import ConversationModal from '../conversation/modal';
import ActionBar from '../action';
import { Link } from 'react-router-dom';
const { Search } = Input;
const { Text } = Typography;
const count = 3;

const NavSearch = (props) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);

    const onSearch = (value) => console.log(value);

    return (
        <div style={{
            backgroundColor: 'white'
        }}>
            <ActionBar />
            <Divider style={{
                marginTop: '3px'
            }}/>
            <div 
            style={{
                height: "80vh", 
                overflow: 'auto',
            }}>
                
            </div>
        </div>
    );
};

export default NavSearch;