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

form.addEventListener('submit', addProfile);

function addProfile(e) {
	e.preventDefault();
	const formVal = getFormVal();

	data.push(formVal);
	populateList(data, profileList);
	localStorage.setItem('data', JSON.stringify(data));
	this.reset();
}

function getFormVal() {
	const data = {};
	
	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];

		if (field.type !== 'submit') {
			data[form.elements[i].name] = form.elements[i].value;
		}
	}
	return data;
}

function populateList(data = [], profileList) {
	profileList.innerHTML = data.map(profile => createTemplate(profile)).join('');
}

function createTemplate(profile) {
	return `<figure class="profile">
							<img class="profile-img" src="${profile.img}" alt="тварина">
							<figcaption class="profile-caption">
									<h5 class="profile-heading">${profile.name}</h5>
									<p class="profile-txt">
											Порода- ${profile.breed}. 
											Вік- ${profile.age} років. 
											Контактна персона - ${profile.petOwnerName}. 
											${profile.description}
									</p>
							</figcaption>
					</figure>`;
}