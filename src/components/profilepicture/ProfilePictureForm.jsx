import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { error } from '../../store/action/alertAction';
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
} from '../../utils/ReusableUtil';

const imageMaxSize = 10000000; // bytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {
  return item.trim();
});

const initialState = {
  description: '',
  imgSrc: null,
  imgSrcExt: null,
  imageUploadEndpoint: '',
  crop: {
    aspect: 1,
  },
};

function ProfilePictureForm() {
  const imagePreviewCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      description: e.target.value,
    });
  };

  const handleOnCropChange = (crop) => {
    setState({ crop: crop });
  };

  const handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = imagePreviewCanvasRef.current;
    const { imgSrc } = state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
    setState({ cropped: true });
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const { imgSrc } = state;
    if (imgSrc) {
      const canvasRef = imagePreviewCanvasRef.current;
      const { imgSrcExt } = state;
      const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);
      const myFilename = 'previewFile.' + imgSrcExt;
      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      const fd = new FormData();
      fd.append('photo', myNewCroppedFile, myNewCroppedFile.name);

      fd.append('description', state.description);
      // dispatch(postActions.addProfiePicture(fd));
      setState(initialState);
    }
  };

  const verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        dispatch(error('This file is not allowed. Only images are allowed.'));

        return false;
      }

      if (currentFileSize > imageMaxSize) {
        dispatch(
          error(
            'This file is not allowed. ' +
              currentFileSize +
              ' bytes is too large',
          ),
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
            setState({
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

  return (
    <div>
      {state.imgSrc !== null ? (
        <div>
          <div style={{ marginBottom: '1%' }}>
            <label className="ui icon button fluid">
              <i className="file icon " />
              Change Image
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

          <ReactCrop
            src={state.imgSrc}
            crop={state.crop}
            onComplete={handleOnCropComplete}
            onChange={handleOnCropChange}
          />
          {state.cropped ? (
            <Button primary fluid onClick={handleUpload}>
              Upload
            </Button>
          ) : null}

          <canvas style={{ display: 'none' }} ref={imagePreviewCanvasRef} />
        </div>
      ) : (
        <div>
          <label className="ui icon button fluid">
            <i className="file icon" />
            Chọn ảnh
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

export default ProfilePictureForm;
