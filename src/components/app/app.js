import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundry';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator/error-indicator';
import Header from '../header';
import ItemDetails, { Record } from '../item-details';
import { PeoplePageR, PlanetsPage, StarshipPage } from '../pages';
import RandomPlanet from '../random-planet';
import Row from '../row';
import { StarshipDetails } from '../sw-components';
import { SwapiServiceProvider } from '../swapi-service-context';
import './app.css';
export default class App extends Component {
  // swapiService = new DummySwapiService();
  // swapiService = new SwapiService();
  state = {
    showRandomPlanet: true,

    hasError: false,
    swapiService: new SwapiService(),
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
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
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

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    const {
      getPerson,
      getStarship,
      getStarshipImage,
      getPersonImage,
    } = this.state.swapiService;
    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );
    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              {/* <PersonList />
          <PersonDetails /> */}
              {planet}

              <RandomPlanet />

              <div className="row mb2 button-row">
                <button
                  className="toggle-planet btn btn-warning btn-lg"
                  onClick={this.toggleRandomPlanet}
                >
                  Toggle Random Planet
                </button>
                <ErrorButton />
              </div>
              {/* <ButtonToggle /> */}
              {/* <PeoplePage /> */}
              {/* разрив между персанажами  */}
              <Route path="/" render={() => <h2>Welcome to starDB</h2>} exact />
              <Route path="/people" render={() => <h2>People</h2>} exact />

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
              {/* <PeoplePageR />
              <PlanetsPage />
              <StarshipPage /> */}
              <Row left={personDetails} right={starshipDetails} />
              <div className="row mb2">
                <div className="col-md-6">
                  {/* // getData={this.swapiService.getAllPeople}
              // onItemSelected={() => {}} */}

                  {/* // getData={this.swapiService.getAllPeople}
              // onItemSelected={() => {}} */}

                  {/* // getData={this.swapiService.getAllPeople}
              // onItemSelected={() => {}}
             */}

                  {/* <PersonList
              // getData={this.swapiService.getAllPlanets}
              // onItemSelected={() => {}}
              >
                {({ name }) => <span>{name}</span>}
              </PersonList> */}
                  {/* <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPlanets}
                renderItem={(item) => (
                  <span>
                    {item.name} <button>!</button>
                  </span>
                )}
              />
            </div>
            <div className="col-md-6">
              <ItemDetails personId={this.state.selectedPerson} />
              <ErrorButton />
            </div> */}
                </div>

                {/* <div className="row mb2">
            <div className="col-md-6">
              <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllStarships}
                renderItem={(item) => `${item.name} (${item.model})`}
              />
            </div>
            <div className="col-md-6">
              <ItemDetails personId={this.state.selectedPerson} />
              <ErrorButton />
            </div>
          // </div> */}
              </div>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
