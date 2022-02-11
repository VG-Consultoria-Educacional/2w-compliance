//Roger William
//19-01-2021
//É possivel adicionar varios X,Y,Z em array, para criar um percurso
//Ao vinal de cada percurso aguarda segundos e chama uma função.


var MoveObj = pc.createScript('moveObj');
//Posições em array para percurso
MoveObj.attributes.add('position', {
    type: 'vec3',
    array: true,
    title: 'Position'
});

MoveObj.attributes.add('duration', {
    type: 'number', 
    title: 'Duration (Secs)',
    array: true
});

MoveObj.attributes.add('status', {
    type: 'boolean',
    array: true,
    title: 'Status'
});

MoveObj.attributes.add('wait', {
    type: 'number',
    array: true,
    title: 'Wait seconds'
});

MoveObj.attributes.add('functions', {
    type: 'string',
    array: true,
    title: 'Callback Funcion'
});

// initialize code called once per entity
MoveObj.prototype.initialize = function() {
    this.time = [];
    this.percent = [];
    
    //Grava posição inicial
    this.iniPosition = this.entity.getPosition();
    
    //Timer no zero 
    for(var i = 0 ; i<this.position.length; i++){
        this.time[i] = 0;
    }
};

// update code called every frame
MoveObj.prototype.update = function(dt) {
    
    /*Inicia animação
    if(this.status===true){
        this.time += dt; 
        
        //Resseta timer, loop eterno
        if (this.time > this.duration) {
            this.time -= this.duration;
        }    

        //Porcentagem do avanço
        var percent  = this.time / this.duration;
        
        //Posição de partida
        var position = this.original_position;
        
        //Calcula progressão da animação 
        position.lerp(this.original_position, this.final_position, percent);

        //Animação
        this.entity.setPosition(position);
        
        //Se chegar ao destino desabilita animação
        if(position===this.final_position){
           this.status = false;
           this.time = 0;
        }
    }
    
    */
    
    //Loop com todas as posições possíveis
    for(var i =0; i<this.position.length; i++){
        
        //Se foi habilitado uma animação
        if(this.status[i]===true){
            this.time[i] += dt;
            
            //Resseta timer, loop eterno
            if (this.time[i] > this.duration[i]) {
                this.time[i] -= this.duration[i];
            } 
            
            //Porcentagem do avanço
            this.percent[i]  = this.time[i] / this.duration[i];
            
            //Posição de partida
            var position = this.iniPosition;
            
            //Calcula progressão da animação 
            position.lerp(this.iniPosition, this.position[i], this.percent[i]);
            
            //Animação
            this.entity.setPosition(position);
            
            
            //Se chegar próximo ao destino desabilita animação
            ini          = new pc.Vec3();
            ini.x        = this.entity.getPosition().x;
            ini.y        = this.entity.getPosition().y;
            ini.z        = this.entity.getPosition().z;
            end          = this.position[i];
            var distance = ini.sub(end);
            d            = distance.length();
            
            
            if(d<0.018525630798971057){
                
                //Ponto inicial troca com ultimo ponto animado
                this.iniPosition = this.entity.getPosition();
                
                //Desabilita todos os percursos
                this.status[i] = false;
                
                //Reset no timer
                this.time[i] = 0;
                
                //executa callback
                if(this.functions[i]!==''){
                    this.callBack(this.functions[i],this.wait[i]);
                  
                }
            }
        }
    }
};

//Cria um percurso  preciso para animação
MoveObj.prototype.createWay = function() {
    this.time = 0;
    
};


//Executa funcções do callback
MoveObj.prototype.callBack = function(functions,timer) {
    timerExecute(function(){
        eval(functions);
    }, timer);
    
};