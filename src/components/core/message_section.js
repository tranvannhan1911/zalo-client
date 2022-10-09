import { Button, Col, Input, Row, Space } from 'antd';
import React from 'react';
import {
    SendOutlined, FileImageOutlined
} from '@ant-design/icons';
const { TextArea } = Input;


const MessageSection = (props) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF'
        }}>
            <div style={{
                flex: 'auto'
            }}>
                <TextArea rows={2} style={{
                    border: 'none',
                    resize: 'none'
                }}
                placeholder="Nhập tin nhắn"/>
            </div>
            <div style={{
                padding: '10px'
            }}>
                <Space>
                    
                    <Button key="1" type="text" icon={<FileImageOutlined />} />
                    <Button key="1" type="text" icon={<SendOutlined />} />
                </Space>
            </div>
        </div>
    )
}

export default MessageSection;