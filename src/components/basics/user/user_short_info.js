import { Avatar, Button, Card, Image, List, message, Popover, Space, Typography } from 'antd';
import React from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined, UserAddOutlined, CloseOutlined,
} from '@ant-design/icons';
import AddFriend from '../../core/friend/add-friend';
import api from '../../../utils/apis';
import Cookies from 'js-cookie';
import { deleteFriend } from '../../../controller/friend';
const { Text, Title } = Typography;

const UserShortInfo = ({item, type}) => {

    const userId = Cookies.get("_id")
    // const [userInfo]

    const description = () => {
        if(type == "user"){
            return (
                <>
                    <p>{item.friends.includes(userId) ? "Đã kết bạn!" : "Hãy gửi lời mời kết bạn để trò chuyện!"}</p>
                    {/* <Space>
                        <Button type="primary" icon={<MessageOutlined />} >Nhắn tin</Button>
                    </Space> */}
                </>
            )
        }
        
        if(type == "message"){
            return (
                <>
                    <p>Message!</p>
                    {/* <Space>
                        <Button type="primary" icon={<CheckOutlined />} >Chấp nhận</Button>
                        <Button type="danger" icon={<CloseOutlined />} >Từ chối</Button>
                    </Space> */}
                </>
            )
        }
    }

    const AddFriend = async () => {
        try{
            const res = await api.friend.invite(item._id)
            console.log("AddFriend", item, res)
            if(res.status == 201){
                message.success("Gửi lời mời kết bạn thành công!")
            }
        }catch(err){
            console.log("Failed, ", err)
            if(err.response.status == 400){
                message.error("Không thể gửi lại lời mời kết bạn!")
            }
        }
    }

    const action = () => {
        if(type == "user"){
            return (
                <>
                    <div>
                        <div><Button type="text" icon={<MessageOutlined />} >Nhắn tin</Button></div>
                        <div>
                            <Button 
                                type="text" 
                                icon={<ExclamationCircleOutlined />} 
                                onClick={() => {
                                    // setOpenModal(true)
                                }}>Xem chi tiết</Button>
                        </div>
                        { !item.friends.includes(userId) ?
                            <div>
                                <Button type="text" icon={<UserAddOutlined />} 
                                    onClick={AddFriend}>Gửi lời mời kết bạn</Button>
                            </div>
                            : null}
                        { item.friends.includes(userId) ?
                            <>
                                <hr style={{
                                    borderTop: '1px solid #ddd'
                                }}/>
                                <div>
                                    <Button type="text" icon={<CloseOutlined />} danger
                                        onClick={
                                            deleteFriend(item._id, (data) => {
                                                message.success("Xóa bạn bè thành công")
                                            })
                                        }>Hủy kết bạn</Button></div>
                            </>
                            : null}
                    </div>
                </>
            )
        }

        if(type == "message"){
            return (
                <>
                    <div>
                        {/* <div><Button type="text" icon={<MessageOutlined />} >Nhắn tin</Button></div> */}
                        {/* <div>
                            <Button 
                                type="text" 
                                icon={<ExclamationCircleOutlined />} 
                                onClick={() => {
                                    // setOpenModal(true)
                                }}>Xem chi tiết</Button>
                        </div> */}
                        {/* <hr style={{
                            borderTop: '1px solid #ddd'
                        }}/>
                        <div><Button type="text" icon={<CloseOutlined />} danger>Hủy kết bạn</Button></div> */}
                    </div>
                </>
            )
        }

        
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
                        src="https://joeschmoe.io/api/v1/random"
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
                        }} level={5}>{item.name}</Typography.Title>
                    </div>
                    {description()}
                </div>
                <Popover content={action} trigger="click">
                    <Button type="text" icon={<MoreOutlined />} />
                </Popover>
            </div>
        </div>
    )
}

export default UserShortInfo