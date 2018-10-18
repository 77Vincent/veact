class Veact {
  constructor(rootDOM, vDOM, model) {
    this.rootDOM = rootDOM
    this.vDOM = vDOM 
    this.model = model 
  }

  static createApp(rootDOM, model) {
    return new Veact(rootDOM, {}, model)
  }

  static createElement(type, props, ...children) {
    if (typeof type === 'function') {
      const vDOM = type(props)
      type = vDOM.type
      children = vDOM.children
    }

    // Config Initialization
    type = type ? type : 'div'
    props = props ? props : {}

    const childrenVDOM = children.map(child => {
      if (typeof child === 'function') {
        return child()
      }
      return child
    })
    return { type, props, children: childrenVDOM }
  }

  mount(App) {
    const vDOM = App(this)
    this.vDOM = vDOM 
    this.App = App
    this.rootDOM.appendChild(this.render(vDOM))
  }

  setState(callback) {
    const newModel = callback(this.model)
    Object.assign(this.model, newModel)
    this.rootDOM.removeChild(this.rootDOM.children[0])
    this.rootDOM.appendChild(this.render(this.App(this)))
  }

  render(vDOM) {
    if (typeof vDOM === 'string') {
      return document.createTextNode(vDOM)
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