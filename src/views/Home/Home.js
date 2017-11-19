import React, {Component} from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, FusionTablesLayer } from "react-google-maps"
import { connect } from 'react-redux';
import * as actions from '../../actions';

let testWeakMap = new WeakMap();

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            markers: [],
            viewport: [],
            latitude: 52.2209732,
            longitude: 21.0118365,
        };

        this.searchUpdated = this.searchUpdated.bind(this);
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    searchUpdated (term) {
        this.setState({searchTerm: term});
    }

    render() {

        const _ = require("lodash");
        const { compose, withProps, lifecycle } = require("recompose");
        const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

        const MapWithASearchBox = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBoxYm5LJKUVyIUqxMMFX1OqDyMZ0ZF1Co&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            lifecycle({
                componentWillMount() {
                    const refs = {};

                    this.setState({
                        bounds: null,
                        center: {
                            lat: 52.2209732, lng: 21.0118365
                        },
                        markers: [],
                        markersOffer: [],
                        searchTerm: 'Warszawa',
                        onMapMounted: ref => {
                            refs.map = ref;
                        },
                        onBoundsChanged: () => {
                            this.setState({
                                bounds: refs.map.getBounds(),
                                center: refs.map.getCenter(),
                            })
                        },
                        onSearchBoxMounted: ref => {
                            refs.searchBox = ref;
                        },
                        onPlacesChanged: () => {
                            const places = refs.searchBox.getPlaces();
                            places.map(p => {
                                this.setState({searchTerm: p.formatted_address.replace(/,/g, "").replace(/Polska/g, "")});
                                console.log(p.formatted_address);
                                console.log(p);
                            });
                            console.log(this.state.searchTerm);
                            const bounds = new google.maps.LatLngBounds();

                            places.forEach(place => {
                                if (place.geometry.viewport) {
                                    bounds.union(place.geometry.viewport)
                                } else {
                                    bounds.extend(place.geometry.location)
                                }
                            });
                            const nextMarkers = places.map(place => ({
                                position: place.geometry.location,
                            }));
                            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                            this.setState({
                                center: nextCenter,
                                markers: nextMarkers,
                            });
                            refs.map.fitBounds(bounds);
                        },
                    })
                },
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                ref={props.onMapMounted}
                defaultZoom={12}
                center={props.center}
                onBoundsChanged={props.onBoundsChanged}
            >
                <SearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            marginTop: `27px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                        }}
                    />
                </SearchBox>
                {props.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} />
                )}
                <FusionTablesLayer
                    options={{
                        heatmap: { enabled: false },
                        query: {
                            select: "col6",
                            from: "1ZzWUXfp3qdWmjqWd4RMUb38jdoAqPtwZLMRZsAmU",
                            where: "price <= 450000"
                        },
                        options: {
                            styleId: 2,
                            templateId: 2
                        }
                    }}
                />
            </GoogleMap>
        );

        return (
            <div style={{ height: '100%' }} className="row" >
                <div className="col-md-9">
                    <MapWithASearchBox markers={this.state.markers} />
                </div>
                <div className="col-md-3">

                </div>
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

export default connect(mapStateToProps, actions)(Home);
