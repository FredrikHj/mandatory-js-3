let getBtnRefresh = document.querySelector('button');
let getDogBreedsStrPlace = document.querySelector('#presentDogBreed');
let createdLiForUl;

getBtnRefresh.addEventListener('click', getRandomImgs);

let getBreedPlace = document.querySelector('#headDogBreedsContainer'); //Hur skicka in vartbael på ett mer riktigt sätt?
let getAllDogBreeds;
getAllBreed();

function getAllBreed() {
  let requestBreed = new XMLHttpRequest();
  requestBreed.addEventListener('load', renderDogAllBreed);
  let urlStr = 'https://dog.ceo/api/breeds/list/all';
  requestBreed.open('GET', urlStr);
  requestBreed.send();
}
function renderDogAllBreed() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);
  getParsedListOfAllBreed = getParsedListOfAllBreed['message'];

  //Checka om hurvida min meny finns ellere inte
  let checkIfAnyChildNode = document.querySelector('#headDogBreedsContainer').textContent;
  for (let listAllBreed in getParsedListOfAllBreed) {
    if (checkIfAnyChildNode === "") {
      renderMenueListHeadBreeds(listAllBreed);
    }
    getSubBreeds = getParsedListOfAllBreed[listAllBreed];
    let createdSubUlForLi = document.createElement('ul');
    createdSubUlForLi.setAttribute('class', 'subBreed');

      for (let i = 0; i < getSubBreeds.length; i++) {
      if (checkIfAnyChildNode === "") {
        renderMenueListSubBreeds(getSubBreeds, i, createdSubUlForLi);
      }
    }
  }
  startLiListen();
  getRandomImgs();
}

function renderMenueListHeadBreeds(listAllBreed){
  createdLiForUl = document.createElement('li');
  createdLiForUl.setAttribute('class', 'dogBreedBox');

  let createdPForLiInUl = document.createElement('p'); //Huvud hundrasaerna läggs i P element för att lätttare plockas ut
  getAllDogBreeds = listAllBreed;

   // Adderar blanksteg ( ' ' ) sist i regeln nedan för funktionen getRandomImgs och raden med ID = 3423
  createdPForLiInUl.textContent = getAllDogBreeds.charAt(0).toUpperCase() + getAllDogBreeds.slice(1) + ' ';

  createdLiForUl.appendChild(createdPForLiInUl);
  getBreedPlace.appendChild(createdLiForUl);
  }
// Alla underraser skapas och läggs under respektive huvudras
function renderMenueListSubBreeds(getSubBreeds, i, createdSubUlForLi){
  let insurtSubBreeds = getSubBreeds[i];

  let createdSubLiForUl = document.createElement('li');
  createdSubLiForUl.setAttribute('class', 'dogBreedBox');
  createdSubLiForUl.setAttribute('class', 'subBreedIteam');
  // Adderar blanksteg ( ' ' ) sist i regeln nedan för funktionen getRandomImgs och raden med ID = 3423
  createdSubLiForUl.textContent = insurtSubBreeds.charAt(0).toUpperCase() + insurtSubBreeds.slice(1) + ' ';
  createdSubUlForLi.appendChild(createdSubLiForUl);
  createdLiForUl.appendChild(createdSubUlForLi);
}
function startLiListen() {
  let getLiElement = document.querySelectorAll('.dogBreedBox p, .subBreedIteam');
  for (let i = 0; i < getLiElement.length; i++) {
    let getLiElementToListen = getLiElement[i];
    getLiElementToListen.addEventListener('click', getDogBreedSpecificStrs);
  }
}
function getDogBreedSpecificStrs(e){
  let targetLi = e.target;
  let getTargetStr = targetLi.textContent;

  // ( 3423 ) Hämta ut all raserna inkl huvudrasens strängar och placera detta i en array och hämta sdan huvudrasens str på index 0
  let getTargetStrsInSubBreed = targetLi.parentElement.textContent;
  let getTargetStrsInSubBreedToArr = getTargetStrsInSubBreed.split(' ').length;
  console.log(getTargetStrsInSubBreedToArr);

  let getChildNodesOfTargetLi = targetLi.childNodes.length; //OBS mellanslag räknas som en textnode
  console.log(getChildNodesOfTargetLi);

  if (getTargetStrsInSubBreedToArr === 2 || getTargetStrsInSubBreedToArr === 4) {
    getDogBreedsStrPlace.textContent = "Bilder på " + getTargetStr;
  }
  else if (getTargetStrsInSubBreedToArr > 2) {
      let getHeadBreedOfTargetSubBreed = targetLi.parentElement.parentElement.childNodes[0].textContent;
      getDogBreedsStrPlace.textContent = "Bilder på " + getHeadBreedOfTargetSubBreed + " --> " + getTargetStr;
  }



/*
  //Checka om li elementet med huvusrasen har en underras eller inte
  let getHeadLiElement = document.querySelector('.headBreeds');
  //console.log(getHeadLiElement);


*/
  getBtnRefresh.textContent = "Ny bild!";

  //let test = document.querySelector(targetLi);
  //renderDogAllBreed();

  //getSubBreeds = getParsedListOfAllBreed[listAllBreed];
}



// Hämta random bilder baserat på vilken ras jag väljer
function getRandomImgs () {
  let requestImgs = new XMLHttpRequest();
  requestImgs.addEventListener('load', insurtRandomImgs);

  let urlStr = 'https://dog.ceo/api/breeds/image/random';
  requestImgs.open('GET', urlStr);
  requestImgs.send();
}

function insurtRandomImgs() {
  let getParsedRandomImgs = JSON.parse(this.responseText);
  let getParsedImgsOfAllBreed = getParsedRandomImgs['message'];
  let getPlaceforImgs = document.querySelector('#insurtDogBreedImgs');
  getPlaceforImgs.setAttribute('src', getParsedImgsOfAllBreed);
}
/*

  let getStrHeadBreed = targetLi.textContent;
  console.log(getStrHeadBreed);

   targetLi.parentNode.parentNode;





  let getDogBreedStr = targetStrDogBreed;

  let getStrArrOftargetDogBreedLower = targetStrDogBreed.charAt(0).toLowerCase() + targetStrDogBreed.slice(1)

  let requestImgs = new XMLHttpRequest();
  requestImgs.addEventListener('load', getDogBreedSpecificImgs);
  let urlStr = 'https://dog.ceo/api/breed/' + getStrArrOftargetDogBreedLower + '/images)';
  requestImgs.open('GET', urlStr);
  requestImgs.send();

function getDogBreedSpecificImgs() {
  let getParsedListOfAllBreed = JSON.parse(this.responseText);
  console.log("r3weq");

}
*/
