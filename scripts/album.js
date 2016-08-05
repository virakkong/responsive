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
      + '  <td class="song-item-number">' + songNumber + '</td>'
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
};






