import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import CustomerLoginCheck from './customerLoginCheck';
import StarRatings from 'react-star-ratings';


class AggregateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getAggregateReview();
  } 

  getAggregateReview = () => {
     console.log("Res id in review:", this.props.resid)
    axios.get(`${backendServer}/customers/${this.props.resid}/aggreviews`)
    .then(response => {
      console.log(response.data[0])
        this.setState({
            aggreviews: response.data[0]
        });
    });
  }

  render() {
    let mean = 0
      if (this.state.aggreviews && Number(this.state.aggreviews.count)>0){
      mean = Number(this.state.aggreviews.total)/Number(this.state.aggreviews.count)
      }
      if (this.state.aggreviews){
      var data = <div>
                <StarRatings
                rating={mean}
                starRatedColor="red"
                starDimension="15px"
                starSpacing='2px'
                numberOfStars={5}
                changeRating=""
                name='rating' />  {this.state.aggreviews.count} review(s)
                </div>

    }

    return (
      <div>
        {data}
      </div>
   )
  }
}

export default AggregateReview;