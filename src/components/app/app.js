import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator/error-indicator';
import Header from '../header';
import ItemList from '../item-list';
import PeoplePage from '../people-page';
import PersonDetails from '../person-details';
import RandomPlanet from '../random-planet';
import './app.css';

export default class App extends Component {
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
    return (
      <div className="stardb-app">
        <Header />
        {planet}
        {/* <RandomPlanet /> */}

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
        <PeoplePage />
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
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
            <PersonDetails personId={this.state.selectedPerson} />
            <ErrorButton />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => `${item.name} (${item.model})`}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
            <ErrorButton />
          </div>
        </div>
      </div>
    );
  }
}
