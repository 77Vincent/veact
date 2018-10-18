import Veact from '../../service/veact'

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
        onClick: () => {
          app.setState({
            title: 'Bye Bye World',
          })
        },
      },
      'App logo',
    )
  )
}