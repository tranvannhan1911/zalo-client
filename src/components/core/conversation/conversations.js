import { Avatar, Button, List, Skeleton, Space, Input, Divider, Typography, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    UserOutlined, UserAddOutlined, UsergroupAddOutlined,
    MoreOutlined, UndoOutlined, DeleteOutlined, ArrowLeftOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import ConversationModal from './modal';
import ActionBar from '../action';
import { truncate } from '../../../utils/utils';
const { Search } = Input;
const { Text } = Typography;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Conversations = (props) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    // useEffect(() => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setInitLoading(false);
    //             setData(res.results);
    //             setList(res.results);
    //         });
    // }, []);

    const onLoadMore = () => {
        setLoading(true);
        // setList(
        //     data.concat(
        //         [...new Array(count)].map(() => ({
        //             loading: true,
        //             name: {},
        //             picture: {},
        //         })),
        //     ),
        // );
        // fetch(fakeDataUrl)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         const newData = data.concat(res.results);
        //         setData(newData);
        //         setList(newData);
        //         setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        //         // In real scene, you can using public method of react-virtualized:
        //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

        //         window.dispatchEvent(new Event('resize'));
        //     });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;




    return (
        <div style={{
            backgroundColor: 'white'
        }}>
            <ActionBar {...props}/>
            <Divider style={{
                marginTop: '3px'
            }}/>
            <div 
                style={{
                    height: "80vh", 
                    overflow: 'auto',
                }}>
                <List
                    className="demo-loadmore-list"
                    // loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
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
                                                    // setOpenModal(true)
                                                }}>Xem chi tiết</Button>
                                        </div>
                                        <hr style={{
                                            borderTop: '1px solid #ddd'
                                        }}/>
                                        <div><Button type="text" icon={<ArrowLeftOutlined />} danger>Rời nhóm</Button></div>
                                        <div><Button type="text" icon={<DeleteOutlined /> } danger>Xóa phía tôi</Button></div>
                                    </div>
                                } trigger="click">
                                    <Button type="text" icon={<MoreOutlined />} />
                                </Popover>
                            }
                            onClick={(e) => {
                                console.log("item", item, e)
                                props.setCurrentConv(item)
                            }}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar ? item.avatar :  "https://joeschmoe.io/api/v1/random"} />}
                                    title={<Text >{item.name ? (truncate(item.name)) : "Không có tên"}</Text>}
                                    description={item.lastMessageId ? item.lastMessageId.content : ""}
                                />
                            </Skeleton>
                        </List.Item>
                    )}}
                />
            </div>
        </div>
    );
};

export default Conversations;