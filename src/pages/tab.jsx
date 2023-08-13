import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import current from './current';

const tab = ({check, active, lat, long}) => {
	const [data, setData] = useState([]);
	const [tmrData, setTmrData] = useState([]);
	const [value, setValue] = React.useState("1");
	const [isActive, setIsActive] = useState(-1);

	const handleChange = (event, newValue) => {
			setValue(newValue);
	};

	const classes = {
		cmn: {
			"font-family": "Figtree-R",
			"font-size": "18px",
			"font-weight": "700",
		},
		labelLight: {
			color: "#bababa",
		},
		labelNight: {
			color: "#1b1b1b",
		},
	};

	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var lastDay = today.getDate()-1;
	var historyDay = today.getDate()-7;
	var lastDate = year + "-" + month + "-" + lastDay;
	var historyDate = year + "-" + month + "-" + historyDay;

	const getShortDayName = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
        weekday: 'short'
    });
	};

	const getLongDayName = (value) => {
    return new Date(value).toLocaleDateString('en-US', {
        weekday: 'long'
    });
	};

	const getShortMonthName = (value) => {
		return new Date(value).toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})
	}

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://api.weatherapi.com/v1/history.json?key=32444fc267f1430295833413231904&q=${lat},${long}&dt=${historyDate}&end_dt=${lastDate}`)
      .then(res => res.json())
      .then(res => {
        setData(res)
				console.log(res);
      });

      await fetch(`http://api.weatherapi.com/v1/forecast.json?key=32444fc267f1430295833413231904&q=${lat},${long}&days=2&aqi=no&alerts=no`).then(tmr => tmr.json())
      .then(tmr => {
        setTmrData(tmr)
        console.log(tmr);
      });
    }
    fetchData();
  }, [lat,long])
	const toggle = index => event =>
	setIsActive(index == isActive ? -1 : index)
	return (
				<div>
					<Box sx={{ width: "100%", typography: "body1" }}>
						<TabContext value={value}>
							<Box>
								<TabList onChange={handleChange} indicatorColor="none" >
									<Tab label="Last 7 Days" value="1" sx={[check === true ? classes.labelLight : classes.labelNight, classes.cmn, { "&.Mui-selected": { "color": "#fff" }}, check && { "&.Mui-selected": { "color": "#333" }}]}/>
									<Tab label="Tomorrow" value="2" sx={[check === true ? classes.labelLight : classes.labelNight, classes.cmn, { "&.Mui-selected": { "color": "#fff" }}, check && { "&.Mui-selected": { "color": "#333" }}]}/>
								</TabList>
							</Box>
							<TabPanel value="1" sx={{"min-height": "220px",padding: "16px"}}><Typography component="div">
								<ul className="weather-history">
								{
                  data?.forecast?.forecastday.map((data, index) => {
                    return <li key={index} className={`weather-history-card ${isActive == index ?'resize' : ''}`} onClick={toggle(index)}>
                      <div className='weather-history-list'>
												<div className="weatherDateGp">
													<span className='weather-history-date'>{`${isActive == index ? getShortMonthName(data?.date) : ""}`}</span>
													<span className='weather-history-date'>{`${isActive == index ? getLongDayName(data?.date) : getShortDayName(data?.date)}`}</span>
												</div>
												<div className='weather-history-cel'>
													<div className='weather-history-icon'>
														<img src={data?.day.condition.icon} alt="" />
													</div>
													<span className='weather-history-temp'>
													{active === "1" ? data?.day.maxtemp_c.toFixed(0)+'°C' : data?.day.maxtemp_f.toFixed(0)+'°F'}
													</span>
												</div>
												<div className='weather-history-sub'>
													<span className='astro-weather-txt'>Sunrise : {data.astro.sunrise}</span>
													<span className='astro-weather-txt right'>Sunset : {data.astro.sunset}</span>
												</div>
												<div className='weather-history-sub'>
													<span className='astro-weather-txt'>Humidity : {data.day.avghumidity}%</span>
													<span className='astro-weather-txt right'>Wind : {data.day.maxwind_mph.toFixed(0)}mph</span>
												</div>
											</div>
                    </li>
                  })
                }
								</ul>
								</Typography></TabPanel>
							<TabPanel value="2" sx={{"min-height": "220px",padding: "16px"}}>
								<Typography component="div">
									<div className="weather-tmr">
										<div className="weather-tmr-tmp">
											<div className='weather-tmr-date'>
												<span>{getShortMonthName(tmrData?.forecast?.forecastday[1].date)}</span>
												<span>{getLongDayName(tmrData?.forecast?.forecastday[1].date)}</span>
											</div>
											<div className='weather-tmr-temp'>
												<div className='weather-tmr-temp-desc'>
													<div>
														<span>Average Temp : </span><span className='tmr-temp-num'>
														{active === "1" ? tmrData?.forecast?.forecastday[1].day.avgtemp_c.toFixed(0)+'°C' : tmrData?.forecast?.forecastday[1].day.avgtemp_f.toFixed(0)+'°F'}</span>
													</div>
													<div>
														<span>Average Max-Temp : </span><span className='tmr-temp-num'>{active === "1" ? tmrData?.forecast?.forecastday[1].day.maxtemp_c.toFixed(0)+'°C' : tmrData?.forecast?.forecastday[1].day.maxtemp_f.toFixed(0)+'°F'}</span>
													</div>
													<div>
														<span>Average Min-Temp : </span><span className='tmr-temp-num'>
														{active === "1" ? tmrData?.forecast?.forecastday[1].day.mintemp_c.toFixed(0)+'°C' : tmrData?.forecast?.forecastday[1].day.mintemp_f.toFixed(0)+'°F'}</span>
													</div>
												</div>
												<div className="weather-tmr-icon">
													<img src={tmrData?.forecast?.forecastday[1].day.condition.icon} alt="" />
												</div>
											</div>
										</div>
										<div className='tmr-forecast-sun'>
											<div>
												<div className='tmr-sun-ico'>
													<img src="./sunrise.png" alt="" />
												</div>
												<span className='tmr-sun-txt'>{tmrData?.forecast?.forecastday[1].astro?.sunrise}</span>
											</div>
											<div>
												<div className='tmr-sun-ico'>
													<img src="./sunset.png" alt="" />
												</div>
												<span className='tmr-sun-txt'>{tmrData?.forecast?.forecastday[1].astro?.sunset}</span>
											</div>
											</div>
											<div className='weather-tmr-forecast'>
												<div className='weather-tmr-ico'>
													<img src="./wind02.png" alt="" />
												</div>
												<span>{tmrData?.forecast?.forecastday[1].day.maxwind_mph.toFixed(0)}mph</span>
											</div>
											<div className='weather-tmr-forecast'>
												<div className='weather-tmr-ico'>
													<img src="./raining.png" alt="" />
												</div>
												<span>{tmrData?.forecast?.forecastday[1].day.daily_chance_of_rain}%</span>
											</div>
											<div className='weather-tmr-forecast'>
												<div className='weather-tmr-ico'>
													<img src="./uv-protection.png" alt="" />
												</div>
												<span>{tmrData?.forecast?.forecastday[1].day.uv}</span>
											</div>
									</div>
								</Typography>
							</TabPanel>
						</TabContext>
					</Box>
        </div>
	)
}

export default tab