import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from "./upload";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";

const SimpleUpload = () => {
  return <Upload action="https://jsonplaceholder.typicode.com/posts/" onProgress={action("progress")} onSuccess={action("onSuccess")} onError={action("onError")}></Upload>;
};

// const filePromise = (file: File) => {
//   const newFile = new File([file], "new_name.docx", { type: file.type });
//   return Promise.resolve(newFile);
// };

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too big");
    return false;
  }
  return true;
};

const SimpleUpload2 = () => {
  return <Upload action="https://jsonplaceholder.typicode.com/posts/" onChange={action("changed")} beforeUpload={checkFileSize}></Upload>;
};

const defaultFileList: UploadFile[] = [
  { uid: "123", size: 1234, name: "hello.md", status: "uploading", percent: 30 },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 }
];

const SimpleUpload3 = () => {
  return <Upload action="https://jsonplaceholder.typicode.com/posts/" onChange={action("changed")} defaultFileList={defaultFileList} onRemove={action("removed")}></Upload>;
};
const SimpleUpload4 = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts/" onChange={action("changed")} defaultFileList={defaultFileList} onRemove={action("removed")} drag>
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf("Upload component", module).add("基础的Upload", SimpleUpload).add("提供检查size的Upload", SimpleUpload2).add("展示状态的Upload", SimpleUpload3).add("可拖拽上传Upload", SimpleUpload4);
