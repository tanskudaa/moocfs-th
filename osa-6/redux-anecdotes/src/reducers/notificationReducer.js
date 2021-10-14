const initialState = null
var timeoutID = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const createNotification = (notification, timeoutSeconds = 3) => {
  return async dispatch => {
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
      timeoutID = null
    }, timeoutSeconds * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer