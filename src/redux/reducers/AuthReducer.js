const SET_TOKEN = 'set_token';

const AuthInitialState = {
  token: null
}

export const setToken = (token) => ({
  type: SET_TOKEN,
  token
})

//여기서 부터 이해가 필요함...
export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}


