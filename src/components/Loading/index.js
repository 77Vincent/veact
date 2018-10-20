import Veact from '../../service/veact'

import './index.scss';

export default ({ app }) => {
  return (
    <div
      className="App-loading"
      style={{
        visibility: app.model.isPageLoading ? 'visible' : 'hidden',
      }}
    >
    </div>
  ) 
}
