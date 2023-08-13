import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Posts from "./posts";

const search = ({check}) => {
	const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({
    current: [],
    astro: []
  });
  const currDate = new Date().toLocaleDateString();

	const searchWeather = () => {
    const weather = `http://api.weatherapi.com/v1/current.json?key=32444fc267f1430295833413231904&q=${search}`;
    return fetch(weather)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error", error);
        throw error;
      });
  };

  const searchWeatherAstro = () => {
    const weatherAstro = `http://api.weatherapi.com/v1/astronomy.json?key=32444fc267f1430295833413231904&q=${search}&dt=${currDate}`;
    return fetch(weatherAstro)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error", error);
        throw error;
      });
  };

  const onChangeHandler = e => {
    setSearch(e.target.value)
  };

  const handleInput = async () => {
    try {
      const weather = await searchWeather(search);
      const weatherAstro = await searchWeatherAstro(search);
      setWeather({
        current: weather,
        astro: weatherAstro
      });
    } catch (error) {
      console.log(error);
    }
	}

	return (
		<div className='search-blk'>
			<div className='search-bar'>
				<div className='search-input'>
        <i className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} style={check ? {color: "#888"}: {color: "#fff"}}/></i>
				<input type="text" value={search} onChange={onChangeHandler} maxLength={20}/></div>
        <button onClick={handleInput}>search</button>
			</div>
			<Posts weather={weather.current} weatherAstro={weather.astro} search={search}/>
		</div>
	)
}

export default search