import img1 from "../../../../assets/avatars/4.png";
import { useState, useEffect } from "react";

export default function Message(props) {
  // const [sender, setSender] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/getuserinfo/${props.message.userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSender(data.name);
  //     });
  // }, [!props.message.sender]);

  return (
    <div className="message-body">
      <div className="name-info">
        <img src={img1} alt="" />
        {props.message.sender ? (
          <p>{props.message.sender}</p>
        ) : (
          <p>{props.message.author.name}</p>
        )}
        <p className="grey">30 min ago</p>
      </div>
      <div className="message">{props.message.text}</div>
    </div>
  );
}
