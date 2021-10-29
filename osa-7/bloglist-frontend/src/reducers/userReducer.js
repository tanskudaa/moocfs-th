const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'RESET_USER':
      return initialState
    default:
      return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const resetUser = () => {
  return async dispatch => {
    dispatch({
      type: 'RESET_USER'
    })
  }
}

export default userReducer