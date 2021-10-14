const initialState = null
// NOTE Is --
const notificationTimeoutDelay = 5000
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

export const createNotificationWithTimeout = (notification, dispatch) => {
  // NOTE -- this --
  if (timeoutID) clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    // NOTE -- illegal?
    dispatch(resetNotification())
    timeoutID = null
  }, notificationTimeoutDelay)

  return {
    type: 'SET_NOTIFICATION',
    data: { notification }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer