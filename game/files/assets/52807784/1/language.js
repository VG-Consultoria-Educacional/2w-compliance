var Language = pc.createScript('language');

Language.attributes.add('lang', {
    type: 'number',
    enum: [{ 'Português': 0 },
        { 'Inglês': 1 },
        { 'Espanhol': 2 }
    ], 
    title: 'Idioma'
});

Language.attributes.add('objs', {
    array:true,
    title: 'Objecs',
    type: 'json',
    schema: [{
        name: 'obj',
        type: 'entity',
        title: 'Text entity',
    }, {
        name: 'pt',
        title: 'Portuguese',
        type: 'string',
    }, {
        name: 'en',
        title: 'English',
        type: 'string',
    }, {
        name: 'es',
        title: 'Spanish',
        type: 'string',
    }]
});

//initialize code called once per entity
Language.prototype.initialize = function() {
    this.translate();
};

// update code called every frame
Language.prototype.update = function(dt) {
    
};

Language.prototype.translate = function() {
    for(var i = 0; i <this.objs.length; i++){
        
       if(this.lang ===0){
            this.objs[i].obj.element.text = this.objs[i].pt; 
        }else if(this.lang ===1){
            this.objs[i].obj.element.text = this.objs[i].en;
        }else if(this.lang ===2){
            this.objs[i].obj.element.text = this.objs[i].es;
        }
        
    }
};

