import { Home, Map, MapPin } from "react-feather";

// ----------------------------------------------------------------------
const pagesSection = [
  {
    href: "/dashboard/locationWeather",
    icon: MapPin,
    title: "Konum",
  },
  {
    href: "/dashboard/mapWeather",
    icon: Map,
    title: "Harita",
  }
];

const navItems = [
  {
    title: "",
    pages: pagesSection,
  },
];

export default navItems;
