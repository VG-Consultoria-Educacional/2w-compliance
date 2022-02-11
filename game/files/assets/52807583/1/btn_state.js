// Controle de imagens nos botões
// Roger William VG UPGRADE
// 12/01/2021

var BtnState = pc.createScript('btnState');
BtnState.attributes.add('normal',{
    type:'asset',
    assetType:'texture',
    title:'Normal'
});
BtnState.attributes.add('hover',{
    type:'asset',
    assetType:'texture',
    title:'Hover'
});
BtnState.attributes.add('click',{
    type:'asset',
    assetType:'texture',
    title:'Click'
});
BtnState.attributes.add('clicked',{
    type:'asset',
    assetType:'texture',
    title:'Clicked'
});
BtnState.attributes.add('status',{
    type:'boolean',
    default: false,
    title:'Status'
});

BtnState.attributes.add('btn',{
    type:'entity',
    title:'Button'
});

BtnState.attributes.add('textBtn',{
    type:'entity',
    title:'Text'
});


BtnState.attributes.add('oneClick',{
    type:'boolean',
    title:'One click'
});


//Ao Inicializar-------------------------------------------------------------
BtnState.prototype.initialize = function() {
    // Adiciona eventos
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);

    // touch 
    this.entity.element.on('touchstart', this.onPress, this);
    this.entity.element.on('touchend', this.onRelease, this);
    
    if(this.status===true){
        this.onPress();
    }
    
};

//Ao passar o mouse----------------------------------------------------------
BtnState.prototype.onEnter = function (event) { 
    
    //eleciona audio
    var audio_btn = pc.app.root.findByName('audio_btn'); 
            
    if(this.oneClick===true){
        if(this.status===false){
            
            //Audio
            audio_btn.sound.play('mouse_hover');
            
            this.btn.element.textureAsset = this.hover;
            document.body.style.cursor = 'pointer';
        }
    }else{
        document.body.style.cursor = 'pointer';
        this.btn.element.textureAsset = this.hover;
        
        //Audio
        audio_btn.sound.play('mouse_hover');
    }
};

//Ao sair o mouse------------------------------------------------------------
BtnState.prototype.onLeave = function (event) {
    if(this.status===false){
        this.btn.element.textureAsset = this.normal;
    }else{
        //this.btn.element.textureAsset = this.clicked;
    }
    
    document.body.style.cursor = 'default';
};

//Ao clicar ou tocar--------------------------------------------------------
BtnState.prototype.onPress = function (event) {
    var audio_btn_click = pc.app.root.findByName('audio_btn_click');
    
    //Se for apenas um click
    if(this.oneClick===true){
        this.btn.element.textureAsset = this.clicked;
        this.status                   = true;
        this.textBtn.element.opacity = 0.2;
        
        //Audio
        audio_btn_click.sound.play("mouse_click"); 
    }else{
        this.btn.element.textureAsset = this.click;
        if(this.status===false){
            this.status = true;
            
            //Audio
            audio_btn_click.sound.play("mouse_click");
        }else{
            this.status = false;
        }
    }
};

