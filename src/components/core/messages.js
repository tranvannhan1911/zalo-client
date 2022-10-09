import { Avatar, List } from 'antd';
import React from 'react';
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

const Messages = () => (
    <div style={{
        padding: '10px'
    }}>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '10px'
                }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <div style={{
                        backgroundColor: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        margin: '0 10px'
                    }}>{item.title}</div>
                </div>
            )}
        />
    </div>
);

export default Messages;