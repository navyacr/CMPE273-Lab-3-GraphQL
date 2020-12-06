import React, { Component } from 'react';
import '../../App.css';
// import backendServer from '../../config';
import RestaurantLoginCheck from './restaurantLoginCheck';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { oneEventAttendeeView } from '../../actions/oneEventAttendeeViewActions';
import axios from 'axios';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
// import { getMessages, sendMessages } from '../../actions/allCustomersActions';
import { getCustomerOne } from '../../queries/queries';
import { graphql } from 'react-apollo';

class OneCustomerView extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = {
      customerId: this.props.match.params.cusid,
      restaurantId: localStorage.getItem('restaurant_id'),
    };
    // this.props.oneEventAttendeeView(this.props.match.params.cusid);

    this.props.getMessages({
      customerId: this.state.customerId,
      restaurantId: this.state.restaurantId,
    });
    this.getCustomerInfo();
  }
  getCustomerInfo = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log('Loading');
    } else {
      console.log('Grapghql data:', data);
    }

    const id = localStorage.getItem('customer_id');
  };

  handleNewUserMessage = (newMessage) => {
    console.log(
      `New message incoming! ${newMessage} ${this.state.customerId} ${this.state.restaurantId}`
    );
    var payload = {
      customerId: this.state.customerId,
      restaurantId: this.state.restaurantId,
      message: newMessage,
      senderType: 'restaurant',
    };
    this.props.sendMessages(payload);
    // this.props.getMessages({
    //   customerId: this.state.customerId,
    //   restaurantId: this.state.restaurantId
    // })
    // axios.post(`${backendServer}/restaurants/message`, payload)
    // .then((response) => {
    //   console.log("Updated", response)
    // })
    // .catch((error) => {
    //  console.log("Error updating:", error )
    // });
    // Now send the message throught the backend API
  };

  componentWillReceiveProps(nextProp) {
    console.log('Next prop', nextProp);
    if (!nextProp.data.loading) {
      this.setState({
        name: nextProp.data.getCustomer.name,
        email: nextProp.data.getCustomer.email,
        customerId: nextProp.data.getCustomer._id,
        dob: nextProp.data.getCustomer.dob,
        city: nextProp.data.getCustomer.city,
        state: nextProp.data.getCustomer.state,
        country: nextProp.data.getCustomer.country,
        nickname: nextProp.data.getCustomer.nickname,
        headline: nextProp.data.getCustomer.headline,
        yelpsince: nextProp.data.getCustomer.yelpsince.split('T')[0],
        thingsilove: nextProp.data.getCustomer.thingsilove,
        findmein: nextProp.data.getCustomer.findmein,
        website: nextProp.data.getCustomer.website,
        phonenumber: nextProp.data.getCustomer.phonenumber,
      });
    }
  }

  render() {
    var imgsrc = `https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png`;
    return (
      <div>
        <Widget
          subtitle=''
          title={this.props.user.name}
          handleNewUserMessage={this.handleNewUserMessage}
        />
        <RestaurantLoginCheck />
        <div class='restaurantHome'>
          <h3 style={{ color: 'maroon' }}>
            {' '}
            <b>{this.props.user.name} </b>
          </h3>
          <img class='profile-photo' src={imgsrc}></img>
          <p>
            {' '}
            <b>Email:</b> {this.props.user.email}
          </p>
          <p>
            {' '}
            <b>Phone:</b> {this.props.user.phonenumber}{' '}
          </p>
          <p>
            {' '}
            <b>City:</b> {this.props.user.city}{' '}
          </p>
          <p>
            {' '}
            <b>State:</b> {this.props.user.state}
          </p>
          <p>
            {' '}
            <b>Country:</b> {this.props.user.country}{' '}
          </p>
          <h3 style={{ color: 'maroon' }}>
            {' '}
            <b>More Details: </b>
          </h3>
          <p>
            {' '}
            <b>DOB:</b> {this.props.user.dob}
          </p>
          <p>
            {' '}
            <b>Nickname:</b> {this.props.user.nickname}{' '}
          </p>
          <p>
            {' '}
            <b>Headline:</b> {this.props.user.headline}{' '}
          </p>
          <p>
            {' '}
            <b>Things I Love:</b> {this.props.user.thingsilove}
          </p>
          <p>
            {' '}
            <b>Website:</b> {this.props.user.website}{' '}
          </p>
        </div>
      </div>
    );
  }
}

// OneCustomerView.propTypes = {
//   oneEventAttendeeView: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   getMessages: PropTypes.func.isRequired,
//   sendMessages: PropTypes.func.isRequired,
//   messages: PropTypes.array.isRequired,
//   // sent: PropTypes.array.isRequired

// }

// const mapStateToProps = state => ({
//   user: state.oneEventAttendeeView.user,
//   messages : state.getMessages.messages,
//   // sent: state.sendMessages.sent
// });

// export default connect(mapStateToProps, { oneEventAttendeeView, getMessages, sendMessages })(OneCustomerView);

export default graphql(getCustomerOne, {
  options: {
    variables: { customer_id: '5fa869a36c8d477f85692574' },
  },
})(OneCustomerView);
