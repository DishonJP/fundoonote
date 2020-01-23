import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import React from 'react'
import './App.css';
import Login from './component/login';
import Registration from "./component/registration";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login}></Route> 
        <Route path="/registration" component={Registration}></Route>  
      </Router>
      )
  }
}
export default App;