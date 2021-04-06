import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundry';
import ErrorIndicator from '../error-indicator/error-indicator';
import Header from '../header';
import ItemDetails, { Record } from '../item-details';
import RandomPlanet from '../random-planet';
import Row from '../row';
import {
  PersonDetails,
  PersonList,
  PlanetDetails,
  PlanetList,
  StarshipDetails,
  StarshipList,
} from '../sw-components';
import { SwapiServiceProvider } from '../swapi-service-context';
import './app.css';

export default class App extends Component {
  // swapiService = new DummySwapiService();
  swapiService = new SwapiService();
  state = {
    showRandomPlanet: true,

    hasError: false,
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
    } = this.swapiService;
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
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />
            {/* <PersonList />
          <PersonDetails /> */}
            <Row left={personDetails} right={starshipDetails} />
            {/* {planet}
          {/* <RandomPlanet /> */}

            {/* <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}
            >
              Toggle Random Planet
            </button>
            <ErrorButton />
          </div> */}
            {/* <ButtonToggle /> */}
            {/* <PeoplePage /> */}
            {/* разрив между персанажами  */}
            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />
            <div className="row mb2">
              <div className="col-md-6">
                <PersonList />
                {/* // getData={this.swapiService.getAllPeople}
              // onItemSelected={() => {}} */}

                <PlanetList />
                {/* // getData={this.swapiService.getAllPeople}
              // onItemSelected={() => {}} */}

                <StarshipList />
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
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
