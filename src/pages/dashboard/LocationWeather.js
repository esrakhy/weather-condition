import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { usePosition } from 'use-position'
import axios from "axios"
import { useSnackbar } from 'notistack';
import { Helmet } from "react-helmet-async";
// mui
import { useTheme } from '@mui/material/styles';
import {
    Breadcrumbs,
    Divider,
    Typography,
    Grid,
    Paper,
    Box,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    TableHead,
    TablePagination,
    TableFooter,
    IconButton,

} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

// sections
import WindWidget from '../../sections/@dashboard/WindWidget';
import TemperatureWidget from '../../sections/@dashboard/TemperatureWidget';
import WeatherWidget from '../../sections/@dashboard/WeatherWidget';

// -------------------------------------------------------
export default function LocationWeather() {
    const { enqueueSnackbar } = useSnackbar();
    const [weather, setWeather] = useState();
    const [weatherList, setWeatherList] = useState([]);
    const { latitude, longitude } = usePosition();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const getWeather = async () => {
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=tr&&units=metric`)
            .then((response) => {
                setWeather(response.data)
                enqueueSnackbar("Hava durumu getirildi.", { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            })
            .catch(error => enqueueSnackbar(error, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }));
    }
    const getWeatherForecast = async () => {
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&lang=tr&&units=metric`)
            .then((response) => {
                setWeatherList(response.data.list)
                enqueueSnackbar("Hava durumu tahmini getirildi.", { variant: 'info', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            })
            .catch(error => enqueueSnackbar(error, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }));
    }
    useEffect(() => {
        latitude && longitude && getWeather();
        latitude && longitude && getWeatherForecast();
    }, [latitude, longitude]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - weatherList.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <Helmet title={"Konum Hava Durumu"} />
            <Typography variant="h3" gutterBottom>
                Konuma Göre Hava Durumu
            </Typography>
            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                    {weather?.name}
                </Typography>
            </Breadcrumbs>
            <Divider my={6} sx={{ mb: 3 }} />
            <Grid container spacing={5} sx={{ p: 2 }}>
                <Grid item xs={4}>
                    <WeatherWidget
                        title={weather?.weather[0].description.toUpperCase()}
                        subtitle={new Date(weather?.dt * 1000).toLocaleString()}
                        image={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} />
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TemperatureWidget total={weather?.main.temp} color="error" />
                        </Grid>
                        <Grid item xs={12}>
                            <WindWidget total={weather?.wind.speed} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ p: 2, mt: 5 }}>
                Hava Durumu Tahminleri
            </Typography>
            <Grid container spacing={1} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Tarih</TableCell>
                                    <TableCell align="left">Görsel</TableCell>
                                    <TableCell align="left">Sıcaklık</TableCell>
                                    <TableCell align="left">Rüzgar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? weatherList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : weatherList
                                ).map((row, index) => (
                                    <TableRow hover tabIndex={-1} key={index}>
                                        <TableCell align="left">{new Date(row.dt * 1000).toLocaleString()}</TableCell>
                                        <TableCell align="left">
                                            <img src={`https://openweathermap.org/img/wn/${row.weather[0].icon}@2x.png`} width="50" />
                                        </TableCell>
                                        <TableCell align="left">{row.main.temp} °C</TableCell>
                                        <TableCell align="left"> {row.wind.speed} m/s</TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={weatherList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
// ---------------------------------------
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

