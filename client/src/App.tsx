import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './routes'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </Router>
  )
}

export { App }
