import { Avatar, Button, Card, Image, List, message, Popover, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined, UserAddOutlined, CloseOutlined,
} from '@ant-design/icons';
import AddFriend from '../../core/friend/add-friend';
import api from '../../../utils/apis';
import Cookies from 'js-cookie';
import { deleteFriend } from '../../../controller/friend';
import { mess } from '../../../utils/actions';
import store, { setOpenInfoConversationModal } from '../../../store/store';
import UserViewModal from "../../basics/user/user_view_modal"
const { Text, Title } = Typography;

const MemberItem = ({ item, type }) => {
    const [openUserModal, setOpenUserModal] = useState(false);
    const userId = Cookies.get("_id")
    // const [userInfo]

    useEffect(() => {
        console.log("Member item", item)
    }, [item])

    const description = () => {
        if (type == "member") {
            return (
                <></>
            )
        }

        if (type == "admin") {
            return (
                <>
                    Trưởng nhóm
                </>
            )
        }
    }

    const AddFriend = async () => {
        try {
            const res = await api.friend.invite(item.userId._id)
            console.log("AddFriend", item, res)
            if (res.status == 201) {
                message.success("Gửi lời mời kết bạn thành công!")
            }
        } catch (err) {
            console.log("Failed, ", err)
            if (err.response.status == 400) {
                message.error("Không thể gửi lại lời mời kết bạn!")
            }
        }
    }

    const general_action = () => {
        return (
            <>
                <div><Button type="text" icon={<MessageOutlined />}
                    onClick={() => {
                        mess(item.userId._id)
                        store.dispatch(setOpenInfoConversationModal(false))
                    }}>Nhắn tin</Button></div>
                <div>
                    <Button
                        type="text"
                        icon={<ExclamationCircleOutlined />}
                        onClick={() => {
                            // setOpenModal(true)
                            setOpenUserModal(true)
                        }}>Xem chi tiết</Button>
                </div>
                {!item.userId.friends.includes(userId) ?
                    <div>
                        <Button type="text" icon={<UserAddOutlined />}
                            onClick={AddFriend}>Gửi lời mời kết bạn</Button>
                    </div>
                    :
                    <>
                        <hr style={{
                            borderTop: '1px solid #ddd'
                        }} />
                        <div>
                            <Button type="text" icon={<CloseOutlined />} danger
                                onClick={
                                    () => deleteFriend(item.userId._id, (data) => {
                                        message.success("Xóa bạn bè thành công")
                                    })
                                }>Hủy kết bạn</Button></div>
                    </>
                }
            </>
        )
    }

    return (
        <div style={{
            display: 'flex',
            width: '100%'
        }}>
            <div>
                <Avatar
                    src={
                        <Image
                            src={item.userId.avatar ? item.userId.avatar : "https://i.imgur.com/TV0vz0r.png"}
                            style={{
                                width: 32,
                            }}
                        />
                    }
                />

            </div>
            <div style={{
                display: 'flex',
                flex: '1',
                justifyContent: 'space-between',
                marginLeft: '10px',
            }}>
                <div>
                    <div>
                        <Typography.Title style={{
                            fontWeight: '500'
                        }} level={5}>{item.userId.name}</Typography.Title>
                    </div>
                    {description()}
                </div>
                {item.userId._id == userId ? null :
                    <Popover content={(
                        <>
                            {general_action()}
                        </>
                    )} trigger="click">
                        <Button type="text" icon={<MoreOutlined />} />
                    </Popover>
                }
            </div>
            <UserViewModal openUserModal={openUserModal} setOpenUserModal={setOpenUserModal} info={item.userId}/>
        </div>
    )
}

export default MemberItem