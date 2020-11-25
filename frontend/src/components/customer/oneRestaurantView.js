import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import CustomerLoginCheck from './customerLoginCheck';
import OneRestaurantMenuView from './oneRestaurantMenuView';
import CustomerAddReview from './customerAddReview';
import CustomerViewReview from './customerViewReview';
import Dropdown from 'react-dropdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurantInfo } from '../../actions/customerHomeActions';


class OneRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.getRestaurantInfo();
    this.props.getRestaurantInfo(this.props.match.params.resid);
  } 

  getRestaurantInfo = () => {

    
     
    // axios.get(`${backendServer}/restaurants/${this.props.match.params.resid}/info`)
    // .then(response => {
    //     let values = response.data.updatedList
    //     this.setState({
    //         name: values.name,
    //         email: values.email,
    //         restaurantId: values.id,
    //         description: values.description,
    //         contact: values.contact,
    //         timings: values.timings,
    //         location: values.location,
    //         deliverymode: values.deliverymode

    //     });
    // });

  }

  componentWillReceiveProps(props){
    console.log("received props: ", props)
    this.setState({
      
      name: props.resInfo.name,
      email: props.resInfo.email,
      restaurantId: props.resInfo.id,
      description: props.resInfo.description,
      contact: props.resInfo.contact,
      timings: props.resInfo.timings,
      location: props.resInfo.location,
      deliverymode: props.resInfo.deliverymode

    }
   );	
  //  console.log("Page count?", this.state.pageCount)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("props print:", nextProps)
  //   return nextProps.email != this.props.email;
    
  // }

  _onSelect = (val) => {
    this.setState({
      selectedDm : val.value
    })
  }
  render() {
    console.log("DM: ", this.state.deliverymode)
    if (this.state.deliverymode) {
      var options = this.state.deliverymode.split(" ");
    }
    var imgsrc = `${backendServer}/restaurants/${this.props.match.params.resid}/viewProfileImage`;
    return (
        <div>
          <CustomerLoginCheck/>
                <div class="restaurantHome">
                    <h2 style={{color: "maroon"}}> <b>{ this.state.name } </b></h2>
                    <img class="profile-photo" src={imgsrc}></img>
                    <p> <b>Description:</b> {this.state.description}</p>                    
                    <p> <b>Phone:</b> {this.state.contact} </p>
                    <p> <b>Email:</b> {this.state.email} </p>
                    <p> <b>Our Address:</b> {this.state.location}</p>
                    <p> <b>Timings:</b> {this.state.timings} </p>
                    <p> <b>Delivery Modes offered:</b> {this.state.deliverymode} </p>
                </div>
                <div>
                  <h4 style={{color: "maroon"}}> <b> Menu: </b></h4>
                  <p>Select mode of delivery: </p>
                  < Dropdown options={options} value={this.state.selectedDm} onChange={this._onSelect}  placeholder="Delivery mode" />
                  < OneRestaurantMenuView dm={this.state.selectedDm} resid={this.props.match.params.resid}/>
                  < CustomerAddReview resid={this.props.match.params.resid}/>
                  <CustomerViewReview resid={this.props.match.params.resid}/>
                </div>
            </div>
    )
  }
}


// export default OneRestaurantView;

OneRestaurantView.propTypes = {
  getRestaurantInfo: PropTypes.func.isRequired,
  resInfo: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
  resInfo: state.getRestaurantInfo.resInfo
});

export default connect(mapStateToProps, { getRestaurantInfo })(OneRestaurantView);
