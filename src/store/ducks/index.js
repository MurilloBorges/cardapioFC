import moment from 'moment';

export const Types = {
  LOADING: 'LOADER',
  CLEAR: 'CLEAR',
  CATEGORIES: 'CATEGORIES',
  UPDATEDATE: 'UPDATEDATE',
};

export const initialState = {
  loading: false,
  categories: [],
  updateDate: moment(new Date()),
};

export function loader(state = initialState, action) {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state, ...action.payload,
      };
    case Types.CLEAR:
      return {
        ...state,
        loading: false,
      };
    case Types.CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
      };
    case Types.UPDATEDATE:
      return {
        ...state, ...action.payload,
      };
    default:
      return { ...state };
  }
}
