/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import {stringify} from 'query-string';

const App = () => {
  const [weather, setWeather] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weathers, setWeathers] = useState();
  const today = moment().format('YYYY-MM-DD');
  const [todayForecast, setTodayForecast] = useState();

  console.log(todayForecast);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        lat,
        lon,
        lang: 'id',
        units: 'metric',
        appid: process.env.REACT_APP_API_KEY,
      };

      await axios.get(`${process.env.REACT_APP_API_URL}/weather?${stringify(params)}`)
          .then((response) => setWeather(response.data));

      await axios.get(`${process.env.REACT_APP_API_URL}/forecast?${stringify(params)}`)
          .then((response) => setWeathers(response.data));
    };

    if (lat !== undefined && lon !== undefined) {
      fetchData();
    }
  }, [lat, lon]);

  useEffect(() => {
    if (weathers !== undefined) {
      const Morning = weathers?.list.filter((weather) => {
        return (weather.dt >= Math.floor(new Date(today + ' 06:00') / 1000) && weather.dt <= Math.floor(new Date(today + ' 12:00') / 1000));
      });

      const Afternoon = weathers?.list.filter((weather) => {
        return (weather.dt >= Math.floor(new Date(today + ' 12:00') / 1000) && weather.dt <= Math.floor(new Date(today + ' 16:59') / 1000));
      });

      const Evening = weathers?.list.filter((weather) => {
        return (weather.dt >= Math.floor(new Date(today + ' 17:00') / 1000) && weather.dt <= Math.floor(new Date(today + ' 21:00') / 1000));
      });

      const Night = weathers?.list.filter((weather) => {
        return (weather.dt >= Math.floor(new Date(today + ' 21:00') / 1000) && weather.dt <= Math.floor(new Date(today + ' 23:59') / 1000));
      });

      setTodayForecast({
        Morning,
        Afternoon,
        Evening,
        Night,
      });
    }
  }, [weathers]);

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Weather Forecast</span>
          </a>
          <div className="flex md:order-2">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="hidden relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="dashboard" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Today</a>
              </li>
              <li>
                <a href="dashboard" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Hourly</a>
              </li>
              <li>
                <a href="dashboard" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">5 Day</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex justify-center mt-4">
        <div className="grid grid-rows-2 grid-flow-col gap-4">
          <div>
            <div className="block p-6 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="flex flex-row">
                <div className="basis-3/4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{weather?.name}, Indonesian Weather</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">as of {moment().format('hh:mm a')}</p>
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{weather?.main.temp}°</h1>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{weather?.weather[0].main}</h5>
                </div>
                <div className="basis-1/4 p-16">
                  <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{weather?.main.temp_min}/{weather?.main.temp_max}°</h5>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="block p-6 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Today&apos;s Forecast for {weather?.name}, Indonesian Weather</h5>
              <div className="grid grid-cols-4 gap-4">
                {todayForecast && Object.values(todayForecast).map((forecast, key) => {
                  return forecast.length > 0 && (
                    <div>
                      <div className="flex justify-center">
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{Object.keys(todayForecast)[key]}</h5>
                      </div>
                      <div className="flex justify-center">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{forecast[0].main.temp}°</h5>
                      </div>
                      <div className="flex justify-center">
                        <img src={`http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`} />
                      </div>
                      <div className="flex justify-center">
                        <h5 className="text-md tracking-tight text-gray-900 dark:text-white">{forecast[0].clouds.all}%</h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
