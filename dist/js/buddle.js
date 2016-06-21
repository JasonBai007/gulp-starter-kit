// 设置页面初始高度
var height = window.innerHeight;
document.querySelector('body').style.height = height + 'px';

var music = document.querySelector('#music'); 
var girl = document.querySelector('#girl'); 
var on = document.querySelector('.on'); 

// 女孩事件
$('#girl').tap(function(e) {
	e.stopPropagation();
	$(this).toggleClass('roll');		
	if( music.paused ) {                 
	    music.play();  
	}else{
	 	music.pause();
	}
});

// 背景事件
$('.on').swipe(function(e) {
	if( girl.classList.contains('turn') ) {
		girl.classList.remove('turn');
		girl.classList.add('turnOff');
	} else {
		girl.classList.remove('turnOff');
		girl.classList.add('turn');		
	}
});
 // 彩蛋
console.log('被你发现了，哈哈哈 哈哈哈');