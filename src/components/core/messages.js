import { Avatar, List } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useRef } from 'react';
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

const Messages = (props) => {

    const userId = Cookies.get("_id")
    const refMessages = useRef()
    
    useEffect(() => {
        // console.log("props.messages", props.messages)
        // refMessages.current?.scrollToBottom({ behavior: 'smooth' })
    }, [props.messages])

    return (
        <div style={{
                padding: '10px',
                overflow: 'auto',
                height: '490px'
            }}
            ref={refMessages}>
            <List
                itemLayout="horizontal"
                dataSource={props.messages}
                renderItem={(item) => {
                    if(item.type == "NOTIFY"){
                        return (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    color: '#a3a3a3'
                                }}>{item.content}</div>
                        )
                    }else{
                        const direction = item.userId == userId ? 'row-reverse' : 'row'
                        return (
                            <div style={{
                                display: 'flex',
                                flexDirection: `${direction}`,
                                marginBottom: '10px'
                            }}>
                                {item.userId == userId ? null :
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                }
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    margin: '0 10px'
                                }}>{item.content}</div>
                            </div>
                        )
                    }
                    
                    
                }}
            />
            <AlwaysScrollToBottom />
        </div>
    )
};

export default Messages;