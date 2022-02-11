var FeedBackClose = pc.createScript('feedBackClose');

// initialize code called once per entity
FeedBackClose.prototype.initialize = function() {
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};

// update code called every frame
FeedBackClose.prototype.update = function(dt) {
    
};

FeedBackClose.prototype.onPress = function () {
    var hud     = pc.app.root.findByName('feedBack_big');
    hud.enabled = false;
    
    answer_main         = pc.app.root.findByName('answer_main');
    answer_main.enabled = true;
    
    answer_main         = pc.app.root.findByName('question_main');
    answer_main.enabled = true;
};
