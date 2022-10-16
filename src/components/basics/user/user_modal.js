import { Button, Modal, Image } from 'antd';
import React, { useState } from 'react';


const UserModal = ({ openUserModal, setOpenUserModal, type }) => {
    const [loading, setLoading] = useState(false);

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

    const View = () => (
        <Modal
            open={openUserModal}
            title="Xem thông tin"
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Xong
                </Button>
            ]}
            style={{
                padding: '0px'
            }}
        >
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        </Modal>
    )

    const Edit = () => (
        <Modal
            open={openUserModal}
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
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )


    return (
        <>
            {type ==  "edit" ? <Edit /> : <View />}
        </>
    );
};
export default UserModal;