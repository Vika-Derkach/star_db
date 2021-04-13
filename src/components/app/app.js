import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from '../../services/swapi-service';
import Data from '../data';
import ErrorBoundary from '../error-boundry';
import ErrorIndicator from '../error-indicator/error-indicator';
import Header from '../header';
import {
  LoginPage,
  PeoplePageR,
  PlanetsPage,
  SecretPage,
  StarshipPage,
} from '../pages';
import RandomPlanet from '../random-planet';
import { StarshipDetails } from '../sw-components';
import { SwapiServiceProvider } from '../swapi-service-context';
import './app.css';
export default class App extends Component {
  // swapiService = new DummySwapiService();
  // swapiService = new SwapiService();
  state = {
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };
  onLogin = () => {
    this.setState({ isLoggedIn: true });
  };
  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service(),
      };
    });
  };

  componentDidCatch() {
    console.log('componentDidCatch()');
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to starDB</h2>}
                  exact
                />
                {/* <Route path="/people" render={() => <h2>People</h2>} exact /> */}

                <Route path="/people/:id?" component={PeoplePageR} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starship" exact component={StarshipPage} />
                <Route
                  path="/starship/:id"
                  render={({ match }) => {
                    const { id } = match.params;

                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                <Route path="/data" exact component={Data} />

                <Route render={() => <h2>Page is not found</h2>} />
                {/* <Redirect to="/" /> */}
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
