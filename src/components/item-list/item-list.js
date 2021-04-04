import React, { Component } from 'react';
import Spinner from '../spinner';
import './item-list.css';
export default class ItemList extends Component {
  // swapiService = new SwapiService();

  state = {
    itemList: null,
  };
  componentDidMount() {
    const { getData } = this.props;

    getData().then((itemList) => {
      this.setState({ itemList });
    });
  }
  // renderDit({ gender, model, population }) {
  //   if (gender) {
  //     return gender;
  //   }
  //   if (model) {
  //     return model;
  //   }
  //   if (population) {
  //     return population;
  //   }

  //   // const {gender, model, population } = this.props
  // }
  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      // console.log(this.props.children);
      const label = this.props.renderItem(item);
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;
    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
