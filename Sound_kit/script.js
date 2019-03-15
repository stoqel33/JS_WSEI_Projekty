//zmienna przechowujaca wszystkie sciezki
let recording = [{
    sounds:[],
    times:[]
},{
    sounds:[],
    times:[]
},{
    sounds:[],
    times:[]
},{
    sounds:[],
    times:[]
}]
//informacja o stanie wszystkich nagran
let isRecording = [false,false,false,false];
//czas rozpoczecia nagrania
let recordingStart = [0,0,0,0];

//listenery do wszystkich przyciskow
document.getElementById("play0").addEventListener("click",playRecording);
document.getElementById("record0").addEventListener("click",record);
document.getElementById("play1").addEventListener("click",playRecording);
document.getElementById("record1").addEventListener("click",record);
document.getElementById("play2").addEventListener("click",playRecording);
document.getElementById("record2").addEventListener("click",record);
document.getElementById("play3").addEventListener("click",playRecording);
document.getElementById("record3").addEventListener("click",record);

function record(e){
    switch(e.target.id.split("record")[1]){
        case "0":
        switchRecording(e.target,0);
        break;
        case "1":
        switchRecording(e.target,1);
        break;
        case "2":
        switchRecording(e.target,2);
        break;
        case "3":
        switchRecording(e.target,3);
        break;
    }
}
//rozpoczecie nagrywania i wyczyszczenie wczesniejszego wraz ze zmiana napisow na przyciskach
function switchRecording(element,which){
    if(element.innerHTML=="record"){
        element.innerHTML="stop recording"
        isRecording[which] = true;
        recordingStart[which] = Date.now();
        recording[which].times = [];
        recording[which].sounds = [];
    }else{
        element.innerHTML="record"
        isRecording[which] = false;
    }
}

//odgrywanie nagrania
function playRecording(e){
    let which = Number(e.target.id.split("play")[1]);
    for(let i = 0; i < recording[which].sounds.length;i++){
        setTimeout(()=>{useAudio(recording[which].sounds[i],which)},recording[which].times[i])
    }
}

//przypisanie eventu przycisniecia do wszystkich przyciskow zwiazanych z odgrywaniem dzwiekow
document.querySelectorAll(".button").forEach((e)=>{
    e.addEventListener("mousedown",playSound);
});

//funkcja posredniczaca
function playSound (e){
    useAudio(e.target.id,0);
}

//odtwarzanie dzwiekow i zapamietywanie w nagraniach
function useAudio(id,which){
    let audio = document.querySelector("#"+id+which);
    audio.currentTime = 0;
    audio.play();
    if(isRecording[0]){
        recording[0].sounds.push(id);
        recording[0].times.push(Date.now()-recordingStart[0]);
    }
    if(isRecording[1]){
        recording[1].sounds.push(id);
        recording[1].times.push(Date.now()-recordingStart[1]);
    }
    if(isRecording[2]){
        recording[2].sounds.push(id);
        recording[2].times.push(Date.now()-recordingStart[2]);
    }
    if(isRecording[3]){
        recording[3].sounds.push(id);
        recording[3].times.push(Date.now()-recordingStart[3]);
    }
}

//przypisanie odtwarzania dzwiekow do klawiatury
window.addEventListener("keydown",(e)=>{
    switch(e.key){
        case "q":
        case "w":
        case "e":
        case "a":
        case "s":
        case "d":
        useAudio(e.key,0)
        break;
    }
})