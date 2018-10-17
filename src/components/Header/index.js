import Veact from '../../service/veact'

export default ({ model }) => {
  return Veact.createElement('header', { className: 'App-header' }, model.title)
}