import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// // import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class CustomerLoginCheck extends Component {
  constructor(props) {
    super(props);
  } 

  render(name) {
    let redirectVar = null
    if (!localStorage.getItem("customer_id")) {
        redirectVar = <Redirect to= "/Login"/>
    }
    return (
        <div>
            {redirectVar}
        </div>
    )
  }
}


export default CustomerLoginCheck;