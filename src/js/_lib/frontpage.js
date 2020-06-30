const initHomeLazyLoad = () =>{
	let listElm = document.querySelector('#infinite-list');

		let nextItem = 1;
		const loadMore = () => {
			for (var i = 0; i < 20; i++) {
				var item = document.createElement('li');
				item.innerText = 'Item ' + nextItem++;
				listElm.appendChild(item);
			}
		}

	// Detect when scrolled to bottom.
		listElm.addEventListener('scroll', function() {
			if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
				loadMore();
			}
		});

	// Initially load some items.
		loadMore();
}

const loadHomeData = () => {
	let url = 'http://mpg.c2136.cloudnet.cloud/wp-json/mpg/home/';

	fetch(url)
		.then(res => res.json())
		.then((out) => {
			console.log('Checkout this JSON! ', out);
			homeData = out;
		})
		.catch(err => { throw err });
}
