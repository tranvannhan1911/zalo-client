import { Avatar, Button, Collapse, Drawer, Form, Image, Input, message, Modal, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/apis';
import FriendSelect from '../friend/friend_select';
import UserMember from '../user/user_searching';
import UserSelect from '../user/user_select';
import MemberGroupTab from '../member/member_group_tab';
import {
  EditOutlined, CameraOutlined
} from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';
import ConversationUpdateAvatarModal from './conversation_update_avatar_modal';
import MemberConversation from '../member/members_conversations';
import store from '../../../store/store';
const { Panel } = Collapse;

const RenameConversationModal = ({ isModalOpen, setIsModalOpen, data }, props) => {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (data && (newName == "" || !newName)) {
      setNewName(data?.name)
    }
  }, [data])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (newName.trim() == "") {
      message.error("Tên không được để trống!")
      return
    }
    try {
      const res = await api.conversation.rename(data._id, {
        name: newName
      })
      if (res.status == 200) {
        message.success("Đổi tên thành công")
        setNewName("")
        setIsModalOpen(false);
      }
    } catch {
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
        }} value={newName} onChange={e => setNewName(e.target.value)} />
      </Modal>
    </>
  );
};

const ConversationInfoModal = ({ open, setOpen, data }, props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [openUpdateAvatarModal, setOpenUpdateAvatarModal] = useState(false);
  const [file, setFile] = useState();
  var friendSelectKey = 0;

  useEffect(() => {
    store.subscribe(() => {
      console.log("ConversationInfoModal", store.getState())
      const _isOpen = store.getState().isOpenInfoConversationModal == "true"
      if (_isOpen != open){
        setOpen(_isOpen)
      }
    })
  }, [])

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

  const handleChangeUploadAvatar = async (info) => {
    if (info.file.status === 'done') {
      console.log("handleChangeUploadAvatar", info)
      setFile(info)
      setOpenUpdateAvatarModal(true)
    }
  };

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
        width="400px"
      // extra={[
      //   <Button key="submit" type="primary" loading={loading} onClick={editConversation}>
      //     Lưu
      //   </Button>
      // ]}
      >
        <div>
          <div style={{
            textAlign: 'center'
          }}>
            <Avatar
              size={70}
              src={
                <>
                  <Image
                    src={data?.avatar ? data.avatar : "https://cdn-icons-png.flaticon.com/512/119/119591.png"}
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
            <div>
              <Typography.Title level={4}>
                {data?.name}
                <Button type='text' icon={<EditOutlined />} onClick={() => setIsRenameModalOpen(true)} />
              </Typography.Title>
            </div>
          </div>

          <Collapse defaultActiveKey={['member']} ghost>
            {/* {data?.type ? */}
              <Panel header="Thành viên nhóm" key="member">
                <MemberConversation data={data} />
              </Panel>
              {/* : null
            }  */}

          </Collapse>
        </div>
      </Drawer>
      <RenameConversationModal setIsModalOpen={setIsRenameModalOpen} isModalOpen={isRenameModalOpen} data={data} />
      <ConversationUpdateAvatarModal
        openUpdateAvatarModal={openUpdateAvatarModal}
        setOpenUpdateAvatarModal={setOpenUpdateAvatarModal}
        file={file}
        conversationId={data?._id} />
    </>
  );
};
export default ConversationInfoModal;