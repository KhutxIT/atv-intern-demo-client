import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chatActions } from '../../../store/action/chatAction';
import { Dimmer, Loader, Button, Popup, Label } from 'semantic-ui-react';
import { animateScroll } from 'react-scroll';
// import 'emoji-mart/css/emoji-mart.css';
import MessengerMessages from './MessengerMessages';
import { MessengerInput } from './MessengerInput';

class MessengerContent extends Component {
  constructor() {
    super();

    this.messagesContainer = React.createRef();
  }

  componentDidMount = () => {
    const { dispatch, currentRoom, roomId, userId, content } = this.props;

    if (!content.messages.length) {
      dispatch(
        chatActions.getMessagesForRoom({ ...currentRoom, initialFetch: true }),
      );
    } else {
      const messageIds = content.messages
        .filter((message) => message.receiver === userId && !message.read)
        .map((message) => message._id);
      if (messageIds.length) {
        dispatch(chatActions.readMessages({ messageIds, roomId }));
      }
    }

    this.handleScrollToBottom();
  };

  componentDidUpdate = () => {
    const { dispatch, roomId, content, userId } = this.props;
    const messageIds = content.messages
      .filter((message) => message.receiver === userId && !message.read)
      .map((message) => message._id);
    if (messageIds.length) {
      dispatch(chatActions.readMessages({ messageIds, roomId }));
    }
    this.scrollToBottom();
  };

  scrollToBottom() {
    //console.log(this.messagesContainer.current.scrollHeight);

    if (
      this.messagesContainer.current.scrollHeight -
        this.messagesContainer.current.scrollTop -
        this.messagesContainer.current.clientHeight <
      350
    ) {
      animateScroll.scrollToBottom({
        containerId: 'ContainerElementID',
        duration: 200,
        delay: 0,
      });
    }
  }

  handleScrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'ContainerElementID',
      duration: 500,
      delay: 0,
    });
  };

  fetchMessages = () => {
    const { dispatch, currentRoom, content } = this.props;
    const lastId = content.messages[0]._id;
    dispatch(
      chatActions.getMessagesForRoom({
        ...currentRoom,
        lastId,
        initialFetch: false,
      }),
    );
  };

  render() {
    const { currentRoom, content, userId, profilePicture } = this.props;

    const loadedMessages = currentRoom.messages - content.messages.length;
    const messages = content.messages.map((message) => (
      <MessengerMessages
        key={message._id || message.uuid}
        currentRoom={currentRoom}
        message={message}
        userId={userId}
        profilePicture={profilePicture}
      ></MessengerMessages>
    ));

    return (
      <div className="content">
        {content.initialMessagesFetchig ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : null}
        <div className="contact-profile">
          <img src={`${currentRoom.user.profilePicture}`} alt="" />
          <p>{currentRoom.user.username}</p>
          <div className="social-media">
            <Popup
              content="Kéo xuống tin nhắn mới nhất."
              trigger={
                <i
                  onClick={this.handleScrollToBottom}
                  className="fa fa-arrow-down"
                  aria-hidden="true"
                ></i>
              }
            />

            {/* <Label basic color="red" pointing="left">
              This isn't working.
            </Label> */}
          </div>
        </div>
        <div
          className="messages"
          id="ContainerElementID"
          ref={this.messagesContainer}
        >
          {loadedMessages ? (
            <Button
              fluid
              disabled={content.messageFetching}
              loading={content.messageFetching}
              onClick={this.fetchMessages}
            >
              Xem thêm {currentRoom.messages - content.messages.length} tin nhắn nữa
            </Button>
          ) : null}

          <ul>
            {messages}
            {content.isTyping ? (
              <li className="sent" key={currentRoom.user._id}>
                <img src={`${currentRoom.user.profilePicture}`} alt="" />
                <p>đang nhập tin nhắn...</p>
              </li>
            ) : null}
          </ul>
        </div>
        <MessengerInput />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.data._id,
  profilePicture: state.user.data.profilePicture,
  callingModal: state.chat.callingModal,
  socket: state.socket.socket,
  currentRoom: state.chat.currentRoom,
  roomId: state.chat.roomId,
});

const connectedMessengerContent = connect(mapStateToProps)(MessengerContent);
export { connectedMessengerContent as MessengerContent };
