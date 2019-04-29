/* UF2_AC2 */
/* Metodos y propiedades para crear reproductor de audio y video personalizado: */
/* Google: w3schools html audio/video */
/* https://www.w3schools.com/tags/ref_av_dom.asp */
/* Buscar json */
/* Podemos reproducir el video/audio, pausarlo, adelantarlo moverlo hacia delante y retrocederlo moverlo hacia atrás. */
/* Reproductor de Audio personalizado */

var bleep = new Audio();
//var buttons = ["audio/button-1.mp3", "audio/button-5.mp3", "audio/button-3.mp3", "audio/Boton004.mp3", "audio/button-2.mp3"]; // https://www.soundjay.com/button-sounds-1.html ; bleep.mp3

$(document).ready(function() { //Al iniciarse la pagina web
   initPlayer();
   getSongs();

   bleep.src = "audio/joke_drum_effect.mp3";
   bleep.play(); // Reproduce efecto musical al iniciarse la pagina web
});

var audio = document.getElementById('player'); // audio id=player en html
var music;

function initPlayer() {
   $('#shuffle').click(function(){ // shuffle selecciona una cancion al azar y cambia el orden de las canciones ; # id vs punto . class
      $('#playlist').empty(); // playlist id # del html vs punto . class
      //console.log(shuffle(music.songs));
      shuffle(music.songs); //Selecciona una cancion al azar y cambia el orden de las canciones 
      //console.log(music.songs);
      genList(music); //Genera lista de canciones y cuñas publicitarias
      playSong(0); // Reproduce la primera cancion de la lista
   });
}

function getSongs() {
   $.getJSON("json/json002.json", function(mjson){ /* json001.json */
      music = mjson;
      //console.log(music.songs);
      //console.log(music);
      genList(music); //Genera lista de canciones y cuñas publicitarias
   });
}

function playSong(id) { // Reproduce cancion de la lista
   //console.log(id);
   var long = music.songs;
   if(id >= long.length) {
      //console.log('No hay más canciones en la lista.');
      audio.pause();
   }
   else {
      var position1 = music.songs.length;
      //console.log(position1);
      random = Math.floor(Math.random() * position1);
      //console.log(random);
      //bleep.src = buttons[random];
      //console.log(music.songs[id].sonido_boton);
      bleep.src = music.songs[id].sonido_boton;
      bleep.play(); // Reproduce efecto musical boton
      sleep(2000).then(() => { //espera ms
         $('#img-album').attr('src', music.songs[id].image);
         $('#player').attr('src', music.songs[id].song); // audio id=player en html
         audio.play(); // Reproduce cancion
         //console.log('Hay más canciones en la lista.');
         scheduleSong(id);
      });
   }
}

function sleep(time) { // Espera ms para que no se sopale sonido boton con la cancion
   return new Promise((resolve) => setTimeout(resolve, time));
}

function genList(music) { //Genera lista de canciones y cuñas publicitarias
   //console.log(music.songs);
   $.each(music.songs, function(i, song) {
      $('#playlist').append('<li class="list-group-item2" id ="' + i + '">' + song.name + ' - ' + song.artist + '</li>')
   });

   $('#playlist li').click(function(){ // Usuario selecciona la canción a reproducir
      var selectedsong = $(this).attr('id');
      //console.log(selectedsong);
      playSong(selectedsong);
   });
}

function scheduleSong(id) {
   audio.onended = function(){ // Bucle loop
      //console.log('Terminó la canción.');
      playSong(parseInt(id) + 1); // Reproduce siguiente cancion/publicidad automaticamente
   }
}

function shuffle(array) { // Reordena lista de canciones al azar ed Cambia el orden de las canciones
   //console.log('shuffle');
   for(var random, temp, position = array.length; position; random = Math.floor(Math.random() * position), temp = array[--position], array[position] = array[random], array[random] = temp);
   return array;
}
