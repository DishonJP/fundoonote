import {
  BrowserRouter as Router,
  Route,Switch
} from "react-router-dom"
import React from 'react'
import './App.css';
import Login from './component/login';
import Registration from "./component/registration";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route path="/login" component={Login}></Route> 
          <Route path="/registration" component={Registration}></Route>  
          </Switch>
      </Router>
      )
  }
}
export default App;