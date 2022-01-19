import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/Home.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Bid from './components/Bid'
import Players from './components/players'
import Chat from './components/chat'

function App() {

  const routes = useRoutes()

  return (
    <div className="App">
      <Router >
        <div className="Screen">
          <Header />

          <div className="Row">
            <div className="Column">
              <div className="GameWrapper">
                <div className="Game">
                  <div className="Game_text asdf">SOCIAL ETHEREUM GAMBLING</div>
                </div>
                
                
              </div>              

              <div className="TabPane">
                <div className="TabLine">
                </div>
              </div>
              
              <Chat />
            </div>

            <Bid />

            <Players />

          </div>
        </div>

        <div className="content">
          {routes}
        </div>

        
        
        <Footer />
      </Router>
    </div>
  )
}

export default App
