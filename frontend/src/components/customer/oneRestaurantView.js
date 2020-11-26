import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import backendServer from "../../config";
import CustomerLoginCheck from "./customerLoginCheck";
import OneRestaurantMenuView from "./oneRestaurantMenuView";
// import CustomerAddReview from "./customerAddReview";
// import CustomerViewReview from "./customerViewReview";
import Dropdown from "react-dropdown";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRestaurantInfo } from "../../actions/customerHomeActions";
import { getRestaurantOne } from "../../queries/queries";
import { graphql } from "react-apollo";

class OneRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantInfo();
    // this.props.getRestaurantInfo(this.props.match.params.resid);
  }

  getRestaurantInfo = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log("Loading");
    } else {
      console.log("Grapghql data:", data);
      console.log("params", this.props.match.params.resid);
    }
  };

  componentWillReceiveProps(props) {
    console.log("received props: ", props);
    this.setState({
      name: props.data.getRestaurant.name,
      email: props.data.getRestaurant.email,
      restaurantId: props.data.getRestaurant.id,
      description: props.data.getRestaurant.description,
      contact: props.data.getRestaurant.contact,
      timings: props.data.getRestaurant.timings,
      location: props.data.getRestaurant.location,
      deliverymode: props.data.getRestaurant.deliverymode,
    });
    //  console.log("Page count?", this.state.pageCount)
  }

  _onSelect = (val) => {
    this.setState({
      selectedDm: val.value,
    });
  };
  render() {
    console.log("DM: ", this.state.deliverymode);
    if (this.state.deliverymode) {
      var options = this.state.deliverymode.split(" ");
    }
    var imgsrc = `${backendServer}/restaurants/${this.props.match.params.resid}/viewProfileImage`;
    return (
      <div>
        <CustomerLoginCheck />
        <div class="restaurantHome">
          <h2 style={{ color: "maroon" }}>
            {" "}
            <b>{this.state.name} </b>
          </h2>
          <img class="profile-photo" src={imgsrc}></img>
          <p>
            {" "}
            <b>Description:</b> {this.state.description}
          </p>
          <p>
            {" "}
            <b>Phone:</b> {this.state.contact}{" "}
          </p>
          <p>
            {" "}
            <b>Email:</b> {this.state.email}{" "}
          </p>
          <p>
            {" "}
            <b>Our Address:</b> {this.state.location}
          </p>
          <p>
            {" "}
            <b>Timings:</b> {this.state.timings}{" "}
          </p>
          <p>
            {" "}
            <b>Delivery Modes offered:</b> {this.state.deliverymode}{" "}
          </p>
        </div>
        <div>
          <h4 style={{ color: "maroon" }}>
            {" "}
            <b> Menu: </b>
          </h4>
          <p>Select mode of delivery: </p>
          <Dropdown
            options={options}
            value={this.state.selectedDm}
            onChange={this._onSelect}
            placeholder="Delivery mode"
          />
          <OneRestaurantMenuView
            dm={this.state.selectedDm}
            resid={this.props.match.params.resid}
          />
          {/* <CustomerAddReview resid={this.props.match.params.resid} />
          <CustomerViewReview resid={this.props.match.params.resid} /> */}
        </div>
      </div>
    );
  }
}

export default graphql(getRestaurantOne, {
  options: {
    // TODO
    variables: { restaurant_id: "5fa85cdb0f0d477c9147c39f" },
  },
})(OneRestaurantView);
