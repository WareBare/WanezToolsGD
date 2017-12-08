/**
 * Created by Ware on 11/8/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    forms: {},
    
    content_: function(InContentType){
        let bShouldLoadModule = !(InContentType && this.contentType === InContentType);
        this.contentType = InContentType || this.contentType;
        
        let out_ = `Gear | ${this.contentType}`;
        
        if(this.contentType && bShouldLoadModule){
            Log(bShouldLoadModule);
            this.Base.iniGear(this.contentType);
        }
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        return [{
            "ONCLICK": "_cms.noAction();",
            "TEXT": "NoAction"
        }];
    },
    sidebarList_: function(){
        let mList = {};
    
        if(appConfig.get(`GrimDawn.Items.GearCustomPaths`)){
            let PathsData = appConfig.get(`GrimDawn.Items.GearCustomPaths`);
            for(let kPathIndex in PathsData){
                mList[PathsData[kPathIndex]] = {};
            }
        }
        
        return mList;
    }
    
};
