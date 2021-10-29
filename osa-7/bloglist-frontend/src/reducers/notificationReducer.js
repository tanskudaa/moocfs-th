const initialState = null
var timeoutId = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        isError: action.data.isError
      }
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const createNotification = (message, isError = false, timeoutSeconds = 3) => {
  return async dispatch => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(resetNotification())
      timeoutId = null
    }, timeoutSeconds * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        isError
      }
    })
  }
}

export const resetNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'RESET_NOTIFICATION'
    })
  }
}

export default notificationReducer