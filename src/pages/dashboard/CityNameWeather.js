import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { usePosition } from 'use-position'
import axios from "axios"
import { useSnackbar } from 'notistack';
import { Helmet } from "react-helmet-async";
// mui
import {
    Link,
    Breadcrumbs,
    Divider,
    Typography
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';


export default function CityNameWeather() {
    const { enqueueSnackbar } = useSnackbar();
    const [weather, setWeather] = useState();
    const [cityName, setCityName] = useState('');

    const getWeather = async (name) => {
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}`)
            .then((response) => {
                setWeather(response.data)
                enqueueSnackbar(response.data.message, { variant: 'warning', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            })
            .catch(error => enqueueSnackbar(error, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }));
    }

    return (
        <React.Fragment>
            <Helmet title={"Şehir Hava Durumu"} />
            <Typography variant="h3" gutterBottom>
                Şehirlere Göre Hava Durumu
            </Typography>
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} to={PATH_DASHBOARD.root}>
                    AnaSayfa
                </Link>
                <Typography>
                    Şehir Hava Durumu
                </Typography>
            </Breadcrumbs>
            <Divider my={6} />


        </React.Fragment>
    )
}
