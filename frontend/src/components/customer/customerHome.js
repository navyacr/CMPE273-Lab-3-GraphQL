import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import CustomerLoginCheck from './customerLoginCheck';
import AggregateReview from './aggregateReview';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';
import MapContainer from './mapComponent';
import { getRestaurantAll } from '../../queries/queries';
import { graphql } from 'react-apollo';

const buttons = [
  { name: 'All', value: 'all' },
  { name: 'Dinein', value: 'Dinein' },
  { name: 'Curbside Pickup', value: 'Pickup' },
  { name: 'Yelp Delivery', value: 'Delivery' },
];

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      count: 0,
      restaurants: null,
      offset: 0,
      perPage: 5,
    };
    this.getRestaurants();
    // this.search = this.search.bind(this);
    // this.setCount = this.setCount.bind(this);
    localStorage.setItem('type', 'customer');
  }

  componentDidMount() {
    this.setState({
      all: this.state.restaurants,
    });
  }

  handleClick = (name) => {
    console.log(name);
    var re = new RegExp(name, 'gi');
    let filteredData = [];
    if (name === 'all') {
      this.setState({ restaurants: this.state.allrestaurants });
      return;
    }
    filteredData = this.state.allrestaurants.filter(
      (restaurants) =>
        restaurants.deliverymode && restaurants.deliverymode.match(re)
    );
    console.log('Filtered data: ', filteredData);
    this.setState({ restaurants: filteredData });
  };

  search = () => {
    var params = {
      type: this.state.type,
      value: this.state.value,
    };
    console.log(params);
    axios
      .post(`${backendServer}/customers/restaurantsearch`, params)
      .then((response) => {
        console.log('Show Response: ', response);
        this.setState({
          restaurants: response.data.updatedList,
        });
      });
  };
  _onValueSelect = (e) => {
    this.setState({
      value: e.value,
    });
  };
  _onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  _onSelect = (e) => {
    this.setState({
      disabled: false,
      type: e.value,
    });
    console.log('Priting e: ', e);
    if (e && e.value === 'deliverymode') {
      this.setState({
        secondoptions: [
          { value: 'Dinein', label: 'Dine In' },
          { value: 'Pickup', label: 'Curbside Pickup' },
          { value: 'Delivery', label: 'Yelp Delivery' },
        ],
      });
    } else if (e && e.value === 'cuisine') {
      this.setState({
        secondoptions: [
          { value: 'French', label: 'French' },
          { value: 'Mexican', label: 'Mexican' },
          { value: 'Mediterranean', label: 'Mediterranean' },
          { value: 'Indian', label: 'Indian' },
        ],
      });
    } else if (
      e &&
      (e.value === 'location' ||
        e.value === 'dishname' ||
        e.value === 'restaurantname')
    ) {
      this.setState({
        textbox: <input type='text' onChange={this._onInputChange} />,
      });
      this.setState({
        disabled: true,
      });
    }
  };

  componentWillReceiveProps(nextProp) {
    console.log('Next prop', nextProp);
    if (!nextProp.data.loading) {
      this.setState({
        restaurants: nextProp.data.getRestaurants,
        allrestaurants: nextProp.data.getRestaurants,
      });
    }
  }

  getRestaurants = () => {
    var data = this.props.data;
    if (data.loading) {
      console.log('Loading');
    } else {
      console.log('Grapghql data:', data);
    }

    console.log('State:', this.state);
  };

  setCount = (count) => {
    this.setState({
      qty: count,
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
    });
  };
  render() {
    if (!this.state.restaurants) {
      return <div></div>;
    }
    const options = [
      { value: 'cuisine', label: 'Cuisine' },
      { value: 'deliverymode', label: 'Mode of Delivery' },
      { value: 'location', label: 'Location' },
      { value: 'dishname', label: 'Dish Name' },
      { value: 'restaurantname', label: 'Restaurant Name' },
    ];
    const defaultOption = options[4];

    const count = this.state.restaurants.length;
    console.log('restaurants: ', this.state.restaurants);
    const slice = this.state.restaurants.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );

    console.log('slice is:', slice);
    const testResult = slice.map((item, key) => (
      <div class='row'>
        <Card
          border='info'
          border-width='10px'
          style={{ width: '100%', color: 'black' }}
        >
          <Card.Body>
            <div class='d-flex'>
              <div class='mx-auto pull-left'>
                <Card.Img
                  variant='top'
                  class='dish-image'
                  // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7yiIOd_OGTbphE5u2T6XuFXqeHxMyw20MgQ&usqp=CAU'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABcVBMVEUnO3r///8SEUn+4Yf/7bX/xhv/f0/+55//7bcAAEkAADsAAD7+4IQAB0n/gk//hE8QDEUON3wIDkkAAETqdU6amqy4ZmCQSks+JEohMW3+4ooAAEcAH24AIm8AADccM3YTLnSkqsFOTnC5ucV4eI/AxdX/54nY2OAVL3T/1Fzv7/MHKHEAADP/xAvKztv/zRf/eUU/T4aXnrksP32IkK/i5OyzuMv/6aZMWo0ALX5zfaL/0Ev+23Lu04L/xbNqdZ3/yzd4a1/+1mNdaZY5SoN9hqiFdmNBS3Wumm/ptidrX1wqKljVvXtCO1IrJUnDrXWphjkqG0lcXHtRSFVra317eH6Mhn+tj1OVgF2akIDAsILarjWtkFDUv4ReXG7mzoUbJV+Jg3+zpYLEoEg8O2JcWm+EhJlcSkOKbj5/ZUAzM10AACdeVFlwWkKgfzqRgWZ5Um7fpJrNjIGfTUdbMUqJR0vBYU3cbk5xO0qQWWpxWkC7N1Z6AAAQvklEQVR4nN3d+XvTRhoAYEshDbZjYqymLfEhOUdtJNdZX8ExtAlNOEKAQqALLG2hWwiUdsvu0qXHX78jy7KlOb/RYcv9ftqnzxLN65n55tBISimxh9lrblXb3cFBv9U67KQ6h61W/2DQbVe3mj0z/sun4vzjZrPa7XeMsmUZdV1PeUPX64ZllY1Ov1ttxuqMS2hutQ8QzcBgZOi6gaAH7a24mHEIzZ3BoWXVRTafs25Zh4OdOJSRC5vdVsmSwXmYRqnVbUZdoGiFWwPDqgfSuVG3jMFWpGWKUGjzglUeVpWWsRchMiphr6tHwnORercXUcmiEe70y+EaJxn1cn8nkrJFIDTb0bROPFBrbUeQXEMLewPLiIHnhGENQjfWkMLeXimO6puEXtoLaQwl7O3F0jwxYzmcMYTQjLv+xsbSXoj+GFzYLU/HNzSWu1MX7uhRDw/8qOtBx45gwlrLmqrPDqtVm56wW566z45gTTWAsJkyZgJEw2MqwMpDXnhtNhXoRPla7MJaZ7oZBo96R7Y3Sgrbs6xAJ8rtGIVmf/oplAyrLzX+ywibwm2l6YSuyyQcCWG7NGvaOErVOIQHSWihblgHkQvN1mxzKB71FrQzAoW9hHTBSeg6cE0FE24lqYW6YcHyDUhYTU6O8UYJtNyACBMKBKZUgLA6+3kMK8oAoliYgIkaOwBTOKEw0UAIUSRMcBN1QthQBcKdpCaZSYgyKl84B0AhkStszgMQEblDP0/YS+JMhhYWbwLHEZqzLrhEcKbhHGEraZNtduitIMK9ZC2X+FFnrxeZwva8dEInLObIzxLOSRqdBDOhMoTmPDVRJ+qMbMMQzlGWcUPvywjbxqzLGyAMelekCptJn27To0ztilThrIsaNDpQ4WD+0owT9QFMuDWfbdSOMuU8HEU4f2l0EjpE2J3XNmpHnbwRTghr89tG7SgTN1AJ4eGsyxgyDkXCnfmacJNh4XsauHCe04wTeLLBhHOdZpwwujyhOd9pxgnL5Aj35r+Roma6xxb25m3ZS49SjymMuQp1+2EnFHU98B1lHfIkjr8SvcJebL1QN6zdUufh19///cnNR48eX721vru7a0gzDeNatXsoLmW5xxAesC9ppDqjgVK33JPPVqcOyby6saufPPnHs4VPh3Fx24nFp99cPZRT1p2hrtYXXdZXiR4hpxdaVfdevnGtVnN+CR3Nj7qGmHfjybdrSLbgxNrFzxZHgZhHj74DI/XOOEfuiS7r7Yke4YB5KX247rLHSud/tVLu3KHFLxTiPZvoMKGj3P/mZBdk7HgGAdFerj6gCU32fM2o2v+HjTRyDRdgq5Z7r2CTcylj9+tvfTqKcIh8en3XEAJ9fUs5FPwonjFxImyzCzsSVp67wswFV5i9wPg39d3vPyd8NKGN3H8sMmLTTdG4Vp/sSk2EnCn3SJjJPx8Js/kLI6GWpxL13a8/J3ksoW18y22rxFbhqmCFYJBC3qLCFar59Eio5ksjoUoj7p48o/qYQmQ8+m6XXYISsewrsBqPE5M6Hwv7vB/EFaqVjZFQrdRGQpKoG/+ktE+BEBl/SLGqEZuIOX2GS5xUuivkjvYTYYYixIm7J/QGKhIubi+yqpFcuSsKo3+M/4mbmVwhd9kkEPqJu0/YPr4QGR/RibQNezsZcMo83rFxhdwBRiT0EHXjWx5QIFzcfkprqc71seg1qClgHO5KeCTkHz4UCsfX0g/ZLXTZjoWLnw2DSdy/Qf7YZeptpRc5LtHa8gnZ8xmYcHQtY32NDlxeXltaunTpzJkzS4h55csvL+8zlS8NvDboN3jtUnCI7rxmJMT/qLRweC3jJYt36czZs2eR78zZpWFbRbF85fIifWz8GStNnX5TqVYhs5yv1F6h4IQsRIiuVX9JqUCHd8aNs0vL4y65tnblMq0mt2/5iayjshkiy/n/2ZZHyG+kMKGqrdN8Sx6eXzhELl+kGLdf+vqixbi7e1zgEkfNNAVopDBh7i4FiPlwoY1cuEypxhven9yg6Ox4iCdyvNgTYVM0yQMIC8XPCd/aJcxHESLj8j5h3PdentjGHsUplsjxcFr3UNgVrEUgQu023gmXlwgfVYiMXxJLqqeeoZ9xg35YDB7RGfSHQv46FiTUHmPA5QWyAllCVI14WvXOboRCFrHlCk3RJqJYWHyAA9coPKYQGfHeuP3duGFRb17brXQsZBBL5kgovBsjFBKdkNpCeULKdG4stBjCh55ETiUOl1C2UDBWuEOuPcJOhI1hCj9xLqLd/BQGZAuJzrj9g9u0WIcr1YLKJw7HC1vYEQBTuvNsqqpNhNmT4X9Cc0MU6QdQIEdIEl+NRkWDfgjYrKiqgHjoCDlbUOMY/sleNtNwhI3K8bAKzYxThc+gQJ6QaKhHaafQnHmpgGjPFVKgh5rceVP1dNj7mqcb3osUr/qqcHmNDeQK8XSz/XpELFObqa+R0on2xC0Fu2dIP6FqZvPDKsTSDNsnEC6sYckm7ezGUCuxmlHxIIj2iIiEfcCGrEF9Snx9mGeK1/1VeCm4cGEZr0Sn0JRzMiYJJIn2bk2Ku43oqW/K+wxOnI7gr0JeJxQLsWyzn86rzsKTmHy/0ChCgmjZQuAdJ6OP7QZtqM41ird8VcjrhGLhwtq+rxJ/TLuFxognWRqQIKIenBJOu93QSy9WN5xXHPaaG6fHlVFH127D26hYiLXTozS6glOL3kVi7w0DiBNRikwpVQMmTKUuZDM/OaPFT5msm8hyd31VyG+jAKE/n24/yLmFnrxqyDytUJsohWhUkVA4o/GEZ07jRtE3nVnm+wDChQWf8J5diU4t6paT0TcrzAokiGhWk+JudhNBCv15RlSFAKG/EveHQnU0LpqTDA4k9pFQOGfzhoULc3ekqhBSh76euP0qNym0BRN6iR0lBZmzeYRbmLDoWxcKEilMuHaZbKZOLUKFHqJlpuSOJxBCXyYVJVKg8Iq3Eo/Sk0KDhRNiuZeCDhZ0YUH1FU4IhAj9c7ftu27WviAhHBOtZmrHCCNM/+xtpMI8AxT6mum/0uNCSwhdorGTqkqd1cOFvm4IaKQwobeZjjsiKjQwl3qJ9WqqLXVuBxdqX3mFYiBI6M+mT8dCNSMjdIh6OyXaSRQIvWtfcSYFCn2T06OgwiFR76ZkpjQUobdggG4IFPo6YmChTdQHqQMZIC4sqN5GGp3Qu4bavpMLKkRE/SAlNWnDhb5UCkk0QKEv1YyTqbwQEfsp0X43V+jboYlO6Es19hoxsFAttKIUAoBBhK/DCFU1Jfd8BS68PgXhLyGFUksLQvg2HuECbe4dVCgXuNC3skio8K9fh3/9fignLI+EoxXNdHNpzhHekBRKjRb//vg/X6D477tfCxRhzONh7uN39sW/+OjdfQngc6k5zfmPVv5mxwcrHzszqeI05zTpD88Nr35u5RP8ngwnjqXmpec/OvfBMM6NhIXcFOel6Q+di38gI8y/kVpbEMKpri0CCbUTqfUhRTjF9WEw4abUGp8inOIaP5jwVGqfhhROc58mkDC7KrXXRgpj2mujLg+DCTek9ktJ4TT3SwMJMxtSe96kcHp73gGFlZrUfQuKcGr3LYIKTal7TxThlO49BRXmNbn7hxThlO4fBhUW3sjdA6YJp3IPOLBQW5e6j08V5l74hOHv418k7uOHEGZXJc5iMIRTOIsRQpjZgJ+nYQrjPk8TSlip2WeiQgrjPRPlKW0QYQN8ro0nxM+1halD4lxbOCFKpdCziTwhfjaRccIbIvS30cXFdD6cUNuEni/lC2M8X+otbgChffwHeEaYK8TSaYRnhH3FDSCs9IDnvEXCom/qFt0577DCQkEBntUXCWM6q+8HBhBqJyMheBHMFMbyvEUBc8gL0YwG+MyMUKimsXYawTMzWBsNImz0FOBzT2Khql0niOGee/oFB8oLC6qiAJ9dAwj9u27slgp+do0Aygvt0RD4/CFEGPHzhzkSIS10DsOCniGFCNXcfYIY/BnSu+TfDyA0J0LgeMEVqkXKY7KEEfYc8AOyjcoLNefRLNCz3DAh+RCi21Zln+Um0mggodNIYc/jA4WIuEYhLiwvLFGex19gPo9PB0oLK6ZXCGumIiFqqIyXRvjfqbB8ZfhOBcZLFahNVF44aqSw92KAhWrxftj3YizeZQBlhaNGCnu3CVyo5orEuOgL4btNCkVWkWWFil8IWgYDhGqBmN1ICLfvpdmFlxM6w71HCNqPggjttVTgdwwxckwQYaWGCUFb3zChmi7eZBK574nK8YBywsKxggshLxAGClFLvUO8YUEk3D56xWmh0sLhwskvVIzohCjhaFcl39f2Y5pbgbLChkIKOe/cI4X/EwhRb9Su04yMd+69Fvq8wvtCYfaUIgRsSJ3/Y0Wirxe1W7dB7008QvWXF/+99PvR7/uB+Neo9ChCyLzmvPMznvtNfA3HePfmMz+SfPflvQeA+rOj8IkjXHknbEDufAYTQt4ifPjhyrlzK78Rj8KzIlfU7jy+zX5/6b1X6bSwvOM/9vs5FCvvxT9Io0YVwl4j/Mf7978Lkh6BzD14+9WQ6XkH7dHTe3/eleAN/9T9d+/f/yoGausKXQgb9c/X5U4/qvb6v6hpWvrB1avX3z6698vrP18hGwqZH8r5QznQP6rUGELou6AvANICJfK5IoohrShtkwlfFQZ7n3dA4rSiUWMKwS/0TjTRm0gJIfi9+kkmVnocofj11cknZjcVnhD+fYukEvNZky+Ef6MkocTMqsIXSnxnJpHEwnMcFOZbQUkkNsTfCpL5EEvyiHiaoQplPqaTNGJeIzkhv7uWMGJlAySU+nZeoojYbIYtlPr+YYKIhSIVQ/uPUt+wTA6xAf+Gpdx3SJNCzJxSLYxvycJP8yWGqL2hUyL5HnASiAV8PioQSn7TOQHEBmWg4Aolv8s9c2IFn3CLhcrBPDXULG0kFAklv1w9UyIrywiEptxXw2ZIZGYZgVDpyX2xc2bEfIXykRaQUDKhzozYoHznGChUduaB2KhyDXyhUpX7YOAsiA3mOAESJp/IHgiBQqWdbGKDPt2WESabWBECAUKlmtx0I+qDQGFyMyoECBImlJgXDBMyQpmnMKdGLFQYH0kKJFR6cl/wnQJR03hTNXmhYraStZjKHnMm24GEaL2YpCVxZV1cYGmh0k7MxkYBlETlhUoT8lHsKRC1LHcxEUKIOqORAGLmDbQLygslp3CxEAvimWgooVLrzPa2TTYHGwWDCxXl2gxvvuUb5B3Q6IVKM2XMiJjVWNu+0QoVpVuexaGUXIAKDCpUeq2pH0rJZ46B07RIhGi5oUObajTEbFZikI9EKNFUIyBqjU2pMTAaoWLulWI9j+rxnTC+nhezEHXHPVg9hiJqlfVgHTAKITIegOoxOFFrhPOFFiLjwALMcgISs5WTkL4IhKg/ti1LWJEBiLlM5TRE/4tQiGKnXxZVpCxRa7ypRlK2aISosXZ1QUXKELVMZjN08xxFVEIUW3v81golapnKSYD5JysiFCo20uDkHQCxgGpvfSPw6E6LaIUomt1WiVWVfGJeyzbUzWh5SgxCFObO4NCyaJs6TGIONc3CSTWC1ElEHEI7zK32gVW2DF1ELGjZTKXxYnMjDp0dcQmHYTar1/odBLWM+mjT3CHmC5qmZRGtor05Wd2IKm1SI1ahE2avuVVtdwcH/VbrsHMBAZ8fv3i4ebq6sVEzo+51ZPwf7I4RBaiHFUoAAAAASUVORK5CYII='
                ></Card.Img>
              </div>
              <div class='mx-auto pull-right'>
                <a
                  style={{ cursor: 'pointer' }}
                  href={'/oneRestaurantView/' + item.id}
                >
                  <Card.Title>
                    <b>{item.name}</b>
                  </Card.Title>
                </a>
                <AggregateReview resid={item.id} />

                <Card.Text>
                  <b> Delivery modes: </b> {item.deliverymode}
                </Card.Text>
                <Card.Text>
                  <b> Cuisine: </b> {item.cuisine}
                </Card.Text>
                <Card.Text>
                  <b> Description: </b> {item.description}
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
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        breakLabel={<span className='gap'>...</span>}
        pageCount={
          Math.ceil(this.state.restaurants.length / this.state.perPage) > 1
            ? Math.ceil(this.state.restaurants.length / this.state.perPage)
            : 10
        }
        onPageChange={this.handlePageClick}
        forcePage={this.state.currentPage}
        containerClassName={'pagination'}
        previousLinkClassName={'previous_page'}
        nextLinkClassName={'next_page'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    );

    //   var data = []

    //   if (this.state && this.state.restaurants && this.state.restaurants.length > 0) {
    //     console.log("All restaurants list:",this.state.restaurants)
    //     for (let i = 0; i < this.state.restaurants.length; i++) {

    //         if (this.state.restaurants[i]) {
    //             console.log(this.state.restaurants[i])
    //             var imgsrc = `${backendServer}/restaurants/${this.state.restaurants[i]._id}/viewProfileImage`;
    //             data.push(
    //                       <Card border="info" style={{ width: '100%' }}><Card.Body>
    //                         <div class="d-flex">
    //                         <div class="mx-auto pull-left">
    //                         <img class="profile-photo" src={imgsrc}></img>
    //                         </div>
    //                         <div class="mx-auto pull-right">
    //                         <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i]._id}>
    //                           <Card.Title><b>{this.state.restaurants[i].name}</b></Card.Title>
    //                         </a>

    //                       <AggregateReview resid={this.state.restaurants[i]._id}/>
    //                       <Card.Text><b> Delivery modes:  </b> {this.state.restaurants[i].deliverymode}</Card.Text>
    //                       <Card.Text><b> Cuisine:  </b> {this.state.restaurants[i].cuisine}</Card.Text>
    //                       <Card.Text><b> Description: </b> {this.state.restaurants[i].description}</Card.Text>
    //                       </div>
    //                       </div>
    //                       </Card.Body></Card>)
    //         }
    //     }
    // }
    return (
      <div>
        {/* <CustomerLoginCheck /> */}

        <table class='searchtable'>
          <tr>
            <td>
              <Dropdown
                options={options}
                onChange={this._onSelect}
                placeholder='Search by'
              />
            </td>
            <td>
              <div disabled={this.state.disabled}>
                <Dropdown
                  options={this.state.secondoptions}
                  onChange={this._onValueSelect}
                  placeholder='Select'
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>{this.state.textbox}</td>
            <td>
              <button class='icon' onClick={this.search}>
                <i class='glyphicon glyphicon-search'></i>
              </button>
            </td>
          </tr>
        </table>

        <div>
          {buttons.map(({ name, value }) => (
            <button
              class='btn btn-primary pad'
              key={name}
              value={value}
              onClick={this.handleClick.bind(this, value)}
            >
              {name}
            </button>
          ))}
        </div>
        <div class='header_menu'>
          <div class='links'>
            {/* {data} */}
            <div className='panel'>
              <div className='panel-body'>
                <div>{testResult}</div>
              </div>
              {paginationElement}
            </div>
          </div>
          <div class='social_media'>
            <MapContainer restaurants={this.state.restaurants} />
          </div>
          <div class='clearfix'></div>
        </div>
      </div>
    );
  }
}

// export default CustomerHome;
export default graphql(getRestaurantAll)(CustomerHome);
