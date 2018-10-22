import Veact from './service/veact'

import App from './base'

const model = {
  title: 'Welcome to Veact App',
  todos: [],
  isPageLoading: true,
} 

Veact.createApp(
  document.getElementById('root'),
  model,
  App
)
