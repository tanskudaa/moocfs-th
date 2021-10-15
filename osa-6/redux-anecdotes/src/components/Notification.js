import React from 'react'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

// const Notification = () => {
const Notification = (props) => {
  // const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    // display: notification ? '' : 'none'
    display: props.notification ? '' : 'none'
  }

  return (
    <div style={style}>
      {/* { notification } */}
      { props.notification }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// export default Notification
export default connect(mapStateToProps)(Notification)