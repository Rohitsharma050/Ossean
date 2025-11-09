import {Routes,Route} from 'react-router-dom'
import Introduction from './pages/Introduction'
function App() {

  return (
     <div>
      <Routes>
        <Route path='/' element={<Introduction/>}/>
      </Routes>
     </div>
    
  )
}

export default App
