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
    
    _mModule: false,
    
    saveEventsData: function(){
        this._mModule.saveModuleData([this.Base._tagsEvents, false, false]);
        console.log(this._mModule);
        Log(this.Base._tagsEvents);
        this.Base._tagsEvents.saveData();
    },
    
    saveMasteryData: function(){
        this._mModule.saveModuleData([this.Base._tagsMastery, false, false]);
        console.log(this._mModule);
        Log(this.Base._tagsMastery);
        this.Base._tagsMastery.saveData();
    },
    
    Content_PhasingBeasts(){
        let out_;
    
        this._mModule = new WZ.GrimDawn.Wanez.mPhasingBeasts(this.Base._tagsEvents);
        
        out_ = `Phasing Beasts have been generated, ready to save!`;
    
        return out_;
    },
    Content_Mastery(){
        let out_;
    
        this._mModule = new WZ.GrimDawn.Wanez.mMastery(this.Base._tagsMastery);
    
        out_ = `Mastery Passives, Converters and Modifiers have been generated, ready to save!`;
    
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `WanezMod Tools - Events Tools`;
    
        switch(this.contentType){
            case `Phasing Beasts`:
                out_ = this.Content_PhasingBeasts();
                break;
            case `Mastery`:
                out_ = this.Content_Mastery();
                break;
            default:
                break;
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        let saveEventsDataBTN = {};
        
        if(this.contentType === `Mastery`){
            saveEventsDataBTN = {
                "ONCLICK": "_cms.saveMasteryData()",
                "TEXT": "Save"
            };
        }else if(this.contentType){
            saveEventsDataBTN = {
                "ONCLICK": "_cms.saveEventsData()",
                "TEXT": "Save"
            };
        }
        
        return [
            saveEventsDataBTN, {
                "ONCLICK": "_cms.Base.saveGearBlacksmith()",
                "TEXT": "Save BS Lvl"
            }
        ];
    },
    sidebarList_: function(){
        return {
            'Phasing Beasts':[],
            'Mastery': []
        }
    }
    
};
