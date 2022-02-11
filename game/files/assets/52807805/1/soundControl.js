var SoundControl = pc.createScript('soundControl');

SoundControl.attributes.add('soundStatus',{
    type:'boolean',
    title:'Status'
});

SoundControl.attributes.add('imgOn',{
    type:'asset',
    title:'On texture'
});


SoundControl.attributes.add('imgOff',{
    type:'asset',
    title:'Off exture'
});

// initialize code called once per entity
SoundControl.prototype.initialize = function() {
   this.entity.element.on('mousedown', this.onPress, this);
   this.entity.element.on('mouseenter', this.onEnter, this);
   this.entity.element.on('mouseleave', this.onOut, this);
    this.entity.element.on('touchstart', this.onPress, this);
};

// update code called every frame
SoundControl.prototype.update = function(dt) {
    
};

SoundControl.prototype.onPress = function() {
    if(this.soundStatus){
            this.app.systems.sound.volume = 0;
            this.soundStatus = false;
            this.entity.element.textureAsset = this.imgOff;
        }else{
            this.app.systems.sound.volume = 10;
            this.soundStatus = true;
            this.entity.element.textureAsset = this.imgOn;
        }
};


SoundControl.prototype.onEnter = function() {
    document.body.style.cursor = 'pointer';
    
};

SoundControl.prototype.onOut = function() {
    document.body.style.cursor = 'default';
    
};


