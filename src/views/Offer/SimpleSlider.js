import React from 'react';
import Slider from 'react-slick';
import NumberFormat from 'react-number-format';

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
        const {images, surface, price, priceM2, full_location} = this.props;
        const style = {
            image: {
                margin: 'auto',
                width: 'auto',
                height: 319+'px',
                marginBottom: 40+'px',
                border: '3px solid #fff',
                boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'
            },
            container: {
                textAlign: 'left',
                position: 'relative',
                backgroundImage: 'URL("./img/offer_background.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: 733+'px'
            },
            describe: {
                position: 'absolute',
                height: 'auto',
                bottom: 0,
                color: '#fff',
                backgroundColor: 'RGBA(0,0,0,0.6)',
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
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            pauseOnHover: true,
            touchMove: true,
            arrows: true,
            dotsClass: 'slick-dots white-dots'
        };

        return (
            <div style={style.container} >
                <div className='col-12 col-sm-12 col-md-6 col-lg-6 slider-image' >
                    <Slider {...settings}>
                        {images.map(e => {
                            return(
                                <div
                                style={{width: 100+'%'}}
                                >
                                    <img
                                        src={e.link}
                                        style={style.image}
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div className='col-12 row nopadding' style={style.describe}>
                    <div className='col-12 col-sm-12 col-md-5' style={style.text}>
                        <span style={style.textColor}>Lokalizacja:</span>
                        <h3>{full_location}</h3>
                    </div>
                    <div className='col-12 col-sm-12 col-md-3' style={style.text}>
                        <span style={style.textColor}>Cena:</span>
                        <h3> <NumberFormat value={parseFloat(price)} displayType={'text'} thousandSeparator={' '} suffix={'zł'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/></h3>
                    </div>
                    <div className='col-6 col-sm-6 col-md-2' style={style.text}>
                        <span style={style.textColor}>Cena m<sup>2</sup>:</span>
                        <h3><NumberFormat value={parseFloat(priceM2)} displayType={'text'} thousandSeparator={' '} suffix={'zł'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/></h3>
                    </div>
                    <div className='col-6 col-sm-6 col-md-2' style={style.text}>
                        <span style={style.textColor}>Powierzchnia:</span>
                        <h3><NumberFormat value={parseFloat(surface)} displayType={'text'} thousandSeparator={' '} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>m<sup>2</sup></h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimpleSlider;