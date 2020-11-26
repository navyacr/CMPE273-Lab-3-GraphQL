import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import backendServer from "../../config";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomerInfo } from "../../actions/customerHomeActions";
import { getCustomerOne } from "../../queries/queries";
import { graphql } from "react-apollo";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getCustomerInfo();
  }

  getCustomerInfo = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log("Loading");
    } else {
      console.log("Grapghql data:", data);
    }

    const id = localStorage.getItem("customer_id");
  };

  componentWillReceiveProps(nextProp) {
    console.log("Next prop", nextProp);
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
        yelpsince: nextProp.data.getCustomer.yelpsince.split("T")[0],
        thingsilove: nextProp.data.getCustomer.thingsilove,
        findmein: nextProp.data.getCustomer.findmein,
        website: nextProp.data.getCustomer.website,
        phonenumber: nextProp.data.getCustomer.phonenumber,
      });
    }
  }

  render() {
    const id = localStorage.getItem("customer_id");
    var imgsrc = `${backendServer}/customers/${id}/viewProfileImage`;

    return (
      <div>
        <div class="customerHome">
          <h3 style={{ color: "maroon" }}>
            {" "}
            <b>Basic details</b>
          </h3>
          <img class="profile-photo" src={imgsrc}></img>
          <p>
            {" "}
            <b>Name:</b> {this.state.name}
          </p>
          <p>
            {" "}
            <b>Date of Birth:</b> {this.state.dob}{" "}
          </p>
          <p>
            {" "}
            <b>City:</b> {this.state.city}{" "}
          </p>
          <p>
            {" "}
            <b>State:</b> {this.state.state}
          </p>
          <p>
            {" "}
            <b>Country:</b> {this.state.country}{" "}
          </p>
          <p>
            {" "}
            <b>Nickname:</b> {this.state.nickname}{" "}
          </p>
          <p>
            {" "}
            <b>Headline:</b> {this.state.headline}{" "}
          </p>
          <h3 style={{ color: "maroon" }}>
            {" "}
            <b>About</b>
          </h3>
          <p>
            {" "}
            <b>Yelping Since:</b> {this.state.yelpsince}{" "}
          </p>
          <p>
            {" "}
            <b>Things I love:</b> {this.state.thingsilove}{" "}
          </p>
          <p>
            {" "}
            <b>Find me in:</b> {this.state.findmein}{" "}
          </p>
          <p>
            {" "}
            <b>Website:</b> {this.state.website}{" "}
          </p>
          <h3 style={{ color: "maroon" }}>
            {" "}
            <b>Contact Information</b>
          </h3>
          <p>
            {" "}
            <b>Phone Number:</b> {this.state.phonenumber}{" "}
          </p>
          <p>
            {" "}
            <b>Email:</b> {this.state.email}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default graphql(getCustomerOne, {
  options: {
    // TODO get customer id from localstorage
    variables: { customer_id: "5fa869a36c8d477f85692574" },
  },
})(CustomerProfile);
