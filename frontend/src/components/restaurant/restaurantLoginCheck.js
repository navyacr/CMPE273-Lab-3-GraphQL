import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';

class RestaurantLoginCheck extends Component {
  constructor(props) {
    super(props);
  } 

  render(name) {
    let redirectVar = null
    if (!localStorage.getItem("restaurant_id")) {
        redirectVar = <Redirect to= "/Login"/>
    }
    return (
        <div>
            {redirectVar}
        </div>
    )
  }
}


export default RestaurantLoginCheck;