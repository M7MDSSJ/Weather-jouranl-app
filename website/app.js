

/* Global Variables */
const baseURL ="https://api.openweathermap.org/data/2.5/weather?zip=";
const units ="&units=metric"
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const key ="&appid=8180086df9f9cf375a21722560304185";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click' , (e) => {
    // get user's zip code and feelings
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings');
    // check if the zip code is empty before excuting the code
    if (zip.length===0){
        // if so, dispaly an alert
        alert('Enter zip code first!')
    }else{ 
        getWeather(baseURL,zip,key)
        .then((data) => {
        console.log(data);
        postData('/post',{date:newDate , temp:data.main.temp , content:feelings.value})})
        .then(() =>{
            updateUI();
        })
}});
/* Function called by event listener */
// it's anonymous arrow function

/* Function to GET Web API Data*/
async function getWeather(baseURL, zip, key) {
    let res = await fetch(`${baseURL}${zip}${key}${units}`);
    try { 
        return data = await res.json();
    }
    catch (error) {
        console.log("API GET request error", error);
    }
}
/* Function to POST data */
async function postData(url='',data={}) {
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error) {
      console.log("POST request error", error);
      }
}

/* Function to GET Project Data */
async function updateUI(){
    const res = await fetch('/allData');
    try{
        const projectData = await res.json();
        document.getElementById('date').innerHTML=`Date : ${newDate}`
        document.getElementById('temp').innerHTML=`Temperature in celsius : ${projectData.temp}`
        document.getElementById('content').innerHTML=`My feeling : ${projectData.content}`
    } catch(error){
        console.log("UpdateUI GET request error",error)
    }
}