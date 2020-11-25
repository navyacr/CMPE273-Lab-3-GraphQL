import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import 'react-dropdown/style.css';
import CustomerLoginCheck from './customerLoginCheck';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventView } from '../../actions/eventViewActions';
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';
import _ from 'lodash'

class EventRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textbox: <input type="text" placeholder="Search by event name" onChange={this._onInputChange}/>,
        offset: 0,
        perPage: 5,
        currentPage: 0,
        pageCount: null,
        events: [],
        order: "123"
    };
    this.getEvents();
    this.register = this.register.bind(this);
  } 
  _onInputChange = (e) => {
    this.setState({
        value: e.target.value
    });
  }
  search = () => {
    var params = {
       "value": this.state.value
    }
    console.log(params)
    axios.post(`${backendServer}/events/eventsearch`, params)
    .then(response => {
        console.log("Response: ", response)
        this.setState({
            events: response.data.updatedList
        });
    });
}

  register = (e) =>{
      const attendee_data = {
          eventId: e.target.value,
          customerId: localStorage.getItem('customer_id')          
      }
      console.log(attendee_data)
      axios.post(`${backendServer}/events/${attendee_data.eventId}/attendees`, attendee_data)
      .then( response => {
        if(response.status === 200){
            alert("You have been registered for the event.")
            
        }else{
            alert('Oops!! something went wrong, Try again.')
        }
      })
  }

  sortJSON(arr, key, way) {
    return arr.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
  }

  sortEvents = (e) =>{
    console.log("Unsorted:", this.state.events)
    
    if (this.state.order === "321") {
      this.state.order = "123"
    } else {
      this.state.order = "321"
    }
    this.state.events = this.sortJSON(this.state.events,'date', this.state.order);
    // this.setState({
    //   events: _.sortBy(this.state.events, "description"),
    //   direction: 'descending',
    // })
    console.log("Sorted:", this.state.events)
    this.forceUpdate()
  }

  getEvents = () => {
    this.props.eventView();
  }

  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      events : props.user,
      pageCount: Math.ceil(this.state.events.length / this.state.perPage)
      
    }
   );	
   console.log("Page count?", this.state.pageCount)
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
                            <button class="btn btn-primary" value={item._id}  onClick={this.register}>Register</button>
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
    //                         <button class="btn btn-primary" value={this.state.events[i]._id}  onClick={this.register}>Register</button>

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
        < CustomerLoginCheck />

        <table class="table eventtable">
          <tr>
            <td>
              {this.state.textbox}
            </td>
            <td>
            <button class="icon" onClick={this.search}><i class="glyphicon glyphicon-search"></i></button>
            </td>
            <td>
            <button class="btn btn-primary" value={1}  onClick={this.sortEvents}>Sort</button>
            </td>
          </tr>
        </table>
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

EventRegister.propTypes = {
  eventView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.eventView.user
});

export default connect(mapStateToProps, { eventView })(EventRegister);