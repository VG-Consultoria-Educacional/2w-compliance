var HelpBtn = pc.createScript('helpBtn');

// initialize code called once per entity
HelpBtn.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};
 
HelpBtn.prototype.onPress = function (event) {
    
        //Seleciona entity
    var hud        = pc.app.root.findByName('main_menu');
    var help_main  = pc.app.root.findByName('help_main');
    var help_1     = pc.app.root.findByName('help_1');
    var help_2     = pc.app.root.findByName('help_2');
        
    help_1.script.fadeImage.fadeOut = true;
    help_2.script.fadeImage.fadeIn  = true;
       
        
    //Configura huds e mostra game
    hud.enabled           = false;
    help_main.enabled     = true;
    help_1.enabled = true;
    help_2.enabled = true;
    
};
