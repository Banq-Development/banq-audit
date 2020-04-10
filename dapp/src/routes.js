/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Tables from "views/examples/Tables.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Report from "views/examples/Report.js";
import Terms from "views/examples/Terms.js";

var routes = [
  {
    path: "/index",
    name: "Marketplace",
    icon: "ni ni-tv-2 text-primary",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/details",
    name: "Audit details",
    icon: "ni ni-check-bold text-primary",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/request",
    name: "request audit",
    icon: "ni ni-check-bold text-primary",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/report/:id?/:bytes?",
    name: "report audit",
    icon: "ni ni-check-bold text-primary",
    component: Report,
    layout: "/auth"
  },
  {
    path: "/terms",
    name: "terms of service",
    icon: "",
    component: Terms,
    layout: "/docs"
  },
];
export default routes;
