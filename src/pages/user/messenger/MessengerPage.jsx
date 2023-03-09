import React, { Component } from 'react';

import { connect } from 'react-redux';
import { MessengerSideBar } from '../../../components/messenger/MessengerSideBar';
import { MessengerContent } from './MessengerContent';

class MessengerPage extends Component {
  componentDidMount = () => {
    const { user } = this.props;
    document.title = `Hội thoại | ${user.name}`;
  };

  render() {
    const { chat, roomId } = this.props;
    return (
      <div id="frame">
        <MessengerSideBar></MessengerSideBar>
        {chat.currentRoom ? (
          <MessengerContent
            content={chat[roomId]}
            key={roomId}
          ></MessengerContent>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roomId: state.chat.roomId,
  chat: state.chat,
  user: state.user.data,
});

const connectedMessengerPage = connect(mapStateToProps)(MessengerPage);
export { connectedMessengerPage as default };
