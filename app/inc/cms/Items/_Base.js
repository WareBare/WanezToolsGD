/**
 * Created by WareBare on 4/20/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    _mItems: false,
    _mGear: false,
    _tagsItems: false,
    
    iniMateria: function(InPath){
        this._mItems = new WZ.GrimDawn.Items.mMateria(InPath || `records/items/materia`);
    },
    iniGear: function(InPath){
        this._mGear = new WZ.GrimDawn.Items.mGear(InPath);
    },
    
    showMateriaEdit: function($materia){
        this.currentItemId = $materia;
        
        wzWND('itemsEdit').refresh();
    },
    
    loadTags(){
    
        if(appConfig.get(`GrimDawn.Items.TagsMateria`)){
            this._tagsItems = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Items.TagsMateria`)}`,`Tags`);
        }
        
    },
    ini(){
        this.loadTags();
    },
    
    content_: function(){
        let out_ = '';
        
        out_ = '';
        
        return out_;
    },
    sidebar_: function(){
        let out_ = '';
        
        return out_;
    }
    
};
