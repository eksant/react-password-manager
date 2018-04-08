import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Passportal from '../../views/Passportal/';
import PassportalForm from '../../views/PassportalForm/';

import { ReadPassportals, ReadPassportalById, DeletePassportal } from "../../store/users/users.actions";

class Full extends Component {
  render() {
    if (!localStorage.getItem('user')) {
      return <Redirect from="/" to="/login"/>
    } else {
      return (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar {...this.props}/>
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <Route exact path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <Route exact path="/passportal" name="Passportal" component={Passportal}/>
                  <Route exact path="/passportal/new" name="PassportalForm" component={PassportalForm}/>
                  <Route exact path="/passportal/edit/:id" name="PassportalFormUpdate" component={PassportalForm}/>
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default Full;