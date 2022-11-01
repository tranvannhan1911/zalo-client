import { Avatar, Button, Collapse, Drawer, Form, Image, Input, message, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/apis';
import FriendSelect from '../friend/friend_select';
import UserMember from '../user/user_searching';
import UserSelect from '../user/user_select';
import MemberGroupTab from './member_group_tab';
import {
  EditOutlined,
} from "@ant-design/icons";
const { Panel } = Collapse;

const RenameConversationModal = ({isModalOpen, setIsModalOpen, data}, props) => {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if(data && (newName == "" || !newName)){
      setNewName(data?.name)
    }
  }, [data])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (newName.trim() == ""){
      message.error("Tên không được để trống!")
      return
    }
    try{
      const res = await api.conversation.rename(data._id, {
        name: newName
      })
      if (res.status == 200){
        message.success("Đổi tên thành công")
        setNewName("")
        setIsModalOpen(false);
      }
    }catch{
      message.error("Có lỗi xảy ra!")
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Đổi tên cuộc hội thoại" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Tên nhóm" style={{
          marginLeft: '10px'
        }} value={newName} onChange={e => setNewName(e.target.value)}/>
      </Modal>
    </>
  );
};

const ConversationInfoModal = ({ open, setOpen, data }, props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
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

  useEffect(() => {
    console.log("props.data", data)
  }, [data])

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
              textAlign: 'center'
            }}>
              <Avatar
                size={70}
                src={
                  <>
                    <Image
                      src={"https://joeschmoe.io/api/v1/random"}
                    // style={{
                    //     width: 32,
                    // }}
                    />
                  </>
                }
                style={{
                  marginBottom: '10px'
                }}
              />
              {/* <Input placeholder="Tên nhóm" style={{
                marginLeft: '10px'
              }} /> */}
              <div>
                <Typography.Title level={4}>
                  {data?.name} 
                  <Button type='text' icon={<EditOutlined />} onClick={() => setIsRenameModalOpen(true)}/>
                </Typography.Title>
              </div>
            </div>
          </Form.Item>

          <Collapse defaultActiveKey={['member']} >
            <Panel header="Thành viên nhóm" key="member">
              <Form.Item label="Thêm bạn bè vào nhóm" name="users">
                <FriendSelect key={++friendSelectKey} {...props} open={open} value={users} setValue={setUsers} />
              </Form.Item>
              <MemberGroupTab />
            </Panel>
          </Collapse>
        </Form>
      </Drawer>
      <RenameConversationModal setIsModalOpen={setIsRenameModalOpen} isModalOpen={isRenameModalOpen} data={data}/>
    </>
  );
};
export default ConversationInfoModal;