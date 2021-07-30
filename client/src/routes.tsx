import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import { NoMatch } from './pages/noMatch'
import { Login } from './pages/login'
import { AdminDashboard } from './pages/adminDashboard'
import { StudentDashboard } from './pages/studentDashboard'

function Routes() {
    return (
        <Switch>
            <Route path="/dashboard/student">
                <StudentDashboard />
            </Route>

            <Route path="/dashboard/admin">
                <AdminDashboard />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route exact path="/">
                <Redirect to="/login" />
            </Route>

            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    )
}

export { Routes }