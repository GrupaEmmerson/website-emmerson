import React, {Component} from "react";

let testWeakMap = new WeakMap();

class InfoOfferView extends Component {

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


    render() {
        return(
          <div>
              <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                  <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-8'>Informacje Podstawowe:</div>
              </div>
              <div className='row align-items-end'>
                    <div className="col-6">Powierzchnia całkowita:</div><div className="col-6"><div className="float-right">1</div></div>
                    <div className="col-6">Liczba pokoi:</div><div className="col-6"><div className="float-right">2</div></div>
                    <div className="col-6">Piętro:</div><div className="col-6"><div className="float-right">3</div></div>
                    <div className="col-6">Ilość pięter:</div><div className="col-6"><div className="float-right">4</div></div>
                    <div className="col-6">Rok budowy:</div><div className="col-6"><div className="float-right">5</div></div>
                    <div className="col-6">Numer oferty:</div><div className="col-6"><div className="float-right">6</div></div>
              </div>
              <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                  <div style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-8'>Informacje dodatkowe:</div>
              </div>
              <div  className='row align-items-end'>
                  <div className="col-6">Rozkład:</div><div className="col-6"><div className="float-right">1</div></div>
                  <div className="col-6">Dozór budynku:</div><div className="col-6"><div className="float-right">2</div></div>
                  <div className="col-6">Głośność:</div><div className="col-6"><div className="float-right">3</div></div>
                  <div className="col-6">Dojazd:</div><div className="col-6"><div className="float-right">4</div></div>
                  <div className="col-6">Internet:</div><div className="col-6"><div className="float-right">5</div></div>
                  <div className="col-6">Ogrzewanie:</div><div className="col-6"><div className="float-right">6</div></div>
                  <div className="col-6">Telewizja kablowa:</div><div className="col-6"><div className="float-right">7</div></div>
                  <div className="col-6">Balkon:</div><div className="col-6"><div className="float-right">8</div></div>
                  <div className="col-6">Winda:</div><div className="col-6"><div className="float-right">9</div></div>
                  <div className="col-6">Usytuowanie:</div><div className="col-6"><div className="float-right">10</div></div>
                  <div className="col-6">Okna:</div><div className="col-6"><div className="float-right">11</div></div>
                  <div className="col-6">Instalacje:</div><div className="col-6"><div className="float-right">12</div></div>
                  <div className="col-6">Wysokość pomieszczeń:</div><div className="col-6"><div className="float-right">13</div></div>
                  <div className="col-6">Ilość wind:</div><div className="col-6"><div className="float-right">14</div></div>
                  <div className="col-6">Stan lokalu:</div><div className="col-6"><div className="float-right">15</div></div>
                  <div className="col-6">Rodzaj mieszkania:</div><div className="col-6"><div className="float-right">16</div></div>
                  <div className="col-6">Gaz:</div><div className="col-6"><div className="float-right">17</div></div>
                  <div className="col-6">Woda:</div><div className="col-6"><div className="float-right">18</div></div>
              </div>
          </div>
        );
    }
}

export default InfoOfferView;