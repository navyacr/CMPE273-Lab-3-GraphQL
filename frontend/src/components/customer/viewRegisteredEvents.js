import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/customerHomeActions';
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';

class ViewRegisteredEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
      events: []
    };
    this.getEvents();
  } 

  getEvents = () => {
    this.props.getEvents();
    // const id = localStorage.getItem('customer_id');
    // axios.get(`${backendServer}/events/${id}/eventList`)
    // .then(response => {
    //     console.log("Response: ", response)
    //     this.setState({
    //         events: response.data.updatedList
    //     });
    // });
  }
 
  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      events : props.user,
      // pageCount: Math.ceil(this.state.events.length / this.state.perPage)
      
    }
   );	
  //  console.log("Page count?", this.state.pageCount)
  }

  render() {

    const count = this.state.events.length;
      const slice = this.state.events.slice(this.state.offset, this.state.offset + this.state.perPage);
      const testResult = slice.map((item,key)=>
        <div class="row">
          <Card border="info" style={{ width: '40%' }}><Card.Body> 
                              <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + item._id}>
                                <Card.Title><b>{item.name}</b></Card.Title>
                              </a>
                            <Card.Text><b> Description: </b> {item.description}</Card.Text>
                            <Card.Text><b> Date: </b> {item.date}</Card.Text>
                            <Card.Text><b> Time: </b> {item.time}</Card.Text>
                            <Card.Text><b> Location: </b> {item.location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {item.hashtags}</Card.Text>
                            <Card.Text> </Card.Text>
                        </Card.Body>
          </Card>
          {/* <div className="col-sm-6" >{item.description}</div> */}
          <br/>
          <br/>
          <br/>
        </div> 
      );
    //   var data = []

    //   if (this.state && this.state.events && this.state.events.length > 0) {
    //     for (let i = 0; i < this.state.events.length; i++) {
    //             data.push(
    //                         <Card border="info" style={{ width: '58rem' }}><Card.Body> 
    //                         <Card.Title><b>{this.state.events[i].name}</b></Card.Title>                                                      
    //                         <Card.Text><b> Description: </b> {this.state.events[i].description}</Card.Text>
    //                         <Card.Text><b> Date: </b> {this.state.events[i].date.split('T')[0]}</Card.Text>
    //                         <Card.Text><b> Time: </b> {this.state.events[i].time}</Card.Text>
    //                         <Card.Text><b> Location: </b> {this.state.events[i].location}</Card.Text>
    //                         <Card.Text><b> Trending Hashtags: </b> {this.state.events[i].hashtags}</Card.Text>
    //                         <Card.Text> </Card.Text>
    //                     </Card.Body></Card>)
    //     }
    // }

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
// export default ViewRegisteredEvents;

ViewRegisteredEvents.propTypes = {
  getEvents: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
  user: state.getEvents.user
});

export default connect(mapStateToProps, { getEvents })(ViewRegisteredEvents);