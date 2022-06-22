import React, { useState } from "react";
import "./TaskItem.css";
import PropTypes from "prop-types";

export default function TaskItem({
  id,
  title,
  TaskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const editTitle = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, TaskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };
  const onStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };
  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={editTitle}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select onChange={onStateChange} value={TaskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

TaskItem.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  TaskState: PropTypes.string.isRequired
};
