import React from 'react';
import Slider from 'react-slick';
import AutoFitImage from 'react-image-autofit-frame';
import Image from 'react-image-resizer';

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
        const {images, surface, price, priceM2} = this.props;
        const style = {
            image: {
                backgroundColor: '#fff',
                margin: 'auto',
                marginBottom: 106+'px',
                marginTop: 40+'px'
            },
            container: {
                textAlign: 'center',
                position: 'relative',
                backgroundColor: 'RGBA(255,255,255, 0.3)',
                marginBottom: 20+'px'
            },
            describe: {
                position: 'absolute',
                height: 100+'px',
                bottom: 0,
                color: '#fff',
            },
            text: {
                marginTop: 30+'px',
                textShadow: '3px 4px 8px #000'
            },
            textColor: {
                color: '#e3001b'
            }
        };

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
            dotsClass: 'slick-dots white-dots'
        };

        return (
            <Slider {...settings}>
                {images.map(e => {
                    return(
                        <div style={style.container} className='col-12'>
                            <Image
                                src={e.link}
                                alt=""
                                width={800}
                                height={533}
                                style={style.image}
                            />
                            <div className='col-12 row' style={style.describe}>
                                <div className='col-4' style={style.text}><h2><span style={style.textColor}>Cena:</span> {price}</h2></div>
                                <div className='col-4' style={style.text}><h2><span style={style.textColor}>Cena m<sup>2</sup>:</span> {priceM2}</h2></div>
                                <div className='col-4' style={style.text}><h2><span style={style.textColor}>Powierzchnia:</span> {surface}m<sup>2</sup></h2></div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        );
    }
}

export default SimpleSlider;