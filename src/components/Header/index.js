import Veact from '../../service/veact'

export default (app) => {
  return Veact.createElement('header', { className: 'App-header' }, app.model.title)
}