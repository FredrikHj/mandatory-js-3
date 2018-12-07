

let getBreedPlace = document.querySelector('#headDogBreedsContainer');
getAllBreed();


function getAllBreed() {
  //debugger;
  let requestBreed = new XMLHttpRequest();
  requestBreed.addEventListener('load', renderDogAllBreed);
  let urlStr = 'https://dog.ceo/api/breeds/list/all';
  requestBreed.open('GET', urlStr);
  requestBreed.send();
}
function renderDogAllBreed() {
  //debugger;
  let getParsedListOfAllBreed = JSON.parse(this.responseText);
  getParsedListOfAllBreed = getParsedListOfAllBreed['message'];

  for (let listAllBreed in getParsedListOfAllBreed) {
    let createdLiForUl = document.createElement('li');
    createdLiForUl.setAttribute('class', 'headBreeds');
    let getAllDogBreeds = listAllBreed;
     // Adderar blanksteg ( ' ' ) sist i regeln nedan för funktionen getRandomImgs och raden med ID = 3423
    createdLiForUl.textContent = getAllDogBreeds.charAt(0).toUpperCase() + getAllDogBreeds.slice(1) + ' ';
    getBreedPlace.appendChild(createdLiForUl);

    if (getAllDogBreeds.length > 0) {
      let getSubBreeds = getParsedListOfAllBreed[listAllBreed];

      // Alla underraser skapas och läggs under respektive huvudras
      let createdSubUlForLiDropdown = document.createElement('ul');
      createdSubUlForLiDropdown.setAttribute('class', 'subBreed');

      for (let i = 0; i < getSubBreeds.length; i++) {
        let insurtSubBreeds = getSubBreeds[i];
        let createdSubLiForUl = document.createElement('li');
        // Adderar blanksteg ( ' ' ) sist i regeln nedan för funktionen getRandomImgs och raden med ID = 3423
        createdSubLiForUl.textContent = insurtSubBreeds.charAt(0).toUpperCase() + insurtSubBreeds.slice(1) + ' ';
        createdSubUlForLiDropdown.appendChild(createdSubLiForUl);
        createdLiForUl.appendChild(createdSubUlForLiDropdown);
      }
    }
  }
  startLiListen();
  getRandomImgs();
}
function startLiListen() {
  let getLiElement = document.querySelectorAll('li');
  console.log(getLiElement);
  for (let i = 0; i < getLiElement.length; i++) {
    let getLiElementToListen = getLiElement[i];
    console.log(getLiElementToListen);
    getLiElementToListen.addEventListener('click', getRandomImgs);
  }
}
// Hämta random bilder baserat på vilken ras jag väljer
function getRandomImgs () {
  let requestImgs = new XMLHttpRequest();
  requestImgs.addEventListener('load', function() {
    let getParsedRandomImgs = JSON.parse(this.responseText);
    let getParsedImgsOfAllBreed = getParsedRandomImgs['message'];

    let getPlaceforImgs = document.querySelector('#dogBreedImgs');
    console.log(getPlaceforImgs);
    getPlaceforImgs.setAttribute('src', getParsedImgsOfAllBreed);
  });

  let urlStr = 'https://dog.ceo/api/breeds/image/random';
  requestImgs.open('GET', urlStr);
  requestImgs.send();


  let targetLi = e.target;
  let targetStrDogBreed = targetLi.textContent;


  let getDogBreedsStrPlace = document.querySelector('#presentDogBreed');

  // ( 3423 ) Splitta upp din sträng du får i en array och hämta ut ordet på index 0
  let getFirstWordOftargetStrDogBreed = targetStrDogBreed.split(' ')[0];
  console.log(getFirstWordOftargetStrDogBreed);
  getDogBreedsStrPlace.textContent = "Bilder på  " + getFirstWordOftargetStrDogBreed;
}
