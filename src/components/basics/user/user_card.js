import { Avatar, Button, Card, Image, List, Popover, Space, Typography } from 'antd';
import React from 'react';
import {
    MessageOutlined, ExclamationCircleOutlined, ArrowLeftOutlined,
    MoreOutlined, CheckOutlined, CloseOutlined,
} from '@ant-design/icons';
const { Text, Title } = Typography;

const UserCard = ({item, type}) => {

    const description = () => {
        if(type == "friend"){
            return (
                <>
                    <p>Thích màu tím và ghét sự giả dối</p>
                    <Space>
                        <Button type="primary" icon={<MessageOutlined />} >Nhắn tin</Button>
                    </Space>
                </>
            )
        }
        
        if(type == "add-friend"){
            return (
                <>
                    <p>Xin chào, hãy kết bạn nhé!</p>
                    <Space>
                        <Button type="primary" icon={<CheckOutlined />} >Chấp nhận</Button>
                        <Button type="danger" icon={<CloseOutlined />} >Từ chối</Button>
                    </Space>
                </>
            )
        }

        
        if(type == "group"){
            return (
                <>
                    <p>52 thành viên</p>
                </>
            )
        }
    }

    const action = () => {
        if(type == "friend"){
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
                        <hr style={{
                            borderTop: '1px solid #ddd'
                        }}/>
                        <div><Button type="text" icon={<CloseOutlined />} danger>Hủy kết bạn</Button></div>
                    </div>
                </>
            )
        }

        if(type == "add-friend"){
            return (
                <>
                    <div>
                        {/* <div><Button type="text" icon={<MessageOutlined />} >Nhắn tin</Button></div> */}
                        <div>
                            <Button 
                                type="text" 
                                icon={<ExclamationCircleOutlined />} 
                                onClick={() => {
                                    // setOpenModal(true)
                                }}>Xem chi tiết</Button>
                        </div>
                        {/* <hr style={{
                            borderTop: '1px solid #ddd'
                        }}/>
                        <div><Button type="text" icon={<CloseOutlined />} danger>Hủy kết bạn</Button></div> */}
                    </div>
                </>
            )
        }

        
        if(type == "group"){
            return (
                <>
                    <div>
                        {/* <div><Button type="text" icon={<MessageOutlined />} >Nhắn tin</Button></div> */}
                        <div>
                            <Button 
                                type="text" 
                                icon={<ExclamationCircleOutlined />} 
                                onClick={() => {
                                    // setOpenModal(true)
                                }}>Xem chi tiết</Button>
                        </div>
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
                            }} level={5}>{item.name}</Typography.Title>
                        </div>
                        {description()}
                    </div>
                    <Popover content={action} trigger="click">
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

export default UserCard;