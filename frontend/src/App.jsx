import {Routes,Route} from 'react-router-dom'
import Introduction from './pages/Introduction'
import Login from './pages/Login'
function App() {

  return (
     <div>
      <Routes>
        <Route path='/' element={<Introduction/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
     </div>
    
  )
}

export default App
