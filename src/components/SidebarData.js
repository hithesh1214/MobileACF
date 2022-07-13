import SBU from "../pages/SBU";
import SBUmaster from "../pages/SBUmaster";
// import Home from "../pages/Home";
import RBUmaster from "../pages/RBUmaster";
import RBU from "../pages/RBU";
import ABUmaster from "../pages/ABUmaster";
import ABU from "../pages/ABU";
import Servicemaster from "../pages/Servicemaster";
import Service from "../pages/Service";
import ACFMaster from "../pages/ACFMaster";
import ACF from "../pages/ACF";

export const SidebarDataFirst = [
  // {
  //   title: "Home",
  //   path: "/Admin/Home",
  //   component: Home,
  // },
  {
    title: "ACFs",
    path: "/Admin/ACFs",
    component: ACF,
  },
  {
    title: "ABU",
    path: "/Admin/ABU",
    component: ABU,
  },
  {
    title: "RBU",
    path: "/Admin/RBU",
    component: RBU,
  },
  {
    title: "SBU",
    path: "/Admin/SBU",
    component: SBU,
  },
  {
    title: "Services",
    path: "/Admin/Services",
    component: Service,
  },
];

export const SidebarDataSecond = [
  {
    title: "ACF Master",
    path: "/Admin/ACFMaster",
    component: ACFMaster,
  },
  {
    title: "ABU Master",
    path: "/Admin/ABUMaster",
    component: ABUmaster,
  },
  {
    title: "RBU Master",
    path: "/Admin/RBUMaster",
    component: RBUmaster,
  },
  {
    title: "SBU Master",
    path: "/Admin/SBUMaster",
    component: SBUmaster,
  },
  {
    title: "Service Master",
    path: "/Admin/ServiceMaster",
    component: Servicemaster,
  },
];
