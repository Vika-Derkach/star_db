import React from 'react';
import { withData, withSwapiService } from '../hoc-helpers';
import ItemList from '../item-list';

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => <Wrapped {...props}>{fn}</Wrapped>;
};
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
const PersonList = withSwapiService(mapPersonMethodsToProps)(
  withData(withChildFunction(renderName)(ItemList))
);
const PlanetList = withSwapiService(mapPlanetMethodsToProps)(
  withData(withChildFunction(renderName)(ItemList))
);
const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
  withData(withChildFunction(renderModelandName)(ItemList))
);
export { PersonList, PlanetList, StarshipList };
