import { Button, Modal, Image, Avatar, Typography, Space, Form, Input, DatePicker, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MessageOutlined, CheckOutlined, CloseOutlined,
} from '@ant-design/icons';
import store from '../../../store/store'
import { get_info_from_cookie } from '../../../utils/utils';
import Cookies from 'js-cookie';
import Uploader from '../upload/uploader';
import api from '../../../utils/apis';
import moment from 'moment';

const UserEditModal = ({ openEditModal, setOpenEditModal, type, info }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [form] = Form.useForm()

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
        const initData = {
            password: Cookies.get("password"),
        }
        console.log("initData", initData)
        form.setFieldsValue(initData)
    }, [])

    useEffect(() => {
        if (!info) {
            setUser(get_info_from_cookie())
        } else {
            setUser(info)
        }
    }, [info])

    const updateUserInfo = async () => {
        try{
            const res = await api.user.update_info(form.getFieldsValue())
            message.success("Đổi mật khẩu thành công!")
            Cookies.set("name", form.getFieldValue("name"))

        }catch{
            message.error("Có lỗi xảy ra!")
        }
    }

    return (
        <>
            <Modal
                open={openEditModal}
                title="Đổi mật khẩu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                // footer={[
                //     <Button key="back" onClick={handleCancel}>
                //         Hủy
                //     </Button>,
                //     <Button key="submit" type="primary" loading={loading} onClick={updateUserInfo}>
                //         Lưu
                //     </Button>
                // ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="Họ và tên"
                        required
                        name="name">
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        required
                        name="dateOfBirth">
                        <DatePicker name='dateOfBirth'/>
                    </Form.Item>
                    <Space>
                        <Button key="submit" type="primary" loading={loading} onClick={updateUserInfo}>
                            Lưu
                        </Button>
                        <Button key="back" onClick={handleCancel}>
                            Hủy
                        </Button>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};
export default UserEditModal;