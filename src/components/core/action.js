import { Button, Space, Input, Typography} from 'antd';
import React, { useEffect, useState } from 'react';
import {
    UserAddOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import ConversationModal from './conversation/modal';
const { Search } = Input;
const { Text } = Typography;
const ActionBar = (props) => {
    const [openModal, setOpenModal] = useState(false);

    const onSearch = (value) => console.log(value);
    
    return (
        <div style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Input
                placeholder="Tìm kiếm"
                onSearch={onSearch}
                style={{
                    flex: 1,
                    marginRight: '10px'
                }}
            />
            <Space>
                <Button type="text" icon={<UsergroupAddOutlined />} 
                    onClick={() => {
                        setOpenModal(true)
                    }}/>
            </Space>
            <ConversationModal open={openModal} setOpen={setOpenModal}/>
        </div>
    )
}

export default ActionBar