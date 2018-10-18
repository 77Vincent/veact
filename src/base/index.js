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
      {
        className: 'App-header-logo',
        onClick() {
          app.setState((state) => {
            return {
              ...state,
              title: 'New title',
            }
          })
        },
      },
      'App logo',
    ),
    Layout(app),
    Footer
  )
}