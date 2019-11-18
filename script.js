// Write your JavaScript code here!
window.addEventListener("load", function() {
   let missionTarget = document.getElementById("missionTarget");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
               response.json().then( function(json) {
                  missionTarget.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[2].name}</li>
                     <li>Diameter: ${json[2].diameter}</li>
                     <li>Star: ${json[2].star}</li>
                     <li>Distance from Earth: ${json[2].distance}</li>
                     <li>Number of Moons: ${json[2].moons}</li>
                  </ol>
                  <img src="${json[2].image}">
                  `;
               });
            });

   let form = document.querySelector("form");
   let launchStatus = document.getElementById("launchStatus");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" ||
          fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         faultyItems.style.visibility = "hidden";
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         event.preventDefault();
      }
      else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) ||
          isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)){
         alert("Valid values required!");
         faultyItems.style.visibility = "hidden";
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         event.preventDefault();
      }
      else if(fuelLevelInput.value < 10000 || cargoMassInput.value > 10000){
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         let faultyItems = document.getElementById('faultyItems');
         faultyItems.style.visibility = "visible";
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch.`;
         document.getElementById("pilotStatus").innerHTML = `Co-Pilot ${copilotNameInput.value} is ready for launch.`;

         if(fuelLevelInput.value < 10000){
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch.`;
         }
         else{
            document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch.`;
         }

         if(cargoMassInput.value > 10000){
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too high for launch.`;
         }
         else{
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
         }

         event.preventDefault();
      }
      else{
         faultyItems.style.visibility = "hidden";
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
         event.preventDefault();
      }
   });

});
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
