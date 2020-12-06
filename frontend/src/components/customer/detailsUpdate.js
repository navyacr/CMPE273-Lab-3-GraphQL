import React, { Component } from 'react';
import '../../App.css';
import { Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { updateCustomerMutation } from '../../mutations/mutations';

class DetailsUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
    this.update = this.update.bind(this);
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  update = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.updateCustomerMutation({
      variables: {
        phonenumber: this.state.phonenumber,

        dob: this.state.dob,
        headline: this.state.headline,
        id: localStorage.getItem('customer_id'),
        findmein: this.state.findmein,
        website: this.state.website,
        nickname: this.state.nickname,
        state: this.state.state,
        city: this.state.city,
        country: this.state.country,
        headline: this.state.headline,
      },
    });
    let response = mutationResponse.data.updateCustomer;
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
          <b>Update 'About' section:</b>
        </h3>
        <div class='form-adjust'>
          <Form onSubmit={this.update}>
            <Form.Row>
              <Form.Group as={Col} controlId='dob'>
                <Form.Label>Date of birth (mm/dd/yyyy)</Form.Label>
                <Form.Control
                  name='dob'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  name='city'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='state'>
                <Form.Label>State</Form.Label>
                <Form.Control
                  name='state'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name='country'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='nickname'>
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  name='nickname'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='headline'>
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  name='headline'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='thingsilove'>
                <Form.Label>Things I Love</Form.Label>
                <Form.Control
                  name='thingsilove'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='findmein'>
                <Form.Label>Find me in</Form.Label>
                <Form.Control
                  name='findmein'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='phonenumber'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name='phonenumber'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='website'>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  name='website'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <ButtonGroup aria-label='Third group'>
              <Button type='submit' variant='success'>
                Update
              </Button>
            </ButtonGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default graphql(updateCustomerMutation, {
  name: 'updateCustomerMutation',
})(DetailsUpdate);
