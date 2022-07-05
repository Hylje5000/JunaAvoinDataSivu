let asemadata;
let strTime;
// get time
function getTime(){
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    strTime = hours + ':' + minutes
    //write strTime to html
    document.getElementById("time").innerHTML += strTime;
}


// Get date
var d = new Date();
let day = d.getDate();
if(day<10){
    day = "0"+day;
}
let month = d.getMonth() + 1;
if(month<10){
    month = "0"+month;
}
let year = d.getFullYear();

let today = `${year}-${month}-${day}`

// Create a request variable and assign a new XMLHttpRequest object to it.
var asemarequest = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
asemarequest.open('GET', 'https://rata.digitraffic.fi/api/v1/metadata/stations', true)

asemarequest.onload = function () {
  // Begin accessing JSON data here
    asemadata = JSON.parse(this.response)
 

    }
    
var junarequest = new XMLHttpRequest()
// Junat TKU-HKI välillä
junarequest.open('GET', 'https://rata.digitraffic.fi/api/v1/live-trains/station/TKU/HKI?include_nonstopping=false', true)

junarequest.onload = function () {
  // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    data.forEach(junat => {
    // console log if turku in stationName
    if(junat.departureDate == today){
    // junan numero
    if(Number(strTime.substring(0,2))<Number(junat.timeTableRows[0].scheduledTime.substring(11,13))){
    document.getElementById("junat").innerHTML += "<br> Juna #" + junat.trainNumber + "<br>"
    document.getElementById("junat").innerHTML += "Lähtöaika: " + junat.timeTableRows[0].scheduledTime.substring(11,16) + "<br>"
    document.getElementById("junat").innerHTML += "Pysähdyspaikat: " + "<br>"
            // console log the stationName from asemadata corresponding to stationShortCode
            junat.timeTableRows.forEach(junat => {
                asemadata.forEach(asema => {
                    // if trainStopping is true

                    if(junat.stationShortCode == asema.stationShortCode && junat.trainStopping == true){
                        // if stationName not already printed
                        if(document.getElementById("junat").innerHTML.indexOf(asema.stationName) == -1){
                            document.getElementById("junat").innerHTML += asema.stationName + "<br>"
                        }
                    }
                })
            })
            
    }
}
})
}



// Send request
asemarequest.send()
junarequest.send()


