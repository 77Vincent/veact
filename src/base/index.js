import Veact from '../service/veact'

import { Header, Layout, Footer, Loading } from '../components'

const App = (app) => {
  app.onMount(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => {
        app.dispatch(model => {
          return {
            ...model,
            todos: json.slice(0, 20),
            isPageLoading: false,
          }
        })
      })
  }, App)

  return (
    <div
      className="App-root"
      style={{backgroundColor: 'lightyellow'}}
    >
      <Loading app={app}/>

      <Header />

      <Layout app={app} />
      
      <Footer />
    </div>
  )
}

export default App