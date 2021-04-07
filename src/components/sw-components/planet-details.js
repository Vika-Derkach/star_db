import React from 'react';
import { withSwapiService } from '../hoc-helpers';
import ItemDetails, { Record } from '../item-details';

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="population" label="Population" />
      <Record field="diameter" label="Diameter" />
      <Record field="rotationPeriod" label="Rotation Period" />
    </ItemDetails>
  );
};
const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage,
  };
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);
