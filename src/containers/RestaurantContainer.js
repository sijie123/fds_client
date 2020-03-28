import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { addToCart, setCurrentRestaurant } from '../actions';

import Restaurant from '../components/Restaurant'; 

class RestaurantContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: null,
      food: null,
      showAlert: false,
      showSuccess: false
    };

    this.onCheckAddToCart = this.onCheckAddToCart.bind(this);
  }

  componentDidMount() {
    const restaurant = this.props.restaurants[this.props.match.params.id];
    fetch(`http://54.169.81.205:3001/restaurant/${restaurant.name}/food`, {
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
      this.props.onAddToCart(food);
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
        <Restaurant restaurant={this.state.restaurant} food={this.state.food} onAddToCart={this.onCheckAddToCart} />
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
  onAddToCart: item => {
    dispatch(addToCart(item));
  },
  onSetCurrentRestaurant: restaurant => {
    dispatch(setCurrentRestaurant(restaurant));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantContainer);