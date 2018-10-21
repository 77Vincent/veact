import Veact from '../../service/veact'

import './index.scss'

export default ({ children }) => {
  console.log(children)
  return (
    <div className="App-button" >
      <div>
        bbbbbbbbb
        {children}
      </div>
    </div>
  ) 
}
