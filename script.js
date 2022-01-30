window.addEventListener('load', ()=>{
    let long;
    let lat;

    //HTML Elements
    let temperatureDescripition = document.querySelector(
        ".temperature-description"
        );
    let temperatureDegree = document.querySelector(
        ".temperature-degree"
        );
    let locationTimezone = document.querySelector(
        ".location-timezone"
        );
    let temperatureSection = document.querySelector(
        ".temperature"
        );
    let temperatureSpan = document.querySelector(
        ".temperature span"
        );
    


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
        (position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            api =`http://api.weatherapi.com/v1/current.json?key=6f597988df154868909140142222901&q=Kochi&aqi=no`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                //console.log(data);
                const {temp_f} = data.current;
                const cel = data.current.temp_c;
                const {text} = data.current.condition;
                const {name} = data.location;
                const {icon} = data.current.condition;
                // Setting the DOM from API
                temperatureDegree.textContent = temp_f;
                temperatureDescripition.textContent = text;
                locationTimezone.textContent = name;
                // Set Icons
                setIcons(icon,document.querySelector(".icon"));
                // Adding EventListener for Degree
                temperatureSection.addEventListener("click", () =>{
                   if(temperatureSpan.textContent === "F"){
                       temperatureSpan.textContent ="C";
                       temperatureDegree.textContent=cel;
                   }else{
                       temperatureSpan.textContent ="F";
                       temperatureDegree.textContent =temp_f;
                   } 
                });
            });

        });
     
    }
    function setIcons(icon,iconID) {
        const skycons = new Skycons({color:"white"});
        //spilt() is used to split icon params to array and select the 5th element from the array.
        let currentIcon = icon.split("/")[5].replace(/-/g,"_").toUpperCase(); 
        console.log(currentIcon);
         if(currentIcon=="DAY"){
            dayType();
        }
        function dayType(){
            currentIcon="CLEAR_DAY";
            return currentIcon;
        }
       
        function nightType(){
            currentIcon="CLEAR_NIGHT";
            return currentIcon;
        }
        
        if(currentIcon=="NIGHT"){
            nightType();
        }
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});
