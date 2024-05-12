import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import shareVid from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'

const responseGoogle = navigate => credentialResponse => {
  const user = jwtDecode(credentialResponse.credential)
  localStorage.setItem('user', JSON.stringify(user))

  const { name, picture, sub: googleId } = user

  const doc = {
    _id: googleId,
    _type: 'user',
    userName: name,
    image: picture,
  }

  client.createIfNotExists(doc).then(() => {
    navigate('/', { replace: true })
  })
}

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-start items-center flex-col h-screen overflow-hidden'>
      <div className='relative w-full h-full'>
        <video
          src={shareVid}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} alt='logo' width='130px' />
          </div>

          <div className='shadow-2xl'>
            <GoogleLogin
              onSuccess={responseGoogle(navigate)}
              onError={e => {
                console.log('Login Failed')
                console.log(e)
              }}
              auto_select={true}
              useOneTap
              cancel_on_tap_outside
              // hosted_domain='https://shareme-fawaz.vercel.app/'
              shape='pill'
              theme='filled_black'
              text='signin_with'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
