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
import PersistentDrawerLeft from "./component/hi"
// import  Home  from './component/home';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route> 
          <Route path="/registration" component={Registration}></Route>
          <Route path="/forgetPassword" component={ForgetPassword}></Route>
          <Route path="/hi" exact={true} component={PersistentDrawerLeft} />
          <Route path="/" exact={true} component={Home}/>
        </Switch>
      </Router>
      )
  }
}
export default App;