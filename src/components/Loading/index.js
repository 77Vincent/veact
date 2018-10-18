import Veact from '../../service/veact'

export default ({ app }) => {
  return (
    <div
      className="App-loading"
      style={{
        visibility: app.model.isPageLoading ? 'visible' : 'hidden',
      }}
    >
      <h1>Loading</h1>
    </div>
  ) 
}
