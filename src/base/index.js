import Veact from '../service/veact'

import { Layout, Footer } from '../components'

export default (app) => {
  return Veact.createElement(
    'div',
    { className: 'App-root' },
    Veact.createElement(
      'h1',
      { className: 'App-header-title' },
      app.model.title,
    ),
    Veact.createElement(
      'div',
      { className: 'App-header-logo' },
      'App logo',
    ),
    Layout(app),
    Footer
  )
}