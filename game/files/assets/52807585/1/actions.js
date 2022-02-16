//Roger William
//17/1/2021
var Actions = pc.createScript('actions');

Actions.attributes.add('itens',{
    type:'number',
    title:'Index da resposta',
    array: true
});


// initialize code called once per entity
Actions.prototype.initialize = function() {
    //this.scene        = this.sceneName();
    //this.changeScene();
    self = this;
    
        questionsIndex = 0;
        //Trocando titulo do game
        var title_game          = pc.app.root.findByName('title_game');
        title_game.element.text = dStr(title);

        //Fade in na logo do cliente
        var logo                     = pc.app.root.findByName('default_logo');
        logo.script.fadeImage.fadeIn = true;

        //Espera 2 segundos e abre menu
        timerExecute(function(){
            logo.script.fadeImage.fadeOut = true;

            //Liga icone do son
            var sound_toogle     = pc.app.root.findByName('sound_toogle');
            sound_toogle.enabled = true; 

            timerExecute(function(){
                var hud = pc.app.root.findByName('main_menu'); 
                hud.enabled  = true;
                logo.enabled = false;
            },2000);

        }, 2000);

        //Embaralhar todos os itens
        //litens = shuffle(allitens);

        //embaralhando icones grandes
        question_ico = pc.app.root.findByName('question_icon');

        //Loop com  quantidade de perguntas
        for(var i = 0; i<questions.length; i++){

            //Substituir item pelo embaralhado
            itensArray[i] = allitens[i];
            self.itens[i] = allitens[i];
            question_ico.script.drawers[i]= allitens[i];
        }

 
        //Cria primeira pergunta
        action = pc.app.root.findByName('Root');
        action.script.actions.questionCreate();

        //Cria primeiras respostas
        action = pc.app.root.findByName('Root');
        action.script.actions.answerCreate(questionsIndex);
 };

// update code called every frame
Actions.prototype.update = function(dt) {

};

Actions.prototype.changeScene = function() {
    
    if(screen.width>screen.height && this.sceneName()=='scene_mobile'){
        
        scene = pc.app.scenes;
        //Destroi a cena atual
        oldScene = pc.app.root.findByName('RootMain');
        oldScene.destroy();
        
        //Carrega nova cena
        pc.app.scenes.loadSceneHierarchy(scene._list[0].url);
        
    }
    
    if(screen.width<screen.height && this.sceneName()=='scene_desktop'){
        
        scene = pc.app.scenes;
        //Destroi a cena atual
        oldScene = pc.app.root.findByName('RootMain'); 
        oldScene.destroy();
        
        //Carrega nova cena
        pc.app.scenes.loadSceneHierarchy(scene._list[1].url);
       
    }
    
      
}; 

Actions.prototype.sceneName = function(){
    var nameScene     = ''; 
    var nameSceneTemp = pc.app.root.findByName('scene_mobile');
    
    if(nameSceneTemp!=null){
        nameScene = 'scene_mobile';
    }
    
    nameSceneTemp = pc.app.root.findByName('scene_desktop');
    
    if(nameSceneTemp!=null){
        nameScene = 'scene_desktop';
    }
    
    this.scene = nameScene;
    console.log(this.scene);
    return nameScene;
};


Actions.prototype.questionHudPosition = function(textQuestion){
    var main_question  =  this.app.root.findByName('question_main');
    var newPosition    = new pc.Vec3(0,0,0); 
    newPosition.x = -0.32963934540748596;
    newPosition.y = -1.3260889053344727;
    main_question.setPosition(newPosition); 
    
    
    if(textQuestion.length> 371){
       newPosition.y = -1.0582306385040283;
       main_question.setPosition(newPosition);
    }
    
    if(textQuestion.length> 732){
       newPosition.y = -0.8055362105369568;
       main_question.setPosition(newPosition);
    }
    
};

function timerExecute(func, timeToExecute){
    setTimeout(function(){
        func();  
    },timeToExecute);
}

//Embaralhar array
function shuffle(array) {
  
    var indexNumber = array.length; 
    var indexNow;
    var randNumber;

  //Enquanto houver elementos para embaralhar
  while (indexNumber) {

    // Escolhendo um index aleatório limitando ao index atual
    randNumber = Math.floor(Math.random() * indexNumber--);

    //Valor da index atual
    indexNow = array[indexNumber];
    
    //Trocando valor do index atual pelo index randomico
    array[indexNumber] = array[randNumber];
    
    //Trocando index randomico pelo index atual
    array[randNumber] = indexNow;
  }

  return array;
}
 

function nextQuestion(){
    questionsIndex++;
    
}

//Cria botões de respostas
Actions.prototype.answerCreate = function(indexQ) {
    var positionY = 0;
    var scaleY    = 0;
    
    //Verifica se existe resposta grande para ajustar botão
    var sizeBtn = false;
    for(i=0; i<answer[indexQ].length; i++){
        answerSize = dStr(answer[indexQ][i]);
        if(answerSize.length>77){
            sizeBtn = true;
        }
    }
    
    
    
    //Prefab do botão
    var templateAsset = this.app.assets.get('52807701');
    
    //Loop com quantidade de  respostas
    for(i=0; i<answer[indexQ].length; i++){
        
        //ajustando tamanho
        if(sizeBtn===true){
            positionY = 0.30;
            scaleY    = 1.45;
        }else{
            positionY = 0.23;
            scaleY    = 1;
        }
        
        scaleYVec = new pc.Vec3(1,scaleY,1);
        
        //Instância única
        instance  = templateAsset.resource.instantiate();

        //Entity pai
        answer_main       = pc.app.root.findByName('answer_main_buttons');
        
        //Adiciona na cena
        answer_main.addChild(instance);
        //position = pc.Vec3(0.6844531297683716, 0.31434166431427, 3.552713678800501e-13);
        //position = pc.Vec3(0, 0, 3);
        
        //Renomeia  nova entity
        instance.name = instance.name + '_' + i;
        
        //Seleciona entity
        answerButtonEntity = pc.app.root.findByName(instance.name);
        
        //Altera resposta
        text = answerButtonEntity.findByName('Text');
        text.element.text = dStr(answer[indexQ][i]);
        
        //Reposiciona botão e renomeia
        if(i===0){
            var game_mobile   = pc.app.root.findByName('scene_mobile');
            if(game_mobile!=null){
                //templateAsset = this.app.assets.get('42136941');
            }
            
            img = answerButtonEntity.findByName('img');
            img.setLocalScale(scaleYVec);
            position = answerButtonEntity.getPosition();
            
        }else{
            //Seleciona botão antigo
            oldButton     = pc.app.root.findByName('answer_'+ (i-1));
            OldPosition   = oldButton.getPosition();
            OldPosition.y = OldPosition.y - positionY;
            answerButtonEntity.setPosition(OldPosition);
            
            img = answerButtonEntity.findByName('img');
            img.setLocalScale(scaleYVec);
        }
        
        //Adiciona index da resposta no botão
        button = answerButtonEntity.findByName('button_action');
        button.script.answerClick.indexA = i;
        button.script.answerClick.indexQ = questionsIndex;
        
        //Habilita um clique
        button.script.btnState.oneClick = true;
        
        
    }   
}; 


//Cria pergunta
Actions.prototype.questionCreate = function(indexQ){
    
    //Troca feedback
    answer_feedback              = pc.app.root.findByName('anwer_feedback');
    answer_feedback.script.fadeImage.fadeOut = true;
    timerExecute(function(){
        answer_feedback.script.fadeImage.fadeOut = false; 
        answer_feedback.element.text = dStr(answerWait);
        answer_feedback.script.fadeImage.fadeloop = true;
    },1500);
    
    timerExecute(function(){
        answer_feedback.script.fadeImage.fadeloop = false;
        answer_feedback.script.fadeImage.fadeIn   = true;
    },4000);
    
    
    //Seleciona item
    arrow   = pc.app.root.findByName('arrowIten');
    itenIni = pc.app.root.findByName('iten' + itensArray[questionsIndex]);
    
    //Calculando posição da seta
    var newPosition    = itenIni.getPosition();
    var arrowPosition  = arrow.getPosition();
    newPosition.y      = newPosition.y +0.3 ;
    newPosition.z      = arrowPosition.z;
    arrow.setPosition(newPosition);
    
    //Calcula animação da seta
    AnimPositionA   = arrow.getLocalPosition();
    AnimPositionB   = new pc.Vec3(0,0,0);
    AnimPositionB.x = AnimPositionA.x;
    AnimPositionB.z = AnimPositionA.z;
    AnimPositionB.y = AnimPositionA.y + 0.2; 
    
    //Anima seta
    arrow.enabled = true;
    arrow.tween(AnimPositionA)
    .to(AnimPositionB, 1.5, pc.SineInOut)
    .loop(true) 
    .yoyo(true)
    .start();
    
    //Troca item icone de hud
    question_icon = pc.app.root.findByName('question_icon');
    textureIco    = question_icon.script.drawers.drawers[questionsIndex];
    question_icon.element.textureAsset = textureIco;
    console.log(textureIco);
    
    
    //adiciona pergunta
    var iniQuestion          = pc.app.root.findByName('question_text');
    
    iniQuestion.element.text = dStr(questions[questionsIndex]);
    
    //Repossiciona caixa de questão 
    this.questionHudPosition(dStr(questions[questionsIndex]));
    
};

function answerMult(){
    var answerMultFinal          = false;
    var answerCorrectNumber      = 0;
    var answerCorrectNumberFinal = 0;
    
    for(var i=0; i<answer[questionsIndex].length; i++){
        if(correctAnswers[questionsIndex][i]===true){
            answerCorrectNumber ++;
        }
    }
    
    for(i=0; i<answer[questionsIndex].length; i++){
        if(chosenAnswersMult[questionsIndex][i]===true && correctAnswers[questionsIndex][i]===true){
            answerCorrectNumberFinal ++;
        }
    }
    
    if(answerCorrectNumber===answerCorrectNumberFinal){
        answerMultFinal = true;
    }    
    
    return answerMultFinal;
    
}

//Verifica resposta
function answerClick(indexQ,indexA){
    chosenAnswersMult[indexQ][indexA] = true;
    //Adiciona resposta se ainda não foi clicada
    if(chosenAnswers[indexQ]===''){
        
        chosenAnswers[indexQ]             = [indexA];
        
        
        if(correctAnswers[indexQ][indexA]===true){
            points_end = points_end + answerScore[indexQ];
        }   
    }
    
    //Seleciona entidade do feedback
    var answer_feedback          = pc.app.root.findByName('anwer_feedback');
    
    //Se a resposta foi correta
    if(correctAnswers[indexQ][indexA]===true){
        
        //Audio resposta correta
        timerExecute(function(){
           audio_error = pc.app.root.findByName('audio_answer');
           audio_error.sound.play('hit'); 
        },100);
        
        
        //Iniciar animação aleatoria
        if(answerMult()){
           random = Math.floor(Math.random() * 5 + 1);
            if(random===5){random = 4;} 
            animationPerson(random); 
        }
        
        //ESconde pergunta
        if(answerMult()){
            question_entity = pc.app.root.findByName('question_main');
            question_entity.enabled = false;
        }
        
        //Se não possuir feedback usa um feedback padrão
        if(answerFeedback[indexQ][indexA]===''){
            feedbackText  = answerFeedbackNull[1];
            answer_feedback.script.fadeImage.fadeloop = true;
        
        }else{
            feedbackText = dStr(answerFeedback[indexQ][indexA]);
        }
        
        //Altera cor para verde
        answer_feedback.element.color = new pc.Color(0.9,2.5,0.2);
        
        timerFeedback = 200;
        
        if(answerMult()){
            timerFeedback = 2000;
        }
        
        //Se o texto for muito grande
        if(feedbackText.length>70){
            
            //Texto do feedback pequeno
            answer_feedback.element.text = dStr(answerFeedbackNull[1]);
            
            //espera animação para aparecer tela
            timerExecute(function(){
                //desabilita respostas
                answer_main         = pc.app.root.findByName('answer_main');
                answer_main.enabled = false;
                
                //desabilita pergunta
                answer_main         = pc.app.root.findByName('question_main');
                answer_main.enabled = false;
                
                feedBackBig     = pc.app.root.findByName('feedBack_big');
                feedBackBigText = pc.app.root.findByName('anwer_feedback_big');

                feedBackBig.enabled  = true;
                feedBackBigText.element.text = feedbackText; 
                
            },timerFeedback);
        }else{
           answer_feedback.element.text = feedbackText; 
        }
        
        
        //Desabilita todos os botões
        for(var i = 0; i<answer[indexQ].length; i++){
            //Procura por uma instância de botão
            buttonOff                          =  pc.app.root.findByName('answer_' + i );
            
            if(buttonOff.name == 'answer_'+indexA || answerMult()){
                

                //Procura pela imagem do botão
                buttonOffImg                       = buttonOff.findByName('img');

                //triger do botão contendo scripts
                buttonOffTexture                   = buttonOff.findByName('button_action');

                //Altera imagem do botão
                buttonOffImg.element.textureAsset  = buttonOffTexture.script.btnState.clicked;

                //Estado das imagens do botão
                buttonOffTexture.script.btnState.status = true;

                //Impedindo de ser clicado novamente
                buttonOffTexture.script.answerClick.clicked = true;

                //Altera opacidade do texto
                buttonOffTxt  =  buttonOff.findByName('Text');
                buttonOffTxt.element.opacity = 0.2;
            }
        }
    }else{
        
        //Audio resposta incorreta
        timerExecute(function(){
           audio_error = pc.app.root.findByName('audio_answer');
            audio_error.sound.play('error'); 
        },100);
        
        //Se não possuir feedback usa um feedback padrão
        if(answerFeedback[indexQ][indexA]===''){
            feedbackText  = answerFeedbackNull[0];
            answer_feedback.script.fadeImage.fadeloop = true;
        
        }else{
            feedbackText = dStr(answerFeedback[indexQ][indexA]);
        }
        
        //Se o texto for muito grande
        if(feedbackText.length>97){
            
            //Texto do feedback pequeno
            answer_feedback.element.text = dStr(answerFeedbackNull[0]);
            
            //espera animação para aparecer tela
            timerExecute(function(){
                //desabilita respostas
                answer_main         = pc.app.root.findByName('answer_main');
                answer_main.enabled = false;
                
                //desabilita pergunta
                answer_main         = pc.app.root.findByName('question_main');
                answer_main.enabled = false;
                
                feedBackBig     = pc.app.root.findByName('feedBack_big');
                feedBackBigText = pc.app.root.findByName('anwer_feedback_big');

                feedBackBig.enabled  = true;
                feedBackBigText.element.text = feedbackText; 
                
            },200);
        }else{
           //Se não possuir feedback usa um feedback padrão
            if(answerFeedback[indexQ][indexA]===''){
                feedbackText  = answerFeedbackNull[0];
                answer_feedback.script.fadeImage.fadeloop = true;
            }else{
                feedbackText = dStr(answerFeedback[indexQ][indexA]);

            }
        
        
            //Altera texo
            answer_feedback.element.text = feedbackText;

            //Altera cor para vermelho
            answer_feedback.element.color = new pc.Color(2.5,0.2,0.2);

            //Calcula sílabas para timer, 8 silabas por segundo
            timerSeg = (feedbackText.length/2.1) / 8;
            timerSeg = (timerSeg * 1000);

            //Se for menor que um segundo padroniza em um segundo
            if(timerSeg<1000){timerSeg = 1000;}

            //500 milisegundos, tempo para jogador perceber o erro
            timerSeg = timerSeg + 500;

            //Retorna texto e cor após timerSeg
            timerExecute(function(){

                //Verificar se posteriormente clicaram na alternativa correta
                continueMsg = true;
                for(var i =0; i<questions.length; i++){
                    for(var a =0 ;a<chosenAnswers[i].length; a++){
                       //Se a resposta ja foi selecionada
                       if(chosenAnswers[i][a]!==''){

                           //Se for a resposta correta
                           if(correctAnswers[i][a]===true){
                              continueMsg = false; 
                           }
                       } 
                    }
                }

                if(continueMsg===true){
                    //Volta Texto original
                    //answer_feedback.element.text         = dStr(answerWait); 

                    //Volta ao original
                    answer_feedback.element.color = new pc.Color(2.5,2.4,0.1);

                    //Para de piscar e  reseta opacidade
                    answer_feedback.script.fadeImage.fadeloop = false;
                    answer_feedback.element.opacity           = 1;
                    }
                },timerSeg); 
           }
        }
}

function animationPerson(random){
    
    //Lista de itens
    action = pc.app.root.findByName('Root');
    itens  = action.script.actions.itens;
    
    //Seta
    arrow  = pc.app.root.findByName('arrowIten');
    arrow.enabled = false;
    
    //Seta personagem
    person = pc.app.root.findByName('person');
    person.script.moveObj.status[random] = true;
     
    //Parent do item
    iten = pc.app.root.findByName('iten' + itens[questionsIndex]);
    iten.reparent(person);
    
    //0 to 1
    if(random===1){
        //Reposiciona item
        newPosition   = new pc.Vec3(0, 0, 0);
        newPosition.x = person.getPosition().x - 0.350;
        newPosition.y = person.getPosition().y;
        newPosition.z = person.getPosition().z - 0.002 ; 
        
        iten.setPosition(newPosition);
        
        //Inicia animação
        person.sprite.play('walk_take_back');   
        person.sprite.flipX = false; 
    }
    
    //0 to 2
    if(random===2){
        //Reposiciona item
        newPosition   = new pc.Vec3(0, 0, 0);
        newPosition.x = person.getPosition().x + 0.350;
        newPosition.y = person.getPosition().y;
        newPosition.z = person.getPosition().z - 0.002 ; 
        
        iten.setPosition(newPosition);
        
        //Inicia animação
        person.sprite.play('walk_take_back');   
        person.sprite.flipX = true; 
    }
    
    //0 to 3
    if(random===3){
        //Reposiciona item
        newPosition   = new pc.Vec3(0, 0, 0);
        newPosition.x = person.getPosition().x + 0.350;
        newPosition.y = person.getPosition().y;
        newPosition.z = person.getPosition().z + 0.002 ; 
        
        iten.setPosition(newPosition);
        
        //Inicia animação
        person.sprite.play('walk_take_back');   
        person.sprite.flipX = true; 
    }
    
    //0 to 4
    if(random===4){
        //Reposiciona item
        newPosition   = new pc.Vec3(0, 0, 0);
        newPosition.x = person.getPosition().x + 0.350;
        newPosition.y = person.getPosition().y;
        newPosition.z = person.getPosition().z + 0.002 ; 
        
        iten.setPosition(newPosition);
        
        //Inicia animação
        person.sprite.play('walk_take_back');   
        person.sprite.flipX = true; 
    }
    
}

qs = (function(a) {
  if (a == "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i)
  {
  var p=a[i].split('=', 2);
  if (p.length == 1)
  b[p[0]] = "";
  else
  b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));


function endGame(){
    
    urlBack = qs["url"];
    
    if(typeof urlBack === 'string' && urlBack!==''){
        back_url_btn = pc.app.root.findByName('back_url_btn');
        back_url_btn.enabled = true;
        
        button_url_action = pc.app.root.findByName('button_url_action');
        button_url_action.script.backUrlBtn.url = urlBack;
    }
    
    var score  = 0;
    points_end = 0;
	
	
    //Quantidade de perguntas
	for(var i=0; i<correctAnswers.length; i++){
		
        //Quantidade de respostas
        for(var a = 0; a<correctAnswers[i].length; a++){
			
            //Se a resposta foi correta
            if(correctAnswers[i][a]===true){
				
                //Se foi a resposta selecionada pelo jogador
                if(a==chosenAnswers[i]){
					
                    //Soma pontos
                    score = parseInt(score) + parseInt(jsDecode(answerScore[i]));
				    
                }
			}
		}
	}
	
    //Salva total de pontos
    scoreTotal = score;
	
    //Quantidade máxima de pontos
    score2 = 0;
	for( i = 0; i<answerScore.length; i++){
		score2 = parseInt(score2)+ parseInt(jsDecode(answerScore[i]));
	}
	
	
	//Calculando porcentagem para animações
	scorePercent  = Math.round((100*(scoreTotal))/score2);
	
	scoreText = pc.app.root.findByName('scoreText');
    scoreText.element.text = scorePercent + "%";
    
    //Habilita hud
    end_main = pc.app.root.findByName('end_main');
    end_main.enabled = true;
    
    end_main = pc.app.root.findByName('game_main');
    end_main.enabled = false;
    
    //Mensagem final personalizada
    msg_final_text              = pc.app.root.findByName('msg_final_text');
    msg_final_text.element.text = dStr(finalMsg());
    
    //Musica final
    if(scorePercent>=musicPercent){
        audio_error = pc.app.root.findByName('audio_final');
        audio_error.sound.play('hit');
    }else{
        audio_error = pc.app.root.findByName('audio_final');
        audio_error.sound.play('missed');
    }
    
    audio_error = pc.app.root.findByName('audio_music');
    audio_error.sound.stop();
    
    parent.finalizarquiz(scorePercent);
    
}


function personIniPosition(){
    person = pc.app.root.findByName('person');
    person.sprite.play('idle');
    person.sprite.flipX = true;
    
    //Limpa todas as respostas
    for(var i = 0; i<answer[questionsIndex].length; i++){
        answerObj = pc.app.root.findByName('answer_' + i);
        answerObj.destroy(); 
    }
    //Próxima pergunta
     questionsIndex++;
    
    //Cria respostas
    if(questionsIndex<=(questions.length-1)){
       
        //Se feedback foi pequeno
        feedBack_big         = pc.app.root.findByName('feedBack_big');
        if(feedBack_big.enabled === false){
            question_entity = pc.app.root.findByName('question_main');
            question_entity.enabled = true;
        }
        
        
                
        action = pc.app.root.findByName('Root');
        action.script.actions.questionCreate();
        
        action = pc.app.root.findByName('Root');
        
        action.script.actions.answerCreate(questionsIndex);
    }else{
        endGame();
    }
}   

function iten1(){
    //Habilita estrela
    star = pc.app.root.findByName('star1');
    star.enabled = true;
    
    //Animação para guardar itemn
    iten       = pc.app.root.findByName('iten' + itens[questionsIndex]);
    itenSetPos = new pc.Vec3(0,0,0);
    itenPos    = iten.getPosition();
    itenSetPos.y  = itenPos.y + 0.120;
    itenSetPos.x = itenPos.x;
    itenSetPos.z = itenPos.z;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },100);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x - 0.120;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },200);
    
    timerExecute(function(){
        iten.enabled = false;
    },400);
    
    //Muda animação person
    person = pc.app.root.findByName('person');
    person.sprite.play('idle');
    
    //Abre gaveta
    audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
    audio_drawer_open.sound.play('drawer_open');
    
    drawer         = pc.app.root.findByName('drawer1');
    drawer.enabled = true;
    drawer.sprite.play('drawerOpen');
    currentClip    = drawer.sprite.clip("drawerOpen");
    
    //Animação estrela
    timerExecute(function(){
        //Audio
        audio_star = pc.app.root.findByName('audio_star');
        audio_star.sound.play('star');
        
        //estrelas 
        star.sprite.play('star');
        
        //Ao terminar estrelas desabilita
        star.sprite.on('end', function (){
            star.enabled = false;
        });  
    },1000);
    
    //Ao terminar animação da gaveta
    drawer.sprite.on('end', function () {
        
        audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
        audio_drawer_open.sound.play('drawer_close');
        
        //Desabilita gaveta
        drawer.enabled = false;
        
        //Espera e volta o personagem na posição inicial
        timerExecute(function (){
            //Animação andando
            person.sprite.play('walk_front');

            //Vira personagem
            person.sprite.flipX = true;
            
            //Move personagem
            person.script.moveObj.status[0] = true;
        },1000);
        
       
    });
}

function iten2(){
    //Habilita estrela
    star = pc.app.root.findByName('star2');
    star.enabled = true;
    
    //Animação para guardar itemn
    iten       = pc.app.root.findByName('iten' + itens[questionsIndex]);
    itenSetPos = new pc.Vec3(0,0,0);
    itenPos    = iten.getPosition();
    
    itenSetPos.x = itenPos.x - 0.300;
    itenSetPos.z = itenPos.z + 0.200;
    itenSetPos.y = itenPos.y ;
    
    iten.setPosition(itenSetPos);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x - 0.100;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },100);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x - 0.120;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },200);
    
    timerExecute(function(){
        iten.enabled = false;
    },400);
    
    //Muda animação person
    person = pc.app.root.findByName('person');
    person.sprite.play('idle');
    person.sprite.flipX = false;
    
    //Abre gaveta
    audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
    audio_drawer_open.sound.play('drawer_open');
    
    drawer         = pc.app.root.findByName('drawer2');
    drawer.enabled = true;
    drawer.sprite.play('drawerOpen');
    currentClip    = drawer.sprite.clip("drawerOpen");
    
    //Animação estrela
    timerExecute(function(){
        
        //Audio
        audio_star = pc.app.root.findByName('audio_star');
        audio_star.sound.play('star');
        
        //estrelas 
        star.sprite.play('star');
        
        //Ao terminar estrelas desabilita
        star.sprite.on('end', function (){
            star.enabled = false;
        });  
    },1000);
    
    //Ao terminar animação da gaveta
    drawer.sprite.on('end', function () {
        
        audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
        audio_drawer_open.sound.play('drawer_close');
        
        //Desabilita gaveta
        drawer.enabled = false;
        
        //Espera e volta o personagem na posição inicial
        timerExecute(function (){
            //Animação andando
            person.sprite.play('walk_front');

            //Vira personagem
            person.sprite.flipX = false;
            
            //Move personagem
            person.script.moveObj.status[0] = true;
        },1000);
        
       
    });
}

function iten3(){
    //Habilita estrela
    star = pc.app.root.findByName('star3');
    star.enabled = true;
    
    //Animação para guardar itemn
    iten       = pc.app.root.findByName('iten' + itens[questionsIndex]);
    itenSetPos = new pc.Vec3(0,0,0);
    itenPos    = iten.getPosition();
    
    itenSetPos.x = itenPos.x - 0.300;
    itenSetPos.z = itenPos.z + 0.200;
    itenSetPos.y = itenPos.y ;
    
    iten.setPosition(itenSetPos);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x + 0.100;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },100);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x + 0.120;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },200);
    
    timerExecute(function(){
        iten.enabled = false;
    },400);
    
    //Muda animação person
    person = pc.app.root.findByName('person');
    person.sprite.play('idle');
    
    //Abre gaveta
    audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
    audio_drawer_open.sound.play('drawer_open');
    
    drawer         = pc.app.root.findByName('drawer3');
    drawer.enabled = true;
    drawer.sprite.play('drawerOpen');
    currentClip    = drawer.sprite.clip("drawerOpen");
    
    //Animação estrela
    timerExecute(function(){
        
        //Audio
        audio_star = pc.app.root.findByName('audio_star');
        audio_star.sound.play('star');
        
        //estrelas 
        star.sprite.play('star');
        
        //Ao terminar estrelas desabilita
        star.sprite.on('end', function (){
            star.enabled = false;
        });  
    },1000);
    
    //Ao terminar animação da gaveta
    drawer.sprite.on('end', function () {
        
        audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
        audio_drawer_open.sound.play('drawer_close');
        
        //Desabilita gaveta
        drawer.enabled = false;
        
        //Espera e volta o personagem na posição inicial
        timerExecute(function (){
            //Animação andando
            person.sprite.play('walk_front');

            //Vira personagem
            person.sprite.flipX = false;
            
            //Move personagem
            person.script.moveObj.status[0] = true;
        },1000);
        
       
    });
}

function iten4(){
    //Habilita estrela
    star = pc.app.root.findByName('star4');
    star.enabled = true;
    
    //Animação para guardar itemn
    iten       = pc.app.root.findByName('iten' + itens[questionsIndex]);
    itenSetPos = new pc.Vec3(0,0,0);
    itenPos    = iten.getPosition();
    
    itenSetPos.x = itenPos.x ;
    itenSetPos.z = itenPos.z ;
    itenSetPos.y = itenPos.y ;
    
    iten.setPosition(itenSetPos);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x + 0.100;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },100);
    
    itenSetPos.y  = itenSetPos.y + 0.120;
    itenSetPos.x  = itenSetPos.x + 0.120;
    
    timerExecute(function(){
        iten.setPosition(itenSetPos);
    },200);
    
    timerExecute(function(){
        iten.enabled = false;
    },400);
    
    //Muda animação person
    person = pc.app.root.findByName('person');
    person.sprite.play('idle');
    
    //Abre gaveta
    audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
    audio_drawer_open.sound.play('drawer_open');
    
    drawer         = pc.app.root.findByName('drawer4');
    drawer.enabled = true;
    drawer.sprite.play('drawerOpen');
    currentClip    = drawer.sprite.clip("drawerOpen");
    
    
    //Animação estrela
    timerExecute(function(){
        
        //Audio
        audio_star = pc.app.root.findByName('audio_star');
        audio_star.sound.play('star');
        
        //estrelas 
        star.sprite.play('star');
        
        //Ao terminar estrelas desabilita
        star.sprite.on('end', function (){
            star.enabled = false;
        });  
    },1000);
    
    //Ao terminar animação da gaveta
    drawer.sprite.on('end', function () {
        
        audio_drawer_open = pc.app.root.findByName('audio_drawer_open');
        audio_drawer_open.sound.play('drawer_close');
        
        //Desabilita gaveta
        drawer.enabled = false;
        
        //Espera e volta o personagem na posição inicial
        timerExecute(function (){
            //Animação andando
            person.sprite.play('walk_front');

            //Vira personagem
            person.sprite.flipX = false;
            
            //Move personagem
            person.script.moveObj.status[0] = true;
        },1000);
        
       
    });
}

// initialize code called once per entity
Actions.prototype.reset = function() {
    points_end = 0;
    
    for(var i = 0; i<questions.length; i++){
        chosenAnswers[i] = '';
    }
    
    questionsIndex     = 0;
        
    
    //Seleciona primeiro item e seta de itens
    arrow   = pc.app.root.findByName('arrowIten');
    itenIni = pc.app.root.findByName('iten' + itensArray[questionsIndex]);
    
    //Calculando posição da seta
    var newPosition    = itenIni.getPosition();
    var arrowPosition  = arrow.getPosition();
    newPosition.y      = newPosition.y +0.3 ;
    newPosition.z      = arrowPosition.z;
    arrow.setPosition(newPosition);
    
    //Calcula animação da seta
    AnimPositionA   = arrow.getLocalPosition();
    AnimPositionB   = new pc.Vec3(0,0,0);
    AnimPositionB.x = AnimPositionA.x;
    AnimPositionB.z = AnimPositionA.z;
    AnimPositionB.y = AnimPositionA.y + 0.2; 
    
    //Anima seta
    arrow.tween(AnimPositionA)
    .to(AnimPositionB, 1.5, pc.SineInOut)
    .loop(true) 
    .yoyo(true)
    .start();
    
    //Troca itenm icone de hud'iten' 
    spriteIco    = question_ico.script.drawers.drawers[0];
    
    question_ico.element.spriteAsset = spriteIco; 
    
    //adiciona primeira pergunta
    var iniQuestion          = this.app.root.findByName('question_text');
    
    iniQuestion.element.text = dStr(questions[questionsIndex]);
        
    
    
    //Adiciona botões das respostas
    this.answerCreate(questionsIndex);
 };

function finalMsg(){
	score = 0;
	
	//Calcula pontuação
    for(var i=0; i<correctAnswers.length; i++){
		for(var a = 0; a<correctAnswers[i].length; a++){
			if(correctAnswers[i][a]===true){
				if(a==chosenAnswers[i]){
					score = parseInt(score) + parseInt(jsDecode(answerScore[i]));
				}
			}
		}
	}
	scoreTotal = parseInt(score);
	
	score = 0;
	for(var e = 0; e<answerScore.length; e++){
		score = parseInt(score)+ parseInt(jsDecode(answerScore[e]));
	}
	
	//Calculando porcentagem para animações
	scorePercent  = Math.round((100*(scoreTotal))/score);
	
	//Tipo de Animação
	if(scorePercent<25){animation = '0';}
	if(scorePercent>=25 && scorePercent<50 ){animation = '25';}
	if(scorePercent>=50 && scorePercent<75 ){animation = '50';}
	if(scorePercent>=75 && scorePercent<100 ){animation = '75';}
	if(scorePercent==100 ){animation = '100';}
	
	
	//Mensagem
	msg_end = dStr(eval('msg_'+animation));
	
	return msg_end;
}

function jsDecode(str){
	return str;
}


function detectDevice(){
    Return = false;
    var ua = navigator.userAgent.toLowerCase();
    var isiPad = ua.match('ipad') != null;
    var isiPhone = ua.match('iphone') != null;
    var isAndroid = ua.indexOf("android") > -1;
    
    if(isiPad)
      Return = 'ipad';
    if(isiPhone)
      Return = 'iphone';
    if(isAndroid)
      Return = 'android';
        
    return Return;    
}

	

