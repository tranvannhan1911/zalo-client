
import {
    MoreOutlined, UndoOutlined, DeleteOutlined, CopyOutlined,
    ExclamationCircleOutlined, HeartOutlined
} from '@ant-design/icons';
import { Avatar, Button, Divider, List, message, Popover, Space } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useRef } from 'react';
import { deleteMessage } from '../../controller/message';
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

const Messages = (props) => {

    const userId = Cookies.get("_id")
    const refMessages = useRef()
    const ref = useRef()
    
    useEffect(() => {
        // console.log("props.messages", props.messages)
        // refMessages.current?.scrollToBottom({ behavior: 'smooth' })
    }, [props.messages])
    return (
        <div style={{
                padding: '10px',
                overflow: 'auto',
                height: '490px'
            }}
            ref={refMessages}>
            <List
                itemLayout="horizontal"
                dataSource={props.messages}
                renderItem={(item) => {
                    console.log("message item", item)
                    if(item.type == "NOTIFY"){
                        return (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    color: '#a3a3a3'
                                }}>{item.content}</div>
                        )
                    }else{
                        const direction = item.senderId == userId ? 'row-reverse' : 'row'
                        const createAtTime = item.createdAt.slice(11, 19)
                        
                        return (
                            <div 
                                style={{
                                    display: 'flex',
                                    flexDirection: `${direction}`,
                                    marginBottom: '10px'
                                }}
                            >
                                {item.senderId == userId ? null :
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                }
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    position: 'relative',
                                    margin: '0 10px'
                                }}
                                onMouseEnter={(e) => {
                                    // console.log(ref)
                                    // ref.current.style.display = 'block'
                                }}>
                                <span style={{
                                    color:'black',
                                    fontSize:15
                                }}>{item.content}</span>
                                <br></br>
                                <span style={{
                                    color:'blue',
                                    fontSize:10
                                }}>{createAtTime}</span>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            marginTop: '10px',
                                            marginTop: '-8px',
                                            right: '-15px'
                                        }}>
                                        {/* <Popover content={
                                            <div>
                                                aa
                                            </div>
                                        } trigger="click" placement="right"> */}
                                            <Button type="text" icon={<HeartOutlined />}
                                                style={{
                                                    display: 'none'
                                                }}/>
                                        {/* </Popover> */}
                                    </div>
                                </div>
                                <Space 
                                    ref={ref}
                                    // style={{
                                    //     display: 'none'
                                    // }}
                                    >
                                    <Popover content={
                                        <div>
                                            <div><Button type="text" icon={<CopyOutlined />} >Sao chép tin nhắn</Button></div>
                                            <div><Button type="text" icon={<ExclamationCircleOutlined />} >Xem chi tiết</Button></div>
                                            <hr style={{
                                                borderTop: '1px solid #ddd'
                                            }}/>
                                            <div><Button type="text" icon={<UndoOutlined />} danger>Thu hồi</Button></div>
                                            <div>
                                                <Button type="text" icon={<DeleteOutlined /> } danger
                                                    onClick={() => deleteMessage(item._id, () => {
                                                        message.success("Xóa thành công")
                                                    })}>Xóa phía tôi</Button>
                                            </div>
                                        </div>
                                    } trigger="click" placement="bottom">
                                        <Button type="text" icon={<MoreOutlined />}/>
                                    </Popover>
                                </Space>
                            </div>
                        )
                    }
                    
                    
                }}
            />
            <AlwaysScrollToBottom />
        </div>
    )
};

export default Messages;