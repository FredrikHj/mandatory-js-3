// Refresh knapp för random bilder

let dogBreedDefault;
let getBtnRefresh = document.querySelector('button');
getBtnRefresh.addEventListener('click', getIndividualDogBreed);
getBtnRefresh.textContent = "Ny bild!";

// Gäler för  hela projektet ---------------------------------------------------------
let getPlaceforImgs = document.querySelector('#insurtDogBreedImgs');
let getDogBreedsStrPlace = document.querySelector('#presentDogBreed');
let createdLiForUl;

let getBreedPlace = document.querySelector('#headDogBreedsContainer'); //Hur skicka in vartbael på ett mer riktigt sätt?
let getAllDogBreeds;
// Menyn skapas med både huvud och underraser ----------------------------------------
getAllBreed();
function getAllBreed() {
  let requestBreed = new XMLHttpRequest();
  requestBreed.addEventListener('load', renderDogBreedMenue);
  let urlStr = 'https://dog.ceo/api/breeds/list/all';
  requestBreed.open('GET', urlStr);
  requestBreed.send();
}
function renderDogBreedMenue() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);
  getParsedListOfAllBreed = getParsedListOfAllBreed['message'];

  //Checka om hurvida min meny finns eller inte
  let checkIfAnyChildNode = document.querySelector('#headDogBreedsContainer').textContent;

  for (let listAllBreed in getParsedListOfAllBreed) {
    if (checkIfAnyChildNode === "") {
      getAllDogBreeds = listAllBreed;

      // Stor bokstav i namnet
      let getBigLetterAllDogBreeds = getAllDogBreeds.charAt(0).toUpperCase() + getAllDogBreeds.slice(1);

      createdLiForUl = document.createElement('li');
      createdLiForUl.setAttribute('class', 'dogBreedBox');

      //Huvud hundrasaerna läggs i P element för att lätttare plockas ut
      let createdPForLiInUl = document.createElement('p');
      //createdPForLiInUl.setAttribute('class', 'dogBreedHead');

      createdPForLiInUl.addEventListener('click', function(){
       window.location.hash = listAllBreed;
       getIndividualDogBreed(getBigLetterAllDogBreeds);
      });

      createdPForLiInUl.textContent = getBigLetterAllDogBreeds;
      createdLiForUl.appendChild(createdPForLiInUl);
      getBreedPlace.appendChild(createdLiForUl);
    }
    console.log(listAllBreed);
    console.log(getParsedListOfAllBreed);

    getSubBreeds = getParsedListOfAllBreed[listAllBreed];
    let createdSubUlForLi = document.createElement('ul');
    createdSubUlForLi.setAttribute('class', 'subBreed');

      // Alla underraser skapas och läggs under respektive huvudras
      for (let i = 0; i < getSubBreeds.length; i++) {
      if (checkIfAnyChildNode === "") {
        let insurtSubBreeds = getSubBreeds[i];
        // Stor bokstav i namnet
        let insurtBigLetterSubBreeds = insurtSubBreeds.charAt(0).toUpperCase() + insurtSubBreeds.slice(1);

        let createdSubLiForUl = document.createElement('li');
        createdSubLiForUl.setAttribute('class', 'subBreedIteam');
          createdSubLiForUl.addEventListener('click', function(){
         window.location.hash = listAllBreed + '/' + insurtSubBreeds;
         getIndividualDogBreed(insurtBigLetterSubBreeds);
        });
        createdSubLiForUl.textContent = insurtBigLetterSubBreeds;
        createdSubUlForLi.appendChild(createdSubLiForUl);
        createdLiForUl.appendChild(createdSubUlForLi);
      }
    }
  }
  getIndividualDogBreed();
}
// Hämta random bilder baserat på vilken ras jag väljer
function getIndividualDogBreed(getBigLetterAllDogBreeds, insurtBigLetterSubBreeds){
  let urlStr;
  let getBreedStrAddressBar = location.hash;

  // # tecknet tas bort från strängen
  let getBreedStr = getBreedStrAddressBar.split('#')[1];

  let requestImgs = new XMLHttpRequest();
  requestImgs.addEventListener('load', getIndividualDogBreedImgs);
  let getHeadDogStr;
  let getSubDogStr;

  if (getBreedStr) {
    // Radera eventuell slash=/ i stärngen och splitta str så du kan du dessa via index
    let getBreedStrIntoArr = getBreedStr.replace("/", " ").split(' ');
    let getHeadDogBreedStr = getBreedStrIntoArr[0];
    //sätt stor bokstav
    let getHeadDogStr = getHeadDogBreedStr.charAt(0).toUpperCase() + getHeadDogBreedStr.slice(1);

    // Få ut alla underraser med stor bosdtav
    for (let i = 1; i < getBreedStrIntoArr.length; i++) {
      let getSubdDogBreedStr = getBreedStrIntoArr[i];
      // stor bokstav
      getSubDogStr = getSubdDogBreedStr.charAt(0).toUpperCase() + getSubdDogBreedStr.slice(1);
    }
    if (getBreedStr.includes('/')) {
      getDogBreedsStrPlace.textContent = 'Bild - ' + getHeadDogStr + ' --> ' + getSubDogStr;
    }
    else getDogBreedsStrPlace.textContent = 'Bild - ' + getHeadDogStr;
    urlStr = 'https://dog.ceo/api/breed/' + getBreedStr + '/images/random';
  }

  else urlStr = 'https://dog.ceo/api/breed/images/random';

  requestImgs.open('GET', urlStr);
  requestImgs.send();
}
function getIndividualDogBreedImgs() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);

  let getParsedImgsOfAllBreed = getParsedListOfAllBreed['message'];
  getPlaceforImgs.setAttribute('src', getParsedImgsOfAllBreed);
}
