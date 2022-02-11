var Reset = pc.createScript('reset');

// initialize code called once per entity
Reset.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};

// update code called every frame
Reset.prototype.update = function(dt) {
    
};

EnterBtn.prototype.onPress = function (event) {
     //window.location.href = "";
    
}; 