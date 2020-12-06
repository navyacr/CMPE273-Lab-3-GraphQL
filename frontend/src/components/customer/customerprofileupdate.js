import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Col, Form, Button, ButtonGroup } from 'react-bootstrap';
import backendServer from '../../config';
import DetailsUpdate from './detailsUpdate';
import { graphql } from 'react-apollo';
import { updateCustomerMutation } from '../../mutations/mutations';

class CustomerProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText: 'ChooseImage..',
      customerId: localStorage.getItem('customer_id'),
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.update = this.update.bind(this);
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
        `${backendServer}/customers/${this.state.customerId}/uploadImage`,
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
  update = async (e) => {
    e.preventDefault();
    let mutationResponse = await this.props.updateCustomerMutation({
      variables: {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
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
    var imgsrc = `https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png`;
    return (
      <div>
        <h3 style={{ color: 'maroon' }}>
          {' '}
          <b>Update details:</b>
        </h3>
        <img class='profile-photo' src={imgsrc}></img>
        <form onSubmit={this.onUserUpload}>
          <br />
          <br />
          <br />
          <div class='custom-file' style={{ width: '20%' }}>
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
        <h3 style={{ color: 'maroon' }}>
          {' '}
          <b>Basic details update:</b>
        </h3>
        <div class='form-adjust'>
          <Form onSubmit={this.update}>
            <Form.Row>
              <Form.Group as={Col} controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name='email'
                  type='text'
                  onChange={this.changeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
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
        <div>
          <DetailsUpdate />
        </div>
      </div>
    );
  }
}

export default graphql(updateCustomerMutation, {
  name: 'updateCustomerMutation',
})(CustomerProfileUpdate);
