// MENU TOGGLE
const nav = document.querySelector('.nav-wrapper');
const menu = document.querySelector('.icon-menu');
menu.addEventListener('click', openMenu);
function openMenu() {
	nav.classList.toggle('open');
}

const addBtn = document.getElementById('add-btn');
const form = document.querySelector('.new-profile-form');
const profileList = document.getElementById('profile-list');
const data = JSON.parse(localStorage.getItem('data')) || [];

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
	e.preventDefault();
	const formVal = getFormVal();

	const file = form.elements.img.files[0];
	getBase64(file).then(
    imgBase64 => addProfile(formVal, data, imgBase64),
    error => console.error("Rejected: " + error)
  );
	
	this.reset();
}

function addProfile(formVal, data, img) {
	formVal.img = img;
	data.push(formVal);
	populateList(data, profileList);
	localStorage.setItem('data', JSON.stringify(data));
}

function getFormVal() {
	const profile = {};
	
	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];

		if (field.type !== 'submit') {
			profile[form.elements[i].name] = form.elements[i].value;
		}
	}
	return profile;
}


function populateList(data = [], profileList) {
	data.forEach(profile => {
		const el = createTemplate(profile);
		profileList.appendChild(el);
	});
}

function createTemplate(profile) {
	const element = document.createElement('figure');
	element.classList.add('profile');
	const template = `<img class="profile-img" src="${profile.img}" alt="тварина">
										<figcaption class="profile-caption">
												<h5 class="profile-heading">${profile.petName}</h5>
												<p class="profile-txt">
														Порода- ${profile.breed}. 
														Вік- ${profile.age} років. 
														Контактна персона - ${profile.userName}. 
														${profile.description}
												</p>
										</figcaption>`;
	element.innerHTML = template;
	return element;
}

function getBase64(file) {
	const reader = new FileReader();

	reader.readAsDataURL(file);
	return new Promise((resolve, reject) => {
		reader.onload = function () {
			resolve(reader.result);
		}
		reader.onerror = function (error) {
			reject(error);
		};
	});

}