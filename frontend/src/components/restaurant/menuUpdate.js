import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import backendServer from '../../config';
import { graphql } from 'react-apollo';
import { addMenuMutation } from '../../mutations/mutations';

class MenuUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHandler = this.changeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  onImageUpload = (e) => {
    this.setState({
      filename: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onUserUpload = (e) => {
    const formData = new FormData();
    formData.append('image', this.state.filename);
    const uploadConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(
        `${backendServer}/restaurants/${this.props.user._id}/dishImage`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert('Image uploaded successfully!');
        this.setState({
          userFileText: 'Choose file...',
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log('Error');
      });
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitUpdate = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.addMenuMutation({
      variables: {
        name: this.state.name,
        category: this.state.category,
        description: this.state.description,
        ingredients: this.state.ingredients,
        price: this.state.price,
        restaurantId: localStorage.getItem('restaurant_id'),
      },
    });
    let response = mutationResponse.data.addMenu;
    console.log('resp:', response);
    if (response) {
      console.log('Login response:', response);
      if (response.id) {
        this.setState({
          success: true,
        });
        alert('Item added successfully');
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
          <b>Update Restaurant Menu:</b>
        </h3>
        <div class='form-adjust'>
          <Form onSubmit={this.submitUpdate}>
            <Form.Row>
              <Form.Group as={Col} controlId='name'>
                <Form.Label>Dish Name</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name='description'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId='ingredients'>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  name='ingredients'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name='category'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name='price'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>
            <ButtonGroup aria-label='Third group'>
              <Button type='submit' variant='success'>
                Update Menu
              </Button>
            </ButtonGroup>
          </Form>
          <form onSubmit={this.onUserUpload}>
            <br />
            <br />
            <br />
            <div class='custom-file' style={{ width: '80%' }}>
              <input
                type='file'
                class='custom-file-input'
                name='filename'
                accept='image/*'
                onChange={this.onImageUpload}
                required
              />
              <label class='custom-file-label' for='user-file'>
                {this.state.fileText}
              </label>
            </div>
            <br />
            <br />
            <Button type='submit' variant='success'>
              Upload
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default graphql(addMenuMutation, {
  name: 'addMenuMutation',
})(MenuUpdate);
