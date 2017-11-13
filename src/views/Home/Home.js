import React, {Component} from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux';
import * as actions from '../../actions';

let testWeakMap = new WeakMap();

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchTerm: 'Warszawa',
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

    componentWillMount() {
        this.setState({ markers: [] });
    }

    componentDidMount() {
        const url = [
            // Length issue
            `https://gist.githubusercontent.com`,
            `/farrrr/dfda7dd7fccfec5474d3`,
            `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
        ].join("");

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ markers: data.photos });
            });
    }
    drawLabel(){

    }
    render() {
        console.log(this.props.viewport);
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
                    onPlacesChanged={props.onPlacesChanged}
                >

                </SearchBox>
                {props.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} />
                )}
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
