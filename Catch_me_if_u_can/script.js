let map;
let marker;

//inicjacja mapy
function initMap() {
    //pozycja startowa dla osob nie podajacych pozycji
    let pos = {
        lat: 50.066190, 
        lng: 19.946153
    };
    
    //utworzenie mapy
    map = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 16, 
            center: pos
        }
    );

    //utworzenie markera
    marker = new google.maps.Marker({
        position: pos, 
        map: map,
        icon: "images/car.png"
    });
}

//sciagniecie pozycji
navigator.geolocation.getCurrentPosition(
    (position)=>{
        //ustawienie markera na pozycji
        marker.setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        //przeniesienie mapy na pozycje
        map.panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    },
    //alert gdy uzytkownik nie poda lokalizacji
    (e)=>{
        alert("geolocation not found")
    },
    {
        //zwiekszenie celnosci geolokalizacji(bez tego komputer mi pokazywal ze jestem w lodzi)
        enableHighAccuracy:true
    }
);

window.addEventListener("keypress",(e)=>{
    let pos = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };
    switch(e.key){
        case "w":
        pos.lat+=0.0002;
        break;
        case "a":
        pos.lng-=0.0003;
        break;
        case "s":
        pos.lat-=0.0002;
        break;
        case "d":
        pos.lng+=0.0003;
        break;
    }
    console.log(pos);

    marker.setPosition(pos);
    map.panTo(pos);
});