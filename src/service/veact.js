class Veact {
  constructor(rootDOM, virtualDOM, model) {
    this.rootDOM = rootDOM
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
    return { type, props, children }
  }

  mount(...children) {
    for (let child of children) {
      this.rootDOM.appendChild(this.render(child))
    }
  }

  render(node) {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }

    if (typeof node === 'function') {
      node = node({
        virtualDOM: this.virtualDOM,
        model: this.model,
      })
    }
    
    const { className, onClick } = node.props

    const $el = document.createElement(node.type)

    if (className) { $el.className = className }
    if (onClick) { $el.onclick = onClick }

    node.children
      .map((v) => this.render(v))
      .forEach($el.appendChild.bind($el))
    return $el
  }
}

export default Veact