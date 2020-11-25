import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/customerHomeActions';
import ReactPaginate from 'react-paginate';

const buttons = [
  { name: "All", value: "all" },
  { name: "Preparing", value: "Preparing" },
  { name: "On the way", value: "On the way" },
  { name: "Delivered", value: "Delivered" },
  { name: "Pick up Ready", value: "Pick up Ready" },
  { name: "Picked up", value: "Picked up" },  
  { name: "Cancelled", value: "Cancelled" }
];

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      orders: []
    };
    this.getOrders();
    this.cancel = this.cancel.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  cancel = (e) =>{
    console.log("Cancelled: ", e.target.value) 
    axios.get(`${backendServer}/customers/${e.target.value}/cancelOrder`)
    .then( response => {
      console.log(response)
      if(response.status === 200){
          alert("You have cancelled the order.");        
          this.getOrders();  
      }else{
          alert('Oops!! something went wrong, Try again.');
      }
    })
}
componentDidMount() {
  this.setState({
    all: this.state.orders
  });
}
handleClick = (name) => {
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

  getOrders = () => {
    this.props.getOrders();
     
    // const id = localStorage.getItem('customer_id')
    // axios.get(`${backendServer}/customers/${id}/orders`)
    // .then(response => {
    //   console.log(response.data)
    //     this.setState({
    //         allorders: response.data.updatedList,
    //         orders: response.data.updatedList
    //     });
    // });
  }

  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      orders : props.user,
      allorders : props.user,
      pageCount: Math.ceil(this.state.orders.length / this.state.perPage)
      
    }
   );	
   console.log("Page count?", this.state.pageCount)
  }
  render() {

    const count = this.state.orders.length;
    console.log('orders: ', this.props.user)
    const slice = this.state.orders.slice(this.state.offset, this.state.offset + this.state.perPage);
    const testResult = slice.map((item,key)=>
      
      <div class="row">
        
        <Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}><Card.Body> 
          <div class="d-flex">
            <div class="mx-auto pull-left">
              <Card.Img variant="top" class="dish-image" src={backendServer+"/restaurants/"+item.dishId+"/dishImage"}></Card.Img>
            </div>
          <div class="mx-auto pull-right">
              <Card.Title><b>{item.name}</b></Card.Title>
              
              <Card.Text><b> {item.restaurantId.name} </b></Card.Text>
              <Card.Text><b> Dish naem: </b> {item.dishId.name}</Card.Text>
              <Card.Text><b> Price: </b> {item.dishId.price} USD</Card.Text>
              <Card.Text><b> Quantity: </b> {item.qty} </Card.Text>
              <Card.Text><b> Status: </b> {item.status} </Card.Text>
              <Card.Text><b> Date: </b> {item.date.split("T")[0]} </Card.Text>
              <Card.Text><b> Time: </b> {item.date.split("T")[1]} </Card.Text>

              <button class="btn btn-primary" value={item._id} onClick={this.cancel}>Cancel</button>

          </div>
        </div>
        </Card.Body>
        </Card>
        <br/>
        <br/>
        <br/>
      </div> 
    );
    let paginationElement = (
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={<span className="gap">...</span>}
        pageCount={Math.ceil(this.state.orders.length / this.state.perPage) > 1 ? Math.ceil(this.state.orders.length / this.state.perPage) : 10}
        onPageChange={this.handlePageClick}
        forcePage={this.state.currentPage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    );

    //   var data = []

    //   if (this.state && this.state.orders && this.state.orders.length > 0) {
    //     for (var i = 0; i < this.state.orders.length; i++) {
    //       let imgsrc = `${backendServer}/restaurants/${this.state.orders[i].dishId}/dishImage`
    //         data.push(<Card border='info' border-width='10px' style={{ width: '50%' , color: 'black' , }}> <Card.Body> 
    //                       <div class="d-flex">
    //                       <div class="mx-auto pull-left">
    //                       <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
    //                       </div>
    //                       <div class="mx-auto pull-right">
    //                       <Card.Title><b>{this.state.orders[i].restaurantId.name}</b></Card.Title>
    //                       <Card.Text><b>{this.state.orders[i].dishId.name}</b></Card.Text>
    //                       <Card.Text><b> {this.state.orders[i].dishId.price} USD</b></Card.Text>
    //                       <Card.Text><b> Quantity: {this.state.orders[i].qty}</b></Card.Text>
    //                       <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>                       
    //                       <Card.Text><b> Date: {this.state.orders[i].date.split("T")[0]} </b></Card.Text>
    //                       <Card.Text><b> Time: {this.state.orders[i].date.split("T")[1]} </b></Card.Text>
    //                       <button class="btn btn-primary" value={this.state.orders[i]._id} onClick={this.cancel}>Cancel</button>
    //                       </div>
    //                       </div>
    //                   </Card.Body> </Card>)
    //     }
    // }
    
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
        {/* {data} */}
        <div className="panel">
          
            <div className="panel-body">
              <div>{testResult}</div> 
            </div>
            {paginationElement}
        </div>
      </div>
    )
  }
}

// export default ViewOrders;

ViewOrders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.getOrders.user
});

export default connect(mapStateToProps, { getOrders })(ViewOrders);