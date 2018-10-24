# Veact
Pure functional, simplified React-like Javascript library with built-in state management system for building reactive UIs.
> This project is currently under active development.

## Table of content
- [Quick Start](#quick-start)
- [Using JSX](#using-jsx)
- [Model](#model)
- [Dispatch](#dispatch)
- [Functional Component](#functional-component)

## Quick Start <a name="quick-start"></a>
This documentation assumes that you are not totally stranger to [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [ES6](http://es6-features.org/#Constants). The following "Hello World" example is a glance of the usage of Veact:

```js
// index.js

import Veact from 'veact'

import model from './model'
import App from './App'

Veact.createApp(
  document.getElementById('root'),
  model,
  App
)
```
```js
// App.js

import Veact from 'veact'

export default ({ app }) => <div>{ app.model.title }</div>
```
```js
// model.js

export default {
  title: 'Hello World'
}
```

## Using JSX <a name="using-jsx"></a>
The example uses [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax because Veact implements the same "[createElement](https://reactjs.org/docs/react-api.html#createelement)" function as React does. Although JSX is not mandatory but it's like a syntax sugar that can boost the productivity. JSX is not natively supported by any Javascript runtime, to use it you need to enable a babel plugin called "[@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)" and to configure the .babelrc as follows: 

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "Veact.createElement"
    }],
  ]
}
```

## Model <a name="model"></a>
"model" is the place where all the data or state is stored, like [store](https://redux.js.org/basics/store) in Redux, there will be only one model in Veact, also known as the "single source of truth". Model has to be intialized and get passed in when the app is created. Then it will be accessible from any of your functional component. With the same principle as React or Redux has, "model" is not supposed to be modified directly, but by a "dispatch" function provided by the instance of your app which will trigger the update procress of both the virtual DOM and DOM:
```js
// App.js

import Veact from 'veact'

const changeTitle = app = () => {
  app.dispatch(model => ({
    title: 'New Title'
  }))
}

export default ({ app }) => <div onClick={changeTitle(app)}>{ app.model.title }</div>
```

> Tips: When creating component-based functions, the advantage of using higher-order function which returns the actual function, is that the base-function will be only created once when the module is loaded.

 ## Dispatch <a name="dispatch"></a>
Dispatch is the function to update model, and then update the virtual DOM and re-render the real DOM in the background. Unlike the "[dispatch](https://redux.js.org/basics/actions)" in Redux, in Veact, things get simpler, dispatch only accepts one callback function with the current [model](#model) as the default argument, it expects the callback to return a new model which will be merged to the current model. No direct modification to the model or any kinds of side-effects should be made:
```js
// model.js

export default {
  todos: ['todo 1', 'todo 2', 'todo 3'],
}
```
```js
// App.js

import Veact from 'veact'

const addTodo = app = () => {  
  app.dispatch(model => ({
    todos: [...model.todos].push('new todo')
  }))
}

// A todo list
export default ({ app }) => (
  <ul>
    {
      app.model.todos.map(todo => <li>{todo}</li>)
    }
  </ul>
  
  <button onClick={addTodo(app)}>Add todo</button>
)
```
<b>Wrong thing</b> to do in the dispatch callback function:
```js
const addTodo = app = () => {
  app.dispatch(model => {
    // Direct modification to the model is a side-effect!
    model.todos.push('new todo')
    return {
      todos: model.todos
    }
  })
}
```
When dealing with more complex models, remember to always return the root property from which you are doing the modification to restore the intial structure of your model:
```js
// model.js

export default {
  user: {
    status: {
      isLoggedIn: false
    }
  }
}
```
```js
// App.js

import Veact from 'veact'

const login = app = () => {
  app.dispatch(model => ({
    user: {
      status: {
        isLoggedIn: true
      }
    }
  }))
}

export default ({ app }) => <button onClick={login(app)}>Login</button>
```

## Functional Component <a name="functional-component"></a>
To create a component is to create a function which returns a virtual DOM object. To pass data from parent component to children component, simply declare the 
```js
// App.js

import Veact from 'veact'
import Header from './Header'

export default () => (
  <div>
    <Header title="Hello World"/>
  </div>
)
```
```js
// Header.js

export default ({ title }) => (
  <header>
    <h1>{ title }</h1>
  </header>
)
```
