import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import { NoMatch } from './pages/noMatch'
import { Login } from './pages/login'

function Routes() {
    return (
        <Switch>
            <Route path="/login">
                <Login />
            </Route>

            <Route path="/">
                <Redirect to="/login" />
            </Route>

            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    )
}

export { Routes }