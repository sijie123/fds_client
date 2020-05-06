import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { addToCart, setCurrentRestaurant } from '../actions';

import Restaurant from '../components/Restaurant'; 

import config from "../config";

class RestaurantContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: null,
      food: null,
      showAlert: false,
      showSuccess: false,
      rating: '',
      reviews: [],
      showReviews: false
    };

    this.onViewReviews = this.onViewReviews.bind(this);
    this.onCheckAddToCart = this.onCheckAddToCart.bind(this);
  }

  componentDidMount() {
    const restaurant = this.props.restaurants[this.props.match.params.id];
    fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/restaurant/${restaurant.name}/food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => this.setState({
        restaurant: restaurant,
        food: data.food
      })
    );
  }

  onViewReviews(event, food) {
    event.preventDefault();
    if (food !== null && 'avgrating' in food && 'countrating' in food) {
      this.setState({ rating: parseFloat(food.avgrating).toFixed(2) + ' (' + food.countrating + ' reviews)'});
      if ('reviews' in food) {
        this.setState({ reviews: food.reviews });
      }
      this.setState({ showReviews: true });
    }
  }

  onCheckAddToCart(event, restaurant, food) {
    event.preventDefault();
    if (this.props.currentRestaurant !== '' && this.props.currentRestaurant !== restaurant) {
      this.setState({
        showAlert: true
      });
    } else {
      if (this.props.currentRestaurant === '') {
        this.props.onSetCurrentRestaurant(restaurant);
      }
      this.props.onAddToCart(food.fname, food.price);
      this.setState({
        showSuccess: true        
      });
    }
  }

  render() {
    if (!this.state.food) {
      return null;
    }

    return (
      <div>
        <Modal show={this.state.showAlert} onHide={() => this.setState({ showAlert: false })}>
          <Modal.Header className="errorModal" closeButton>
            Fail To Add Food To Cart!<br /><br />
            You can only add food from the same restaurants in one order. Please proceed to clear your cart first.
          </Modal.Header>
        </Modal>
        <Modal show={this.state.showSuccess} onHide={() => this.setState({ showSuccess: false })}>
          <Modal.Header className="successModal" closeButton>Added To Cart!</Modal.Header>
        </Modal>
        <Modal centered show={this.state.showReviews} onHide={() => this.setState({ showReviews: false })}>
          <Modal.Header className="updateModal">Reviews</Modal.Header>
          <Modal.Body className="allMargin">
            {this.state.rating !== '' ? <p><strong>Average Rating: {this.state.rating}</strong></p> : null}
            {this.state.reviews.map(c => <p key={'review_' + c}><em>"{c}"</em></p>)}
          </Modal.Body>
        </Modal>
        <Restaurant restaurant={this.state.restaurant} food={this.state.food} onViewReviews={this.onViewReviews} onAddToCart={this.onCheckAddToCart} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  cart: state.cart,
  currentRestaurant: state.currentRestaurant
});

const mapDispatchToProps = dispatch => ({
  onAddToCart: (itemName, itemPrice) => {
    dispatch(addToCart(itemName, itemPrice));
  },
  onSetCurrentRestaurant: restaurant => {
    dispatch(setCurrentRestaurant(restaurant));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantContainer);