import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import HeaderNoSidebar from '../../components/HeaderNoSidebar/';
import Offer from "../../views/Offer/Offer";

class NoSidebar extends Component {
    render() {
        return (
            <div className="app">
                <HeaderNoSidebar />
                <div className="app-body">
                    <main className="main">
                        <Switch>
                            <Route path="/offer/:id" name="Offer" component={ (props) => <Offer {...props}/> }/>
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

export default NoSidebar;