import React from 'react';
import Tab from "./tab";
import Today from "./today";

const detail = ({check, active, lat, long}) => {
	return (
		<div>
			<Tab check={check} active={active} lat={lat} long={long}/>
			<Today lat={lat} long={long}/>
		</div>
	)
}

export default detail