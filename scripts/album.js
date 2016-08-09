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
		{
			title: 'Blue',
			duration: '4:26'
		},
		{
			title: 'Green',
			duration: '3:14'
		},
		{
			title: 'Red',
			duration: '5:01'
		},
		{
			title: 'Pink',
			duration: '3:21'
		},
		{
			title: 'Magenta',
			duration: '2:15'
		}
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
		{
			title: 'Hello, Operator?',
			duration: '1:01'
		},
		{
			title: 'Ring, ring, ring',
			duration: '5:01'
		},
		{
			title: 'Fits in your pocket',
			duration: '3:21'
		},
		{
			title: 'Can you hear me now?',
			duration: '3:14'
		},
		{
			title: 'Wrong phone number',
			duration: '2:15'
		}
     ]
};


//Create Third Album

var myAlbum = {
	title: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/02.png',
	songs: [
		{
			title: 'Hello, Operator?',
			duration: '1:01'
		},
		{
			title: 'Ring, ring, ring',
			duration: '5:01'
		},
		{
			title: 'Fits in your pocket',
			duration: '3:21'
		},
		{
			title: 'Can you hear me now?',
			duration: '3:14'
		},
		{
			title: 'Wrong phone number',
			duration: '2:15'
		}
     ]
};




//dynamic generate of multiple album
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

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

	if (currentlyPlayingSong !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}

	};

	var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);
	return $row;
};




var $albumImage = $('.album-cover-art');
var setCurrentAlbum = function (album) {
	//#1

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






$(document).ready(function () {
			setCurrentAlbum(albumPicasso);

//			var arr = [albumMarconi, myAlbum, albumPicasso];
//			var i = 0;
//			albumImage.addEventListener('click', function (event) {
//				setCurrentAlbum(arr[i]);
//				i++;
//				if (i == arr.length) {
//					i = 0;
//				}
//			});
	
	
	
	
});