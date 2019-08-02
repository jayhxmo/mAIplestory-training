function onMouseDown(key) {
	// console.log('DOWN', key);
	if (document.getElementById('button-' + key)) {
		if (!document.getElementById('button-' + key).classList.contains('button--pressed')) {
			document.getElementById('button-' + key).className += ' button--pressed';
		}
	}
}

function onMouseUp(key) {
	// console.log(key);
	if (document.getElementById('button-' + key)) {
		if (document.getElementById('button-' + key).classList.contains('button--pressed')) {
			document.getElementById('button-' + key).className = document
				.getElementById('button-' + key)
				.className.replace('button--pressed', '');

			switch (key) {
				case 'd':
					changeMap(-1);
					break;

				case 'f':
					changeMap(1);
					break;

				case 's':
					takeScreenshot();
					break;

				case 'q':
					randomizeMonsters();
					break;
			}
		}
	}
}

document.addEventListener('keydown', function(e) {
	onMouseDown(e.code.replace('Key', '').toLowerCase());
	closeDropdown();
});

document.addEventListener('keyup', function(e) {
	onMouseUp(e.code.replace('Key', '').toLowerCase());
});

let isDropdownOpen = false;
function openDropdown() {
	if (document.getElementsByClassName('actions__map__dropdown__action__icon').length) {
		if (
			!document
				.getElementsByClassName('actions__map__dropdown__action__icon')[0]
				.classList.contains('actions__map__dropdown__action__icon--active')
		) {
			document.getElementsByClassName('actions__map__dropdown__action__icon')[0].className +=
				' actions__map__dropdown__action__icon--active';

			document.getElementById('actions__map__dropdown__list').className +=
				' actions__map__dropdown__list--active';
			isDropdownOpen = true;
		}
	}
}

function closeDropdown() {
	if (document.getElementsByClassName('actions__map__dropdown__action__icon').length) {
		if (
			document
				.getElementsByClassName('actions__map__dropdown__action__icon')[0]
				.classList.contains('actions__map__dropdown__action__icon--active')
		) {
			document.getElementsByClassName(
				'actions__map__dropdown__action__icon'
			)[0].className = document
				.getElementsByClassName('actions__map__dropdown__action__icon')[0]
				.className.replace('actions__map__dropdown__action__icon--active');

			document.getElementsByClassName(
				'actions__map__dropdown__list'
			)[0].className = document
				.getElementsByClassName('actions__map__dropdown__list')[0]
				.className.replace('actions__map__dropdown__list--active');
			isDropdownOpen = false;
		}
	}
}

document.getElementById('actions__map__dropdown').addEventListener('mouseup', function(e) {
	if (!isDropdownOpen) {
		openDropdown();
	} else {
		closeDropdown();
	}
});

// const maps = map0.concat(map1, map2, map5, map6, map8, map9);
const maps = map1.sort();
console.log(maps);
let mapIndex = 0;
// let maps = [10000, 20000, 30000, 40000, 50000, 6000, 70000, 80000, 990000];
function addMapData(maps) {
	for (let i = 0; i < maps.length; i++) {
		document.getElementById(
			'actions__map__dropdown__list'
		).innerHTML += `<div class="actions__map__dropdown__list__item" onclick="fillMapInput('${
			maps[i]
		}')"><h3>${maps[i]}</h3></div>`;
	}
}

addMapData(maps);

function fillMapInput(map) {
	//console.log('map value', map);
	mapIndex = maps.indexOf(map);
	document.getElementById('actions__map__dropdown__input').value = map;
	loadMap(parseInt(map));
}

///////////////////////////////////////////////////////////////////////
const timeOffset = new Date(2019, 7, 1).getTime();

function takeScreenshot() {
	let screenshot = document.getElementById('game').toDataURL('image/png');
	window.location = screenshot;

	let a = document.createElement('a');
	a.href = screenshot;
	a.download =
		document.getElementById('actions__map__dropdown__input').value +
		'-' +
		(new Date().getTime() - timeOffset);
	document.body.appendChild(a);
	a.click();
}

function changeMap(factor) {
	mapIndex += factor;
	if (mapIndex < 0) mapIndex = 0;
	if (mapIndex >= maps.length) mapIndex = maps.length - 1;
	fillMapInput(maps[mapIndex]);
}

function loadMap(map) {
	initializeMapState(map);
}

////////////////////////////////////////////////////////////////////

function randomizeMonsters() {
	let options = [];
	console.log('currentMonsters', currentMonsters);
	for (let i = 0; i < currentMonsters.length; i++) {
		let factorX = Math.random() * 200 - 100;
		let factorY = Math.random() * 80 - 40;

		currentMonsters[i].opts.x += factorX;
		currentMonsters[i].opts.y += factorY;

		currentMonsters[i].updatePosition(currentMonsters[i].opts.x, currentMonsters[i].opts.y);
		// currentMonsters.forEach(mob => mob.update(msPerTick));

		// options.push(currentMonsters[i].opts);
		// initializeMonster

		// currentMonsters[i]
		// currentMonsters[i].destroy();
		// currentMonsters[i] = initializeMonster(currentMonsters[i].opts);
	}

	// for (let i = 0; i < options.length; i++) {
	// 	currentMonsters.push(initializeMonster(options[i]));
	// }
	// currentMonsters = [];
	// renderMapleMap(false);
	console.log(currentMonsters);
}
