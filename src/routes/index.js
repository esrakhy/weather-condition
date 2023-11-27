import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

// Layouts
import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import Page404 from "../pages/auth/Page404";

// Components
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        //  Default Route
        {
            path: '/',
            element: (
                <DashboardLayout />
            ),
            children: [
                { path: `${PATH_DASHBOARD.locationWeather}`, element: <LocationWeather /> }
            ]
        },
        // Dashboard Routes
        {
            path: 'dashboard',
            element: (
                <DashboardLayout />
            ),
            children: [
                { path: `${PATH_DASHBOARD.cityNameWeather}`, element: <CityNameWeather /> },
                { path: `${PATH_DASHBOARD.mapWeather}`, element: <MapWeather /> }
            ]
        },
        {
            path: "*",
            element: <AuthLayout />,
            children: [
                {
                    path: "*",
                    element: <Page404 />,
                },
            ],
        }
    ]);
}

// IMPORT COMPONENTS

//  Dashboard
const LocationWeather = Loadable(lazy(() => import('../pages/dashboard/LocationWeather')));
const CityNameWeather = Loadable(lazy(() => import('../pages/dashboard/CityNameWeather')));
const MapWeather = Loadable(lazy(() => import('../pages/dashboard/MapWeather')));