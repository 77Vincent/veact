import Veact from '../../service/veact'

import './index.scss'

export default ({ children, onClick }) => {
  return (
    <button
      className="App-button"
      onClick={onClick}
    >
      {children}
    </button>
  ) 
}
