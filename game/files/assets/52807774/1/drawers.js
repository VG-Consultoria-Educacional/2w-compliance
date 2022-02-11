var Drawers = pc.createScript('drawers');

Drawers.attributes.add('drawers',{
    type:'asset',
    title:'Sprite',
    array:true,
    assetType: 'texture'
});

// initialize code called once per entity
Drawers.prototype.initialize = function() {
     
};

// update code called every frame
Drawers.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Drawers.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/