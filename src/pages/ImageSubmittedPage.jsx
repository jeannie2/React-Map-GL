import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

const ImageSubmittedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Container id="image-submitted-page" sx={{textAlign: 'center'}}>
        <h2>Image submitted! Please check the marker and click the image gallery link.</h2>
      </Container>
    </>
  )
}

export default ImageSubmittedPage
