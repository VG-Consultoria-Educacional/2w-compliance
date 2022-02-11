var BackUrlBtn = pc.createScript('backUrlBtn');

BackUrlBtn.attributes.add('url', {
    type: 'string', 
    title: 'Url to back'
});

// initialize code called once per entity
BackUrlBtn.prototype.initialize = function() {
    // Adiciona eventos
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
   
};

BackUrlBtn.prototype.update = function(dt) {
    
};


BackUrlBtn.prototype.onPress = function(event) {
    document.exitFullscreen();
    window.location.href = this.url;
};