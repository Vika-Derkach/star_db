import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import Row from '../row';
import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 11,
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={(i) => `${i.name} ( ${i.birthYear})`}
      />
    );
    const personDetails = <ItemDetails itemId={this.state.selectedPerson} />;
    return (
      <ErrorBoundary>
        <Row left={itemList} right={personDetails} />;
      </ErrorBoundary>
    );
  }
}
