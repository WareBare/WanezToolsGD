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
    
    _mMateria: false,
    _tagsMateria: false,
    
    iniMateria: function(){
        this._mMateria = new WZ.GrimDawn.Items.mMateria(`records/items/materia`);
    },
    
    showMateriaEdit: function($materia){
        this.currentMateria = $materia;
        
        wzWND('materiaEdit').refresh();
    },
    
    loadTags(){
    
        if(appConfig.get(`GrimDawn.Items.TagsMateria`)){
            this._tagsMateria = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Items.TagsMateria`)}`,`Tags`);
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
