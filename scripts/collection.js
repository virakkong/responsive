

var collectionItemTemplate = 
    '<div class="collection-album-container column fourth">'
+        '<img src="assets/images/album_covers/01.png">'
+        '<div class="colletion-albumn-info caption">'
+           '<p>'
+               ' <a clas="album-name" href="album.html"> The Colors </a>'
+                '<br/>'
+                '<a href="album.html">Pablo Picasso</a>'
+                 '<br/>'
+               ' X songs '
+             '   <br/>'
+            '</p>'
+       '</div>'
+   '</div>'
;

//Display Alubm
window.onload =function(){
    var collectionContainer= document.getElementsByClassName('album-covers')[0];
    //index 0:div element ==> <div class="collection-album-container column fourth">
    collectionContainer.innerHTML='';
    for(var i=0; i< 12; i++){
        collectionContainer.innerHTML +=collectionItemTemplate;
    }
    
    
    
}
