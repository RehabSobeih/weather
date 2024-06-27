// ^ html elements
 let   searchInput = document.querySelector("#searchInput");
 let   searchBtn = document.querySelector("#searchBtn");

 let  week = document.querySelector("#week")





// ^ app variables
let  card = document.querySelector("#searchBtn");
let row = document.querySelector("#demo");

let  baseURL = "http://api.weatherapi.com/v1/forecast.json";
let   apiKey = "f017b72f49a14793856182626242206";

let  currentLocation = "cairo";

// ^ functions
async function  getData(location){
    let  response = await fetch (`${baseURL}?key=${apiKey}&q=${location}&days=3`);
    if (response.ok === true && response.status === 200){
      let  data = await response.json();
      console.log(data)
    
      displayData(data);
    }
    document.addEventListener('click'  , function(e) {
      console.log(e.target);
    })
   
}



function  success(position){
    currentLocation = `${position.coords.latitude},${position.coords.longitude}`
     console.log(currentLocation);
     getData(currentLocation);
}



function  displayData(data){
     let  days = data.forecast.forecastday;
     let   now = new Date();
     let cartona="";
     for(let [index,day] of days.entries()){
    let  date = new Date(day.date);
 

    cartona +=` <div class="col-md-6 col-xl-4">
        <div class="card  mb-3" >
          <div class="card-header  d-flex justify-content-between ">
            <p>${date.toLocaleDateString("en-us",{weekday:"long"})}</p>
            <p>${now.getHours()}:${now.getMinutes()} ${now.getHours() > 11 ?"pm":"am"}</p>
          </div>
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="item">
              <h5 class="card-title">${data.location.name}</h5>
              <h2 class="card-text bolder">${day.hour[now.getHours()].temp_c} °C</h2>
              <img class="w-50 h-50" src="http:${data.current.condition.icon}" alt="condition icon"/>
              <p>${data.current.condition.text}</p>
            </div>
            <div class="custom">
              <h1>${day.day. maxtemp_c} °C</h1>
              <img src="http:${day.day.condition.icon}"/>
              <p>${day.day.condition.text}</p>
            </div>
           
          </div>
          <div class="card-footer  d-flex justify-content-between  ">
            <p><i class="fa-solid fa-umbrella mx-1"></i>${data.current.precip_mm}%</p>
            <p> <i class="fa-solid fa-wind mx-1"></i>${data.current.wind_kph}km/h</p>
            <p><i class="fa-solid fa-compass mx-1"></i>${data.current.wind_dir}</p>
          </div>
        </div>
      </div>`

  }
  
  // console.log(cartona)
 row.innerHTML = cartona;
}







// ^ events
 window.addEventListener("load",function(){
    navigator.geolocation.getCurrentPosition(success);
 })

 searchInput.addEventListener("input",function(){
  getData(this.value)
 })


