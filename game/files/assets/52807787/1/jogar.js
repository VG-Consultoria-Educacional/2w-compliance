var Jogar = pc.createScript('jogar');

// initialize code called once per entity
Jogar.prototype.initialize = function() {
     this.entity.element.on('mousedown', this.onPress, this); 
    this.entity.element.on('touchstart', this.onPress, this);
    this.open        = true;
    this.menu_action = false;
    
    
};

// update code called every frame
Jogar.prototype.update = function(dt) {
    
};

Jogar.prototype.onPress = function () {
    
    
        
    hud           = pc.app.root.findByName('main_menu');
    main_game     = pc.app.root.findByName('game_main');
    answer_main   = pc.app.root.findByName('answer_main');
    question_main = pc.app.root.findByName('question_main');
    
    
   if(this.getMobile()===false){   
        //Configura huds e mostra game
        hud.enabled           = false;
        main_game.enabled     = true;
        answer_main.enabled   = true;
        question_main.enabled = true;
     }else{
         mobile           = pc.app.root.findByName('mobile');
         mobile.enabled   = true;
         hud.enabled      = false;
         
         
          
         
         timerExecute(function(){
            //Configura huds e mostra game
            main_game.enabled     = true;
            answer_main.enabled   = true;
            question_main.enabled = true;
            mobile.enabled   = false;
         },4000);
     }    
        
    //Musica de fundo 
    var audio_music = pc.app.root.findByName('audio_music');
    audio_music.sound.play("bg_music"); 
        
    
};

Jogar.prototype.getMobile = function() {
		
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