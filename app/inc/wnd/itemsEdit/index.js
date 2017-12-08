/**
 * Created by WareBare on 4/27/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    contentType: `Config`,
    title: `Edit Materia`,
    wndId: `itemsEdit`,
    Settings: {
        height: `1000px`,
        width: `750px`,
    },
    
    skillConfig: new eConfig({name: `gd-skills`}),
    
    _mItems: false,
    _tagsItems: false,
    
    nav_: function(){
        this._mItems = _cms.Base._mItems;
        this.currentItemId = _cms.Base.currentItemId;
        this._tagsItems = _cms.Base._tagsItems;
        
        //this._tagsSkills = wzStorageGD.__get(`text_en/${appConfig.get(`GrimDawn.Mastery.TagsSkills`)}`,`Tags`);
        
        return [
            `Config`,
            `Tags`,
            `Qualifiers`,
            `Properties`
        ];
    }
    
};
