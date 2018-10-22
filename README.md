# Veact
Pure functional, simplified React-like Javascript library with built-in state management system for building reactive UIs.

## Table of content
- [Quick Start](#quick-start)
- [Using JSX](#using-jsx)
- [Model](#model)

## Quick Start <a name="quick-start"></a>
```js
// App.js

export default app => <div>{ app.model.title }</div>
```
```js
// model.js

export default {
  title: 'Hello World'
}
```
```js
// index.js
import Veact from 'Veact'

import model from './model'
import App from './App'

Veact.createApp(
  document.getElementById('root'),
  model,
  App
)
```
The above "Hello World" example is a glance of the usage of the library, here are some notes:

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

const changeTitle = app = () => {
  app.dispatch(model => ({
    ...model,
    title: 'New Title'
  }))
}

export default app => <div onClick={changeTitle(app)}>{ app.model.title }</div>
```

> Tips: When creating component-based functions, the advantage of using higher-order function which returns the actual function, is that the base-function will be only created once when the module is loaded.

 
