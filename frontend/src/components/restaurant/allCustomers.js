import React, { Component } from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customersView , getMessages } from '../../actions/allCustomersActions';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import backendServer from '../../config';


class CustomersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
      events: []

    };
    this.props.customersView();
  } 
  

  componentWillReceiveProps(props){
    console.log("Props: ", props)
    this.setState({
      ...this.state,
      events : props.user,
      outputMessages: props.messages,
      pageCount: Math.ceil(this.state.events.length / this.state.perPage)
      
    }
   );
   console.log("PageCount:", this.state.pageCount)	
   console.log("OutputMessages:", this.state.outputMessages)	
  }

  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset,
        restaurantId: localStorage.getItem('restaurant_id')
    }
    );

  };
  getMessages(customerId){
    this.setState({
      selectedCustomer: customerId
  })
    this.props.getMessages({
      customerId: customerId,
      restaurantId: this.state.restaurantId

  })

  setTimeout(() => {
    let modalBody = document.getElementById("chat-modal-body");
    // modalBody.scrollTop =  modalBody.scrollHeight - modalBody.clientHeight ;
  }, 1000)

  console.log("Message:", this.props.messages)

  }

  

  useEffect = (() => {
    
  })

  render() {

    let chatModal = (
      <div className="modal fade" id="chatModal" tabIndex="-1" role="dialog" aria-labelledby="chatModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="chatModalTitle">Chat</h5>
                  {/* <span className="g-icon g-order-refresh fa fa-refresh" onClick={(e) => this.getMessages(this.state.selectedCustomer)} style={{left: "80px",top: "20px"}}></span> */}
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
              </div>
              
              </div>
          </div>
  </div>);
      const count = this.state.events.length;
      const slice = this.state.events.slice(this.state.offset, this.state.offset + this.state.perPage);
      const testResult = slice.map((item,key)=>
      
        <div class="row">
          
          <Card border="info" style={{ width: '40%' }}><Card.Body> 
                              {/* <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + item._id}> */}
                                {/* <Card.Title><b>{item.name}</b></Card.Title> */}
                                <a style={{ cursor: 'pointer' }} href={"/oneCustomerView/" + item._id}>
                              <Card.Title><b>{item.name}</b></Card.Title>
                            </a>
                              {/* </a> */}
                            {/* <Card.Text><b> Description: </b> {item.description}</Card.Text>
                            <Card.Text><b> Date: </b> {item.date}</Card.Text>
                            <Card.Text><b> Time: </b> {item.time}</Card.Text>
                            <Card.Text><b> Location: </b> {item.location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {item.hashtags}</Card.Text> */}
                            <Card.Text> 
                            {/* <button class="btn btn-primary" value={this.props.user._id}  onClick={this.register}>Chat</button> */}
                            <div className="g-menu-image">
                                {/* <button className="btn btn-success" data-toggle="modal" data-target="#chatModal"
                                onClick={() => this.getMessages(item._id)}>Chat</button> */}
                                
                                {/* {this.props.messages[0].message} */}
                          </div>
                          
                          </Card.Text>
                        </Card.Body>
              
          </Card>
          {/* <div className="col-sm-6" >{item.description}</div> */}
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
        pageCount={Math.ceil(this.state.events.length / this.state.perPage) > 1 ? Math.ceil(this.state.events.length / this.state.perPage) : 10}
        onPageChange={this.handlePageClick}
        forcePage={this.state.currentPage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    );


    return (
      <div>
        {/* {data} */}
        
            {/* <div>{chatModal}</div> */}
            <div>{testResult}</div> 
            <div className="panel">
          {paginationElement}
        <div className="panel-body">
          </div>
        </div>

      </div>
       
     )
  }
}

CustomersView.propTypes = {
  customersView: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
  user: state.customersView.user,
  messages : state.getMessages.messages
});

export default connect(mapStateToProps, { customersView, getMessages })(CustomersView);