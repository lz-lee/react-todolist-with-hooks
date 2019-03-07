import React from "react";

export default function ToDoFooter({ done, total }) {
  return (
    <div className="footer">
      {done} 已完成 ／ 共 {total} 个
    </div>
  );
}
