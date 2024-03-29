import React from "react";
import { Popup } from "semantic-ui-react";
import Linkify from "linkifyjs/react";
import * as linkify from "linkifyjs";
import hashtag from "linkifyjs/plugins/hashtag";
import mention from "linkifyjs/plugins/mention";
import { convertDateToFromNow } from "../../../utils";

hashtag(linkify);
mention(linkify);

const linkifyOptions = {
  formatHref: function (href, type) {
    if (type === "hashtag") {
      href = "/hashtags/" + href.substring(1);
    }
    if (type === "mention") {
      href = "/" + href.substring(1);
    }
    return href;
  },
  attributes: {
    target: {
      url: "_blank",
    },
  },
};

function ShowImage({ show, image }) {
  return show ? (
    <img src={`${image}`} alt="" />
  ) : (
    <div></div>
  );
}

const MessengerMessages = ({
  message,
  userId,
  profilePicture,
  currentRoom,
}) => {
  if (message.sender === userId) {
    if (message.sent === false) {
      return (
        <li className="replies" key={message.uuid}>
          <ShowImage image={profilePicture} show={message.picture}></ShowImage>
          <p
            style={{
              backgroundColor: "#f5f5f5",
              color: "black",
              border: "1px solid grey",
              wordWrap: "break-word",
            }}
          >
            <Linkify options={linkifyOptions}>{message.value}</Linkify>
          </p>
        </li>
      );
    }
    if (message.messageType === "text") {
      return (
        <li className="replies">
          <ShowImage image={profilePicture} show={message.picture}></ShowImage>
          <Popup
            content={
              convertDateToFromNow(message.createdAt)
            }
            trigger={
              <p>
                <Linkify options={linkifyOptions}>{message.text}</Linkify>
              </p>
            }
          />
        </li>
      );
    } else {
      return (
        <li className="replies">
          <ShowImage image={profilePicture} show={message.picture}></ShowImage>
          <Popup
            content={
              convertDateToFromNow()
            }
            trigger={
              <img
                style={{
                  borderRadius: "3%",
                  objectFit: "cover",
                  width: "40%",
                  height: "20%",
                }}
                src={`${message.photo}`}
                alt=""
              />
            }
          />
        </li>
      );
    }
  } else {
    if (message.sent === false) {
      return (
        <li className="sent" key={message.uuid}>
          <ShowImage
            image={currentRoom.user.profilePicture}
            show={message.picture}
          ></ShowImage>
          <p
            style={{
              backgroundColor: "#f5f5f5",
              color: "black",
              border: "1px solid grey",
              wordWrap: "break-word",
            }}
          >
            <Linkify options={linkifyOptions}>{message.value}</Linkify>
          </p>
        </li>
      );
    }
    if (message.messageType === "text") {
      return (
        <li className="sent">
          <ShowImage
            image={currentRoom.user.profilePicture}
            show={message.picture}
          ></ShowImage>

          <Popup
            content={
              convertDateToFromNow()
            }
            trigger={
              <p>
                {" "}
                <Linkify options={linkifyOptions}>{message.text}</Linkify>
              </p>
            }
          />
        </li>
      );
    } else {
      return (
        <li className="sent">
          <ShowImage
            image={currentRoom.user.profilePicture}
            show={message.picture}
          ></ShowImage>
          <Popup
            content={
              convertDateToFromNow()
            }
            trigger={
              <img
                style={{
                  borderRadius: "3%",
                  objectFit: "cover",
                  width: "40%",
                  height: "20%",
                }}
                src={`${message.photo}`}
                alt=""
              />
            }
          />
        </li>
      );
    }
  }
};

export default MessengerMessages;
