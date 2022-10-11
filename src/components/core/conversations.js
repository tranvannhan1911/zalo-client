import { Avatar, Button, List, Skeleton, Space, Input, Divider, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { SyncOutlined, SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import {
    UserOutlined, UserAddOutlined, UsergroupAddOutlined,
    MoreOutlined
} from '@ant-design/icons';
const { Search } = Input;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Conversations = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

                window.dispatchEvent(new Event('resize'));
            });
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
       const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <div style={{
            padding: '10px',
        }}>
            <div>
                <Space>
                    <Search
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                    <Button type="text" icon={<UserAddOutlined />} onClick={() => setIsModalVisible(true)}/>
                        <Modal title="Thêm bạn"
                        visible={isModalVisible}
                        onOk={() => {
                          setIsModalVisible(false);
                        }}
                        onCancel={() => {
                          setIsModalVisible(false);
                        }}>
                        <Input placeholder="Nhập số điện thoại"/>
                        <div style={{marginTop: 12}}> 
                            <Space>
                                <SyncOutlined spin /> 
                                <label>Có thể bạn quen</label>
                            </Space>
                        </div>
                        <div className="userChat">
                            <Avatar
                                src="https://joeschmoe.io/api/v1/random"
                            />
                                <div className="userChatInfo">
                                    <span>Friend 1</span>
                                    <p>Từ gợi ý kết bạn</p>
                                </div>
                            <Button type="primary">Kết bạn</Button>
                        </div>
                        <div className="userChat">
                            <Avatar
                                src="https://joeschmoe.io/api/v1/random"
                            />
                                <div className="userChatInfo">
                                    <span>Friend 1</span>
                                    <p>Từ gợi ý kết bạn</p>
                                </div>
                            <Button type="primary">Kết bạn</Button>
                        </div>
                    </Modal> 
                    <Button type="text" icon={<UsergroupAddOutlined />} onClick={() => {
                        setIsModalVisible(true);
                        }}/>
                    <Modal title="Tạo Nhóm"
                        visible={isModalVisible}
                        onOk={() => {
                            setIsModalVisible(false);
                        }}
                        onCancel={() => {
                            setIsModalVisible(false);
                        }}>
                        <Input style={{marginTop: 12, marginBottom: 12}} placeholder="Nhập tên nhóm..."/>
                        <label>Thêm bạn vào nhóm</label>
                        <Input style={{marginTop: 12, marginBottom: 12}} placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"/>
                        <label>Trò chuyện gần đây</label>
                            <div>
                                <input type="checkbox" id="myCheckbox1" />
                                <label for="myCheckbox1">
                                    <Avatar src="https://joeschmoe.io/api/v1/random"/>                       
                                    <span>Friend 1</span>                                                    
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="myCheckbox2" />
                                <label for="myCheckbox2">
                                    <Avatar src="https://joeschmoe.io/api/v1/random"/>                       
                                    <span>Friend 2</span>                                                    
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="myCheckbox3" />
                                <label for="myCheckbox3">
                                    <Avatar src="https://joeschmoe.io/api/v1/random"/>                       
                                    <span>Friend 3</span>                                                    
                                </label> 
                            </div>
                    </Modal> 
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
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item
                            extra={<Button type="text" icon={<MoreOutlined />} />}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a href="https://ant.design">{item.name?.last}</a>}
                                    description="Ant Design, a design language for background"
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