import Veact from '../../service/veact'

export default ({ app }) => {
  const removeItem = (index) => () => {
    app.dispatch(model => {
      const newTodos = [...model.todos]
      newTodos.splice(index, 1)
      return {
        ...model,
        todos: newTodos,
      }
    })
  }

  const addTodo = () => {
    app.dispatch(model => {
      const newTodos = [...model.todos, { title: 'New item' }]
      return {
        ...model,
        todos: newTodos,
      }
    })
  }
  
  const reload = () => {
    app.dispatch(model => {
      return {
        ...model,
        isPageLoading: true,
      }
    })

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => {
        app.dispatch(model => {
          return {
            ...model,
            todos: json.slice(0, 20),
            isPageLoading: false,
          }
        })
      })
  }

  const Item = ({ item, index }) => {
    return (
      <li>
        <span> {item.title} </span>
        <button onClick={removeItem(index)}>Remove</button>
      </li>
    )
  }

  return (
    <div className="App-nav">
      <ul>
        {
          app.model.todos.map((item, index) => {
            return <Item item={item} index={index} />
          })
        }
      </ul>

      <button
        className="App-nav-button"
        onClick={addTodo}
      >Add todo</button>

      <button
        className="App-nav-button"
        onClick={reload}
      >Reload</button>
    </div>
  )
}
