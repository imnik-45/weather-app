window.addEventListener("load", () => {
    let long, lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            
            getWeather(lat, long);

            
        });
    } else {
        alert("enable geolocator");
    }
});

function getWeather(lat, long) {


    const weather = {};
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let timeZone = document.querySelector(".timezone");
    let icons = document.querySelector(".icon");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    let iconid;
    let key = "d840f053767018d35c60ec9783465d14";
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(async function (data) {
          
            weather.Description = data.weather[0].description;
            weather.Degree = (data.main.temp - 273).toFixed(2);
            weather.timeZone = data.name;
            weather.iconId = data.weather[0].icon;
        
        
            temperatureDescription.textContent = weather.Description;
            temperatureDegree.textContent = weather.Degree;
            timeZone.textContent = weather.timeZone;
        
            let icon = weather.iconId;
        
            icons.innerHTML =`<img src="icons/${icon}.png"/>`;
        
            let celcius = ((weather.Degree * 9/5) + 32).toFixed(2);
        
            temperatureSection.addEventListener('click',()=>{
                if(temperatureSpan.textContent === 'C'){
                    temperatureSpan.textContent= 'F';
                    temperatureDegree.textContent=celcius;
        
                }else{
                    temperatureSpan.textContent= 'C';
                    temperatureDegree.textContent=weather.Degree;
                }
            });
        

        });

        
}
