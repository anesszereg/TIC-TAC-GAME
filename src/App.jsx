import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Page1 from './Pages/Page1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
            <h1 className='title'>
                PRESS TO PLAY WITH ME 🎮 🤖
            </h1>
      <Page1 />
    
    </div>
  )
}

export default App
