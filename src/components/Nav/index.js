import Veact from '../../service/veact'

export default (app) => {
  const Item = (item, index) => {
    return Veact.createElement(
      'li',
      {},
      Veact.createElement(
        'div',
        {},
        item.content
      ),
      Veact.createElement(
        'button',
        {
          onClick(e) {
            app.setState(model => {
              const newTodos = [...model.todos]
              newTodos.splice(index, 1)
              return {
                ...model,
                todos: newTodos,
              }
            })
          }
        },
        'remove item' 
      )
    )
  }

  const items = app.model.todos.map((item, index) => Item(item, index))

  return Veact.createElement(
    'div',
    { className: 'App-nav' },
    Veact.createElement( 'ul', {}, ...items,
      Veact.createElement('button', {
        className: 'App-nav-button',
        onClick() {
          app.setState(model => {
            const newTodos = [...model.todos, { content: `todo ${model.todos.length + 1}` }]
            return {
              ...model,
              todos: newTodos,
            }
          })
        },
      }, 'Add todo')
    )
  )
}