const Veact = {
  h(type = 'div', props = {}, children = []) {
    return { type, props, children };
  },

  render(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    if (typeof node === 'function') {
      node = node()
    }
    
    const { className, onClick } = node.props

    const $el = document.createElement(node.type);

    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }

    node.children
      .map(Veact.render)
      .forEach($el.appendChild.bind($el));
    return $el;
  },
  
  mount(DOM, virtualDOM) {
    DOM.appendChild(Veact.render(virtualDOM))
  }
}

const arr = [1, 2, 3, 4]


const Item = props => () => Veact.h('li', { className: 'App-todo-item'}, [`to do ${props}`])

const Todo = () => Veact.h('ul', { className: 'App-todo-list' }, arr.map(v => Item(v)))

const Button = () => Veact.h(
  'button', {
    className: 'App-button',
    onClick: () => { console.log(11111) },
  }, ['Add to do']
)

const Header = () => Veact.h('h1', {}, ['Hello World'])

const App = Veact.h(
  'div', { className: 'Welcome'}, [Header, Todo, Button]
)

Veact.mount(document.getElementById('root'), App)