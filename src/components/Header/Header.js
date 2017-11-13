import React, {Component} from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';

let testWeakMap = new WeakMap();

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
      return (
          <header className="app-header navbar">
              <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
              <NavbarBrand href="#"/>

              <NavbarToggler className="d-md-down-none" style={{color: '#fff'}} onClick={this.sidebarToggle}><span className="fa fa-search"></span> Wyszukaj</NavbarToggler>

              <Nav className="ml-auto" navbar>
                  {/*<NavItem className="px-3">*/}
                      {/*<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>*/}
                          {/*<DropdownToggle className="nav-link dropdown-toggle">*/}
                              {/*<span className="d-md-down-none">admin</span>*/}
                          {/*</DropdownToggle>*/}
                          {/*<DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>*/}
                              {/*<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>*/}
                              {/*<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>*/}
                              {/*<DropdownItem divider/>*/}
                              {/*<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
                              {/*<DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
                          {/*</DropdownMenu>*/}
                      {/*</Dropdown>*/}
                  {/*</NavItem>*/}

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#">Kup</NavLink>
                  </NavItem>

                  <NavItem className="px-3 d-md-down-none">
                      <NavLink href="#">Sprzedaj</NavLink>
                  </NavItem>
                </Nav>
          </header>
      )
  }
}

export default Header;
