import Veact from '../../service/veact'

import Nav from '../Nav'

export default (app) => {
  return Veact.createElement('div', { className: 'App-layout' }, Nav(app))
}