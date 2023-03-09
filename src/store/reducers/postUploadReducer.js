import { postActionType } from '../action/postAction';

const initialState = {
  imgSrc: null,
  imgSrcExt: null,
  cropImgSrc: null,
  canvasHasValue: false,
  divs: [],
  step: 0,
  uploading: false,
  success: false,
  location: {
    coordinates: [],
    locationName: '',
  },
};

const postUpload = (state = initialState, action) => {
  switch (action.type) {
    case postActionType.RESET_IMAGE:
      return {
        ...state,
        ...initialState,
      };
    case 'PREVIOUS_PAGE':
      if (state.step > 0) {
        return {
          ...state,
          step: state.step - 1,
          divs: [],
        };
      } else {
        return {
          ...state,
        };
      }
    case 'NEXT_PAGE':
      if (state.step < 1) {
        return {
          ...state,
          step: state.step + 1,
        };
      } else {
        return {
          ...state,
        };
      }
    case 'ADD_IMAGE_TAG':
      return {
        ...state,
        divs: [...state.divs, action.div],
      };

    case 'DELETE_IMAGE_TAG':
      return {
        ...state,
        divs: state.divs.filter(({ id }) => id !== action.id),
      };
    case postActionType.ADD_POST_REQUEST:
      return {
        ...state,
        uploading: true,
      };

    case postActionType.CANVAS_HAS_VALUE:
      return {
        ...state,
        canvasHasValue: action.hasValue,
      };
    case postActionType.IMAGE_SELECT:
      return {
        ...state,
        imgSrc: action.imgSrc,
        imgSrcExt: action.imgSrcExt,
      };
    case postActionType.IMAGE_CROP_SELECT:
      return {
        ...state,
        cropImgSrc: action.imgSrc,
      };
    case postActionType.ADD_POST_SUCCESS:
      return {
        ...state,
        ...initialState,
        step: 0,
        uploading: false,
        success: true,
      };
    case postActionType.ADD_POST_FAILURE:
      return {
        ...state,
        uploading: false,
      };
    default:
      return state;
  }
};

export default postUpload;
