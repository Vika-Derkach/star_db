import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './item-details.css';
const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Record };
export default class ItemDetails extends Component {
  swapiService = new SwapiService();
  state = {
    item: null,
    image: null,
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.updateItem();
    }
  }
  onItemLoaded = (item) => {
    const { getImageUrl } = this.props;

    const image = getImageUrl(item);

    this.setState({ item, loading: false, image });
  };
  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then(this.onItemLoaded).catch(this.onError);
  }

  render() {
    const { item, image } = this.state;
    if (!this.state.item) {
      return <span>Select a item from the list</span>;
    }
    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="item" />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              if (!child) {
                return null;
              }
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
      </div>
    );
    // const { item, loading, error, image } = this.state;
    // const hasData = !(loading || error);
    // const errorMassage = error ? <ErrorIndicator /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = hasData ? <ItemView image={image} item={item} /> : null;

    // return (
    //   <div className="item-details card">
    //     {spinner}
    //     {content}
    //     {errorMassage}
    //   </div>
    // );
  }
}

// const ItemView = ({ item, image }) => {
//   const { id, name, gender, birthYear, eyeColor } = item;
//   return (
//     <React.Fragment>
//       <img className="item-image" src={image} alt="item" />
//       <div className="card-body">
//         <h4>{name}</h4>
//         <ul className="list-group list-group-flush">{this.props.children}</ul>
//       </div>
//     </React.Fragment>
//   );
// };
