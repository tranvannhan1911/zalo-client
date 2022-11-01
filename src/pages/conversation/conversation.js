import { Col, Layout, Row } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd';
import Header from '../../components/core/header';
import SideNav from '../../components/core/sidenav';
import Conversations from '../../components/core/conversation/conversations';
import { Content } from 'antd/lib/layout/layout';
import Messages from '../../components/core/messages';
import MessageSection from '../../components/core/message_section';


import Cookies from "js-cookie"
import NavSearch from '../../components/core/navsearch.js/navsearch';
import api from '../../utils/apis';
import { deleteMessage } from '../../controller/message';
import socket from '../../socket/socket'
import { newMessageHandler } from '../../socket/conversation_handler'
import store, { setStoreCurentConv } from '../../store/store';
import ConversationInfoModal from '../../components/basics/conversation/info_group_modal';

const { Sider } = Layout;


const ConversationPage = (props) => {
  //   const accountApi = new AccountApi();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  //   const [hasPerms, setHasPerms] = useState(false);
  const [hasPerms, setHasPerms] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentConv, setCurrentConv] = useState();
  const userId = Cookies.get("_id")
  var oneTime = true;
  const convRef = useRef(conversations)

  useEffect(() => {
    convRef.current = conversations
  })

  useEffect(() => {
    if (oneTime) {
      oneTime = false
      getListConversation()

      socket.on("new-message", (message) => {
        // console.log("new-message.............", message)
        newMessage(convRef.current, setConversations, message)
      })

      socket.on("create-group-conversation", conversationId => {
        newConversation(convRef.current, setConversations, conversationId)
      })

      socket.on("delete-message", data => {
        // console.log("delete-message", data)
        deleteMessage(convRef.current, setConversations, data);
      })

      socket.on("rename-conversation", (id, name, saveMessage) => {
        // console.log("delete-message", data)
        renameConversation(convRef.current, setConversations, id, name, saveMessage);
      })
    }

    store.subscribe(() => {
      console.log("store.subscribe asaasdasad", store.getState().currentConv.info)
      const _info = { ...store.getState().currentConv.info }
      console.log("_info", _info)
      setCurrentConv(_info)
    })
  }, [])

  const getListConversation = async () => {
    const res = await api.conversation.list()
    console.log("getListConversation", res)
    const _convs = [...res.data]
    _convs.map(conv => {
      conv.key = conv._id
      conv.count_seen = 0; // tmp
      return conv;
    })
    setConversations(_convs)
    setCurrentConv(store.getState().currentConv.info)
    return
  }

  // useEffect(() => {
  //   if(socketRef.current){

  //     socketRef.current.on("delete-message", data => {
  //       console.log("delete-message", data)
  //       deleteMessage(data);
  //     })
  //   }
  // }, socketRef)

  const sort = (_convs, next) => {
    _convs.sort(function (x, y) {
      var dx = Date.parse(x.updatedAt)
      var dy = Date.parse(y.updatedAt)
      return dy - dx
    });
    return _convs
  }

  const getConv = (conversations, conversationId) => {
    for (var i = 0; i < conversations.length; i++) {
      if (conversations[i]._id == conversationId)
        return conversations[i];
    }
    return null;
  }

  const countNotSeen = (conversationId) => {
    const conv = getConv(conversationId);
    var count = 0;
    for (var i = conv.messages; i >= 0; i--) {
      if (conv.messages[i]._id == conv.lastMessageId._id) {
        break;
      }
      count++;
    }
  }

  const newConversation = async (conversations, setConversations, conversationId) => {
    try {
      const res = await api.conversation.get(conversationId)
      // console.log("new conversation", res)
      const conv = res.data
      conv.key = conv._id
      conv.count_seen = 1
      conv.messages.forEach(msg => {
        if (msg._id == conv.lastMessageId) {
          conv.lastMessageId = msg
        }
      })

      console.log("conversations", conversations)
      var _convs = [...conversations]
      _convs.push(conv)
      _convs = sort(_convs)
      setConversations(_convs)

      socket.emit("join-conversation", { conversationId })
    } catch {

    }
  }

  const newMessage = async (conversations, setConversations, data) => {
    // if(data.message.userId == info.user)
    console.log("newMessage", data, userId)
    console.log("conversations", convRef.current)

    var _convs = [...conversations]
    _convs.map(conv => {
      if (conv._id == data.message.conversationId) {
        conv.messages.push(data.message)
        conv.lastMessageId = data.message;
        conv.updatedAt = data.message.updatedAt
      }
    })
    sort(_convs)
    console.log("after sort", _convs)
    setConversations(_convs)
    if (data.message.senderId._id != userId)
      plusCountSeen(_convs, setConversations, data.message.conversationId)
  }

  const deleteMessage = (conversations, setConversations, data) => {
    // if(data.message.userId == info.user)
    console.log("deleteMessage", data, userId)
    console.log("conversations", conversations)

    var _convs = [...conversations]
    _convs.map(conv => {
      if (conv._id == data.message.conversationId) {
        conv.messages.map(msg => {
          if (msg._id == data.message._id) {
            msg.isDeleted = true;
          }
          return msg
        })
      }
    })
    sort(_convs)
    setConversations(_convs)
    // if(data.message.senderId != userId)
    //     plusCountSeen(_convs, setConversations, data.message.conversationId)
  }

  const renameConversation = async (conversations, setConversations, id, name, saveMessage) => {
    const _conversations = [...conversations]
    _conversations.map(conv => {
      if(conv._id == id){
        conv.name = name
      }
    })
    setConversations(_conversations)
  }

  useEffect(() => {
    if (conversations) {

      console.log("conversations change", conversations)
      // const _hasListen = { ...hasListen }
      // conversations.forEach(conv => {
      //   if (!_hasListen[conv._id]) {
      //     _hasListen[conv._id] = true
      //     console.log("listen conversation", conv._id, conv.name)
      //     console.log(conversations)
      //     socketRef.current.on(conv._id, data => {
      //       if (data.type == "new-message") {
      //         newMessage(data)
      //       }
      //     })

      //     // socketRef.current.on("delete-message", data => {
      //     //   console.log("delete-message", data)
      //     // })
      //   }
      // })
      // setHasListen(_hasListen)
    }
  }, [conversations])

  useEffect(() => {
    console.log("currentConv", currentConv)

    if (currentConv) {
      conversations.forEach(conv => {
        if (conv._id == currentConv._id) {
          setMessages(conv.messages)
        }
      })
      updateCountSeen(convRef.current, setConversations, currentConv._id, 0)
    } else {
      setMessages([])
    }

  }, [currentConv])

  const sendMessage = async (message) => {
    const params = {
      content: message,
      type: 'TEXT',
      conversationId: currentConv._id
    }
    const res = await api.message.addMessageText(params)
    // console.log("sendMessage", res)
    // // socketRef.current.emit('send-message', {
    // //   message: {
    // //     content: message,
    // //     type: "TEXT",
    // //     conversationId: currentConv._id
    // //   }
    // // }
    // // )
  }


  const plusCountSeen = (conversations, setConversations, conversationId) => {
    const conv = getConv(conversations, conversationId)
    console.log("plusCountSeen", conv, conversations)
    updateCountSeen(conversations, setConversations, conversationId, conv.count_seen + 1)
  }

  const updateCountSeen = (conversations, setConversations, conversationId, count) => {
    const convs = [...conversations];
    convs.map(conv => {
      if (conv._id == conversationId) {
        conv.count_seen = count
      }
      return conv
    })
    setConversations(convs)
  }

  const onLeaveGroup = (conv) => {
    const _convs = [...convRef.current]
    var idx;
    console.log("onLeaveGroup", _convs)
    for (var i = 0; i < _convs.length; i++) {
      if (_convs[i]._id == conv._id) {
        idx = i
        break
      }
    }
    _convs.splice(idx, 1)
    setConversations(_convs)
    setCurrentConv(null)
  }

  return (
    <Row style={{ height: "100vh" }}>
      <Col span={6} style={{
        borderRight: '1px solid #ddd',
        height: "100vh"
      }}>
        {
          props.showSearchingList
            ?
            <NavSearch {...props} />
            :
            <Conversations
              style={{
                width: '300px',
              }}
              {...props}
              conversations={conversations}
              currentConv={currentConv}
              setCurrentConv={setCurrentConv}
              updateCountSeen={updateCountSeen}
              onLeaveGroup={onLeaveGroup}
              />
        }

      </Col>
      <Col span={18} style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <Header currentConv={currentConv} />
          <Messages
            messages={messages}
            setMessages={setMessages} />
        </div>
        <MessageSection sendMessage={sendMessage} currentConv={currentConv} />
      </Col>
    </Row>
  );
};

export default ConversationPage;
