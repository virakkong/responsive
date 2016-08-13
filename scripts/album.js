//We need to make this <tr> repeatedly using javascript
// <tr class="album-view-song-item">
//                     <td class="song-item-number">1</td>
//                     <td class="song-item-title">Blue</td>
//                     <td class="song-item-duration">X:XX</td>
//</tr>


var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;


var setSong =function(songNumber){
	
	if (currentSoundFile) {
         currentSoundFile.stop();
     }
	currentlyPlayingSongNumber= parseInt(songNumber);
	currentSongFromAlbum=currentAlbum.songs[songNumber-1];
    
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
     });
	
	 setVolume(currentVolume);
};

var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell =function(number){
	return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
	var template =
		'<tr class="album-view-song-item">' +
		'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td' +
		'  <td class="song-item-title">' + songName + '</td>' +
		'  <td class="song-item-duration">' + songLength + '</td>' +
		'</tr>';

	var $row = $(template);

	var clickHandler = function () {
	
    // Update the Player Bar information
        
        var songNumber = $(this).attr('data-song-number');
        
        if(currentlyPlayingSongNumber == songNumber && currentSoundFile.isPaused() == false){
            currentSoundFile.stop();
            $(this).html(playButtonTemplate);
             updatePlayerBarSong();
            $('.main-controls .play-pause').html(playerBarPlayButton);
        }else if(currentlyPlayingSongNumber == songNumber && currentSoundFile.isPaused()){
          
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
             updatePlayerBarSong();
             $('.main-controls .play-pause').html(playerBarPauseButton);
        }
        else {
          
            $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]').html(currentlyPlayingSongNumber);
            
           setSong(songNumber);
            updatePlayerBarSong();           
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate); 
        }
	};
    
	var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber != currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        if (songNumber != currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

	$row.find('.song-item-number').click(clickHandler);
    
	$row.hover(onHover, offHover);
	return $row;
};


var toggle = function (){
    
  // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index;
		
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    
    currentSoundFile.isPaused = false;
    if(currentSoundFile.isPaused ==true) {
        
         currentSoundFile.isPaused = false; //playing
          console.log("condition 1");
          currentSoundFile.play();
          updatePlayerBarSong();
    
          $previousSongNumberCell.html(pauseButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPauseButton);
        
    }else {
        
        currentSoundFile.isPaused =true;
        console.log("condition 2")
        currentSoundFile.stop();
        $previousSongNumberCell.html(playButtonTemplate);
        console.log($lastSongNumberCell);
        $('.main-controls .play-pause').html(playerBarPlayButton);

    } 
    
};

var nextSong = function() {
    console.log('nexsong function is called');
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
   	currentSoundFile.play();
    // Update the Player Bar information
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
	//set it back number
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};


var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
		
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    
	currentSoundFile.play();
	
    // Update the Player Bar information
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};




var $albumImage = $('.album-cover-art');
var setCurrentAlbum = function (album) {
	//#1
	 currentAlbum = album;
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');

	var $albumSongList = $('.album-view-song-list');

	//#2
	//each of the representative of the node will take albumPicasso which is represented by album
	$albumImage.attr('src', album.albumArtUrl);
	//resetAlbum = $albumImage.attr('src', album.albumArtUrl);
	$albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);

	//#3
	//Make sure No html syntax
	$albumSongList.empty();

	//#4 Now Create rows for the table

	for (var i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        
		$albumSongList.append($newRow);
	}

};



var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };


var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
   $('.main-controls .play-pause').html(playerBarPauseButton);

};




//dynamic generate of multiple album
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

$(document).ready(function () {
			setCurrentAlbum(albumPicasso);
	        $('.main-controls .play-pause').click(toggle);
			$previousButton.click(previousSong);
			$nextButton.click(nextSong);

			var arr = [albumMarconi, albumPicasso];
			var i = 0;
			$albumImage.on('click', function (event) {
				
				setCurrentAlbum(arr[i]);
				i++;
				if (i == arr.length) {
					i = 0;
				}
			});
});