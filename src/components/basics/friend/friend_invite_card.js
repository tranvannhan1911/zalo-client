import { Avatar, Button, Card, Image, List, message, Popover, Space, Typography } from 'antd';
import React, { useState } from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined, CheckOutlined, CloseOutlined,
} from '@ant-design/icons';
import { acceptInvite } from '../../../controller/friend';
const { Text, Title } = Typography;

const FriendInviteCard = ({item}) => {
    const [isAcepted, setAcepted] = useState(false)

    const onAcceptInvite = () => {
        acceptInvite(item.senderId._id, (res) => {
            message.success("Chấp nhận lời mời kết bạn thành công")
            setAcepted(true)
        })
    }

    return (
        <Card style={{
            cursor: 'pointer'
        }}
        onClick={() => {

        }}
        >
            <div style={{
                display: 'flex',
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
                            }} level={5}>{item.senderId.name}</Typography.Title>
                        </div>
                        <p>Xin chào, hãy kết bạn nhé!</p>
                        <Space>
                            {
                                isAcepted ? 
                                <>
                                    <p>Đã chấp nhận lời mời kết bạn!</p>
                                </> :
                                <>
                                    <Button type="primary" icon={<CheckOutlined />} onClick={onAcceptInvite}>Chấp nhận</Button>
                                    <Button type="danger" icon={<CloseOutlined />} >Từ chối</Button>
                                </>   
                            }
                            
                        </Space>
                    </div>
                    <Popover content={
                        <div>
                            <div>
                                <Button 
                                    type="text" 
                                    icon={<ExclamationCircleOutlined />} 
                                    onClick={() => {
                                        // setOpenModal(true)
                                    }}>Xem chi tiết</Button>
                            </div>
                            
                        </div>
                    } trigger="click">
                        <Button type="text" icon={<MoreOutlined />} />
                    </Popover>
                </div>
            </div>
            {/* <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button type="text" icon={<MessageOutlined color='blue'/>}></Button>
            </div> */}
        </Card>
    )
}

export default FriendInviteCard;