import { List, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/apis';
import MemberItem from './meber_item';
const onChange = (key) => {
  console.log(key);
};
const MemberGroupTab = ({data}) => {
  const [dataUser, setDataUser] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);


  const handleData = async () => {
      const res = await api.conversation.list_member(data._id)
      console.log(res)
      if (res.status == 200) {
          setDataUser(res.data)
      }
  }

  useEffect(() => {
    handleData()
  }, [])

  const TabMember = () => {
    return (
      <>
        <List
          dataSource={dataUser}
          renderItem={(item) => (
              <List.Item>
                  <MemberItem item={item} type="member" />
              </List.Item>
          )}
      />
      </>
    )
  }

  const TabAdmin = () => {
    return (
      <>
        <List
          dataSource={dataUser}
          renderItem={(item) => (
              <List.Item>
                  <MemberItem item={item} type="admin" />
              </List.Item>
          )}
      />
      </>
    )
  }


  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: `Thành viên`,
          key: '1',
          children: <TabMember />,
        },
        {
          label: `Admin`,
          key: '2',
          children: <TabAdmin />,
        }
      ]}
    />
  )
};
export default MemberGroupTab;