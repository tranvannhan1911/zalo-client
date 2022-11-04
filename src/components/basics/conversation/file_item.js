import { Button } from "antd"
import {
    DownloadOutlined
  } from "@ant-design/icons";
import { truncate_middle } from "../../../utils/utils";

const FileItem = ({item}) => {

    const arr = item?.content.split("/")
    const name = arr[arr.length-1]
    return (
        <Button
          type="text"
          href={item?.content}
          target="blank"
          icon={<DownloadOutlined />}
          style={{width: '100%'}}
        >
          {" "+truncate_middle(name, 20, 10)}
          
        </Button>
    )
}

export default FileItem