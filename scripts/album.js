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

var createSongRow = function (songNumber, songName, songLength) {
	var template =
		'<tr class="album-view-song-item">'
		//store song number in html
		//Children(0)=<td> first below
		//use HTML5 data attributes. As the name suggests, 
		//HTML data attributes allow us to store information in an attribute on an HTML element.
		+
		'  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td' +
		'  <td class="song-item-title">' + songName + '</td>' +
		'  <td class="song-item-duration">' + songLength + '</td>' +
		'</tr>';

	return $(template);
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
	resetAlbum = $albumImage.attr('src', album.albumArtUrl);
	$albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);

	//#3
	//Make sure No html syntax
	$albumSongList.empty();

	//#4 Now Create rows for the table

	for (var i = 0; i < album.songs.length; i++) {
		var $newRow=createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
	}

};



var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

//Detect the Mouse Leaving
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


var findParentByClassName = function (element, targetClass) {
	
	
	if (element) {
		
		if(element.parentElement!=null){
		    var currentParent = element.parentElement;
				
		    	while (currentParent.className!=targetClass && currentParent.className != null) {
				
					currentParent = currentParent.parentElement;
		    	} 
				
				return currentParent;	
			
		} else {
			
			alert("No Parent Found");
		}
	
	}
	
	return alert("No Parent Found with " + targetClass);
};

var getSongItem = function (element) {
	switch (element.className) {
		case 'album-song-button':
		case 'ion-play':
		case 'ion-pause':
			return findParentByClassName(element, 'song-item-number');
		case 'album-view-song-item':
			return element.querySelector('.song-item-number');
		case 'song-item-title':
		case 'song-item-duration':
			return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
		case 'song-item-number':
			return element;
		default:
			return;
	}
};






var currentlyPlayingSong = null;
var clickHandler = function (targetElement) {
	var songItem = getSongItem(targetElement);
	if (currentlyPlayingSong === null) {
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	} else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
		songItem.innerHTML = playButtonTemplate;
		currentlyPlayingSong = null;
	} else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
		var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
		songItem.innerHTML = pauseButtonTemplate;
		currentlyPlayingSong = songItem.getAttribute('data-song-number');
	}

};






window.onload = function () {
	setCurrentAlbum(myAlbum);
	//    var arr=[albumMarconi, myAlbum, albumPicasso];
	//    var i=0;
	//    albumImage.addEventListener('click', function (event){
	//       setCurrentAlbum(arr[i]);
	//        i++;
	//        if(i==arr.length){i=0;}
	//    });


	albumImage.addEventListener('click', function (event) {

		switch (albumImage.getAttribute('src')) {
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

	songListContainer.addEventListener('mouseover', function (event) {

		// console.log(event.target);
		//album-view-song-item is created in album.js. it is not created in album.html
		//make sure that we only act on the table row
		if (event.target.parentElement.className === 'album-view-song-item') {
			// Change the content from the number to the play button's HTML
			//use the querySelector() method because we only need to return a single element
			//playButtonTemplate is '<a href> as a button
			//we assign <a href> with name: album-song-button... to each song number <td>
			event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;

			var songItem = getSongItem(event.target);

			if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
				songItem.innerHTML = playButtonTemplate;
			}

		}





	});

	//    
	//    //Add Event Mouse leave to return number back
	//    
	for (var i = 0; i < songRows.length; i++) {
		//Note: document.getElementsByClassName('album-view-song-item')[i].addEventListener....
		//Note: songRows=document.getElementsByClassName('album-view-song-item');
		songRows[i].addEventListener('mouseleave', function (event) {

			// #1
			//even target: <tr class="album-view-song-item"> 
			var songItem = getSongItem(event.target);

			var songItemNumber = songItem.getAttribute('data-song-number');

			// #2
			if (songItemNumber !== currentlyPlayingSong) {
				songItem.innerHTML = songItemNumber;
			}

		});


		songRows[i].addEventListener('click', function (event) {


			clickHandler(event.target);

		});


	}

};