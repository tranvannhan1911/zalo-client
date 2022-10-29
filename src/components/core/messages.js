
import {
    MoreOutlined, UndoOutlined, DeleteOutlined, CopyOutlined,
    DownloadOutlined, HeartOutlined
} from '@ant-design/icons';
import { Avatar, Button, Divider, Image, List, message, Popover, Space } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useRef } from 'react';
import { deleteMessage, removeMessageFromAll } from '../../controller/message';

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

const Messages = (props) => {

    const userId = Cookies.get("_id")

    useEffect(() => {
        // console.log("props.messages", props.messages)
        // refMessages.current?.scrollToBottom({ behavior: 'smooth' })
    }, [props.messages])


    const card = (item) => {
        const createAtTime = item.createdAt.slice(11, 19)
        return (
            <div style={{
                backgroundColor: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                position: 'relative',
                margin: '0 10px',
                maxWidth: '600px'
            }}
                onMouseEnter={(e) => {
                    // console.log(ref)
                    // ref.current.style.display = 'block'
                }}>
                <span style={{
                    color: `${item.isDeleted ? '#939393' : 'black'}`,
                    fontSize: 15
                }}>{item.isDeleted ? "Tin nhắn đã bị thu hồi" : item.content}</span>
                <br></br>
                <span style={{
                    color: 'blue',
                    fontSize: 10
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
                        }} />
                    {/* </Popover> */}
                </div>
            </div>
        )
    }

    const content = (item) => {
        if (item.type == "IMAGE") {
            return  (
                <div style={{
                    
                    margin: '0 10px'
                }}>
                    <Image src={item.content} style={{
                        maxWidth: '600px',
                    }}
                    />
                </div>
            )
        } else if (item.type == "FILE"){
            return (
                <div style={{
                    margin: '0 10px'
                }}>
                    <Button type="text"  href={item.content} target='blank' icon={<DownloadOutlined />}> Tải xuống</Button>
                </div>
            )
        }else if(item.type == "VIDEO"){
            return (
                
                <div style={{
                    margin: '0 10px'
                }}>
                    <video style={{
                        width: '600px'
                    }} controls src={item.content}></video>
                </div>
            )
        }else{
            return card(item)
        }
    }

    return (
        <div style={{
            padding: '10px',
            overflow: 'auto',
            height: '465px'
        }}>
            <List
                itemLayout="horizontal"
                dataSource={props.messages}
                renderItem={(item) => {
                    // console.log("message item", item, userId, item.deletedWithUserIds.includes(userId))
                    if (item.type == "NOTIFY") {
                        return (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    color: '#a3a3a3'
                                }}>{item.content}</div>
                        )
                    } else {
                        const direction = item.senderId == userId ? 'row-reverse' : 'row'
                        const createAtTime = item.createdAt.slice(11, 19)
                        if (item.deletedWithUserIds.includes(userId)) {
                            return null
                        }
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
                                {content(item)}
                                {item.isDeleted ? null :
                                    <Space
                                    // ref={ref}
                                    // style={{
                                    //     display: 'none'
                                    // }}
                                    >
                                        <Popover content={
                                            <div>
                                                <div><Button type="text" icon={<CopyOutlined />}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(item.content)
                                                        message.success("Sao chép thành công!")
                                                    }}>Sao chép tin nhắn</Button></div>
                                                {/* <div><Button type="text" icon={<ExclamationCircleOutlined />} >Xem chi tiết</Button></div> */}
                                                <hr style={{
                                                    borderTop: '1px solid #ddd'
                                                }} />
                                                {item.senderId == userId ?
                                                    <div>
                                                        <Button type="text" icon={<UndoOutlined />} danger
                                                            onClick={() => removeMessageFromAll(item._id, () => {

                                                                message.success("Thu hồi thành công")
                                                            })}>Thu hồi</Button>
                                                    </div>
                                                    : null}
                                                <div>
                                                    <Button type="text" icon={<DeleteOutlined />} danger
                                                        onClick={() => deleteMessage(item._id, () => {
                                                            const _messages = [...props.messages]
                                                            _messages.map(msg => {
                                                                if (msg._id == item._id) {
                                                                    item.deletedWithUserIds.push(userId)
                                                                }
                                                                return msg
                                                            })
                                                            props.setMessages(_messages)
                                                            message.success("Xóa thành công")
                                                        })}>Xóa phía tôi</Button>
                                                </div>
                                            </div>
                                        } trigger="click" placement="bottom">
                                            <Button type="text" icon={<MoreOutlined />} />
                                        </Popover>
                                    </Space>
                                }
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