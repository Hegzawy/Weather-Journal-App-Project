/* Global Variables */

// DOM Elements

//grabbing the html elements and there names didn't change from the last submission as it's easier to remember

const generateButton = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const userDate = document.querySelector('#date');
const cityTemp = document.querySelector('#temp');
const userCity = document.querySelector('#city');
const weatherDescription = document.querySelector('#description');
const content = document.querySelector('#content');
const errorBox = document.querySelector('#error');

// Personal API Key for OpenWeatherMap API
const api_Key = '821e5bf9cbbe7594f0a2f4f5d7139c52';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', generate)

/* Function called by event listener */
async function generate() {
  // values of the inputs
  //feelings
  const userFeelings = feelings.value;
  const zipCode = zip.value;
  try {  getWebAPIData(zipCode)
  } catch(err) {
    console.log('error', err)
  }
  }

/* Function to GET Web API Data*/

async function getWebAPIData(zipCode) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${api_Key}&units=metric`;

  const res = await fetch(weatherURL);
  weatherInfo = await res.json();
  //Function to show little error box to the user with the message from the weather api
  if (weatherInfo.cod != 200) {
    errorBox.classList.add('happens');
    errorBox.innerHTML = weatherInfo.message;
  }
  else {
    errorBox.classList.remove('happens');
  }
  
  let clientData = {
    date: newDate,
    temp: await weatherInfo.main.temp,
    clientCity: await weatherInfo.name,
    desc: await  weatherInfo.weather[0].description,
    feeling: feelings.value,
  };
/*   console.log(clientData); */

  postDataToServer('/postProjectData', clientData);
}

/* Function to POST data */
//this function is from udacity classroom

async function postDataToServer (url, data) {
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },       
    body: JSON.stringify(data), 
  });
  getProjectData();
  try {
    const newData = await response.json();  
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};
/* Function to GET Project Data & Dynamically Update the UI */
async function getProjectData () {
try {
  const res = await fetch('/getProjectData');
  const serverData = await res.json();
/*   console.log(serverData) */

  userDate.innerHTML=`<p>Date: ${serverData.date}</p>`;
  cityTemp.innerHTML=`<p>${serverData.temp} &degC</p>`;
  content.innerHTML=`<p>You Feel ${serverData.feeling}</p>`;
  userCity.innerHTML = `<p>${serverData.clientCity}</p>`;
  weatherDescription.innerHTML = `<p>${serverData.desc}</p>`
}
catch (err) {
  console.log(err,'error')
};
;}