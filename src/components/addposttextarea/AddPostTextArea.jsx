import { Fragment, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import UserService from '../../services/UserService';
import postActions, { postActionType } from '../../store/action/postAction';
import { base64StringtoFile } from '../../utils/ReusableUtil';
import { debounce } from 'throttle-debounce';

function AddPostTextArea() {
  const [value, setValue] = useState('');
  const [part, setPart] = useState('');
  const [suggestions, setSuggetions] = useState([]);
  const post = useSelector(({ postUpload }) => postUpload);
  const dispatch = useDispatch();

  const handleChange = (value) => setValue(value);

  const handleSubmit = () => {
    const { imgSrcExt, cropImgSrc, divs } = post;
    const imageData64 = cropImgSrc;
    const myFilename = 'image.' + imgSrcExt;
    const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
    const fd = new FormData();
    fd.append('file', myNewCroppedFile, myNewCroppedFile.name);
    fd.append('description', value);
    fd.append('tags', JSON.stringify(divs));

    dispatch(postActions.addPost(fd));
    dispatch({ type: postActionType.RESET_IMAGE });
  };

  // text in input is "I want @ap"
  const handleRequestOptions = (newPart) => {
    setPart(newPart);
    // console.log(part); // -> "ap", which is part after trigger "@"
    if (newPart !== '') {
      UserService.searchUserByUsername(newPart)
        .then((response) => {
          setSuggetions(response.data?.data?.map((user) => user.username));
        })
        .catch(({ response }) => console.log(response.data));
    }
  };
  let debouncedRequestOptions = debounce(500, handleRequestOptions);

  return (
    <Fragment>
      <Form size="big" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Mô tả</label>
          <TextInput
            maxOptions={8}
            offsetY={20}
            minChars={1}
            value={value}
            onRequestOptions={debouncedRequestOptions}
            options={suggestions}
            onChange={handleChange}
            placeholder="Mô tả"
            type="textarea"
            name="description"
            style={{ minHeight: 100, maxHeight: 100 }}
          />
        </Form.Field>

        <Button primary fluid size="big">
          Đăng bài viết
        </Button>
      </Form>
    </Fragment>
  );
}

export default AddPostTextArea;
