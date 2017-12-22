import React, {Component} from "react";
import { connect } from 'react-redux';
import {  } from 'react-router';
import * as actions from '../../actions';
import SimpleSlider from './SimpleSlider';
import Contact from './Contact';

let testWeakMap = new WeakMap();

class OfferView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: null
        };

    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    componentDidMount(){
        const apiUrl = `http://api-www.emmerson.pl/offer/`;

            const url = [apiUrl + this.props.match.params.id].join("");

            fetch(url)
                .then(res => res.json())
                .then(response => {
                    this.setState({offer: response});
                });
    }

    render() {

        if(!this.state.offer){
            return (
                <div className='vertical-center'>
                    <div className='loader' style={{margin: 'auto'}}>
                    </div>
                </div>
            )
        }
        console.log(this.state.offer);
        return (


            <div className='row' style={{position: 'relative'}}>
                <div style={{backgroundColor: '#999999'}}  className='col-9 col-md-9 nopadding'>
                    <div className='w-100' style={{marginBottom: 50+'px'}}>
                        <SimpleSlider images={this.state.offer.photo}/>
                    </div>
                    <div className='offer-box'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='col-3 col-sm-3 col-md-3'>

                            </div>
                            <div className='col-9 col-sm-9 col-md-9'>
                                <div dangerouslySetInnerHTML={{ __html: this.state.offer.description }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: '#e3001b', paddingTop: 40+'px', paddingBottom: 40+'px', maxHeight: 70+'vh', marginTop: 40+'px'}}  className='col-3 col-md-3'>
                    <Contact/>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties,
        search: state.search.search,
        rowsCount: state.rowsCount.rowsCount
    }
}

export default connect(mapStateToProps, actions)(OfferView);