import { Avatar, Button, List, Skeleton, Space, Input, Divider, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    UserOutlined, UserAddOutlined, UsergroupAddOutlined,
    MoreOutlined
} from '@ant-design/icons';
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



    const onSearch = (value) => console.log(value);

    return (
        <div style={{
            backgroundColor: 'white'
        }}>
            <div style={{
                padding: '10px',
            }}>
                <Space>
                    <Search
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                    <Button type="text" icon={<UserAddOutlined />} />
                    <Button type="text" icon={<UsergroupAddOutlined />} />
                </Space>
            </div>
            <Divider />
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
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                padding: '10px',
                                backgroundColor: `${item._id == props.currentConv?._id ? "#f0f0f0}" : ""}`
                            }}
                            extra={<Button type="text" icon={<MoreOutlined />} />}
                            onClick={(e) => {
                                console.log("item", item, e)
                                props.setCurrentConv(item)
                            }}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar ? item.avatar :  "https://joeschmoe.io/api/v1/random"} />}
                                    title={<Text>{item.name ? item.name : "Không có tên"}</Text>}
                                    description={item.lastMessage ? item.lastMessage._doc.content : ""}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default Conversations;