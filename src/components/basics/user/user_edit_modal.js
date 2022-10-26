import { Button, Modal, Image, Avatar, Typography, Space, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MessageOutlined, CheckOutlined, CloseOutlined,
} from '@ant-design/icons';
import store from '../../../store/store'
import { get_info_from_cookie } from '../../../utils/utils';
import Cookies from 'js-cookie';
import Uploader from '../upload/uploader';

const UserEditModal = ({ openEditModal, setOpenEditModal, type, info }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const form = Form.useForm()

    const showModal = () => {
        setOpenEditModal(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenEditModal(false);
        }, 3000);
    };


    const handleCancel = () => {
        setOpenEditModal(false);
    };

    useEffect(() => {
        if (!info) {
            setUser(get_info_from_cookie())
        } else {
            setUser(info)
        }
    }, [info])

    return (
        <>
            <Modal
                open={openEditModal}
                title="Sửa thông tin cá nhân"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Lưu
                    </Button>
                ]}
            >
                <Form
                    // form={form}
                    layout="vertical"
                >
                    <Uploader />
                    <Form.Item 
                        label="Họ và tên" 
                        required 
                        name="name">
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    {/* <Form.Item
                        label="Field B"
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item> */}
                    {/* <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    );
};
export default UserEditModal;