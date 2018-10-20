import Veact from '../service/veact'

import { Header, Layout, Footer, Loading } from '../components'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

const App = (app) => {
  app.onMount(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => {
        app.dispatch(model => {
          return {
            ...model,
            todos: json.slice(0, 10),
            isPageLoading: false,
          }
        })
      })
  }, App)

  return (
    <div className="App-root" >
      <Loading />

      <Header />

      <Layout />
      
      <Footer />
    </div>
  )
}

export default App