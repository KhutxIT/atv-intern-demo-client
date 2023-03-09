import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chatActions } from '../../store/action/chatAction';

class MessengerSideBar extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(chatActions.getChatRooms());
  };

  changeRoom = (room) => {
    const { dispatch } = this.props;
    dispatch(chatActions.changeRoom(room));
  };
  //room.members.filter(member => member._id !== user.data._id);
  handleSearch = (e) => {
    const {
      dispatch,
      rooms,
      user: { data },
    } = this.props;
    const users = rooms.filter((room) => {
      const user = room.members.filter((member) => member._id !== data._id);
      if (
        user[0].username
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        return room;
      }
      return null;
    });
    dispatch(chatActions.searchUsers(users));
  };

  render() {
    const { user, rooms, searchedRooms, roomId } = this.props;
    let renderRooms = searchedRooms ? searchedRooms : rooms;
    const usersList = renderRooms.map((room) => {
      const member = room.members.filter(
        (member) => member._id !== user.data._id,
      );
      let message = '...';
      if (room.lastMessage[0] && room.lastMessage[0].sender === user.data._id) {
        if (room.lastMessage[0].messageType === 'text') {
          message = 'Bạn: ' + room.lastMessage[0].text;
        } else {
          message = 'Bạn đã gửi ảnh ';
        }
      } else if (room.lastMessage[0]) {
        if (room.lastMessage[0].messageType === 'text') {
          message = room.lastMessage[0].text;
        } else {
          message = 'Ảnh ';
        }
      }
      return (
        <li
          className={room._id === roomId ? 'contact active' : 'contact'}
          key={room._id}
          onClick={() => this.changeRoom({ ...room, user: { ...member[0] } })}
        >
          <div className="wrap">
            <span
              className={`contact-status ${member[0].activityStatus}`}
            ></span>
            <img
              src={`${member[0].profilePicture}`}
              alt=""
            />
            <div className="meta">
              <p className="name">
                {member[0].username}
              </p>
              <p className="preview">{message}</p>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img
              id="profile-img"
              src={`${user.data.profilePicture}`}
              className="online"
              alt=""
            />
            <p>{user.data.name}</p>
            <i
              className="fa fa-chevron-down expand-button"
              aria-hidden="true"
            ></i>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle"></span>
                  <p>Online</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle"></span>
                  <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            onChange={this.handleSearch}
          />
        </div>
        <div id="contacts">
          <ul>{usersList.length ? usersList : 'Không có bạn bè'}</ul>
        </div>
        {/* <div id="bottom-bar">
          <button id="addcontact">
            <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
            <span>Add contact</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
            <span>Settings</span>
          </button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  rooms: state.chat.rooms,
  searchedRooms: state.chat.searchedRooms,
  roomId: state.chat.roomId,
});

const connectedMessengerSideBar = connect(mapStateToProps)(MessengerSideBar);
export { connectedMessengerSideBar as MessengerSideBar };
