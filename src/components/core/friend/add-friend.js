import { Avatar, Button, Card, Image, List, Popover, Typography } from 'antd';
import React from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined
} from '@ant-design/icons';
import UserCard from '../../basics/user/user_card';
import FriendTitle from '../../basics/user/friend_title';
const { Text } = Typography;

const data = [
    {
        title: 'Trần Văn Nhân',
    },
    {
        title: 'Thái Thị Hiền',
    },
    {
        title: 'Lê Đình Bút',
    },
    {
        title: 'Phan Đình Phương',
    },
];
const AddFriend = () => (
    <div style={{
        padding: '20px'
    }}>
        <FriendTitle title="Danh sách kết bạn" placeholder="Tìm kiếm lời mời kết bạn"/> 
        <List
            grid={{
                gutter: 16,
                column: 2,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <UserCard item={item} type="add-friend"/>
                </List.Item>
            )}
        />
    </div>
);
export default AddFriend;