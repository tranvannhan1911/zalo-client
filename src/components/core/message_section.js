import { Button, Col, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import {
    SendOutlined, FileImageOutlined
} from '@ant-design/icons';
const { TextArea } = Input;


const MessageSection = (props) => {
    const [value, setValue] = useState("")

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF'
        }}>
            <div style={{
                flex: 'auto'
            }}>
                <TextArea rows={2} 
                    style={{
                        border: 'none',
                        resize: 'none'
                    }}
                    placeholder="Nhập tin nhắn"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onPressEnter={() => {
                        props.sendMessage(value)
                        setTimeout(() => setValue(""), 100)
                    }}/>
            </div>
            <div style={{
                padding: '10px'
            }}>
                <Space>
                    
                    <Button key="image" type="text" icon={<FileImageOutlined />} />
                    <Button key="text" type="text" icon={<SendOutlined />} 
                        onClick={() => {
                            if(value != "" && value != "\n"){
                                props.sendMessage(value)
                                setValue("")
                            }
                        }}/>
                </Space>
            </div>
        </div>
    )
}

export default MessageSection;