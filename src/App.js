import React, { Fragment, Suspense, lazy } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuNav from './menu'
import VideosList from './components/VideosList'

import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './theme'
import GlobalStyles from './GlobalStyles'
import Pace from './shared/components/Pace'
import VGallery from './components/VGallery'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
const LoggedOutComponent = lazy(() => import('./logged_out/components/Main'))

const App = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <Switch>
            {/*<Route path="/c">*/}
            {/*  <LoggedInComponent />*/}
            {/*</Route>*/}
            <Route>
              <LoggedOutComponent />
              {/*<VGallery />*/}
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  )
}

export default App
