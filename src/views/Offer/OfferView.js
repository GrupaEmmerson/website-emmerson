import React, {Component} from "react";
import { connect } from 'react-redux';
import {  } from 'react-router';
import * as actions from '../../actions';
import SimpleSlider from './SimpleSlider';
import Contact from './Contact';
import { MapOfferContainer } from './MapOfferContainer';
import InfoOfferView from  './InfoOfferView';
import HeaderOffer from "./HeaderOffer";

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
            <div className="container">
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12' style={{backgroundColor: '#151b1e', margin: 0, padding: 0}}>
                        <div className='col-12 nopadding' style={{marginBottom: 25+'px'}}>
                            <HeaderOffer
                                headerPhoto={this.state.offer.photo[0]}
                                price={this.state.offer.price}
                                priceM2={this.state.offer.price_per_m2}
                                surface={this.state.offer.surface}
                                full_location={this.state.offer.full_location}
                                type_of_contract={this.state.offer.type_of_contract}
                            />
                        </div>
                        <div className='contact'>
                            <Contact adviser={this.state.offer.adviser}/>
                        </div>
                        <div className='offer-box col-12 col-sm-12 col-md-12 col-lg-12 row nopadding' style={{marginTop: 50+'px'}}>
                            <div className='col-12' style={{ marginTop: 20+'px'}}>

                            </div>
                            <div className='col-12 col-sm-12 col-md-12'>
                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 20+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Galeria:</div>
                                </div>
                                <SimpleSlider images={this.state.offer.photo}/>
                            </div>
                            <div className='col-12 col-sm-12 col-md-3'>
                                <InfoOfferView offer={this.state.offer}/>
                            </div>
                            <div className='col-12 col-sm-12 col-md-9' style={{marginBottom: 40+'px'}}>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Opis:</div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: this.state.offer.description }} style={{marginTop: 40+'px', marginBottom: 40+'px'}}/>

                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-3'>Mapa:</div>
                                </div>
                                <div style={{margin: 0, padding: 0}}>
                                    <MapOfferContainer markerLocation={{lat: parseFloat(this.state.offer.latitude), lng: parseFloat(this.state.offer.longitude)}} markerIco={this.state.offer.ico}/>
                                </div>

                            </div>
                        </div>
                    </div>
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