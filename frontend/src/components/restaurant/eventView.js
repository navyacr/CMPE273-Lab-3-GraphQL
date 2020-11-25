import React, { Component } from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventView } from '../../actions/eventViewActions';
import ReactPaginate from 'react-paginate';
import './pagination.css';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
      events: []

    };
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
    //   console.log("user props", this.props.user)
    //   if (this.props.user && this.props.user.length > 0) {
    //     for (let i = 0; i < this.props.user.length; i++) {
    //             data.push(
    //                         <Card border="info" style={{ width: '40%' }}><Card.Body> 
    //                           <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + this.props.user[i]._id}>
    //                             <Card.Title><b>{this.props.user[i].name}</b></Card.Title>
    //                           </a>
    //                         <Card.Text><b> Description: </b> {this.props.user[i].description}</Card.Text>
    //                         <Card.Text><b> Date: </b> {this.props.user[i].date}</Card.Text>
    //                         <Card.Text><b> Time: </b> {this.props.user[i].time}</Card.Text>
    //                         <Card.Text><b> Location: </b> {this.props.user[i].location}</Card.Text>
    //                         <Card.Text><b> Trending Hashtags: </b> {this.props.user[i].hashtags}</Card.Text>
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


EventView.propTypes = {
  eventView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.eventView.user
});

export default connect(mapStateToProps, { eventView })(EventView);