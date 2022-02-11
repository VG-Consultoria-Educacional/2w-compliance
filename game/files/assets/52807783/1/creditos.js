var Creditos = pc.createScript('creditos');

// initialize code called once per entity
Creditos.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};

// update code called every frame
Creditos.prototype.update = function(dt) {
    
};

Creditos.prototype.onPress = function (event) {
    
    //Seleciona entity
    var hud        = pc.app.root.findByName('main_menu');
    //var credits_image  = pc.app.root.findByName('credits_image');
    var credits     = pc.app.root.findByName('credits');
        
    hud.enabled           = false;
    credits.enabled = true;
    //credits_image.script.moveObj.status[1] = true;
    
};
// swap method called for script hot-reloading
// inherit your script state here
// Creditos.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/