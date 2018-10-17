import Veact from '../../service/veact'

export default (app) => {
  const items = app.model.todos.map(item => {
    return Veact.createElement('li', {}, item.content)
  })

  return Veact.createElement(
    'div',
    { className: 'App-nav' },
    Veact.createElement( 'ul', {}, ...items,
      Veact.createElement('button', {
        onClick() {
          app.setState({
            title: 1111111,
          })
        },
      }, 'Add todo')
    )
  )
}