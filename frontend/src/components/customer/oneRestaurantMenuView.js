import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import backendServer from "../../config";
import { Card } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../restaurant/pagination.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getRestaurantMenu } from "../../actions/customerHomeActions";
import { placeOrder } from "../../actions/customerHomeActions";
import { getRestaurantMenu } from "../../queries/queries";
import { graphql } from "react-apollo";

class OneRestaurantMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      dishes: [],
    };
    this.getRestaurantMenu();
  }

  getRestaurantMenu = () => {
    console.log("Res id is", this.props);
    var data = this.props.data;
    if (data.loading) {
      console.log("Loading");
    } else {
      console.log("Grapghql data:", data);
    }
    // this.props.getRestaurantMenu(this.props.resid);
    // axios.get(`${backendServer}/restaurants/${this.props.resid}/dishes`)
    // .then(response => {
    //     this.setState({
    //         dishes: response.data.updatedList
    //     });
    //     console.log("Dishes received:", this.state.dishes)
    // });
  };
  placeOrder = () => {
    let customerId = localStorage.getItem("customer_id");
    console.log("Dishes list: ", this.state.dishes);
    console.log("customerId: ", customerId);
    this.props.placeOrder({ dishes: this.state.dishes, dm: this.props.dm });
    alert("Order placed successfully");
    // axios.post(`${backendServer}/customers/${customerId}/orders`, {dishes: this.state.dishes, dm: this.props.dm})
    // .then(response => {
    //   console.log(response)
    //   console.log(this.props.dm)
    //   alert("Order placed successfully", response)
    // })
    // .catch(err => {
    //   alert("Error occured. Try again", err)
    // })
  };
  componentWillReceiveProps(props) {
    console.log("props:", props);
    this.setState({
      ...this.state,
      dishes: props.data.getMenu,
      pageCount: Math.ceil(this.state.dishes.length / this.state.perPage),
    });
    console.log("Dishes?", this.state.dishes);
  }

  render() {
    const count = this.state.dishes.length;
    console.log("Dishes: ", this.state.dishes);
    const slice = this.state.dishes.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const testResult = slice.map((item, key) => (
      <div class="row">
        <Card
          border="info"
          border-width="10px"
          style={{ width: "60%", color: "black" }}
        >
          <Card.Body>
            <div class="d-flex">
              <div class="mx-auto pull-left">
                <Card.Img
                  variant="top"
                  class="dish-image"
                  src={
                    backendServer + "/restaurants/" + item._id + "/dishImage"
                  }
                ></Card.Img>
              </div>
              <div class="mx-auto pull-right">
                <Card.Title>
                  <b>{item.name}</b>
                </Card.Title>

                <Card.Text>
                  <b> Category: </b> {item.category}
                </Card.Text>
                <Card.Text>
                  <b> Ingredients: </b> {item.ingredients}
                </Card.Text>
                <Card.Text>
                  <b> Description: </b> {item.description}
                </Card.Text>
                <Card.Text>
                  <b> Price: </b> {item.price} USD
                </Card.Text>
                <Card.Text>
                  {" "}
                  <div>
                    <span>Quantity</span>
                    <button
                      onClick={() => {
                        if (!item.qty) {
                          item.qty = 0;
                        }
                        console.log("+", item.qty);

                        item.qty += 1;
                        this.forceUpdate();
                      }}
                    >
                      +
                    </button>
                    {item.qty ? item.qty : 0}
                    <button
                      onClick={() => {
                        item.qty > 0 ? (item.qty -= 1) : (item.qty = 0);
                        console.log("-", item.qty);
                        this.forceUpdate();
                      }}
                    >
                      -
                    </button>
                  </div>
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
        <br />
        <br />
        <br />
      </div>
    ));
    let paginationElement = (
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={<span className="gap">...</span>}
        pageCount={
          Math.ceil(this.state.dishes.length / this.state.perPage) > 1
            ? Math.ceil(this.state.dishes.length / this.state.perPage)
            : 10
        }
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

    //   if (this.state && this.state.dishes && this.state.dishes.length > 0) {
    //     for (let i = 0; i < this.state.dishes.length; i++) {
    //       let imgsrc = `${backendServer}/restaurants/${this.state.dishes[i].id}/dishImage`
    //       if (!this.state.dishes[i].qty) {
    //         this.state.dishes[i].qty = 0
    //       }
    //         data.push(<Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}>
    //                     <Card.Body>
    //                     <div class="d-flex">
    //                         <div class="mx-auto pull-left">
    //                         <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
    //                         </div>
    //                         <div class="mx-auto pull-right">
    //                         <Card.Title><b>{this.state.dishes[i].name}</b></Card.Title>
    //                         <Card.Text><b> Category: </b> {this.state.dishes[i].category}</Card.Text>
    //                         <Card.Text><b> Ingredients: </b>  {this.state.dishes[i].ingredients}</Card.Text>
    //                         <Card.Text><b> Description: </b> {this.state.dishes[i].description}</Card.Text>
    //                         <Card.Text><b> Price: </b> {this.state.dishes[i].price} USD</Card.Text>
    //                         <Card.Text> <div>
    //                                       <span>Quantity</span>
    //                                       <button onClick={() => {
    //                                         console.log("+", this.state.dishes[i].qty)

    //                                         this.state.dishes[i].qty += 1;
    //                                         this.forceUpdate();
    //                                         }}>
    //                                           +
    //                                       </button>
    //                                       {(this.state.dishes[i].qty)}
    //                                       <button
    //                                         onClick={() => {
    //                                           this.state.dishes[i].qty > 0 ? this.state.dishes[i].qty -= 1: this.state.dishes[i].qty = 0;
    //                                           console.log("-", this.state.dishes[i].qty)
    //                                           this.forceUpdate();
    //                                         }}
    //                                         >
    //                                         -
    //                                       </button>
    //                                     </div>
    //                           </Card.Text>
    //                     </div>
    //                     </div>
    //                     </Card.Body>
    //                   </Card>)
    //     }
    // }

    return (
      <div>
        {/* {data} */}
        <div className="panel">
          <div className="panel-body">
            <div>{testResult}</div>
          </div>
          {paginationElement}
        </div>
        <button class="btn btn-primary" onClick={this.placeOrder}>
          {" "}
          Place order
        </button>
      </div>
    );
  }
}

// export default OneRestaurantMenuView;
// OneRestaurantMenuView.propTypes = {
//   placeOrder: PropTypes.func.isRequired,
//   getRestaurantMenu: PropTypes.func.isRequired,
//   order: PropTypes.array.isRequired,
//   menu: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   order: state.placeOrder.order,
//   menu: state.getRestaurantMenu.menu,
// });

// export default connect(mapStateToProps, { placeOrder, getRestaurantMenu })(
//   OneRestaurantMenuView
// );

export default graphql(getRestaurantMenu, {
  options: {
    // TODO get resid from this.props.resid
    variables: { restaurant_id: "5fa85cdb0f0d477c9147c39f" },
  },
})(OneRestaurantMenuView);
