var FadeImage = pc.createScript('fadeImage');

FadeImage.attributes.add('duration', {
    type: 'number', 
    title: 'Duration (Secs)'
});

FadeImage.attributes.add('fadeIn', {
    type: 'boolean', 
    title: 'Fade In',
    default:false
});

FadeImage.attributes.add('fadeOut', {
    type: 'boolean', 
    title: 'Fade Out',
    default:false
});

FadeImage.attributes.add('fadeloop', {
    type: 'boolean', 
    title: 'Fade loop',
    default:false
});

// initialize code called once per entity
FadeImage.prototype.initialize = function() {
    this.timeIn    = 0;
    this.timeOut   = 2;
    this.timeLoop  = 1;
};

// update code called every frame
FadeImage.prototype.update = function(dt) {
    
    if(this.fadeIn===true){
        this.fadeOut = false;
        this.timeIn  += dt;
        var alphaIn     = this.timeIn  / this.duration;
        
        this.entity.element.opacity = alphaIn;
        if(alphaIn>0.9){
           this.fadeIn = false; 
           this.timeIn = 0;
        }
    }
    
    if(this.fadeOut===true){
        this.fadeIn = false;
        this.timeOut -= dt;
        var alphaOut    = this.timeOut / this.duration;
        this.entity.element.opacity = alphaOut;
        if(alphaOut<=0){
           this.fadeOut = false;
           this.timeOut = 2;
        } 
    }
    
    if(this.fadeloop===true){
        this.timeLoop += dt;
        
        if (this.timeLoop > this.duration) {
            this.timeLoop -= this.duration;
        } 
        
        duration       = this.timeLoop / this.duration;
        var alphaLoop  = Math.abs((duration - 0.5) * 2);
        
        
        this.entity.element.opacity = alphaLoop;
       

    }
};






