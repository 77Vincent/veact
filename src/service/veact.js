class Veact {
  constructor(rootDOM, virtualDOM, model) {
    this.rootDOM = rootDOM
    this.oldVirtualDOM = virtualDOM
    this.virtualDOM = virtualDOM 
    this.model = model 
  }

  static createApp(rootDOM, model) {
    const virtualDOM = Veact.createElement('div')
    const app = new Veact(rootDOM, virtualDOM, model)
    rootDOM.appendChild(Veact.prototype.render(virtualDOM))
    return app
  }

  static createElement(type = 'div', props = {}, ...children) {
    const el = { type, props, children }
    return el
  }

  mount(...children) {
    for (let child of children) {
      this.rootDOM.appendChild(this.render(child))
    }
  }

  setState(input = {}) {
    Object.assign(this.model, input)
  }

  render(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }

    if (typeof node === 'function') {
      node = node(this)
    }
    
    const { className, onClick } = node.props

    const $el = document.createElement(node.type)

    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }

    node.children
      .map(v => this.render(v))
      .forEach($el.appendChild.bind($el))
    
    return $el
  }
}

export default Veact