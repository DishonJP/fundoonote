import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom"
import React from 'react'
import './App.css';
import Login from './pages/login';
import ForgetPassword from './pages/forgetPassword'
import Registration from "./pages/registration";
import Home from "./pages/home";
import WelcomePage from "./pages/welcomePage";
export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/login" component={Login}></Route>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/forgetPassword" component={ForgetPassword}></Route>
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    )
  }
}
