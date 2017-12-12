import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer" style={{position: 'fixed', bottom: 0, width: 100+'%'}}>
        <a href="https://emmerson.pl">Emmerson</a> &copy; 2017
        <span className="float-right">Create by <a href="http://draftway.pl">Draftway Sp. z o.o.</a></span>
      </footer>
    )
  }
}

export default Footer;