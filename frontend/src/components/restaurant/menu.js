import React, { Component } from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restaurantMenu } from '../../actions/restaurantMenuActions';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import backendServer from '../../config';


class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      dishes: []
    };
    this.props.restaurantMenu();
  } 

  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      dishes : props.user,
      pageCount: Math.ceil(this.state.dishes.length / this.state.perPage)
      
    }
   );	
   console.log("page count?", this.state.pageCount)
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
    const count = this.state.dishes.length;
    console.log('Dishes: ', this.props.user)
    const slice = this.state.dishes.slice(this.state.offset, this.state.offset + this.state.perPage);
    const testResult = slice.map((item,key)=>
      
      <div class="row">
        
        <Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}><Card.Body> 
          <div class="d-flex">
            <div class="mx-auto pull-left">
              <Card.Img variant="top" class="dish-image" src={backendServer+"/restaurants/"+item._id+"/dishImage"}></Card.Img>
            </div>
          <div class="mx-auto pull-right">
              <Card.Title><b>{item.name}</b></Card.Title>
              
              <Card.Text><b> Category: </b> {item.category}</Card.Text>
              <Card.Text><b> Ingredients: </b> {item.ingredients}</Card.Text>
              <Card.Text><b> Description: </b> {item.description}</Card.Text>
              <Card.Text><b> Price: </b> {item.price} USD</Card.Text>
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
        pageCount={Math.ceil(this.state.dishes.length / this.state.perPage) > 1 ? Math.ceil(this.state.dishes.length / this.state.perPage) : 10}
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
    //     console.log("dishes list: ", this.state.dishes)
    //     for (var i = 0; i < this.state.dishes.length; i++) {
    //       let imgsrc = `${backendServer}/restaurants/${this.state.dishes[i]._id}/dishImage`
    //         data.push(<Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}> <Card.Body> 
    //                       <div class="d-flex">
    //                         <div class="mx-auto pull-left">
    //                         <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
    //                         </div>
    //                         <div class="mx-auto pull-right">
    //                       <Card.Title><b>{this.state.dishes[i].name}</b></Card.Title>
                          
    //                       <Card.Text><b> Category: </b> {this.state.dishes[i].category}</Card.Text>
    //                       <Card.Text><b> Ingredients: </b>  {this.state.dishes[i].ingredients}</Card.Text>
    //                       <Card.Text><b> Description: </b> {this.state.dishes[i].description}</Card.Text>
    //                       <Card.Text><b> Price: </b> {this.state.dishes[i].price}</Card.Text>
    //                       </div>
    //                       </div>
    //                   </Card.Body> </Card>)
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
      </div>
    )
  }
}


// export default RestaurantMenu;

RestaurantMenu.propTypes = {
  restaurantMenu: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.restaurantMenu.user
});

export default connect(mapStateToProps, { restaurantMenu })(RestaurantMenu);