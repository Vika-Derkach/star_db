import React from 'react';
import SwapService from '../../services/swapi-service';
import { withData } from '../hoc-helpers';
import ItemList from '../item-list';

const swapService = new SwapService();

const { getAllPeople, getAllStarships, getAllPlanets } = swapService;
const withChildFunction = (Wrapped, fn) => {
  return (props) => <Wrapped {...props}>{fn}</Wrapped>;
};
const renderName = ({ name }) => <span>{name}</span>;
const renderModelandName = ({ name, model }) => (
  <span>
    {name} '{model}'
  </span>
);
const PersonList = withData(
  withChildFunction(ItemList, renderName),
  getAllPeople
);
const PlanetList = withData(
  withChildFunction(ItemList, renderName),
  getAllPlanets
);
const StarshipList = withData(
  withChildFunction(ItemList, renderModelandName),
  getAllStarships
);
export { PersonList, PlanetList, StarshipList };
