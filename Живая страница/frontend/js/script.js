
fetch('http://localhost:3000/')
	.then(response => response.json())
	.then(result => addDataToPage(result))

function addDataToPage ({ resume }) {
	addHeader(resume);
	addSections(resume);
	addEventToSendButton(resume);
}
	
function addHeader ({ fullName, position, phone, email, image }) {
	const fullNameContainer = document.querySelector('h1'),
				positionContainer = document.querySelector('h2'),
				phoneContainer = document.querySelector('.telephone span'),
				emailContainer = document.querySelector('.mail span'),
				imageContainer = document.querySelector('header img');

	fullNameContainer.innerText = fullName;
	positionContainer.innerText = position;
	phoneContainer.innerText = phone;
	emailContainer.innerText = email;	
	imageContainer.src = image;
}

function addSections ({ sections }) {
	const mainContainer = document.querySelector('main');

	for (const item of sections) {
		mainContainer.insertAdjacentHTML('beforeend', renderSectionHeader(item));

		mainContainer
			.querySelector(`.${ getClassNameFromProps(item.title) }`)
			.addEventListener('click' , toggleSection);
	
		addSectionMain(item);
	}
}

function renderSectionHeader ({ title, isOpen }) {
	const arrowType = isOpen ? 'icon-arrow-up' : 'icon-arrow-down';
	
	return (
		`<section class = '${ getClassNameFromProps(title) }'>
			<div class='section-header'>
				<span>${ title }</span>
				<i class='${ arrowType }'></i>
			</div>
		</section>`
	);
}

function addSectionMain({ title, items, isOpen }) {
	const sectionClass = getClassNameFromProps(title);
	const sectionContainer = 
		document.querySelector(`.${ sectionClass }`);
		
		sectionContainer.insertAdjacentHTML('beforeend',
			`<div class="section-body ${ addHiddenClass(isOpen) }"></div>`);

	for (const item of items) {
		const body = sectionContainer.querySelector(`.section-body`)
			
		body.insertAdjacentHTML('beforeend', renderSectionItems(item, sectionClass));

		addItemList(item, sectionClass);
	}
}

function renderSectionItems ({ title, subTitle, from, to, items }) {

	return (`
		<div class='section-item'>
				<span class='item-title ${ addHiddenClass(title) }'>
					${ title }
				</span>
				<span class='item-subtitle ${ addHiddenClass(subTitle) }'>
					${ subTitle }
				</span>
				<span class='item-from ${ addHiddenClass(from) }'>
					${ from } - ${ to }
				</span>
				<ul class='${ addHiddenClass(items.length) }'>
				</ul>
		</div>
	`);
}

function addItemList({ items }, sectionClass) {
	const sectionContainer =
		document.querySelector(`.${ sectionClass } .section-item:last-child ul`);

	for (const item of items) {
		sectionContainer
			.insertAdjacentHTML('beforeend', renderListItem(item));
	}
}

function addHiddenClass(isHidden) {
	return isHidden ? '' : 'hidden';
}

function renderListItem (item) {
		return `<li><span>${item}</span></li>`;
}

function getClassNameFromProps(prop) {
	return prop.split(' ').join('-').toLowerCase();
}

function toggleSection(e) {
	const { currentTarget } = e;
	let sectionClasses = currentTarget.querySelector('.section-body').classList;
	let iconClasses = currentTarget.querySelector('i').classList;

	iconClasses.toggle('icon-arrow-down');
	iconClasses.toggle('icon-arrow-up');
	sectionClasses.toggle('hidden');
}

function addEventToSendButton({ fullName, email, sex }) {
	const button = document.querySelector('footer button');

	button.addEventListener('click', () => openMail(fullName, email, sex));
}

function openMail(fullName, email, sex) {
	const subject = 'Приглашение на собеседование';

	const body = encodeURIComponent(
		`${ getGreeting(sex) } ${ fullName }, приглашаем Вас на собеседование в компанию Artezio.
	
		${ getFormatDate() }`
		);

	window.open(`mailto:${ email }?subject=${ subject }&body=${ body }`);
}

function getFormatDate() {
	const date = new Date();

	const day = (date.getDate() < 9) ? 
							`0${date.getDate()}` :
							date.getDate();

	const month = (date.getMonth() < 9) ? 
							`0${date.getMonth()}` :
							date.getMonth();

	return `${day}.${month}.${date.getFullYear()}`;
}

function getGreeting(sex) {
	return (sex === 'male') ? 'Уважаемый' : 'Уважаемая';
}