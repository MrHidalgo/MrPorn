function postRequest(url = '', data = {}, callback){
	const searchParams = Object.keys(data).map((key) => {
		return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
	}).join('&');

	// Default options are marked with *
	const response = fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: searchParams // body data type must match "Content-Type" header
	}).then((out) => {
		console.log('Checkout this JSON! ', out);
		callback(out);
	}).catch(err => { throw err });
}
