var Voltar = pc.createScript('voltar');

// initialize code called once per entity
Voltar.prototype.initialize = function() {
     this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};

// update code called every frame
Voltar.prototype.onPress = function(dt) {
          //Seleciona entity
    var hud        = pc.app.root.findByName('main_menu');
    var help_main  = pc.app.root.findByName('help_main');
    var help_1     = pc.app.root.findByName('help_1');
    var help_2     = pc.app.root.findByName('help_2');
    var credits     = pc.app.root.findByName('credits');
        
    
        
    help_1.script.fadeImage.fadeOut = false;
    help_2.script.fadeImage.fadeIn  = false;
       
        
    //Configura huds e mostra game
    credits.enabled = false;
    hud.enabled           = true;
    help_main.enabled     = false;
    help_1.enabled = false;
    help_2.enabled = false; 
};

// update code called every frame
Voltar.prototype.update = function(dt) {
    
};