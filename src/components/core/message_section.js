import { Button, Col, Input, message, Row, Space, Upload } from 'antd';
import React, { useState } from 'react';
import {
    SendOutlined, FileImageOutlined, FileZipOutlined
} from '@ant-design/icons';
import { getBase64 } from '../../utils/utils';
import api from '../../utils/apis';
const { TextArea } = Input;



const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Vui lòng chọn file ảnh');
    }
    
    return isJpgOrPng;
};


const MessageSection = (props) => {
    const [value, setValue] = useState("")

    const handleChange = async (info) => {
        if (info.file.status === 'done') {
            var data = new FormData();
            data.append('file', info.file.originFileObj);
            const res = await api.message.addMessageMedia("IMAGE", props.currentConv._id, data)
            console.log(res)
        }
    };

    const handleChangeFile = async (info) => {
        if (info.file.status === 'done') {
            console.log("handleChangeFile", info)
            var data = new FormData();
            data.append('file', info.file.originFileObj);
            const res = await api.message.addMessageMedia("FILE", props.currentConv._id, data)
            console.log(res)
        }
    };

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
                    <Upload
                        name="avatar"
                        accept='image/jpeg,image/png'
                        showUploadList={false}
                        customRequest={(options) => {
                            console.log(options)
                            options.onSuccess(options)
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        <Button key="image" type="text" icon={<FileImageOutlined />} />
                    </Upload>
                    <Upload
                        accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.rar,application/zip'
                        showUploadList={false}
                        customRequest={(options) => {
                            console.log(options)
                            options.onSuccess(options)
                        }}
                        // beforeUpload={beforeUpload}
                        onChange={handleChangeFile}
                    >
                        <Button key="image" type="text" icon={<FileZipOutlined />} />
                    </Upload>
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