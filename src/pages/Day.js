/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {Accordion} from 'flowbite-react';
import moment from 'moment';

const Day = ({weathers}) => {
  const [dayWeather, setDayWeather] = useState();

  useEffect(() => {
    if (weathers !== undefined) {
      const date = weathers.list[0].dt_txt.slice(0, 10);
      let start = new Date(date + ' 00:00') / 1000;
      let end = new Date(date + ' 23:59') / 1000;
      const arrayWeather = [];
      let tempArrayWeather = [];

      weathers.list.forEach((weather) => {
        if (!(weather.dt >= start && weather.dt <= end)) {
          arrayWeather.push(tempArrayWeather);
          tempArrayWeather = [];
          start = end;
          end += 86400;
        }

        tempArrayWeather.push(weather);
      });

      setDayWeather(arrayWeather);
    }
  }, [weathers]);

  const WindInformation = ({wind}) => {
    let direction = '';

    const val = Math.floor((wind.deg / 22.5) + 0.5);
    const arr = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
    ];
    direction = arr[(val % 16)];

    return (
      <>
        {direction} {wind.speed} mph
      </>
    );
  };

  /* eslint-disable max-len */
  return (
    <div className="flex justify-center mt-4">
      <div className="w-4/5">
        <Accordion alwaysOpen={true}>
          {dayWeather && dayWeather.map((weather, key) => (
            <Accordion.Panel key={key}>
              <Accordion.Title>
                <div className="flex items-center">
                  <div className="flex-none w-24">
                    {moment(weather[0].dt * 1000).format('MMM Do YY')}
                  </div>
                  <div className="flex-none w-24">
                    {weather[0].main.temp_min}°/{weather[0].main.temp_max}°
                  </div>
                  <div className="flex-none w-24">
                    <img src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`} className="w-14" />
                  </div>
                  <div className="flex-none w-96">
                    {weather[0].weather[0].description}
                  </div>
                  <div className="flex-none w-24">
                    {weather[0].clouds.all}%
                  </div>
                  <div className="flex-none w-48">
                    <div className="flex flex-row place-items-center">
                      <div className="basis-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4"><path d="M32 192h320c52.94 0 96-43.06 96-96s-43.06-96-96-96h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c17.66 0 32 14.34 32 32s-14.34 32-32 32H32C14.31 128 0 142.3 0 160S14.31 192 32 192zM160 320H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h128c17.66 0 32 14.34 32 32s-14.34 32-32 32H128c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S212.9 320 160 320zM416 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h384c17.66 0 32 14.34 32 32s-14.34 32-32 32h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S468.9 224 416 224z"/></svg>
                      </div>
                      <div className="basis-full">
                        <WindInformation wind={weather[0].wind} />
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                {weather.map((w, key) => (
                  <div className="flex items-center" key={key}>
                    <div className="flex-none w-24">
                      {moment(w.dt * 1000).format('hh:mm a')}
                    </div>
                    <div className="flex-none w-24">
                      {w.main.temp_min}°/{w.main.temp_max}°
                    </div>
                    <div className="flex-none w-24">
                      <img src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`} className="w-14" />
                    </div>
                    <div className="flex-none w-96">
                      {w.weather[0].description}
                    </div>
                    <div className="flex-none w-24">
                      {w.clouds.all}%
                    </div>
                    <div className="flex-none w-48">
                      <div className="flex flex-row place-items-center">
                        <div className="basis-6">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4"><path d="M32 192h320c52.94 0 96-43.06 96-96s-43.06-96-96-96h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c17.66 0 32 14.34 32 32s-14.34 32-32 32H32C14.31 128 0 142.3 0 160S14.31 192 32 192zM160 320H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h128c17.66 0 32 14.34 32 32s-14.34 32-32 32H128c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S212.9 320 160 320zM416 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h384c17.66 0 32 14.34 32 32s-14.34 32-32 32h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S468.9 224 416 224z"/></svg>
                        </div>
                        <div className="basis-full">
                          <WindInformation wind={w.wind} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Day;
