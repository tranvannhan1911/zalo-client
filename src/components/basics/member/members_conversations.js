import { Avatar, Button, Card, Image, List, message, Popover, Space, Typography } from 'antd';
import React, { useState } from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined, UserAddOutlined, CloseOutlined,
} from '@ant-design/icons';
import AddFriend from '../../core/friend/add-friend';
import api from '../../../utils/apis';
import Cookies from 'js-cookie';
import { deleteFriend } from '../../../controller/friend';
import FriendSelect from '../friend/friend_select';
import MemberGroupTab from './member_group_tab';
const { Text, Title } = Typography;

const MemberConversation = ({ data }, props) => {
  const [friendSelected, setFriendSelected] = useState([]);

    return (
        <div>
            <div style={{
                display: 'flex'
            }}>
                <FriendSelect {...props} value={friendSelected} setValue={setFriendSelected} />
                <Button type='primary' style={{
                    marginLeft: '10px'
                }}>Thêm</Button>
            </div>
            <MemberGroupTab data={data} />
        </div>
    )
}

export default MemberConversation