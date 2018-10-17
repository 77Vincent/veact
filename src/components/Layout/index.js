import Veact from '../../service/veact'

import { Nav } from '../'

export default () => {
  return Veact.createElement('div', { className: 'App-layout' }, Nav)
}