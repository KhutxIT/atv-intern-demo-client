import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import UserService from '../../services/UserService';
import { updateUser } from '../../store/action/userAction';
import ProfilePictureForm from '../profilepicture/ProfilePictureForm2';
import './eppStyle.scss';

function ImageCropModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      size="small"
      trigger={
        <Button size="big" content="Cập nhật ảnh đại diện" primary fluid />
      }
    >
      <Modal.Header icon="archive">Chọn ảnh đại diện</Modal.Header>
      <Modal.Content>
        <ProfilePictureForm />
      </Modal.Content>
    </Modal>
  );
}

function EditPersonalProfileModal(props) {
  const user = useSelector(({ user }) => user);
  const [state, setState] = useState({
    name: '',
    username: '',
    bio: '',
    isDisabled: true,
  });
  const { updaingUser, hasError } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getPersonalData()
      .then((res) => {
        const { name, username, bio } = res.data?.data;
        setState({ name, username, bio, isDisabled: true });
      })
      .catch(({ response }) => console.log(response.data));
  }, []);

  const handleChange = (e, { name, value }) => {
    setState({ ...state, isDisabled: false, [name]: value });
  };

  const handleSubmit = () => {
    let userUpdate =
      state.username === user.data.username
        ? { ...user.data, ...state }
        : { ...user.data, ...state, newUsername: state.username };
    dispatch(updateUser(userUpdate));
    setState({
      name: user.data.name,
      username: user.data.username,
      bio: user.data.bio,
      isDisabled: true,
    });
  };

  return (
    <Modal
      className="epp-modal"
      closeIcon
      trigger={props.children}
      style={{ color: 'reda' }}
      size="small"
    >
      <Modal.Header>Chỉnh sửa thông tin cá nhân</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {hasError ? (
            <Message negative>
              <p>{hasError}</p>
            </Message>
          ) : null}
          <Form
            size="huge"
            name="form"
            onSubmit={handleSubmit}
            loading={updaingUser ? true : false}
          >
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Họ tên"
                placeholder="Họ tên"
                type="text"
                name="name"
                onChange={handleChange}
                value={state.name}
              />
              <Form.Input
                fluid
                label="Tên đăng nhập"
                placeholder="Tên đăng nhập"
                type="text"
                name="username"
                onChange={handleChange}
                value={state.username}
              />
            </Form.Group>
            <Form.TextArea
              style={{ minHeight: 100, maxHeight: 100 }}
              label="Mô tả cá nhân"
              placeholder="Cho mọi người hiểu thêm về bạn..."
              type="text"
              name="bio"
              onChange={handleChange}
              value={state.bio}
            />
            <Button
              style={{ marginBottom: '1%' }}
              size="big"
              content="Cập nhật thông tin"
              disabled={state.isDisabled}
              primary
              fluid
            />
          </Form>
          <ImageCropModal />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default EditPersonalProfileModal;
