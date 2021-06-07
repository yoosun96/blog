import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALZE_FORM = 'auth/INITIALZE_FORM';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ from, key, value }) => ({
    from, // register,login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);
export const initialzeForm = createAction(INITIALZE_FORM, (form) => form); // register/login

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    uwername: '',
    password: '',
  },
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다.
      }),
    [INITIALZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState,
);

export default auth;
