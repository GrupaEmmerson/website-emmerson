import React, {Component} from "react";
import SearchInput, {createFilter} from 'react-search-input'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Offer from './Offer'
let testWeakMap = new WeakMap();

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchTerm: 'Warszawa',
            markers: [],
            geodata: [],
            geodatas: [],
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
    setLocation(location){
        this.setState({latitude: location.lat() } );
        this.setState({longitude: location.lng() } );
    }
    setViewport(v){
        this.setState({viewport: v } );
    }
    componentWillMount() {
        this.setState({ markers: [] });
        this.setState({ geodata: [] });
        this.setState({ geodatas: [] });
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

    render() {
        // const filteredOffer = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        console.log(this.state.viewport);

        const { compose, withProps, withHandlers, lifecycle } = require("recompose");
        const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
        const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

        const PlacesWithStandaloneSearchBox = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBoxYm5LJKUVyIUqxMMFX1OqDyMZ0ZF1Co&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
            }),
            lifecycle({
                componentWillMount() {
                    const refs = {};

                    this.setState({
                        places: [],
                        onSearchBoxMounted: ref => {
                            refs.searchBox = ref;
                        },
                        onPlacesChanged: () => {
                            const places = refs.searchBox.getPlaces();

                            this.setState({
                                places,
                            });
                        },
                    })
                },
            }),
            withScriptjs
        )(props =>
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <input
                        className="search-color"
                        type="text"
                        placeholder="Wyszukaj..."
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `100%`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                        }}
                    />
                </StandaloneSearchBox>
                {console.log(props.places)}
                    {props.places.map(({ geometry: { location, viewport } }) =>
                        {
                            this.setLocation(location);
                            this.setViewport(viewport);
                        }
                    )}
            </div>
        );

        const MapWithAMarkerClusterer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBoxYm5LJKUVyIUqxMMFX1OqDyMZ0ZF1Co&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withHandlers({
                onMarkerClustererClick: () => (markerClusterer) => {
                    const clickedMarkers = markerClusterer.getMarkers();
                    console.log(`Current clicked markers length: ${clickedMarkers.length}`);
                    console.log(clickedMarkers);
                },
            }),
            withScriptjs,
            withGoogleMap
        )(props =>

            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
                fitBounds={}
            >
                <MarkerClusterer
                    onClick={props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {props.markers.map(marker => (
                        <Marker
                            key={marker.photo_id}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMap>
        );

        return (
            <div style={{ height: '100%' }} className="row">
                <div className="col-md-3 nopadding">
                    <div style={{paddingLeft: 5+'px'}}>
                        <PlacesWithStandaloneSearchBox />
                    </div>
                </div>
                <div className="col-md-6 nopadding">
                    <MapWithAMarkerClusterer markers={this.state.markers} />
                </div>
                <div className="col-md-3 nopadding">

                </div>
            </div>
        )
    }

}

export default Home;
