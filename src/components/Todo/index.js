import Veact from '../../service/veact'

import Button from '../Button'

export default ({ app }) => {
  const { dispatch } = app

  const removeItem = index => () => {
    dispatch(model => {
      const newTodos = [...model.todos]
      newTodos.splice(index, 1)
      return {
        ...model,
        todos: newTodos,
      }
    })
  }

  const toggleTodo = index => () => {
    dispatch(model => {
      const newTodos = [...model.todos]
      const target = newTodos.filter((item, i) => {
        return  i === index
      })
      const newTarget = Object.assign({}, target[0])
      newTarget.completed = !newTarget.completed 
      newTodos.splice(index, 1, newTarget)
      return {
        ...model,
        todos: newTodos,
      }
    })
  }

  const addTodo = () => {
    dispatch(model => {
      const newTodos = [...model.todos, { title: 'New item', completed: false }]
      return {
        ...model,
        todos: newTodos,
      }
    })
  }

  const removeAll = () => {
    dispatch(model => {
      return {
        ...model,
        todos: [],
      }
    })
  }
  
  const reload = () => {
    dispatch(model => {
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
            todos: json.slice(0, 5),
            isPageLoading: false,
          }
        })
      })
  }

  const Item = ({ item, index }) => {
    return (
      <li>
        <h4>{item.title}</h4>
        <span>Is completed: {item.completed}</span>
        <button onClick={toggleTodo(index)}>Complete</button>
        <button onClick={removeItem(index)}>Remove</button>
      </li>
    )
  }

  return (
    <div className="App-todo">
      <Button>
        <div>jjjjjjjj</div>
        <div>aaaaa</div>
      </Button>
      <button
        className="App-todo-button"
        onClick={addTodo}
      >Add todo</button>

      <button
        className="App-todo-button"
        onClick={removeAll}
      >Remove all</button>

      <button
        className="App-todo-button"
        onClick={reload}
      >Reload</button>

      <ul>
        {
          app.model.todos.map((item, index) => {
            return <Item item={item} index={index} />
          })
        }
      </ul>
    </div>
  )
}
