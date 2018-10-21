import Veact from '../../service/veact'

import Todo from '../Todo'

export default props => {
  const { className } = props

  return (
    <div className={`App-layout ${className}`}>
      <Todo />
    </div>
  )
}
