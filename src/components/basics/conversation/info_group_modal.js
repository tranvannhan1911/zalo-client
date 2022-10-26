import { Avatar, Button, Drawer, Form, Image, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import api from '../../../utils/apis';
import FriendSelect from '../friend/friend_select';
import UserMember from '../user/user_searching';
import UserSelect from '../user/user_select';
import MemberGroupTab from './member_group_tab';

const ConversationInfoModal = ({open, setOpen}, props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  var friendSelectKey = 0;

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

  const editConversation = async () => {
    // try{
    //   const values = form.getFieldsValue()
    //   values.userIds = users
    //   const res = await api.conversation.create_group(values)
    //   console.log("createConversation", res)
    //   if(res.status == 201){
    //     message.success("Tạo nhóm thành công")
    //     setOpen(false)
    //     // props.setCurrentConv()
    //   }
    // }catch(err){
    //   console.log("Failed, ", err)
    // }
    
  }

  return (
    <>
      <Drawer
        placement="right"
        open={open}
        title="Thông tin cuộc hội thoại"
        onOk={handleOk}
        onClose={handleCancel}
        width="500px"
        extra={[
          <Button key="submit" type="primary" loading={loading} onClick={editConversation}>
            Lưu
          </Button>
        ]}
      >
        <Form
            form={form}
            onFinish={editConversation}
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
            <Form.Item label="Thêm thành viên vào nhóm" name="users">
                <FriendSelect key={++friendSelectKey} {...props} open={open} value={users} setValue={setUsers}/>
            </Form.Item>
            <MemberGroupTab />
        </Form>
      </Drawer>
    </>
  );
};
export default ConversationInfoModal;