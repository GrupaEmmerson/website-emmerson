import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import Home from '../../views/Home/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <main className="main">
              <Switch>
                <Route path="/home" name="Home" component={Home}/>
                <Redirect from="/" to="/home"/>
              </Switch>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
