import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification) {
    return (
      <div className={notification.isError ? 'error' : 'notification'}>
        { notification.message }
      </div>
    )
  }
  else {
    return null
  }
}

export default Notification