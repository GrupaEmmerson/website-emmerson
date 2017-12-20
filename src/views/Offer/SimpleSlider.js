import React from 'react';
import Slider from 'react-slick';

let testWeakMap = new WeakMap();

class SimpleSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    render() {
        const {images} = this.props;

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <Slider {...settings}>
                {images.map(e => {
                    return(
                        <img src={e.link} style={{maxHeight: 50+'vh', minHeight: 50+'vh'}}/>
                    );
                })}
            </Slider>
        );
    }
}

export default SimpleSlider;