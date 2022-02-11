var AnswerClick = pc.createScript('answerClick');

AnswerClick.attributes.add('indexA',{
    type:'number',
    title:'Index da resposta'
});

AnswerClick.attributes.add('indexQ',{
    type:'number',
    title:'Index da pergunta'
});

AnswerClick.attributes.add('clicked',{
    type:'boolean',
    title:'Se ja Foi clicado'
});


// initialize code called once per entity
AnswerClick.prototype.initialize = function() {
    this.entity.element.on('mousedown', function(){
        
        //Se não foi clicado
        if(this.clicked===false){
           this.clicked=true;
           answerClick(this.indexQ,this.indexA);
        }    
    }, this);
    
    this.entity.element.on('touchstart', function(){
        
        //Se não foi clicado
        if(this.clicked===false){
           this.clicked=true;
           answerClick(this.indexQ,this.indexA);
        }    
    }, this);
};

// update code called every frame
AnswerClick.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// AnswerClick.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/