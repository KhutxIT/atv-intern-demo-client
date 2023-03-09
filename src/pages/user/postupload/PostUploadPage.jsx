import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import AddPostTextArea from '../../../components/addposttextarea/AddPostTextArea';
import PostForm from '../../../components/post/PostForm';
import './style.scss'

export default function PostUploadPage() {
  document.title = 'Đăng bài viết';
  const { success } = useSelector(({ postUpload }) => postUpload);
  const history = useHistory();
  if (success) {
    window.location.replace('/personal');
    return;
  }

  return (
    <div className="post_upload_container">
      <PostForm />

      <div>
        {/* <Message size="large" color="blue">
          Nhập @ để gắn thẻ vào bạn bè
        </Message> */}
        <AddPostTextArea />
      </div>
    </div>
  );
}
