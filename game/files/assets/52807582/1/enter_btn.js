var EnterBtn = pc.createScript('enterBtn');

// initialize code called once per entity
EnterBtn.prototype.initialize = function() { 
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
};

// update code called every frame
EnterBtn.prototype.update = function(dt) {
     
};

EnterBtn.prototype.onPress = function () {
    hud           = pc.app.root.findByName('main_menu');
    main_game     = pc.app.root.findByName('game_main');
    answer_main   = pc.app.root.findByName('answer_main');
    question_main = pc.app.root.findByName('question_main');
    mobile           = pc.app.root.findByName('mobile');
         mobile.enabled   = true;
    
    
    if(getMobile()===false){   
       
        //Configura huds e mostra game
        hud.enabled           = false;
        main_game.enabled     = true;
        answer_main.enabled   = true;
        question_main.enabled = true;
     }else{
         hud.enabled           = false; 
         
          
         
         timerExecute(function(){
           
            //Configura huds e mostra game
            main_game.enabled     = true;
            answer_main.enabled   = true;
            question_main.enabled = true;
         },4000);
     }
 };

EnterBtn.prototype.getMobile = function() {
		
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) || userAgent.match( /Android/i ))
		  {
			return true;

		  }
		  else
		  {
			return false;
		  }
};
