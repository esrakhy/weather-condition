// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

export const PATH_PAGE = {
    page404: "/404",
    page500: "/500",
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    locationWeather: path(ROOTS_DASHBOARD, "/locationWeather"),
    cityNameWeather: path(ROOTS_DASHBOARD, "/cityNameWeather"),
    mapWeather: path(ROOTS_DASHBOARD, "/mapWeather")
};