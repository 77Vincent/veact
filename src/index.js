import Veact from './service/veact'

import model from './model'
import App from './base'

const app = Veact.createApp(document.getElementById('root'), model).mount(App)
