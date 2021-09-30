import React, { useState, useEffect, useImperativeHandle } from 'react'

const Notification = React.forwardRef((props, ref) => {
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    if (notification) {
      if (timeoutId) clearTimeout(timeoutId)
      setTimeoutId(setTimeout(() => setNotification(null), 3000))
    }
  }, [notification])

  const clearNotifications = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
      setNotification(null)
    }
  }

  const displayNotification = (message, error = false) => {
    setIsError(error)
    clearNotifications()
    setNotification(message)
  }

  const displayError = (message) => {
    displayNotification(message, true)
  }

  useImperativeHandle(ref, () => {
    return { displayNotification, displayError, clearNotifications }
  })

  if (notification) {
    return (
      <div className={isError ? 'error' : 'notification'}>
        {notification}
      </div>
    )
  }
  else {
    return null
  }
})

Notification.displayName = 'Notification'

export default Notification