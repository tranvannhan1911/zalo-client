import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/apis';
const { Option } = Select;


const FriendSelect = ({placeholder, value, setValue, open}) => {
  const [data, setdata] = useState([])
  const [dataOption, setdataOption] = useState([])

  useEffect(() => {
    console.log("value", value);
  }, [value])

  const handleData = async () => {
     
    const res = await api.friend.list()
    console.log(res)
    if(res.status == 200){
      setdata(res.data)
      
      const _children = []
      for (let i = 0; i < res.data.length; i++) {
        _children.push(<Option {...res.data[i]} key={res.data[i]._id}>{res.data[i].name}</Option>);
      }

      setdataOption(_children)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    console.log("open", open)
  }, [open])

  return (
    <Select
      mode="multiple"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder={placeholder ? placeholder : "Chọn bạn bè"}
      onChange={setValue}
      value={value}
      fil
    >
      {dataOption}
    </Select>
  )
};
export default FriendSelect;