import data from '../../assets/data.json'
export const get = () => {
	return data;
}

export const getState = (state) => {
	let sines = data.filter(sine => sine["UF Posto"] === state);
	return sines.sort((a,b) => {
		return a["Nome Posto"] < b["Nome Posto"] ? -1 : a["Nome Posto"] > b["Nome Posto"] ? 1 : 0;
	});
}