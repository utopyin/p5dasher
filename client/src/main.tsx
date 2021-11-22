import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import WSStore from './modules/ws/wsStore'
import P5 from './p5';

ReactDOM.render(
  <React.StrictMode>
    <WSStore>
      <P5 />
    </WSStore>
  </React.StrictMode>,
  document.getElementById('root')
)
