const _ = {
  is: type => input => Object.prototype.toString.call(type) === Object.prototype.toString.call(input),
  isString: (input) => _.is('')(input),
  isBool: (input) => _.is(true)(input),
  isNum: (input) => _.is(1)(input),
  isNull: (input) => _.is(null)(input),
  isUndefined: (input) => _.is(undefined)(input),
  isFunction: (input) => _.is(() => {})(input),
  isArray: (input) => _.is([])(input),
  isObject: (input) => _.is(({}))(input),
  assign(source = {}, ...inputs) {
    source = _.isObject(source) ? source : {}
    for (let input of inputs) {
      for (let key of Object.keys(input)) {
        source[key] = input[key]
      }
    }
    return source
  }
}

const errorMessages = {
  APP_IN_MOUNT_NOT_FUNCTION: 'Mount only accept one function.',
  TEXT_NODE_IS_ARRAY: 'The node should not be type of array.', 
  PAYLOAD_ISNOT_PLAIN_OBJECT: 'The returned payload in the dispatch function should be a plain object.',
}

class Veact {
  constructor(rootDOM, model, App) {
    this.rootDOM = rootDOM
    this.model = model
    this.App = App 

    this.vDOM = {} 
    this.components = new Set([]) 
  }

  static createApp(rootDOM, model, App) {
    if (!_.isFunction(App)) {
      throw new Error(errorMessages.APP_IN_MOUNT_NOT_FUNCTION)
    }

    const app = new Veact(rootDOM, model, App)
    this.app = app

    app.vDOM = App(app)
    app.rootDOM.appendChild(app._render(app.vDOM))

    return app
  }

  // Create the vDOM object for render
  static createElement(type, props, ...children) {
    // For directly passing function as a component
    // the babel plugin-transform-react-jsx will parse the whole function as the type
    let readyChildren = []
    for (let child of children) {
      if (_.isArray(child)) {
        readyChildren.push(...child)
      } else {
        readyChildren.push(child)
      }
    }

    if (_.isFunction(type)) {
      const vDOM = type(_.assign(props, { app: this.app, children }))
      type = vDOM.type
      props = vDOM.props
      children = vDOM.children
    } else {
      children = readyChildren
    }

    // Config Initialization
    type = type ? type : 'div'
    props = props ? props : {}

    const childrenVDOM = children.map(child => {
      if (_.isFunction(child)) {
        return child()
      }
      return child
    })
    return { type, props, children: childrenVDOM }
  }

  onMount(callback, component) {
    if (!this.components.has(component)) {
      callback()
    }
    this.components.add(component)
  }

  _update() {
    this.rootDOM.removeChild(this.rootDOM.children[0])
    this.rootDOM.appendChild(this._render(this.App(this)))
  }

  dispatch = (callback) => {
    const newModel = callback(this.model)
    if (!_.isObject(newModel)) {
      throw new Error(errorMessages.PAYLOAD_ISNOT_PLAIN_OBJECT)
    }

    _.assign(this.model, newModel)
    this._update()
  }

  _render(vDOM) {
    // When the node of the vDOM is not an object
    if (_.isString(vDOM) || _.isBool(vDOM) || _.isNum(vDOM)) {
      return document.createTextNode(String(vDOM))
    }
    if (_.isNull(vDOM)) {
      return document.createTextNode('')
    }

    const { className, onClick, style, src } = vDOM.props
    const $el = document.createElement(vDOM.type)

    // Apply valid DOM properties to DOM
    if (src) { $el.src = src }
    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }
    if (style) {
      for (let key of Object.keys(style)) {
        $el.style[key] = style[key]
      }
    }

    vDOM.children
      .map(v => this._render(v))
      .forEach($el.appendChild.bind($el))
    
    return $el
  }
}

export default Veact