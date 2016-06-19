var height = window.innerHeight;
document.querySelector('body').style.height = height + 'px';

var music = document.querySelector('#music'); 
document.querySelector('#girl').addEventListener('click', function() {
	$(this).toggleClass('roll');
	if( music.paused ) {                 
	    music.play();  
	}else{
	 	music.pause();
	}
});
 