import {
  BrowserRouter as Router,
  Route,Switch
} from "react-router-dom"
import React from 'react'
import './App.css';
import Login from './component/login';
import ForgetPassword from './component/forgetPassword'
import Registration from "./component/registration";
import Home from "./component/home";
export  class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route> 
          <Route path="/registration" component={Registration}></Route>
          <Route path="/forgetPassword" component={ForgetPassword}></Route>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      )
  }
}
