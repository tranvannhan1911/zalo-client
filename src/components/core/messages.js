import {
  MoreOutlined,
  UndoOutlined,
  DeleteOutlined,
  CopyOutlined,
  DownloadOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Image,
  List,
  message,
  Popover,
  Space,
} from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useRef } from "react";
import { deleteMessage, removeMessageFromAll } from "../../controller/message";
import moment from "moment";
import "moment/locale/vi";
import FileItem from "../basics/conversation/file_item";
moment.locale("vi");
const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const Messages = (props) => {
  const userId = Cookies.get("_id");

  useEffect(() => {
    // console.log("props.messages", props.messages)
    // refMessages.current?.scrollToBottom({ behavior: 'smooth' })
  }, [props.messages]);

  const card = (item, content) => {
    var dateString = moment(item.createdAt).format("HH:mm");
    var createAtTime = dateString;
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          position: "relative",
          margin: "0 20px",
          maxWidth: "600px",
        }}
        onMouseEnter={(e) => {
          // console.log(ref)
          // ref.current.style.display = 'block'
        }}
      >
        {item.senderId._id == userId ? null : (
          <div
            style={{
              color: "#8b8b8b",
              fontSize: 15,
            }}
          >
            {item.senderId.name}
          </div>
        )}
        <span
          style={{
            marginTop: 5,
            color: `${item.isDeleted ? "#" : "black"}`,
            fontSize: 15,
            fontWeight: "initial",
          }}
        >
          {item.isDeleted ? "Tin nhắn đã bị thu hồi" : content}
        </span>
        <br></br>
        <span
          style={{
            color: "blue",
            fontSize: 10,
          }}
        >
          {createAtTime}
        </span>
        <div
          style={{
            position: "absolute",
            marginTop: "10px",
            marginTop: "-8px",
            right: "-15px",
          }}
        >
          {/* <Popover content={
                                            <div>
                                                aa
                                            </div>
                                        } trigger="click" placement="right"> */}
          <Button
            type="text"
            icon={<HeartOutlined />}
            style={{
              display: "none",
            }}
          />
          {/* </Popover> */}
        </div>
      </div>
    );
  };

  const content = (item) => {
    var dateString = moment(item.createdAt).format("HH:mm");
    var createAtTime = dateString;
    if (item.type == "IMAGE") {
      return (
        <div
          style={{
            margin: "0 20px",
            backgroundColor: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            position: "relative",
            // margin: "0 20px",
            maxWidth: "600px",
          }}
        >
          {item.senderId._id == userId ? null : (
            <span
              style={{
                color: "#8b8b8b",
                fontSize: 15,
              }}
            >
              {item.senderId.name}
            </span>
          )}
          <br></br>
          <span
            style={{
              marginTop: 5,
              color: `${item.isDeleted ? "#" : "black"}`,
              fontSize: 15,
              fontWeight: "initial",
            }}
          >
            {item.isDeleted ? (
              "Tin nhắn đã bị thu hồi"
            ) : (
              <Image
                src={item.content}
                style={{
                  maxWidth: "600px",
                }}
              />
            )}
          </span>
          <br></br>
          <span
            style={{
              color: "blue",
              fontSize: 10,
            }}
          >
            {createAtTime}
          </span>
        </div>
      );
    } else if (item.type == "FILE") {
      return card(
        item,
        <FileItem item={item} />
      );
    } else if (item.type == "VIDEO") {
      return card(
        item,
        <video
          style={{
            width: "600px",
          }}
          controls
          src={item.content}
        ></video>
      );
    } else {
      return card(item, item.content);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        overflow: "auto",
        height: "465px",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={props.messages}
        renderItem={(item) => {
          // console.log(
          //   "message item",
          //   item,
          //   userId,
          //   item.deletedWithUserIds.includes(userId)
          // );
          if (item.type == "NOTIFY") {
            if (item.deletedWithUserIds.includes(userId)) {
              return null;
            }
            return (
              <div
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#a3a3a3",
                }}
              >
                {item.content}
              </div>
            );
          } else {
            const direction =
              item.senderId._id == userId ? "row-reverse" : "row";
            if (item.deletedWithUserIds.includes(userId)) {
              return null;
            }
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: `${direction}`,
                  marginBottom: "10px",
                }}
              >
                {item.senderId._id == userId ? null : (
                  <Avatar
                    src={
                      item.senderId.avatar == ""
                        ? "https://joeschmoe.io/api/v1/random"
                        : item.senderId.avatar
                    }
                  />
                )}
                {content(item)}
                {item.isDeleted ? null : (
                  <Space
                  // ref={ref}
                  // style={{
                  //     display: 'none'
                  // }}
                  >
                    <Popover
                      content={
                        <div>
                          {item.type == "TEXT" ?
                            <div>
                              <Button
                                type="text"
                                icon={<CopyOutlined />}
                                onClick={() => {
                                  navigator.clipboard.writeText(item.content);
                                  message.success("Sao chép thành công!");
                                }}
                              >
                                Sao chép tin nhắn
                              </Button>
                              <hr
                                style={{
                                  borderTop: "1px solid #ddd",
                                }}
                              />
                            </div>
                            : null
                          }
                          {/* <div><Button type="text" icon={<ExclamationCircleOutlined />} >Xem chi tiết</Button></div> */}
                          
                          {item.senderId._id == userId ? (
                            <div>
                              <Button
                                type="text"
                                icon={<UndoOutlined />}
                                danger
                                onClick={() =>
                                  removeMessageFromAll(item._id, () => {
                                    message.success("Thu hồi thành công");
                                  })
                                }
                              >
                                Thu hồi
                              </Button>
                            </div>
                          ) : null}
                          <div>
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              danger
                              onClick={() =>
                                deleteMessage(item._id, () => {
                                  const _messages = [...props.messages];
                                  _messages.map((msg) => {
                                    if (msg._id == item._id) {
                                      item.deletedWithUserIds.push(userId);
                                    }
                                    return msg;
                                  });
                                  props.setMessages(_messages);
                                  message.success("Xóa thành công");
                                })
                              }
                            >
                              Xóa phía tôi
                            </Button>
                          </div>
                        </div>
                      }
                      trigger="click"
                      placement="bottom"
                    >
                      <Button type="text" icon={<MoreOutlined />} />
                    </Popover>
                  </Space>
                )}
              </div>
            );
          }
        }}
      />
      <AlwaysScrollToBottom />
    </div>
  );
};

export default Messages;
