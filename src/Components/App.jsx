import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import SignIn from './Signin';
import Home from './Home';
import Desc from './Desc';
function App() {

  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/:id" element={<Desc/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>

      </Routes>
     </Router>
    </>
  )
}

export default App
