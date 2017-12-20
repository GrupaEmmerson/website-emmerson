import React, {Component} from "react";
import { connect } from 'react-redux';
import {  } from 'react-router';
import * as actions from '../../actions';

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
            <div className='container-fluid'>
                <div className='offer-box'>
                    {<div dangerouslySetInnerHTML={{ __html: this.state.offer.description }} /> }
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