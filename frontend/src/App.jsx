import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './containers/Home'
import Login from './components/Login'


function App() {

  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
