document.addEventListener('DOMContentLoaded', function () {
	const toggleButton = document.querySelector('.dropdown-toggle');
	const dropdownMenu = document.querySelector('.dropdown-menu');

	toggleButton.addEventListener('click', function () {
		dropdownMenu.classList.toggle('show');
		toggleButton.classList.toggle('show'); // Add 'show' class to the button for icon rotation
	});

	// Close the dropdown if clicked outside
	document.addEventListener('click', function (event) {
		if (!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
			dropdownMenu.classList.remove('show');
			toggleButton.classList.remove('show'); // Remove 'show' class from the button
		}
	});
});
