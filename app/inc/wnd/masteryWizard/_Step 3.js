/**
 * Created by WareBare on 4/14/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    forms: {},
    
    validation: function(){
        let isValid = false;
        if(this.validSteps.Step01){
            isValid = true;
        }
        
        return isValid;
    },
    
    content_: function(){
        let out_;
        
        out_ = `<span class="formBTN" onclick="wzWND('${this.wndId}').__getContent().create();">Create</span>`;
        
        return out_;
    }
    
};
