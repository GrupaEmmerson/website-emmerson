import React from 'react';
import Slider from 'react-slick';
import AutoFitImage from 'react-image-autofit-frame';

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
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            pauseOnHover: true,
            touchMove: true,
            arrows: false,
        };

        return (
            <Slider {...settings}>
                {images.map(e => {
                    return(
                        <div>
                            <AutoFitImage
                                frameWidth="100%"
                                frameHeight="533px"
                                imgSrc={e.link}
                            />
                            <div className='col-12' style={{}}>
                                <h1>Opis oferty</h1>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        );
    }
}

export default SimpleSlider;