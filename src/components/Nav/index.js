import Veact from '../../service/veact'

export default ({ app }) => {
  const removeItem = (index) => {
    app.setState(model => {
      const newTodos = [...model.todos]
      newTodos.splice(index, 1)
      return {
        ...model,
        todos: newTodos,
      }
    })
  }

  const addTodo = () => {
    app.setState(model => {
      const newTodos = [...model.todos, { content: `todo ${model.todos.length + 1}` }]
      return {
        ...model,
        todos: newTodos,
      }
    })
  }

  const Item = ({ item, id }) => {
    return (
      <li>
        <span> {item.content} </span>
        <button onClick={removeItem}>Remove</button>
      </li>
    )
  }

  return (
    <div className="App-nav">
      <ul>
        {
          app.model.todos.map(item => {
            return <Item item={item} />
          })
        }
      </ul>

      <button
        className="App-nav-button"
        onClick={addTodo}
      >Add todo</button>
    </div>
  )
}