import React, {Component} from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs } from "react-google-maps"
import { connect } from 'react-redux';
import * as actions from '../../actions';

let testWeakMap = new WeakMap();

class Sidebar extends Component {
    constructor (props) {
        super(props);
        this.state = { location: '' };
    }

    componentWillMount() {
        this.setState({ markers: [] });
    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    setLocation(Location){
        this.props.setLocation(Location);
    }

    setViewport(viewport){
        this.props.setViewport(viewport);
    }

    render() {
        const { compose, withProps, lifecycle } = require("recompose");
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
                    setBounds: [],

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
                {
                    this.setViewport(props.place)
                }

            </div>
        );

    return (
        <div className="sidebar">
            <div className="col-md-12">
                <div style={{padding: 5+'px'}}>
                    <PlacesWithStandaloneSearchBox />
                </div>
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

Sidebar.contextTypes = {
    router: function () {
        return React.PropTypes.object.isRequired;
    }
};

export default connect(mapStateToProps, actions)(Sidebar);