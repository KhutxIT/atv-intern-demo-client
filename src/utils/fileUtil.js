import Notification from "../services/toastService";

const MAX_IMAGE_FILE_SIZE = 1024 * 1024 * 4;
const MAX_IMAGE_SIZE = 1024 * 1024 * 2;
const MAX_FILE_SIZE = 1024 * 1024 * 10;
const MAX_EDGE = 2048;
export const IMAGE_FILE_TYPES = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp'];
export const AUDIO_FILE_EXTENSIONS = ['amr', 'flac', 'm4a', 'm4r', 'mp2', 'ogg', 'wav', 'wma', 'mp3'];
export const VIDEO_FILE_EXTENSIONS = ['mpeg', 'oga', 'ogv', 'weba', 'webm', 'aac', 'avi', '3gp', 'mp4', 'mpg', 'flv', 'mkv'];
export const IMAGE_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];

export const readImage = (file, callback) => {
  if (!(file instanceof File)) {
    return;
  }
  if (typeof callback !== 'function') {
    callback = () => { };
  }
  const reader = new FileReader();
  reader.onload = (fileReaderEvent) => {
    if (!IMAGE_FILE_TYPES.includes(file.type) || !IMAGE_FILE_EXTENSIONS.includes(file.name.split('.').pop().toLowerCase())) {
      Notification.failure('Yêu cầu chọn file ảnh')
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      Notification.failure('Ảnh có kích thước quá 2MB')
      return;
    }
    scaleImage(
      fileReaderEvent.target.result,
      (blob) => {
        if (!(blob instanceof Blob)) {
          callback(file, fileReaderEvent);
          return;
        }
        const processedFile = new File([blob], file.name, { type: file.type });
        const processedFileReader = new FileReader();
        processedFileReader.onload = (e) => callback(processedFile, e);
        processedFileReader.readAsDataURL(processedFile);
      },
    );
  };
  reader.readAsDataURL(file);
};

const scaleImage = (src, callback) => {
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    let { width, height } = image;
    const longerEdge = Math.max(width, height);
    if (longerEdge <= MAX_EDGE) {
      callback();
      return;
    }
    const scale = MAX_EDGE / Math.max(width, height);
    width = width * scale;
    height = height * scale;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    canvas.toBlob(callback, 'image/jpeg', 0.7);
  };
  image.src = src;
};
