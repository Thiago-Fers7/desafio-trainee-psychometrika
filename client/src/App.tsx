import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './routes'
import { UserContextProvider } from './contexts/UserContext'
import { ChaptersContextProvider } from './contexts/ChaptersContext'

function App() {
  return (
    <Router>
      <UserContextProvider>
        <ChaptersContextProvider>
          <Routes />
        </ChaptersContextProvider>
      </UserContextProvider>
    </Router>
  )
}

export { App }
