import Veact from '../../service/veact'

import { Nav } from '../'

export default (props) => {
  return Veact.createElement('div', { className: 'App-layout' }, Nav)
}