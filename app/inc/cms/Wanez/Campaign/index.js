/**
 * Created by WareBare on 4/25/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    _mModule: false,
    
    saveProxies: function(){
        this._mModule.saveModuleData();
        console.log(this._mModule);
    },
    
    content_Proxy: function(){
        let out_;
        
        this._mModule = new WZ.GrimDawn.Wanez.mProxies();
        
        out_ = `Proxies have been generated, ready to save!`;
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `WanezMod Tools`;
    
        switch(this.contentType){
            case `Proxy`:
                out_ = this.content_Proxy();
                break;
            default:
                break;
        }
        
        return `${out_}`;
    },
    
    sidebarBtns_: function(){
        let saveProxy = false;
        
        if(this.contentType === `Proxy`){
            saveProxy = {
                "ONCLICK": "_cms.saveProxies()",
                "TEXT": "Save Proxies"
            };
        }
        
        return [
            saveProxy
        ];
    },
    sidebarList_: function(){
        return {
            'Proxy':[]
        }
    }
    
};
