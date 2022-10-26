import { Avatar, Button, List, Skeleton, Space, Input, Divider, Typography, Popover, Badge, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    UserOutlined, UserAddOutlined, UsergroupAddOutlined,
    MoreOutlined, UndoOutlined, DeleteOutlined, ArrowLeftOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import ConversationModal from '../../basics/conversation/create_group_modal';
import ActionBar from '../action';
import { truncate } from '../../../utils/utils';
import store, { getUser, setStoreCurentConv } from '../../../store/store';
import Cookies from 'js-cookie';
import api from '../../../utils/apis';
const { Search } = Input;
const { Text } = Typography;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Conversations = (props) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const userId = Cookies.get("_id")

    // useEffect(() => {
    //     console.log("getUser", getUser())
    //     store.subscribe(() => {
    //         const state = store.getState()
    //         console.log("store.subscribe", state)
    //     })
    // }, [])

    const onLoadMore = () => {
        setLoading(true);
    };

    // const loadMore =
    //     !initLoading && !loading ? (
    //         <div
    //             style={{
    //                 textAlign: 'center',
    //                 marginTop: 12,
    //                 height: 32,
    //                 lineHeight: '32px',
    //             }}
    //         >
    //             <Button onClick={onLoadMore}>loading more</Button>
    //         </div>
    //     ) : null;

    useEffect(() => {
        if(props.conversations){
            setInitLoading(false)
        }else{
            setInitLoading(true)
        }
    }, [props.conversations])

    const leaveGroup = async (item) => {
        try{
            const res = await api.conversation.leave_group(item._id)
            console.log("leaveGroup", res)
            if(res.status == 204){
                message.success("Rời nhóm thành công!")
                props.onLeaveGroup(item)
            }
        }catch{
            message.error("Có lỗi xảy ra!")
        }
        
    }

    return (
        <div style={{
            backgroundColor: 'white'
        }}>
            <ActionBar {...props} />
            <Divider style={{
                marginTop: '3px'
            }} />
            <div
                style={{
                    height: "80vh",
                    overflow: 'auto',
                }}>
                <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={props.conversations}
                    renderItem={(item) => {
                        return (
                            <List.Item
                                style={{
                                    padding: '10px',
                                    backgroundColor: `${item._id == props.currentConv?._id ? "#f0f0f0" : ""}`,
                                    cursor: 'pointer'
                                }}
                                extra={
                                    <Popover content={
                                        <div>
                                            {/* <div><Button type="text" icon={<CopyOutlined />} >Sao chép tin nhắn</Button></div> */}
                                            <div>
                                                <Button
                                                    type="text"
                                                    icon={<ExclamationCircleOutlined />}
                                                    onClick={() => {
                                                        props.setOpenConvInfoModal(true)
                                                    }}>Xem chi tiết</Button>
                                            </div>
                                            <hr style={{
                                                borderTop: '1px solid #ddd'
                                            }} />
                                            <div>
                                                {item.type ?
                                                    <Button type="text" icon={<ArrowLeftOutlined />} danger 
                                                        onClick={() => leaveGroup(item)}>Rời nhóm</Button>
                                                :
                                                    null
                                                }
                                                
                                            </div>
                                            {/* <div>
                                                <Button type="text" icon={<DeleteOutlined />} danger>Xóa phía tôi</Button>
                                            </div> */}
                                        </div>
                                    } trigger="click">
                                        <Button type="text" icon={<MoreOutlined />} />
                                    </Popover>
                                }
                                onClick={(e) => {
                                    console.log("onclick", item, e)
                                    props.setCurrentConv(item)
                                    
                                    // store.dispatch(setStoreCurentConv(item))
                                }}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Badge count={item.count_seen} showZero={false}>
                                                <Avatar src={item.avatar ? item.avatar : "https://joeschmoe.io/api/v1/random"} />
                                            </Badge>
                                        }
                                        title={<Text >{item.name ? (truncate(item.name)) : "Không có tên"}</Text>}
                                        description={
                                            <Text style={{
                                                fontWeight: `${item.count_seen != 0 ? '600' : '400'}`
                                            }}>
                                                {item.lastMessageId
                                                    ?
                                                    item.lastMessageId.isDeleted
                                                        ?
                                                        "Tin nhắn đã bị thu hồi"
                                                        :
                                                        item.lastMessageId.deletedWithUserIds.includes(userId) ? 
                                                            "Tin nhắn đã bị xóa"
                                                        :
                                                            item.lastMessageId.content
                                                    :
                                                    ""
                                                }</Text>
                                        }
                                    />
                                </Skeleton>
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default Conversations;