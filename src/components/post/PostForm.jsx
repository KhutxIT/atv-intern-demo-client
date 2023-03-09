import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../../utils/notification';
import postActions, { postActionType } from '../../store/action/postAction';
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
} from '../../utils/ReusableUtil';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from 'semantic-ui-react';

const imageMaxSize = 10485760; // bytes 10MB
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {
  return item.trim();
});

function PostForm() {
  let imagePreviewCanvasRef = useRef(null);
  let fileInputRef = useRef(null);
  const [state, setState] = useState({ crop: { aspect: 1 } });
  const dispatch = useDispatch();
  const post = useSelector(({ postUpload }) => postUpload);

  useEffect(() => {
    dispatch(postActions.canvasHasValue(false));
  }, []);

  const handleOnCropChange = (crop) => {
    setState({ ...state, crop: crop });
  };

  const handleOnCropComplete = (crop, pixelCrop) => {
    const { imgSrc } = post;
    dispatch(postActions.canvasHasValue(true));
    const canvas = imagePreviewCanvasRef.current; // document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imgSrc;
    image.onload = function () {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );
      const canvasImage = canvas.toDataURL();
      dispatch(postActions.getCroppedSrc(canvasImage));
    };
    //image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const { imgSrc } = post;
    if (imgSrc) {
      const canvasRef = imagePreviewCanvasRef.current;
      const { imgSrcExt } = post;
      const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);
      const myFilename = 'previewFile.' + imgSrcExt;
      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      const fd = new FormData();
      fd.append('file', myNewCroppedFile, myNewCroppedFile.name);
      fd.append('description', state.description);
      dispatch(postActions.addPost(fd));
      //setState(initialState);
    }
  };

  const verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      if (!acceptedFileTypesArray.includes(currentFileType)) {
        Notification.error(
          'This file is not allowed. Only images are allowed.',
        );

        return false;
      }

      if (currentFileSize > imageMaxSize) {
        Notification.error(
          'This file is not allowed. ' +
            currentFileSize +
            ' bytes is too large',
        );
        return false;
      }
      return true;
    }
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          'load',
          () => {
            // console.log(myFileItemReader.result)
            const myResult = myFileItemReader.result;

            dispatch(
              postActions.selectImage(
                myResult,
                extractImageFileExtensionFromBase64(myResult),
              ),
            );
            setState({
              ...state,
              imgSrc: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult),
            });
          },
          false,
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  const changeAspect = (e) => {
    if (e.target.name === '1:1') {
      setState({ ...state, crop: { ...state.crop, aspect: 1 } });
    } else {
      setState({ ...state, crop: { ...state.crop, aspect: 16 / 9 } });
    }
  };

  const resetReducer = () => {
    dispatch({ type: postActionType.RESET_IMAGE });
  };

  return (
    <div className="post-crop">
      <h1 className="straight-underlined" style={{ fontSize: '20px' }}>
        Tải ảnh lên để đăng bài viết
      </h1>
      {post.imgSrc !== null ? (
        <div>
          <div
            style={{
              padding: '1% 0',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gridColumnGap: '1rem',
            }}
          >
            <div>
              <label className="ui massive fluid icon button">
                <i className="file icon" />
                Tải lên ảnh khác
                <input
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedFileTypes}
                  multiple={false}
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <div>
              <Button onClick={changeAspect} name="1:1" size="massive">
                1:1
              </Button>
              <Button onClick={changeAspect} name="16:9" size="massive">
                16:9
              </Button>
              <Button onClick={resetReducer} icon="close" size="massive" />
            </div>
          </div>

          <h1 className="straight-underlined" style={{ fontSize: '20px' }}>
            Yêu cầu cắt ảnh(thao tác giống bôi đen dùng chuột):
          </h1>

          <ReactCrop
            src={post.imgSrc}
            crop={state.crop}
            onComplete={handleOnCropComplete}
            onChange={handleOnCropChange}
          />

          <canvas
            id="cropped-image-canvas"
            ref={imagePreviewCanvasRef}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div style={{ padding: '1% 0' }}>
          <label className="ui massive fluid icon button">
            <i className="file icon" />
            Tải ảnh lên
            <input
              style={{ display: 'none' }}
              ref={fileInputRef}
              type="file"
              accept={acceptedFileTypes}
              multiple={false}
              onChange={handleFileSelect}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default PostForm;
