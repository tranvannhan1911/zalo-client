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

import socketIOClient from "socket.io-client";

import Cookies from "js-cookie"
import NavSearch from '../../components/core/navsearch.js/navsearch';
import api from '../../utils/apis';
import { deleteMessage } from '../../controller/message';

const host = process.env.REACT_APP_BASE_URL;
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
  const [hasListen, setHasListen] = useState({});
  var oneTime = true;

  const socketRef = useRef();

  useEffect(() => {
    console.log("info", userId)
    if (oneTime) {
      oneTime = false
      socketRef.current = socketIOClient.connect(host, { query: `access=${Cookies.get("access")}` })
      // 

      socketRef.current.on('connect', function () {
        console.log("socketRef.current", socketRef.current, socketRef.current.id)

        // socketRef.current.join(userId)
        socketRef.current.on("create-group-conversation", conversationId => {
          console.log("create-group-conversation", conversationId)
          console.log("conversations", conversations)
          handleDataOneConversation(conversationId)
        })

        // listen response all
        socketRef.current.on(userId, data => {
          console.log("socketRef.current.on userId", data)

          if (data.conversations) {
            const _convs = [...data.conversations]
            _convs.map(conv => {
              conv.key = conv._id
              conv.count_seen = 0; // tmp
              return conv;
            })
            setConversations(_convs)
          }
        })

        // listen delete message
        // socketRef.current.on("delete-message", data => {
        //   console.log("delete-message", data)
        //   deleteMessage(data);
        // })

        

        // socketRef.current.emit('get-conversations')
      });
      // return () => {
      //   socketRef.current.close();
      //  }
    }
  }, []);

  useEffect(() => {
    if(socketRef.current){
      
      socketRef.current.on("delete-message", data => {
        console.log("delete-message", data)
        deleteMessage(data);
      })
    }
  }, socketRef)

  const sort = (_convs, next) => {
    console.log("moveToTop", _convs)
    _convs.sort(function(x,y){ 
      var dx = Date.parse(x.updatedAt)
      var dy = Date.parse(y.updatedAt)
      return dy-dx
    });
    console.log("SORTTTTTTTTTTTTTTTTTTTTTT")
    // setConversations(_convs)
    // if(next)
    //   next()
    return _convs
  }

  const getConv = (conversationId) => {
    for(var i = 0; i<conversations.length; i++){
      if(conversations[i]._id == conversationId)
        return conversations[i];
    }
    return null;
  }

  const countNotSeen = (conversationId) => {
    const conv = getConv(conversationId);
    var count = 0;
    for(var i=conv.messages; i>=0; i--){
      if(conv.messages[i]._id == conv.lastMessageId._id){
        break;
      }
      count++;
    }
  }

  const handleDataOneConversation = async (conversationId) => {
    try{
      const res = await api.conversation.get(conversationId)
      // console.log("new conversation", res)
      if(res.status == 200){
        newConversation(res)
      }
    }catch{

    }
  }

  const newConversation = async (res) => {
    const conv = res.data
    conv.key = conv._id
    conv.count_seen = 1
    conv.messages.forEach(msg => {
      if(msg._id == conv.lastMessageId){
        conv.lastMessageId = msg
      }
    })

    console.log("conversations", conversations)
    var _convs = [...conversations]
    console.log("new conversation", _convs)
    _convs.push(conv)
    console.log("new conversation", _convs)
    _convs = sort(_convs)
    setConversations(_convs)
  }

  const newMessage = async (data) => {
    // if(data.message.userId == info.user)
    console.log("newMessage", data, userId, data.message.senderId != userId)
    console.log("conversations", conversations)

    var _convs = [...conversations]
    _convs.map(conv => {
      if (conv._id == data.message.conversationId) {
        conv.messages.push(data.message)
        conv.lastMessageId = data.message;
        conv.updatedAt = data.message.updatedAt
      }
    })
    sort(_convs)
    setConversations(_convs)
    if(data.message.senderId != userId)
        plusCountSeen(data.message.conversationId)
  }

  const deleteMessage = (data) => {
    // if(data.message.userId == info.user)
    console.log("deleteMessage", data, userId)
    console.log("conversations", conversations)

    var _convs = [...conversations]
    _convs.map(conv => {
      if (conv._id == data.message.conversationId) {
        conv.messages.map(msg => {
          if(msg._id == data.message._id){
            msg.isDeleted = true;
          }
          return msg
        })
        conv.lastMessageId = data.message;
        conv.updatedAt = data.message.updatedAt
      }
    })
    sort(_convs)
    setConversations(_convs)
    if(data.message.senderId != userId)
        plusCountSeen(data.message.conversationId)
  }

  useEffect(() => {
    if (conversations) {
      
      console.log("conversations change", conversations)
      const _hasListen = { ...hasListen }
      conversations.forEach(conv => {
        if (!_hasListen[conv._id]) {
          _hasListen[conv._id] = true
          console.log("listen conversation", conv._id, conv.name)
          console.log(conversations)
          socketRef.current.on(conv._id, data => {
            if (data.type == "new-message") {
              newMessage(data)
            }
          })

          // socketRef.current.on("delete-message", data => {
          //   console.log("delete-message", data)
          // })
        }
      })
      setHasListen(_hasListen)
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
      updateCountSeen(currentConv._id, 0)
    }

  }, [currentConv])

  const sendMessage = (message) => {
    socketRef.current.emit('send-message', {
      message: {
        content: message,
        type: "TEXT",
        conversationId: currentConv._id
      }
    }
    )
  }

  
  const plusCountSeen = (conversationId) => {
    const conv = getConv(conversationId)
    console.log("plusCountSeen", conv)
    updateCountSeen(conversationId, conv.count_seen+1)
  }

  const updateCountSeen = (conversationId, count) => {
    const convs = [...conversations];
    convs.map(conv => {
      if(conv._id == conversationId){
        conv.count_seen = count
      }
      return conv
    })
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
            <NavSearch {...props}/>
          :
            <Conversations
              style={{
                width: '300px',
              }}
              {...props}
              conversations={conversations}
              currentConv={currentConv}
              setCurrentConv={setCurrentConv}
              updateCountSeen={updateCountSeen} /> 
        }
        
        </Col>
        <Col span={18} style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        }}>
        <div>
            <Header currentConv={currentConv}/>
            <Messages
              messages={messages}
              setMessages={setMessages} />
        </div>
        <MessageSection sendMessage={sendMessage} />
        </Col>
    </Row>
  );
};

export default ConversationPage;
