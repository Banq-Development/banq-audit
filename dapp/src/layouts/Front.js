/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";

// core components
import DemoNavbar from "../components/Navbars/DemoNavbar.js";
import CardsFooter from "../components/Footers/CardsFooter.js";

// index page sections
import Hero from "../views/IndexSections/Hero.js";
import Carousel from "../views/IndexSections/Carousel.js";
import Login from "../views/IndexSections/Login.js";
import Download from "../views/IndexSections/Download.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />          
          <Carousel />
          <Login />
          <Download />
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Index;
