import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import ItemDetails, { Record } from '../item-details';
import RandomPlanet from '../random-planet';
import Row from '../row';
import './data.css';
export default class Data extends Component {
  state = {
    swapiService: new SwapiService(),
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
  render() {
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
      <div>
        {planet}
        {/* <RandomPlanet /> */}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg btn-correction"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>
        {/* <ButtonToggle /> */}
        {/* <PeoplePage /> */}
        {/* разрив между персанажами  */}
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
    );
  }
}
