import React from 'react';

const posts = ({weather, weatherAstro, search}) => {
	const hour = weather.location?.localtime.split(' ')[1];
	const locationTime = hour?.split(':')[0] >= 12 ? ' PM' : ' AM';
	return (
		<div className='weather-card' style={weather.location?.country.toLowerCase() || weather.location?.name.toLowerCase() == search.toLowerCase() ? {display: 'block'} : {display: 'none'}}>
			<div className='weather-forecast'>
				<div className='weather-card-nav'>
					<p className='weather-location-name'>{weather.location?.name}, {weather.location?.country}</p>
					<span className='weather-location-time'>{hour+locationTime}</span>
				</div>
				<div className='weather-card-body'>
					<div className='weather-card-temp'>
						<span>{weather.current?.temp_c.toFixed(0)}°C</span>
						<div className='weather-forecation-icon'>
							<img src={weather.current?.condition?.icon} alt="" />
						</div>
					</div>
					<div className='weather-card-subtxt'>
						<div>
							<span>Sunrise : {weatherAstro.astronomy?.astro?.sunrise}</span>
							<span>Sunset : {weatherAstro.astronomy?.astro?.sunset}</span>
						</div>
						<div>
							<span>Humidity : {weather.current?.humidity}</span>
							<span>Real Feel : {weather?.current?.feelslike_c.toFixed(0)}°C</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default posts
