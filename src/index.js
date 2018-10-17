import Veact from './service/veact'

import model from './model'
import { Header, Footer, Layout } from './components'

const App = Veact.createApp( document.getElementById('root'), model)

App.mount(Header, Layout, Footer)

export default App