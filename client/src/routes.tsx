import { useContext } from 'react'
import { GlobalContext } from './contexts/GlobalContext'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import { NoMatch } from './pages/noMatch'
import { Login } from './pages/login'
import { AdminDashboard } from './pages/adminDashboard'
import { StudentDashboard } from './pages/studentDashboard'
import { ChapterContent } from './pages/chapterContent'
import { Warning } from './components/Warning'

function Routes() {
    const { messageWarning, isWarning } = useContext(GlobalContext)

    return (
        <div>
            <Switch>
                <Route path="/dashboard/student">
                    <StudentDashboard />
                </Route>
                <Route path="/dashboard/admin">
                    <AdminDashboard />
                </Route>
                <Route path="/chapters/:authorization/:chapterId">
                    <ChapterContent />
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
            {isWarning && <Warning message={messageWarning} />}
        </div>
    )
}

export { Routes }