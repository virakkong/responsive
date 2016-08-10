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
		// clickHandler logic
		var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSongNumber !== null) {
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		 currentSoundFile.play();
		$(this).html(pauseButtonTemplate);
		 setSong(songNumber);
		updatePlayerBarSong();
	} else if (currentlyPlayingSongNumber === songNumber) {
		
		$(this).html(playButtonTemplate);
		$('.main-controls .play-pause').html(playerBarPlayButton);
		currentlyPlayingSongNumber = null;
		currentSongFromAlbum = null;
		
		 if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
            }
		
	}

	};

	var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };

	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);
	return $row;
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

var togglePlayFromPlayerBar = function() {
	var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    currentlyPlayingCell.html(pauseButtonTemplate);
	
//If a song is paused and the play button is clicked in the player bar, it will
//Change the song number cell from a play button to a pause button
//Change the HTML of the player bar's play button to a pause button
//Play the song

	

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
	
			var $playpause =$('.main-controls .play-pause');
			$playpause.click(togglePlayFromPlayerBar);
	
			$previousButton.click(previousSong);
			$nextButton.click(nextSong);

			var arr = [albumMarconi, albumPicasso];
			var i = 0;
			console.log($albumImage);
			$albumImage.on('click', function (event) {
				
				setCurrentAlbum(arr[i]);
				i++;
				if (i == arr.length) {
					i = 0;
				}
			});
});