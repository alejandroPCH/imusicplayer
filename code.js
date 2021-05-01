const mediaPlayer=document.querySelector('.player-container')
const playBtn=document.querySelector('#play')
const backBtn=document.querySelector('#backward')
const nextBtn=document.querySelector('#forward')
const repeatBtn=document.querySelector('#repeat')
const audio=document.querySelector('#audio')
const ProgressContainer=document.querySelector('.bar__music-progress')
const musicProgress=document.querySelector('.music-progress_progress')

const title=document.querySelector('#music-title')
const album=document.querySelector('#album')


//songs

const songs=['Nirvana - The Man Who Sold The World', "Kiss - I Was Made For Lovin' You", 'Sia - Cheap Thrills  ft. Sean Paul']

//Orden of songs 
let songIndex=1

loadSong(songs[songIndex])

//this will change the value of the HTML elements 
function loadSong(song){

title.innerText=song
audio.src=`assets/music/${song}.m4a`
album.src=`assets/images/${song}.png`

}

//Needed functions to reproduces, pause and navigate between songs

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

function guardIndex(index){
    
    if(songIndex>2)songIndex=0
    if(songIndex<0)songIndex=2
}
function restart(){

   
}




//Event Listeners 
playBtn.addEventListener('click',()=>{

    const isPlaying=mediaPlayer.classList.contains('start')
    
    if(isPlaying)pauseSong()
    else playSong()

})

nextBtn.addEventListener('click',()=>{

    songIndex++
    mediaPlayer.classList.add('navigation-step')


    guardIndex(songIndex)
    loadSong(songs[songIndex])

    pauseSong()
})

backBtn.addEventListener('click',()=>{

    songIndex--
    mediaPlayer.classList.add('navigation-step')

        guardIndex(songIndex)

     
    loadSong(songs[songIndex])
       
    pauseSong()

    })




