class AdBlockDetector {
	constructor(options = {}) {
		this.testUrl = options.testUrl || 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
		this.timeout = options.timeout || 1500;
		this.onDetected = options.onDetected || function () { console.warn('AdBlocker detected'); };
		this.onNotDetected = options.onNotDetected || function () { console.log('No AdBlocker detected'); };
		this.onClose = options.onClose || function () { console.warn('AdBlocker closed'); };
	}

	createNotice() {
		const el = document.createElement('div');
		el.id = 'adblock-notice';
		el.className = 'adblock-notice';
		el.innerHTML = "<span><b>Ad blocker detected!</b> Some features and links may not load or function correctly while it's enabled. Switch it off for the best experience.</span><button class=\"adblock-notice-close\"><svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0.51 0.51 22.99 22.99\" width=\"16px\" height=\"16px\" fill=\"#ffffff\">\n" +
			"<path d=\"M23.1294 21.4152L2.58488 0.870773C2.10409 0.38998 1.33062 0.383984 0.85722 0.85738C0.383824 1.33078 0.38982 2.10425 0.870613 2.58504L21.4151 23.1295C21.8959 23.6103 22.6694 23.6163 23.1428 23.1429C23.6161 22.6695 23.6101 21.896 23.1294 21.4152Z\"></path>\n" +
			"<path d=\"M21.415 0.870638L0.870529 21.4151C0.389736 21.8959 0.38374 22.6694 0.857136 23.1428C1.33053 23.6162 2.10401 23.6102 2.5848 23.1294L23.1293 2.58491C23.6101 2.10412 23.6161 1.33064 23.1427 0.857245C22.6693 0.383849 21.8958 0.389845 21.415 0.870638Z\"></path>\n" +
			"</svg></button>";
		document.body.prepend(el);

		const closeButton = el.querySelector('.adblock-notice-close');
		closeButton.addEventListener('click', () => {
			this.onClose();
			el.remove();
		});
	}

	run() {
		const xhr = new XMLHttpRequest();
		xhr.open('HEAD', this.testUrl, true);
		xhr.timeout = this.timeout;

		xhr.onload = () => {
			// If we get here, the resource was likely loaded successfully.
			this.onNotDetected();
		};

		xhr.onerror = () => {
			// If there's an error, it's probably blocked
			this.onDetected();
			this.createNotice();
		};

		xhr.ontimeout = () => {
			// Timeout is also likely due to blocking
			this.onDetected();
		};

		try {
			xhr.send();
		} catch (e) {
			this.onDetected();
		}
	}
}
