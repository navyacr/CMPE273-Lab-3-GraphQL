import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import { restaurantViewOrders } from '../../actions/restaurantViewOrdersActions';

const buttons = [
  { name: "All", value: "all" },
  { name: "New", value: "Order Received" },
  { name: "Delivered", value: "Delivered" },
  { name: "Picked Up", value: "Picked Up" },
  { name: "Cancelled", value: "Cancelled" },
  
];

class RestaurantViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      dishes: []
    };
    this.props.restaurantViewOrders();
    
  } 
  componentWillReceiveProps(props) {
    console.log("props:", props)
    this.setState({
      allorders: props.user,
      orders: props.user,
      // pageCount: Math.ceil(this.state.orders.length / this.state.perPage)
    });
  }

  handleClick = (name) => {
    // this.setState({
    //   allorders: this.props.user,
    //   orders: this.props.user
    // });
    console.log(name, this.state.allorders)
    let filteredData = [];
    if (name === "all"){
      this.setState({orders: this.state.allorders})
      return
    }
    filteredData = this.state.allorders.filter(
          orders => orders.status === name
    );  
    console.log("Filtered data: ", filteredData)
    this.setState({ orders: filteredData });
  };

  update = () => {
    const id = localStorage.getItem('restaurant_id')
    axios.post(`${backendServer}/restaurants/${id}/orders`, {orders: this.props.user})
    .then(response => {
      alert ("Order status updated.");
      this.props.restaurantViewOrders();
        
    });

  }
  onSelect = (e) => {
    console.log("Changed", e.value)
    console.log(e.label)
    this.props.user[e.value].status = e.label
    console.log(this.props.user)
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


  render() {
    // const count = this.state.orders.length;
    // console.log('orders: ', this.props.user)
    // const slice = this.state.orders.slice(this.state.offset, this.state.offset + this.state.perPage);
    // const testResult = slice.map((item,key)=>
      
    //   <div class="row">
        
    //     <Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}><Card.Body> 
    //       <div class="d-flex">
    //         <div class="mx-auto pull-left">
    //           <Card.Img variant="top" class="dish-image" src={backendServer+"/restaurants/"+item.dishId._id+"/dishImage"}></Card.Img>
    //         </div>
    //       <div class="mx-auto pull-right">
    //           <Card.Title><b>{item.name}</b></Card.Title>
              
    //           <Card.Text><b> Category: </b> {item.category}</Card.Text>
    //           <Card.Text><b> Ingredients: </b> {item.ingredients}</Card.Text>
    //           <Card.Text><b> Description: </b> {item.description}</Card.Text>
    //           <Card.Text><b> Price: </b> {item.price} USD</Card.Text>
    //       </div>
    //     </div>
    //     </Card.Body>
    //     </Card>
    //     <br/>
    //     <br/>
    //     <br/>
    //   </div> 
    // );
    // let paginationElement = (
    //   <ReactPaginate
    //     previousLabel={"← Previous"}
    //     nextLabel={"Next →"}
    //     breakLabel={<span className="gap">...</span>}
    //     pageCount={Math.ceil(this.state.dishes.length / this.state.perPage) > 1 ? Math.ceil(this.state.dishes.length / this.state.perPage) : 10}
    //     onPageChange={this.handlePageClick}
    //     forcePage={this.state.currentPage}
    //     containerClassName={"pagination"}
    //     previousLinkClassName={"previous_page"}
    //     nextLinkClassName={"next_page"}
    //     disabledClassName={"disabled"}
    //     activeClassName={"active"}
    //   />
    // );

      var data = []

      if (this.state.orders && this.state.orders.length > 0) {
        
        for (var i = 0; i < this.state.orders.length; i++) {
          let imgsrc = `${backendServer}/restaurants/${this.state.orders[i].dishId._id}/dishImage`
          let options = []
          let dropdown =<div></div>
            if (this.state.orders[i].dm) {
              let method = this.state.orders[i].dm
              if (method === "Delivery") {
                
                options = [{label: "Preparing", value: i}, {label: "On the way", value: i}, {label: "Delivered", value: i}]
              }
              if (method === "Pickup") {
                
                options = [{label: "Preparing", value: i}, {label: "Pick up Ready", value: i}, {label: "Picked up", value: i}]
              }
              if ((this.state.orders[i].status !== "Cancelled") && (this.state.orders[i].dm !== "Dinein")) {
                dropdown=dropdown=<Dropdown options={options} label={this.state.orders[i]._id} onChange={this.onSelect} placeholder="Status" />
              }
            }
          
            data.push(<Card border='info' border-width='10px' style={{ width: '50%' , color: 'black' , }}> <Card.Body> 
                          <div class="d-flex">
                            <div class="mx-auto pull-left">
                            <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                            </div>
                            <div class="mx-auto pull-right">
                          <Card.Title><b>Customer Name:</b></Card.Title>
                          <a style={{ cursor: 'pointer' }} href={"/oneCustomerView/" + this.state.orders[i].customerId._id}>
                          <Card.Title><b>{this.state.orders[i].customerId.name}</b></Card.Title>
                          </a>
                          <Card.Text><b>Dish name: {this.state.orders[i].dishId.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dishId.price} USD</b></Card.Text>
                          <Card.Text><b> Quantity: {this.state.orders[i].qty}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dm} </b></Card.Text>
                          {dropdown}
                          </div>
                          </div>
                      </Card.Body> </Card>)
        }
    }

    return (
      <div>
        <div>
          {buttons.map(({ name, value }) => (
            <button
              class="btn btn-primary pad"
              key={name}
              value={value}
              onClick={this.handleClick.bind(this, value)}
            >
              {name}
            </button>
          ))}
        </div>
        {data}
        {/* <div className="panel">
          
            <div className="panel-body">
              <div>{testResult}</div> 
            </div>
            {paginationElement}
        </div> */}
        <button class="btn btn-primary" onClick={this.update}>Update</button>
      </div>
    )
  }
}


RestaurantViewOrders.propTypes = {
  restaurantViewOrders: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.restaurantViewOrders.user
});

export default connect(mapStateToProps, { restaurantViewOrders})(RestaurantViewOrders);