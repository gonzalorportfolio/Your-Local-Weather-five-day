let units = 'imperial';//initailize the unit of measurement for open weather map API
let uOfm = 'F'; //set the unit of measurment for the page 
let temp;
let newTemp;

let hiOne;
let lowOne;

let hiTwo;
let lowTwo;

let hiThree;
let lowThree;

let hiFour;
let lowFour;

let hiFive;
let lowFive;

let newTempTwo;
let feelsLikeTemp;
const d = new Date();
let day = d.getDay()
const Weekdays=["Sunday","Monday", "Tuesday", "Wednesday", "Thurday","Friday", "Saturday"]
const nextFidays=['demo','demo1','demo2','demo3','demo4']
day = day+1
for (var i = 0; i<nextFidays.length ; i++){
	if (day+i>6){
    document.getElementById(nextFidays[i]).innerHTML = Weekdays[(day+i)-7];
    }
  else{
   	document.getElementById(nextFidays[i]).innerHTML = Weekdays[(day+i)];
    }
}
const status = document.querySelector('.status');
const iconElement = document.querySelector('.weather-icon');
//5dayWeatherIcons
const iconElementOne = document.querySelector('.weather-iconOne');
const iconElementTwo = document.querySelector('.weather-iconTwo');
const iconElementThree = document.querySelector('.weather-iconThree');
const iconElementFour = document.querySelector('.weather-iconFour');
const iconElementFive = document.querySelector('.weather-iconFive');
//end of 5dayWeather
//5dayweatherhi
const degreeHiOne = document.querySelector('.degreeHiOne');
const fanCelHiOne = document.querySelector('.fanCelHiOne');
const degreeHiTwo = document.querySelector('.degreeHiTwo');
const fanCelHiTwo = document.querySelector('.fanCelHiTwo');
const degreeHiThree = document.querySelector('.degreeHiThree');
const fanCelHiThree = document.querySelector('.fanCelHiThree');
const degreeHiFour = document.querySelector('.degreeHiFour');
const fanCelHiFour= document.querySelector('.fanCelHiFour');
const degreeHiFive= document.querySelector('.degreeHiFive');
const fanCelHiFive = document.querySelector('.fanCelHiFive');
//end of 5dayweatherhi
//5dayWeatherlow
const degreeLowOne = document.querySelector('.degreeLowOne');
const fanCelLowOne = document.querySelector('.fanCelLowOne');
const degreeLowTwo = document.querySelector('.degreeLowTwo');
const fanCelLowTwo = document.querySelector('.fanCelLowTwo');
const degreeLowThree = document.querySelector('.degreeLowThree');
const fanCelLowThree = document.querySelector('.fanCelLowThree');
const degreeLowFour = document.querySelector('.degreeLowFour');
const fanCelLowFour = document.querySelector('.fanCelLowFour');
const degreeLowFive = document.querySelector('.degreeLowFive');
const fanCelLowFive = document.querySelector('.fanCelLowFive');
//end
//5day weather cond
const conditionOne = document.querySelector('.conditionOne');
const conditionTwo = document.querySelector('.conditionTwo');
const conditionThree = document.querySelector('.conditionThree');
const conditionFour = document.querySelector('.conditionFour');
const conditionFive = document.querySelector('.conditionFive');
//end
const degree = document.querySelector('.degree');
const fanCel = document.querySelector('.fanCel');
const cond = document.querySelector('.condition');
const feelsLike = document.querySelector('.feelsLike');
const fanCeltwo = document.querySelector('.fanCeltwo')
const fanCelArray = [fanCelHiOne, fanCelLowOne, fanCelHiTwo, fanCelLowTwo, fanCelHiThree, fanCelLowThree, fanCelHiFour, fanCelLowFour, fanCelHiFive, fanCelLowFive];
function getWeatherAndLocation(unit, fandc) {
  const success = (position) => {//retruns the users location and fetch the data from the location and weather API
    units = unit;
    const latitude = position.coords.latitude;// constant for the latitude  coordinates 
    const longitude = position.coords.longitude;//constant for the longitude coordinates 
    //console.log('long:' + longitude + ' lat:' + latitude); // check the console to make sure it worked
    const weatherAPIurl = ['https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&appid=b989a956b784b1493fe08339165f3739', 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=' + units + '&appid=b989a956b784b1493fe08339165f3739']
    //get the users locations and sets it on the page
    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}X&localityLanguage=en')
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        status.textContent = data.locality + ", " + data.principalSubdivision
      })
    //get the weather using user's location and sets it on the page
    getWeatherData(weatherAPIurl[0], fandc)
    getWeatherDataFiveDay(weatherAPIurl[1], fandc)
  }
  const error = () => {// returns only if the user does not allow location service. 
    status.textContent = "unable to fulfill request";
  }
  navigator.geolocation.getCurrentPosition(success, error);//gets the user long and lat if successful or let the user know that it can if error
}
function getWeatherData(weatherURL, fandc) {
  fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      temp = Math.trunc(data.main.temp)
      feelsLikeTemp = Math.trunc(data.main.feels_like)
      degree.textContent = temp + '°'
      fanCel.textContent = fandc
      fanCeltwo.textContent = fandc
      iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`
      cond.textContent = data.weather[0].main
      feelsLike.textContent = feelsLikeTemp + '°'
    })
}
function getWeatherDataFiveDay(weatherURL, fandcFiveDay) {
  fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      hiOne= Math.trunc(data.daily[1].temp.max)
      lowOne=Math.trunc(data.daily[1].temp.min)
      degreeHiOne.textContent = "H: " +hiOne + '°'
      degreeLowOne.textContent = "L: "+lowOne + '°'
      
      hiTwo= Math.trunc(data.daily[2].temp.max)
      lowTwo=Math.trunc(data.daily[2].temp.min)
      degreeHiTwo.textContent = "H: " +hiTwo + '°'
      degreeLowTwo.textContent ="L: "+ lowTwo + '°'
      
      hiThree= Math.trunc(data.daily[3].temp.max)
      lowThree=Math.trunc(data.daily[3].temp.min)
      degreeHiThree.textContent = "H: " +hiThree + '°'
      degreeLowThree.textContent = "L: "+lowThree + '°'

      hiFour= Math.trunc(data.daily[4].temp.max)
      lowFour=Math.trunc(data.daily[4].temp.min)
      degreeHiFour.textContent = "H: " +hiFour + '°'
      degreeLowFour.textContent = "L: "+lowFour + '°'

      hiFive= Math.trunc(data.daily[5].temp.max)
      lowFive=Math.trunc(data.daily[5].temp.min)
      degreeHiFive.textContent = "H: " +hiFive + '°'
      degreeLowFive.textContent = "L: "+lowFive + '°'
      const conditionArray=[conditionOne, conditionTwo, conditionThree, conditionFour, conditionFive];
      for (let c = 0; c < conditionArray.length; c++){
        conditionArray[c].textContent = data.daily[c+1].weather[0].main
      }
      const iconElementArray=[iconElementOne, iconElementTwo, iconElementThree, iconElementFour, iconElementFive];
      for (let j =0; j < iconElementArray.length; j++){
        iconElementArray[j].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[j+1].weather[0].icon}@2x.png"/>`
      }
      for (let i = 0; i < fanCelArray.length; i++) {
        fanCelArray[i].textContent = fandcFiveDay;
      } 
    })
}   

//event listener that runs the function when the page loads.
document.querySelector('.weather-icon').addEventListener('click', getWeatherAndLocation(units, uOfm));
//set the unit of mesurment to metric

