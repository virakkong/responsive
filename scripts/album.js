//We need to make this <tr> repeatedly using javascript
// <tr class="album-view-song-item">
//                     <td class="song-item-number">1</td>
//                     <td class="song-item-title">Blue</td>
//                     <td class="song-item-duration">X:XX</td>
//</tr>


var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

//dynamic generate of multiple album

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
        //store song number in html
        //Children(0)=<td> first below
        //use HTML5 data attributes. As the name suggests, 
        //HTML data attributes allow us to store information in an attribute on an HTML element.
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' +songNumber + '</td'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

//Create Third Album

var myAlbum = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/02.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };


var albumImage = document.getElementsByClassName('album-cover-art')[0];
var setCurrentAlbum = function(album){
    //#1
   
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
    //#2
    //each of the representative of the node will take albumPicasso which is represented by album
    albumImage.setAttribute('src',album.albumArtUrl);
    resetAlbum = albumImage.setAttribute('src',album.albumArtUrl);
    albumTitle.firstChild.nodeValue= album.title;
    albumArtist.firstChild.nodeValue= album.artist;
    albumReleaseInfo.firstChild.nodeValue= album.year + ' ' + album.label;
    
    //#3
    //Make sure No html syntax
     albumSongList.innerHTML= '';
    
    //#4 Now Create rows for the table
    
    for( var i=0 ; i< album.songs.length; i++){
        albumSongList.innerHTML +=createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    }  
    
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

//Detect the Mouse Leaving
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate= '<a class="album-song-button"><span class="ion-play"></span></a>';



window.onload = function() {
   setCurrentAlbum(myAlbum);
//    var arr=[albumMarconi, myAlbum, albumPicasso];
//    var i=0;
//    albumImage.addEventListener('click', function (event){
//       setCurrentAlbum(arr[i]);
//        i++;
//        if(i==arr.length){i=0;}
//    });
    
        
    albumImage.addEventListener('click',function (event){
                 
        switch(albumImage.getAttribute('src')){
            case 'assets/images/album_covers/01.png':
                setCurrentAlbum(myAlbum);
                break;
            case 'assets/images/album_covers/20.png':
                 setCurrentAlbum(albumPicasso)
                 break;
            case 'assets/images/album_covers/02.png':
                setCurrentAlbum(albumMarconi);
                break;
             default:
                setCurrentAlbum(myAlbum);
        }
             
    });  
    
    //Add Event Mouse OVer
    
    songListContainer.addEventListener('mouseover', function(event){
        
       // console.log(event.target);
        //album-view-song-item is created in album.js. it is not created in album.html
        //make sure that we only act on the table row
        if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
            //use the querySelector() method because we only need to return a single element
            //playButtonTemplate is '<a href> as a button
            //we assign <a href> with name: album-song-button... to each song number <td>
            event.target.parentElement.querySelector('.song-item-number').innerHTML= playButtonTemplate;
            
         }
    });
    
    
    //Add Event Mouse leave to return number back
    
    for(var i=0; i < songRows.length; i++){
        //Note: document.getElementsByClassName('album-view-song-item')[i].addEventListener....
        //Note: songRows=document.getElementsByClassName('album-view-song-item');
        songRows[i].addEventListener('mouseleave', function(event){
             // Selects first child element, which is class="song-item-number" ==> <td>
            //this = album-view-song-item <tr>. it is called songRows [i]
            //return the song number back originally to its list name after mouse leave
            //the nmber will be beween <td class="..."> 1 </td>
            //<td class="..."> 2 </td> and so on
            
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            console.log(this.children[0].getAttribute('data-song-number'));
            console.log(this.children[0].innerHTML);
            
            
            
        });
    }
    
    
};






