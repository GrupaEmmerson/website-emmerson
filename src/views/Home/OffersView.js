import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

let testWeakMap = new WeakMap();

class OffersView extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };

    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    render(){
        const {tableData, className, style, count} = this.props;
        let i = 1;

        if(!tableData){
            return(<div className='btn btn-lg' style={style}>Loading...</div>);
        }
        return (
            <div className='row nopadding' style={{paddingLeft: 15, paddingRight: 15}} >
                {tableData.map(e => {
                    if(i >= count){
                        return;
                    }
                    i++;
                    return(
                        <div className='col-md-6 col-lg-12 col-sm-12 nopadding'>

                            <div className="smalltitle2" style={ {
                                backgroundImage: "url(" +  e.big_photo_url  + ")",
                                float: 'left'
                            }} onMouseOver={() => {
                                this.props.setViewport({index: e.id, position: { lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }});
                            }} onMouseOut={() => {
                                this.props.setViewport({index: null, position: null});
                            }}
                            onClick={ () => {
                                window.alert(1)
                            }}
                            >
                                <div className='icons-top-right row nopadding'>
                                    <div className='row' style={{paddingTop: 5+'px', paddingRight: 5+'px', margin:0}}>
                                        {e.type_of_contract.map(a => {
                                            return(
                                                <div className='col-sm-6 col-6 nopadding'>
                                                    <img src={'./img/'+ a} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='offer-info'>
                                    <div className='offer-text row nopadding col-md-12 col-lg-12 col-sm-12' >
                                        <div className='col-md-6 col-sm-6 col-6'>
                                            <h4>Miasto <b>{e.city}</b></h4>
                                        </div>
                                        <div className='col-md-6  col-sm-6 col-6'>
                                            <h5><b>{e.for_rent !== true ? 'Sprzedaż' : 'Wynajem' }</b></h5>
                                        </div>
                                        <div className='col-md-6 col-sm-6 col-6'>
                                            Nr. Oferty: <b>{e.number}</b><br/>
                                            Cena: <b>{e.price}</b><br/>
                                        </div>
                                        <div className='col-md-6 col-sm-6 col-6'>
                                            Rodzaj: <b>{e.item}</b><br/>
                                            Cena za m<sup>2</sup>: <b>{e.price_per_m2}</b><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport
    }
}

export default connect(mapStateToProps, actions)(OffersView);


