var Reiniciar = pc.createScript('reiniciar');

// initialize code called once per entity
Reiniciar.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};

// update code called every frame
Reiniciar.prototype.update = function(dt) {
    
};

Reiniciar.prototype.onPress = function () {
    window.location.href = "";
};