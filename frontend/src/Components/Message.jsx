import React from "react";

const Message = ({ message, show }) => {
  return (
    
    <div className="notification">
      <div className={`notification__content ${show}`}>
        <div className="fas fa-check-circle"></div>
        <div className="notification__msg">{message}</div>
      </div>
    </div>
  );
};

export default Message;

