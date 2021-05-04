import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Records from "../components/Records";
import Record from "../components/Record";
// import NewMfr from "../components/NewMfr";
import Edit from "../components/Edit";
// import Track from "../components/Track";



export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/records" exact component={Records} />
      <Route path="/record/:id" exact component={Record} />
      <Route path={`/records/:id/edit`} exact component={Edit} />
      {/* <Route path="/list" exact component={NewMfr} /> */}
    </Switch>
  </Router>
);