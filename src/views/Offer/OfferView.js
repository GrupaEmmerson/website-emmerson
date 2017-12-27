import React, {Component} from "react";
import { connect } from 'react-redux';
import {  } from 'react-router';
import * as actions from '../../actions';
import SimpleSlider from './SimpleSlider';
import Contact from './Contact';
import { MapOfferContainer } from './MapOfferContainer';

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
                <div className='col-9 col-md-9 nopadding' style={{backgroundColor: '#151b1e'}}>
                    <div className='w-100' style={{marginBottom: 25+'px', marginTop: 40+'px'}}>
                        <SimpleSlider images={this.state.offer.photo} price={this.state.offer.price} priceM2={this.state.offer.price_per_m2} surface={this.state.offer.surface}/>
                    </div>
                    <div className='offer-box col-12 col-sm-12 col-md-12 col-lg-12 row nopadding'>
                        <div className='col-3 col-sm-3 col-md-3 nopadding'>
                            <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 18+'px', marginTop: 40+'px'}}>
                                <span style={{backgroundColor: '#e3001b', padding: 4+'px'}}>Informacje Podstawowe:</span>
                            </div>
                        </div>
                        <div className='col-9 col-sm-9 col-md-9 nopadding'>
                            <MapOfferContainer markerLocation={{lat: parseFloat(this.state.offer.latitude), lng: parseFloat(this.state.offer.longitude)}} markerIco={this.state.offer.ico}/>
                            <div dangerouslySetInnerHTML={{ __html: this.state.offer.description }} style={{marginTop: 40+'px'}}/>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: '#e3001b', paddingTop: 40+'px', paddingBottom: 40+'px', maxHeight: 70+'vh', marginTop: 40+'px'}} className='col-3 col-md-3'>
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