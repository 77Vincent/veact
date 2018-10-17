class Veact {
  constructor(App, store) {
    this.App = App
    this.store = store
  }

  static createElement(type = 'div', props = {}, children = []) {
    return { type, props, children };
  }

  static createApp($root, App, store = {}) {
    const AppInstance = new Veact(App, store)
    $root.appendChild(AppInstance.render(App))
    return AppInstance
  }

  render(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    if (typeof node === 'function') {
      node = node({
        store,
        App: this.App,
        render: this.render,
      })
    }
    
    const { className, onClick } = node.props

    const $el = document.createElement(node.type);

    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }

    node.children
      .map((v) => this.render(v))
      .forEach($el.appendChild.bind($el));
    return $el;
  }
}

const Item = (props, todo) => {
  return Veact.createElement('li', { className: 'App-todo-item'}, [`${todo.content}`])
}

const Todo = props => Veact.createElement(
  'ul',
  { className: 'App-todo-list' },
  props.store.todos.map(todo => props => Item(props, todo))
)

const Button = props => Veact.createElement(
  'button', {
    className: 'App-button',
    onClick: () => {
    },
  }, ['Add to do']
)

const Header = props => {
  return Veact.createElement('h1', {}, [props.store.title])
}

const store = {
  title: 'Hello World',
  todos: [
    { content: 'todo 1'},
    { content: 'todo 2'},
    { content: 'todo 3'},
    { content: 'todo 4'},
  ]
} 

Veact.createApp(
  document.getElementById('root'),
  Veact.createElement('div', { className: 'App-root'}, [Header, Todo, Button]),
  store
)

// const Header = App.createComponent('h1', {}, ['Hello World'])