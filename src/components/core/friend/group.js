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
        title: 'Nhóm KLTN',
    },
    {
        title: 'CNM T7 10-12',
    },
    {
        title: 'Bài tập lớn Android',
    },
    {
        title: 'Đồ án CNM',
    },
];
const Group = () => (
    <div style={{
        padding: '20px'
    }}>
        <FriendTitle title="Danh sách nhóm" placeholder="Tìm kiếm nhóm"/> 
        <List
            grid={{
                gutter: 16,
                column: 2,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <UserCard item={item} type="group"/>
                </List.Item>
            )}
        />
    </div>
);
export default Group;