import { Avatar, Button, Collapse, Drawer, Form, Image, Input, List, message, Modal, Space, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/apis';
import FriendSelect from '../friend/friend_select';
import UserMember from '../user/user_searching';
import UserSelect from '../user/user_select';
import MemberGroupTab from '../member/member_group_tab';
import {
  EditOutlined, CameraOutlined, ArrowLeftOutlined, DeleteOutlined
} from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';
import ConversationUpdateAvatarModal from './conversation_update_avatar_modal';
import MemberConversation from '../member/members_conversations';
import store from '../../../store/store';
import Video_modal from './video_modal';
import FileItem from './file_item';
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

const _data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];

const ConversationInfoModal = ({ open, setOpen, data }, props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [openUpdateAvatarModal, setOpenUpdateAvatarModal] = useState(false);
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [visibleVideoModal, setVisibleVideoModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  var friendSelectKey = 0;

  useEffect(() => {
    store.subscribe(() => {
      console.log("ConversationInfoModal", store.getState())
      const _isOpen = store.getState().isOpenInfoConversationModal == "true"
      console.log("set open to ", _isOpen, open)
      if (_isOpen != open) {
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

  useEffect(() => {
    console.log("lọc ảnh, video", data)
    if (data && data.messages) {
      const _images = []
      const _videos = []
      const _files = []
      data.messages.forEach(msg => {
        if (msg.type == "IMAGE") {
          _images.push(msg)
        } else if (msg.type == "VIDEO") {
          _videos.push(msg)
        } else if (msg.type == "FILE") {
          _files.push(msg)
        }
      })
      setImages(_images)
      setVideos(_videos)
      setFiles(_files)
    }
  }, [data])

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

          <Collapse ghost>
            {/* {data?.type ? */}
            <Panel header="Thành viên" key="member">
              <MemberConversation data={data} />
            </Panel>
            <Panel header="Ảnh" key="photo">
              <List
                grid={{
                  gutter: 16,
                  column: 3,
                }}
                dataSource={images}
                renderItem={(item) => (
                  <List.Item>
                    <Image src={item.content} style={{ width: '100%', height: '100%' }}></Image>
                  </List.Item>
                )}
              />
            </Panel>
            <Panel header="Video" key="video">
              <List
                grid={{
                  gutter: 16,
                  column: 2,
                }}
                dataSource={videos}
                renderItem={(item) => (
                  <List.Item>
                    <Button 
                      onClick={() => {
                        setCurrentItem(item)
                        setVisibleVideoModal(true)
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '0'
                      }}>
                      <video src={item.content} style={{
                        width: '100%'
                      }}></video>
                    </Button>
                  </List.Item>
                )}
              />
            </Panel>
            <Panel header="File" key="file">
            <List
                dataSource={files}
                renderItem={(item) => (
                  <List.Item>
                    <FileItem item={item}/>
                  </List.Item>
                )}
              />
            </Panel>
            <Panel header="Bảo mật" key="security">
              <Space direction='vertical' style={{ width: '100%' }}>
                <Button type='text' style={{ width: '100%', textAlign: 'left', color: 'red' }}>
                  <DeleteOutlined /> Xóa lịch sử trò chuyện
                </Button>
                <Button type='text' style={{ width: '100%', textAlign: 'left', color: 'red' }}>
                  <ArrowLeftOutlined /> Rời nhóm
                </Button>
              </Space>
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
      <Video_modal visible={visibleVideoModal} setVisible={setVisibleVideoModal} item={currentItem} />
    </>
  );
};
export default ConversationInfoModal;