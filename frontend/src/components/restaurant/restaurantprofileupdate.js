import React, { Component } from 'react';
import '../../App.css';
import { Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import { graphql } from 'react-apollo';
import { updateRestaurantMutation } from '../../mutations/mutations';
import { Redirect } from 'react-router';

class RestaurantProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { name: 'Dinein', id: 1 },
        { name: 'Pickup', id: 2 },
        { name: 'Delivery', id: 3 },
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  onSelect(selectedList, selectedItem) {
    let dm = '';
    for (let item of selectedList) {
      dm += item.name;
      dm += ' ';
    }
    console.log('Selected list: ', dm);
    this.setState({
      deliverymode: dm,
    });
  }

  onRemove(selectedList, removedItem) {
    console.log('remove: ', selectedList);
    let dm = '';
    for (let item of selectedList) {
      dm += item.name;
      dm += ' ';
    }
    console.log('Selected list: ', dm);
    this.setState({
      deliverymode: dm,
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onUpdate = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.updateRestaurantMutation({
      variables: {
        name: this.state.name,
        contact: this.state.contact,
        email: this.state.email,
        description: this.state.description,
        cuisine: this.state.cuisine,
        id: localStorage.getItem('restaurant_id'),
        timings: this.state.timings,
        location: this.state.location,
        deliverymode: this.state.deliverymode,
      },
    });
    let response = mutationResponse.data.updateRestaurant;
    console.log('resp:', response);
    if (response) {
      if (response.id) {
        this.setState({
          success: true,
        });
        alert('Profile Updated');
      } else {
        alert('Error occured!! Try again');
      }
    }
  };

  render() {
    return (
      <div>
        <h3 style={{ color: 'maroon' }}>
          {' '}
          <b>Update restaurant details:</b>
        </h3>
        <div class='form-adjust'>
          <Form onSubmit={this.onUpdate}>
            <Form.Row>
              <Form.Group as={Col} controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name='description'
                  type='text'
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='email'>
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='password'>
                <Form.Label>Change Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  onChange={this.onChange}
                  value={this.state.password}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='cuisine'>
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  name='cuisine'
                  type='text'
                  onChange={this.onChange}
                  value={this.state.cuisine}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='contact'>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  name='contact'
                  type='text'
                  onChange={this.onChange}
                  value={this.state.contact}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='location'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name='location'
                  type='text'
                  onChange={this.onChange}
                  value={this.state.location}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='timings'>
                <Form.Label>Timings</Form.Label>
                <Form.Control
                  name='timings'
                  type='text'
                  onChange={this.onChange}
                  value={this.state.timings}
                />
              </Form.Group>
            </Form.Row>
            <p>Select modes of delivery offered:</p>

            <Multiselect
              options={this.state.options} // Options to display in the dropdown
              selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={this.onSelect} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
            />

            <ButtonGroup aria-label='Third group'>
              <Button type='submit' variant='success'>
                Update Details
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default graphql(updateRestaurantMutation, {
  name: 'updateRestaurantMutation',
})(RestaurantProfileUpdate);
