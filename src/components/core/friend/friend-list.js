import { Avatar, Button, Card, Image, List, Popover, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined
} from '@ant-design/icons';
import UserCard from '../../basics/user/user_card';
import FriendTitle from '../../basics/user/friend_title';
import api from '../../../utils/apis';
const { Text, Title } = Typography;

const FriendList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        handleData()
    }, [])

    const handleData = async () => {
     
        const res = await api.friend.list()
        console.log(res)
        if(res.status == 200){
          setData(res.data)
        }
      
    }

    return (
        <div style={{
            padding: '20px'
        }}>
            <FriendTitle 
                title="Danh sách bạn bè" 
                placeholder="Tìm kiếm bạn bè"
                /> 
            <List
                grid={{
                    gutter: 16,
                    column: 2,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <UserCard item={item} type="friend"/>
                    </List.Item>
                )}
            />
        </div>
    )
};
export default FriendList;