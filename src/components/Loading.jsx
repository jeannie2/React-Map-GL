import React from 'react'
// import Spinner from 'react-bootstrap/Spinner'
import { CircularProgress } from '@mui/material'

function Loading() {
  return (
    <div>
      {/* <Spinner animation="border" /> */}
      <CircularProgress sx={{margin: 'auto'}}/>
    </div>
  )
}

export default Loading
