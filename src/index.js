import Veact from './service/veact'

import App from './base'

const model = {
  title: 'Hello World',
  todos: [],
  isPageLoading: true,
} 

Veact.createApp(document.getElementById('root'), model).mount(App)
