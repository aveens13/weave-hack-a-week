import React from "react";
import { Input } from "antd";

const { TextArea } = Input;
export default function Textarea({ project, onChange }) {
  function changeAction(event) {
    onChange(event.target.value);
  }
  return (
    <>
      <TextArea showCount maxLength={100} onChange={changeAction} />
    </>
  );
}
