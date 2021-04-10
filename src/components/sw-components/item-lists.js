import React from 'react';
import {
  compose,
  withChildFunction,
  withData,
  withSwapiService,
} from '../hoc-helpers';
import ItemList from '../item-list';

const renderName = ({ name }) => <span>{name}</span>;
const renderModelandName = ({ name, model }) => (
  <span>
    {name} '{model}'
  </span>
);
const mapPersonMethodsToProps = (swapService) => {
  return {
    getData: swapService.getAllPeople,
  };
};
const mapPlanetMethodsToProps = (swapService) => {
  return {
    getData: swapService.getAllPlanets,
  };
};
const mapStarshipMethodsToProps = (swapService) => {
  return {
    getData: swapService.getAllStarships,
  };
};
const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  withData,
  withChildFunction(renderModelandName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };
