import React, {Component} from 'react';

class Sidebar extends Component {

    render(){

    return (
        <div className="sidebar">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6" >
                        <div className="form-group" >
                            <label htmlFor="input-id-2">Cena od:</label>
                            <input type="text" className="form-control bg-dark search-box" id="input-id-2" placeholder="...od" />
                        </div>
                    </div>
                    <div className="col-md-6" >
                        <div className="form-group" >
                            <label htmlFor="input-id-3">Cena do:</label>
                            <input type="email" className="form-control bg-dark search-box" id="input-id-3" placeholder="...do" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Sidebar;