const mediaPlayer=document.querySelector('.player-container')
const playBtn=document.querySelector('#play')
const backBtn=document.querySelector('#backward')
const nextBtn=document.querySelector('#forward')
const repeatBtn=document.querySelector('#repeat')
const audio=document.querySelector('#audio')
const progressContainer=document.querySelector('.bar__music-progress')
const musicProgress=document.querySelector('.music-progress__progress')

const title=document.querySelector('#music-title')
const album=document.querySelector('#album')


//songs

const songs=['Nirvana - The Man Who Sold The World', "Kiss - I Was Made For Lovin' You", 'Sia - Cheap Thrills  ft. Sean Paul']

//Orden of songs 
let songIndex=0

loadSong(songs[songIndex])

//this will change the value of the HTML elements 
function loadSong(song){

title.innerText=song
audio.src=`assets/music/${song}.m4a`
album.src=`assets/images/${song}.png`

}




//Needed functions to reproduces, pause and navigate between songs 
function guardIndex(index){
    
    if(songIndex>2)songIndex=0
    if(songIndex<0)songIndex=2
}


function playSong(){
    
    mediaPlayer.classList.remove('navigation-step')
    mediaPlayer.classList.add('start')
    document.querySelector(".play").style.marginLeft="-1%";

    document.querySelector(".play").style.backgroundImage="url('./assets/icons/media-pause.svg')"
  
    audio.play()
}
function pauseSong(){

    mediaPlayer.classList.remove('start')

    document.querySelector(".play").style.marginLeft="7%";

    document.querySelector(".play").style.backgroundImage="url('./assets/icons/media-play.svg')"

    audio.pause()
}

function repeatSong(){
    audio.currentTime=0
    audio.play()
}

function nextSong(){
    // restart the progress bar
    musicProgress.style.width='0%'

        songIndex++
        mediaPlayer.classList.add('navigation-step')
    
    
        guardIndex(songIndex)
        loadSong(songs[songIndex])
    
        pauseSong()
}

function previousSong(){
    
    musicProgress.style.width='0%'
        //remerber that songIndex is the index("i") in the array of songs, is this variable is 0 it will reproduce The Man Who Sold The World, and so on
        songIndex--
        mediaPlayer.classList.add('navigation-step')
    
            guardIndex(songIndex)
    
         //it will load the song callign the array "songs" with the index (sonIndex) uploaded
        loadSong(songs[songIndex])
           
        pauseSong()
    
        
}


//Event Listeners 
playBtn.addEventListener('click',()=>{

    const isPlaying=mediaPlayer.classList.contains('start')
    
    if(isPlaying)pauseSong()
    else playSong()

})

repeatBtn.addEventListener('click',repeatSong)

nextBtn.addEventListener('click',nextSong)

backBtn.addEventListener('click',previousSong)





    //functions for "bar events"


    function  updateBarProgress(e){

        // "e" as parameter, you could get the duration of the song as well as the current time
        //what i will do here is to disconstruct the ve

        const {duration,currentTime}=e.srcElement
        //this is the same to say, const duration=e.srcElement.duration ,
                             //and const currentTime=e.srcElement.currentTime
    
        const percentOfProgress=(currentTime/duration)*100
                             
        musicProgress.style.width=`${percentOfProgress}%`
    }

function setProgress(e){

    // clientWidth=total width of the element 

    const width=this.clientWidth;

    //offsetX is where the user actually click horizontally
    const clickPosition=e.offsetX

    
    const duration=audio.duration

    audio.currentTime=(clickPosition/width)*duration

}

//  bar events

//timeupdate constantly will be called when the song is playing
audio.addEventListener('timeupdate',updateBarProgress)
//ended is another function in the audio API
audio.addEventListener('ended',nextSong)

progressContainer.addEventListener('click',setProgress)
