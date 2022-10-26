import { Avatar, Button, Card, Image, List, Popover, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined
} from '@ant-design/icons';
import UserCard from '../../basics/user/user_card';
import FriendTitle from '../../basics/user/friend_title';
import api from '../../../utils/apis';
import FriendInviteCard from '../../basics/friend/friend_invite_card';
import socket from '../../../socket/socket'
const { Text } = Typography;

const AddFriend = () => {
    const [data, setData] = useState([])
    var oneTime = true;
    const dataRef = useRef(data)
    
    useEffect(() => {
        dataRef.current = data
    })

    useEffect(() => {
        if(oneTime){
            oneTime = false
            handleData()
      
            socket.on("send-friend-invite", (data) => {
              console.log("accept-friend.............", data)
              newFriendInvite(dataRef.current, setData, data)
            })
        }
    }, [])

    const newFriendInvite = (data, setData, friendInvite) => {

    }

    const handleData = async () => {
     
        const res = await api.friend.get_invites()
        console.log(res)
        if(res.status == 200){
          setData(res.data)
        }
      
    }

    return (
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
                        <FriendInviteCard item={item} />
                    </List.Item>
                )}
            />
        </div>
    )
};
export default AddFriend;