import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/" element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App