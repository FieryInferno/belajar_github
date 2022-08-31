/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

const Today = ({weather, todayForecast}) => {
  /* eslint-disable max-len */
  return (
    <div className="flex justify-center mt-4">
      <div className="grid grid-rows-2 grid-flow-col gap-4">
        <div>
          <div className="block p-6 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex flex-row">
              <div className="basis-3/4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{weather?.name}, Indonesia Weather</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">as of {moment().format('hh:mm a')}</p>
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{weather?.main.temp}°</h1>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{weather?.weather[0].description}</h5>
              </div>
              <div className="basis-1/4 p-16">
                <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{weather?.main.temp_min}°/{weather?.main.temp_max}°</h5>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="block p-6 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Today&apos;s Forecast for {weather?.name}, Indonesia Weather</h5>
            <div className="grid grid-cols-4 gap-4">
              {todayForecast && Object.values(todayForecast).map((forecast, key) => {
                return forecast.length > 0 && (
                  <div key={key}>
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
  );
};

export default Today;
