import { Select } from 'antd';
import React from 'react';
const { Option } = Select;
const initialData = ["Trần Văn Nhân", "Thái Thị Hiền", "Lê Đình Bút", "Phan Đình Phương"];
const children = [];

for (let i = 0; i < initialData.length; i++) {
  children.push(<Option key={i}>{initialData[i]}</Option>);
}

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const UserSelect = ({placeholder}) => (
  <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    placeholder={placeholder ? placeholder : "Chọn bạn bè"}
    onChange={handleChange}
    
  >
    {children}
  </Select>
);
export default UserSelect;