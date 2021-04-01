import React, { Component } from 'react';
import './button-toggle.css';
// import RandomPlanet from '../random-planet'
export default class ButtonToggle extends Component {
  //   const {updatePlanet} = this.props;
  //   onToggleRandom({updatePlanet}) {
  //     //   const {updatePlanet} = this.props

  //   }

  //   onToggle= (item)=>{

  //   }
  render() {
    return (
      <div>
        <button className="button-toggle" onClick={this.onToggle}>
          toggle Random PLanet
        </button>
      </div>
    );
  }
}

// const ButtonToggle = ({ updatePlanet }) => {
//   //    onToggleRandom() {
//   //     // updatePlanet;
//   //   }
//   const {updatePlanet} = this.props;
//   return (
//     <div>
//       <button className="button-toggle" onClick={() => updatePlanet()}>
//         toggle Random PLanet
//       </button>
//     </div>
//   );
// };

// export default ButtonToggle;
