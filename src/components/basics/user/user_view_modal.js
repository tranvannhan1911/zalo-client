import { Button, Modal, Image, Avatar, Typography, Space, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    MessageOutlined, CheckOutlined, CloseOutlined, CameraOutlined
} from '@ant-design/icons';
import store from '../../../store/store'
import { get_info_from_cookie } from '../../../utils/utils';
import Cookies from 'js-cookie';
import UserEditModal from './user_edit_modal';
import UserUpdateAvatarModal from './user_update_avatar_modal';
import ImgCrop from 'antd-img-crop';

const UserViewModal = ({ openUserModal, setOpenUserModal, info }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openUpdateAvatarModal, setOpenUpdateAvatarModal] = useState(false);
    const [file, setFile] = useState();

    const showModal = () => {
        setOpenUserModal(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenUserModal(false);
        }, 3000);
    };


    const handleCancel = () => {
        setOpenUserModal(false);
    };

    useEffect(() => {
        if (!info) {
            setUser(get_info_from_cookie())
        } else {
            setUser(info)
        }
    }, [info])

    // useEffect(() => {
    //     store.subscribe(() => {
    //         console.log("on change user", store.getState().user.info)
    //         if(user.name == undefined){
    //             setUser(store.getState().user.info)
    //         }
    //     })
    // }, [])

    const description = (
        <>
            {user._id == Cookies.get("_id") ? null :
                <Space>
                    <Button type="primary" icon={<MessageOutlined />}
                    // onClick={createConversation1vs1}
                    >Nhắn tin</Button>
                    <Button type="primary" icon={<CheckOutlined />} >Chấp nhận</Button>
                    <Button type="danger" icon={<CloseOutlined />} >Từ chối</Button>
                </Space>
            }
        </>
    )


    const action = (
        <>
            {user._id == Cookies.get("_id") ? null :
                <Space>
                    <Button type="primary" icon={<MessageOutlined />}
                    // onClick={createConversation1vs1}
                    >Nhắn tin</Button>
                    <Button type="primary" icon={<CheckOutlined />} >Chấp nhận</Button>
                    <Button type="danger" icon={<CloseOutlined />} >Từ chối</Button>
                </Space>
            }
        </>
    )

    const handleChangeUploadAvatar = async (info) => {
        if (info.file.status === 'done') {
            console.log("handleChangeUploadAvatar", info)
            setFile(info)
            setOpenUpdateAvatarModal(true)
        }
    };

    return (
        <>
            <Modal
                open={openUserModal}
                title="Xem thông tin"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={() => {
                        setOpenEditModal(true)
                    }}>
                        Sửa thông tin 
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>
                ]}
                style={{
                    padding: '0px'
                }}
            >
                <div style={{
                    display: 'flex'
                }}>
                    <div>
                        <Avatar
                            size={70}
                            src={
                                <>
                                    <Image
                                        src={user.avatar ? user.avatar : "https://i.imgur.com/TV0vz0r.png"}
                                    // style={{
                                    //     width: 32,
                                    // }}
                                    />
                                </>
                            }
                        />
                        <ImgCrop rotate>
                            <Upload
                                name="avatar"
                                accept='image/jpeg,image/png'
                                showUploadList={false}
                                customRequest={(options) => {
                                    console.log(options)
                                    options.onSuccess(options)
                                }}
                                style={{
                                    position: 'absolute',
                                    marginLeft: '-24px',
                                    marginTop: '50px'
                                }}
                                // beforeUpload={beforeUpload}
                                onChange={handleChangeUploadAvatar}
                            >
                                <Button 
                                    type='text' 
                                    icon={<CameraOutlined />}></Button>
                            </Upload>
                        </ImgCrop>
                    </div>
                    <div style={{
                        marginLeft: '20px'
                    }}>
                        <Typography.Title level={4}>{user?.name}</Typography.Title>
                        <p>Yêu màu tím và ghét sự giả dối</p>
                        <div>
                            {description}
                        </div>
                    </div>
                </div>

            </Modal>
            <UserEditModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
            <UserUpdateAvatarModal  
                openUpdateAvatarModal={openUpdateAvatarModal} 
                setOpenUpdateAvatarModal={setOpenUpdateAvatarModal}
                file={file}/>
        </>
    );
};
export default UserViewModal;