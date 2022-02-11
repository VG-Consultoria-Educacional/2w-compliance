var Full = pc.createScript('full');

// initialize code called once per entity
Full.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    
    // Adiciona eventos
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mouseleave', this.onLeave, this);

    // touch 
    this.entity.element.on('touchstart', this.onPress, this);
    this.entity.element.on('touchend', this.onRelease, this);
};

// update code called every frame
Full.prototype.onPress = function(dt) {
    if(detectDevice()!='iphone'){
        fullscreen();
    }
};

Full.prototype.onEnter = function (event) { 
    
    document.body.style.cursor = 'pointer';
   
};

//Ao sair o mouse------------------------------------------------------------
Full.prototype.onLeave = function (event) {
    document.body.style.cursor = 'default';
};


function fullscreen(event) {
  var element = document.body;

	if (event instanceof HTMLElement) {
		element = event;
	}

	var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

	element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
	document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };

	isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

// swap method called for script hot-reloading
// inherit your script state here
// Full.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/