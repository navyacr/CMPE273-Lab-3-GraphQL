import React, { Component } from 'react';
import '../../App.css';
import backendServer from '../../config';
import RestaurantLoginCheck from './restaurantLoginCheck';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { oneEventAttendeeView } from '../../actions/oneEventAttendeeViewActions';


class OneEventAttendeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.oneEventAttendeeView(this.props.match.params.cusid);
  } 
 
  render() {
    var imgsrc = `${backendServer}/customers/${this.props.match.params.cusid}/viewProfileImage`;
    return (
        <div>
          <RestaurantLoginCheck/>
                <div class="restaurantHome">
                    <h3 style={{color: "maroon"}}> <b>{ this.props.user.name } </b></h3>
                    <img class="profile-photo" src={imgsrc}></img>
                    <p> <b>Email:</b> {this.props.user.email}</p>                    
                    <p> <b>Phone:</b> {this.props.user.phonenumber} </p>
                    <p> <b>City:</b> {this.props.user.city} </p>
                    <p> <b>State:</b> {this.props.user.state}</p>
                    <p> <b>Country:</b> {this.props.user.country} </p>
                <h3 style={{color: "maroon"}}> <b>More Details: </b></h3>
                    <p> <b>DOB:</b> {this.props.user.dob}</p>                    
                    <p> <b>Nickname:</b> {this.props.user.nickname} </p>
                    <p> <b>Headline:</b> {this.props.user.headline} </p>
                    <p> <b>Things I Love:</b> {this.props.user.thingsilove}</p>
                    <p> <b>Website:</b> {this.props.user.website} </p>
                </div>
            </div>
    )
  }
}


OneEventAttendeeView.propTypes = {
  oneEventAttendeeView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.oneEventAttendeeView.user
});

export default connect(mapStateToProps, { oneEventAttendeeView })(OneEventAttendeeView);