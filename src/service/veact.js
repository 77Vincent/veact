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
    for (let input of inputs) {
      for (let key of Object.keys(input)) {
        source[key] = input[key]
      }
    }
    return source
  }
}

const errorMessages = {
  TEXT_NODE_IS_ARRAY: 'The node should not be type of array.', 
  PAYLOAD_ISNOT_PLAIN_OBJECT: 'The returned payload in the dispatch function should be a plain object.',
}

class Veact {
  constructor(rootDOM, vDOM, model) {
    this.rootDOM = rootDOM
    this.vDOM = vDOM
    this.model = model
    this.App = null
    this.components = new Set([]) 
  }

  static createApp(rootDOM, model) {
    return new Veact(rootDOM, {}, model)
  }

  // Create the vDOM object for render
  static createElement(type, props, ...children) {
    // For directly passing function as a component
    // the babel plugin-transform-react-jsx will parse the whole function as the type
    if (_.isFunction(type)) {
      const vDOM = type(props)
      type = vDOM.type
      props = vDOM.props
      children = vDOM.children
    }

    if (_.isArray(children[0])) {
      children = children[0]
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

  mount(App) {
    const vDOM = App(this)
    this.vDOM = vDOM 
    this.App = App
    this.rootDOM.appendChild(this.render(vDOM))
  }

  update() {
    const newVDOM = this.App(this)

    this.rootDOM.removeChild(this.rootDOM.children[0])
    this.rootDOM.appendChild(this.render(this.App(this)))
  }

  dispatch(callback) {
    const newModel = callback(this.model)
    if (!_.isObject(newModel)) {
      throw new Error(errorMessages.PAYLOAD_ISNOT_PLAIN_OBJECT)
    }

    _.assign(this.model, newModel)
    this.update()
  }

  render(vDOM) {
    // When the node of the vDOM is not an object
    if (_.isString(vDOM) || _.isBool(vDOM) || _.isNum(vDOM)) {
      return document.createTextNode(String(vDOM))
    }
    if (_.isNull(vDOM)) {
      return document.createTextNode('')
    }
    if (_.isArray(vDOM)) {
      throw new Error(errorMessages.TEXT_NODE_IS_ARRAY)
    }

    const { className, onClick, style } = vDOM.props
    const $el = document.createElement(vDOM.type)

    // Apply valid DOM properties to DOM
    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }
    if (style) {
      for (let key of Object.keys(style)) {
        $el.style[key] = style[key]
      }
    }

    vDOM.children
      .map(v => this.render(v))
      .forEach($el.appendChild.bind($el))
    
    return $el
  }
}

export default Veact