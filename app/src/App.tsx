import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './routes'
import { UserContextProvider } from './contexts/UserContext'
import { ChaptersContextProvider } from './contexts/ChaptersContext'
import { GlobalContextProvider } from './contexts/GlobalContext'

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <UserContextProvider>
          <ChaptersContextProvider>
            <Routes />
          </ChaptersContextProvider>
        </UserContextProvider>
      </GlobalContextProvider>
    </Router>
  )
}

export { App }
