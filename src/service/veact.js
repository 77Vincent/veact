class Veact {
  constructor(rootDOM, vDOM, model) {
    this.rootDOM = rootDOM
    this.vDOM = vDOM 
    this.model = model 
  }

  static createApp(rootDOM, model) {
    return new Veact(rootDOM, {}, model)
  }

  static createElement(type = 'div', props = {}, ...children) {
    return { type, props, children }
  }

  mount(App) {
    this.rootDOM.appendChild(this.render(App(this)))
    this.vDOM = App(this) 
    this.App = App
  }

  setState(input = {}) {
    Object.assign(this.model, input)
    this.rootDOM.removeChild(this.rootDOM.children[0])
    this.rootDOM.appendChild(this.render(this.App(this)))
  }

  render(vDOM) {
    if (typeof vDOM === 'string') {
      return document.createTextNode(vDOM)
    }

    const { className, onClick, style } = vDOM.props
    const $el = document.createElement(vDOM.type)

    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }

    vDOM.children
      .map(v => this.render(v))
      .forEach($el.appendChild.bind($el))
    
    return $el
  }
}

export default Veact