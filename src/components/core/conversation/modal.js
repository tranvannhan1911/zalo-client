import { Avatar, Button, Form, Image, Input, Modal } from 'antd';
import React, { useState } from 'react';
import UserMember from '../../basics/user/user_searching';
import UserSelect from '../../basics/user/user_select';

const ConversationModal = ({open, setOpen}) => {
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        title="Tạo cuộc trò chuyện"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Tạo nhóm
          </Button>
        ]}
      >
        <Form
            layout="vertical">
                
            <Form.Item name="name">
                <div style={{
                    display: 'flex'
                }}>
                    <Avatar
                        src={
                            <Image
                                src="https://joeschmoe.io/api/v1/random"
                                style={{
                                    width: 32,
                                }}
                            />
                        }
                    />
                    <Input placeholder="Tên nhóm" style={{
                        marginLeft: '10px'
                    }} />
                    
                </div>
            </Form.Item>
            {/* <Form.Item label="Thêm thành viên vào nhóm" name="users">
                <UserSelect />
            </Form.Item> */}
            <div>
                <UserSelect />
            </div>
        </Form>
      </Modal>
    </>
  );
};
export default ConversationModal;