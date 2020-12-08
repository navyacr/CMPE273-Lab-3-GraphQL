import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import './pagination.css';
import { getRestaurantOrders } from '../../queries/queries';
import { graphql } from 'react-apollo';

const buttons = [
  { name: 'All', value: 'all' },
  { name: 'New', value: 'Order Received' },
  { name: 'Delivered', value: 'Delivered' },
  { name: 'Picked Up', value: 'Picked Up' },
  { name: 'Cancelled', value: 'Cancelled' },
];

class RestaurantViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      orders: [],
    };
    this.restaurantViewOrders();
  }
  restaurantViewOrders = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log('Loading');
    } else {
      console.log('Grapghql data:', data);
      this.setState({
        orders: this.props.data,
      });
    }
  };
  componentWillReceiveProps(props) {
    console.log('order props:', props);
    this.setState({
      allorders: props.data.getRestaurantOrders,
      orders: props.data.getRestaurantOrders,
      pageCount: Math.ceil(this.state.orders.length / this.state.perPage),
    });
  }

  handleClick = (name) => {
    console.log(name, this.state.allorders);
    let filteredData = [];
    if (name === 'all') {
      this.setState({ orders: this.state.allorders });
      return;
    }
    filteredData = this.state.allorders.filter(
      (orders) => orders.status === name
    );
    console.log('Filtered data: ', filteredData);
    this.setState({ orders: filteredData });
  };

  update = () => {
    const id = localStorage.getItem('restaurant_id');
    axios
      .post(`${backendServer}/restaurants/${id}/orders`, {
        orders: this.props.user,
      })
      .then((response) => {
        alert('Order status updated.');
        this.props.restaurantViewOrders();
      });
  };
  onSelect = (e) => {
    console.log('Changed', e.value);
    console.log(e.label);
    this.props.user[e.value].status = e.label;
    console.log(this.props.user);
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };

  render() {
    var data = [];

    if (this.state.orders && this.state.orders.length > 0) {
      for (var i = 0; i < this.state.orders.length; i++) {
        let imgsrc =
          'data:image/png;base64,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';
        let options = [];
        let dropdown = <div></div>;
        if (this.state.orders[i].dm) {
          let method = this.state.orders[i].dm;
          if (method === 'Delivery') {
            options = [
              { label: 'Preparing', value: i },
              { label: 'On the way', value: i },
              { label: 'Delivered', value: i },
            ];
          }
          if (method === 'Pickup') {
            options = [
              { label: 'Preparing', value: i },
              { label: 'Pick up Ready', value: i },
              { label: 'Picked up', value: i },
            ];
          }
          if (
            this.state.orders[i].status !== 'Cancelled' &&
            this.state.orders[i].dm !== 'Dinein'
          ) {
            dropdown = dropdown = (
              <Dropdown
                options={options}
                label={this.state.orders[i]._id}
                onChange={this.onSelect}
                placeholder='Status'
              />
            );
          }
        }

        data.push(
          <Card
            border='info'
            border-width='10px'
            style={{ width: '50%', color: 'black' }}
          >
            {' '}
            <Card.Body>
              <div class='d-flex'>
                <div class='mx-auto pull-left'>
                  <Card.Img
                    variant='top'
                    class='dish-image'
                    src={imgsrc}
                  ></Card.Img>
                </div>
                <div class='mx-auto pull-right'>
                  <Card.Title>
                    <b>Customer Name:</b>
                  </Card.Title>
                  <a
                    style={{ cursor: 'pointer' }}
                    href={
                      '/oneCustomerView/' + this.state.orders[i].customerId._id
                    }
                  >
                    <Card.Title>
                      <b>{this.state.orders[i].customerId.name}</b>
                    </Card.Title>
                  </a>
                  <Card.Text>
                    <b>Dish name: {this.state.orders[i].dishId.name}</b>
                  </Card.Text>
                  <Card.Text>
                    <b> {this.state.orders[i].dishId.price} USD</b>
                  </Card.Text>
                  <Card.Text>
                    <b> Quantity: {this.state.orders[i].qty}</b>
                  </Card.Text>
                  <Card.Text>
                    <b> Status: {this.state.orders[i].status} </b>
                  </Card.Text>
                  <Card.Text>
                    <b> {this.state.orders[i].dm} </b>
                  </Card.Text>
                  {dropdown}
                </div>
              </div>
            </Card.Body>{' '}
          </Card>
        );
      }
    }

    return (
      <div>
        <div>
          {buttons.map(({ name, value }) => (
            <button
              class='btn btn-primary pad'
              key={name}
              value={value}
              onClick={this.handleClick.bind(this, value)}
            >
              {name}
            </button>
          ))}
        </div>
        {data}
        <button class='btn btn-primary' onClick={this.update}>
          Update
        </button>
      </div>
    );
  }
}

export default graphql(getRestaurantOrders, {
  options: {
    variables: { restaurant_id: localStorage.getItem('restaurant_id') },
  },
})(RestaurantViewOrders);
