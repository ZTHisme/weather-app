import React from 'react';
import { useState, useEffect } from 'react';
import '../reset.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faWind, faLocationDot, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import ReactSwitch from "react-switch";
import Search from "./search";
import Detail from "./detail";

const current = ({check, toggleTheme, theme}) => {
	const [latlng, setlatlng] = useState({
		lat: "",
		long: ""
	});
  const [data, setData] = useState([]);
  const [astroData, setAstroData] = useState([]);
  const currDate = new Date().toLocaleDateString();
	const [active, setActive] = useState("1");

  const handleClick = (event) => {
    setActive(event.target.id);
  }

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
				setlatlng({
					lat: position.coords.latitude,
					long: position.coords.longitude
				})
      });

      await fetch(`http://api.weatherapi.com/v1/current.json?key=32444fc267f1430295833413231904&q=${latlng.lat},${latlng.long}&aqi=no`)
      .then(res => res.json())
      .then(res => {
        setData(res)
      });

      await fetch(`http://api.weatherapi.com/v1/astronomy.json?key=32444fc267f1430295833413231904&q=${latlng.lat},${latlng.long}&dt=${currDate}`).then(astro => astro.json())
      .then(astro => {
        setAstroData(astro)
      });
    }
    fetchData();
  }, [latlng.lat,latlng.long])
	return (
		<div className='weather-blk'>
			<div className='weather-desc side-bar'>
				<div>
					<div className='location-data'>
						<p className='location-name'>{data.location?.name}</p><span className='ico-location'><FontAwesomeIcon icon={faLocationDot} style={check ? {color: "#000"}: {color: "#fff"}} /></span>
					</div>
					<div className='temp-data'>
						<span className='temp-txt'>{active === "1" ? data.current?.temp_c.toFixed(0)+'°C' : data.current?.temp_f.toFixed(0)+'°F'}</span>
						<div className='weather-desc-ico'>
							<img src={data.current?.condition?.icon} alt="" />
						</div>
					</div>
				</div>
				<div className='sub-weather-desc'>
					<div className='astro-weather-type'>
						<p className='astro-weather-txt'>Sunrise: {astroData.astronomy?.astro?.sunrise}</p>
						<p className='astro-weather-txt right'>Sunset: {astroData.astronomy?.astro?.sunset}</p>
					</div>
					<div className='sub-weather-type'>
						<p className='sub-weather-txt'><span><FontAwesomeIcon icon={faTemperatureHalf} style={check ? {color: "#000"}: {color: "#fff"}} /></span>{data.current?.condition?.text}</p>
						<span className='sub-weather-num'>{data.current?.cloud}</span>
					</div>
					<div className='sub-weather-type'>
						<p className='sub-weather-txt'><span><FontAwesomeIcon icon={faDroplet} style={check ? {color: "#000"}: {color: "#fff"}} /></span>Humidity</p>
						<p className='sub-weather-num'>{data.current?.humidity}%</p>
					</div>
					<div className='sub-weather-type'>
						<p className='sub-weather-txt'><span><FontAwesomeIcon icon={faWind} style={check ? {color: "#000"}: {color: "#fff"}} /></span>Wind</p>
						<p className='sub-weather-num'>{data.current?.wind_mph.toFixed(0)}mph</p>
					</div>
					<div className='current-location'>
						<div>
							<p className='current-location-txt'>{data.location?.region} , {data.location?.country}</p>
						</div>
					</div>
					<Search check={check}/>
				</div>
			</div>
			<div className='weather-detail'>
				<div className='switch-toggle'>
					<div className='temp-unit-btn'>
						<button className={active === "1" ? "active" : undefined} key={1} id={"1"} onClick={handleClick}>°C</button>
						<button className={active === "2" ? "active" : undefined} key={2} id={"2"} onClick={handleClick}>°F</button>
					</div>
					<ReactSwitch onChange={toggleTheme} checked={theme === "light"} offColor="#3a3c67" onColor="#3fc1e6" handleDiameter={20} checkedIcon={ <div className='switch-ico'>
						<img src='./sun.svg'/>
					</div> } uncheckedIcon={ <div className='switch-ico'> <img src='./moon.svg'/> </div> }/>
				</div>
        <Detail check={check} active={active} lat={latlng.lat} long={latlng.long}/>
			</div>
		</div>
  );
}

export default current