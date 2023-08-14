import { useEffect } from 'react'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FormSubmittedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/map')
    }, 5000)
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Container id="form-submitted-page" sx={{textAlign: 'center'}}>
        <h2>Form submitted. Please check the map!</h2>
      </Container>
    </>
  )
}

export default FormSubmittedPage
