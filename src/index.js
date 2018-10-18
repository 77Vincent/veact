import Veact from './service/veact'

import model from './model'
import { App } from './components'

Veact.createApp(document.getElementById('root'), model).mount(App)

