import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import CustomerLoginCheck from './customerLoginCheck';
import AggregateReview from './aggregateReview';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatRestaurants } from '../../actions/customerHomeActions';
// import MapContainer from './mapComponent'
import { Widget, addResponseMessage, addUserMessage, toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const buttons = [
  { name: "All", value: "all" },
  { name: "Dinein", value: "Dinein" },
  { name: "Curbside Pickup", value: "Pickup" },
  { name: "Yelp Delivery", value: "Delivery" }
];

class messageTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      count: 0,
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      restaurants: [],
      customerId: localStorage.getItem('customer_id')
    };
    this.getRestaurants();
  } 

  componentDidMount() {
    this.setState({
      all: this.state.restaurants
    });
  }
  
  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      all : props.user,
      restaurants: props.user,
      allrestaurants: props.user,
      pageCount: Math.ceil(this.state.restaurants.length / this.state.perPage)
    }
   );
  }
  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }
    );
  };

  handleNewUserMessage = (newMessage) => {
    
    console.log(`New message incoming! ${newMessage} ${this.state.customerId} ${this.state.restaurantId}`);
    var payload = {"customerId": this.state.customerId, "restaurantId": this.state.restaurantId, "message": newMessage, "senderType": "customer"}
    axios.post(`${backendServer}/restaurants/message`, payload)
    .then((response) => {
      console.log("Updated", response)
    })
    .catch((error) => {
     console.log("Error updating:", error )
    });
    // Now send the message throught the backend API
  };
  
  getRestaurants = () => {
    this.props.getChatRestaurants();
  }

  setCount = (count) => {
    this.setState({
      qty: count
    })
  }
  sendData = (resId, resName) =>{
    console.log("ResiD:", resId, resName)
    this.setState({
      restaurantId : resId,
      resName: resName
    })
    var payload = {"customerId": localStorage.getItem("customer_id"), "restaurantId": resId }
    axios.post(`${backendServer}/restaurants/getMessage`, payload)
    .then(response => {
      console.log("Prop received:", response)
      var m = response.data.updatedList
      for(var i in m) {
        if (m[i].senderType === "restaurant") {
          addResponseMessage(m[i].message)
        } else {
          addUserMessage(m[i].message)
        }
    }
    })

    toggleWidget()

    
  }

  render() {

      var data = []

      if (this.state && this.state.restaurants && this.state.restaurants.length > 0) {
        console.log("All restaurants list:",this.state.restaurants)
        for (let i = 0; i < this.state.restaurants.length; i++) {
          
            if (this.state.restaurants[i]) {
                console.log(this.state.restaurants[i])
                var imgsrc = `${backendServer}/restaurants/${this.state.restaurants[i]._id}/viewProfileImage`;
                data.push(
                          <Card border="info" style={{ width: '100%' }}><Card.Body> 
                            <div class="d-flex">
                            <div class="mx-auto pull-left">
                            <img class="profile-photo" src={imgsrc}></img>
                            </div>
                            <div class="mx-auto pull-right" onClick={this.sendData.bind(this, this.state.restaurants[i]._id, this.state.restaurants[i].name)}>
                            {/* <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i]._id}> */}
                              <Card.Title><b>{this.state.restaurants[i].name}</b></Card.Title>
                            {/* </a> */}
                          
                          <AggregateReview resid={this.state.restaurants[i]._id}/>
                          <Card.Text><b> Delivery modes:  </b> {this.state.restaurants[i].deliverymode}</Card.Text>
                          <Card.Text><b> Cuisine:  </b> {this.state.restaurants[i].cuisine}</Card.Text>
                          <Card.Text><b> Description: </b> {this.state.restaurants[i].description}</Card.Text>
                          </div>
                          </div>
                          </Card.Body></Card>)
            }
        }
    }
    return (
      <div>
        <CustomerLoginCheck />
        <Widget
        title= {this.state.resName}
        subtitle=""
        handleNewUserMessage={this.handleNewUserMessage}
        />
       
        <div class="header_menu">
          <div class="links">
            {data}
          </div>
          <div class="social_media">
          {/* <MapContainer restaurants={this.state.restaurants}/> */}
          </div>
          <div class="clearfix"></div>
      </div>
      </div>
     )
  }
}


// export default CustomerHome;

messageTab.propTypes = {
  getChatRestaurants: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.getChatRestaurants.user
});

export default connect(mapStateToProps, { getChatRestaurants })(messageTab);