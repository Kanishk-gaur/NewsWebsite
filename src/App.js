import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey ="5acb7e998460498180951be99b95a033"

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
          <Switch>
            <Route exact path="/">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}  
                key="general"
                pagesize={5}
                country="in"
                category="general"
              />
            </Route>
            <Route exact path="/business">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}  
                key="business"
                pagesize={5}
                country="in"
                category="business"
              />
            </Route>
            <Route exact path="/entertainment">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}  
                key="enter"
                pagesize={5}
                country="in"
                category="entertainment"
              />
            </Route>
            <Route exact path="/general">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}   key="gen" pagesize={5} country="in" category="general" />
            </Route>
            <Route exact path="/health">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}   key="health" pagesize={5} country="in" category="health" />
            </Route>
            <Route exact path="/science">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}  
                key="science"
                pagesize={5}
                country="in"
                category="science"
              />
            </Route>
            <Route exact path="/sports">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}   key="sports" pagesize={5} country="in" category="sports" />
            </Route>
            <Route exact path="/technology">
              {" "}
              <News setProgress={this.setProgress} apiKey={this.apiKey}  
                key="technology"
                pagesize={5}
                country="in"
                category="technology"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
