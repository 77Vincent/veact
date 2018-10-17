import Veact from '../../service/veact'


export default ({ model }) => {
  const items = model.todos.map(item => {
    return Veact.createElement('li', {}, item.content)
  })

  return Veact.createElement(
    'div',
    { className: 'App-nav' },
    Veact.createElement('ul', {}, ...items)
  )
}