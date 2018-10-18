import Veact from '../service/veact'

import { Header, Layout, Footer } from '../components'

export default (app) => {
  return (
    <div className="App-root" style={{backgroundColor: 'lightyellow'}}>
      <Header />

      <Layout app={app} />
      
      <Footer />
    </div>
  )
}