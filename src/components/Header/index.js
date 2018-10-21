import Veact from '../../service/veact'

import './index.scss'

export default ({ app }) => {
  return (
    <header className="App-header" >
      <h1 style={{ marginBottom: '0.5em' }}>{app.model.title}</h1> 
      <h4>Pure functional, simplified React-like UI library with built-in state management system.</h4>
    </header>
  )
}
