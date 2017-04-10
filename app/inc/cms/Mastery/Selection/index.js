/**
 * Created by WareBare on 4/10/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    _mSelection: false,
    currentButton: false,
    currentElement: false,
    moveTo: false,
    //buttonSize: [207,52],
    //windowSize: [960,554],
    
    saveCurrentData: function(){
        this._mSelection.saveModuleData([this.Base._tagsClasses,false,false]);
    },
    saveCoords: function($el,$type){
        $type = $type || false;
    
        if($type === `x`){
            this.currentElement.style.left = `${$el.value}px`;
            this._mSelection.setCoords(this.currentButton,[$el.value,false]);
        }else if($type === `y`){
            this.currentElement.style.top = `${$el.value}px`;
            this._mSelection.setCoords(this.currentButton,[false,$el.value]);
        }
    },
    moveButtonTo: function($el){
        if(!this.moveTo){
            this.moveTo = {
                X: document.getElementById(`coordX`).value,
                Y: document.getElementById(`coordY`).value
            };
            console.log(this.moveTo.X);
        }else if(!this.moveTo.Sum){
            this.moveTo.Sum = [this.moveTo.X - document.getElementById(`coordX`).value,this.moveTo.Y - document.getElementById(`coordY`).value];
            console.log(this.moveTo.Sum);
        }else{
            //console.log(parseInt(document.getElementById(`coordX`).value) + this.moveTo.Sum[0]);
            let newX = parseInt(this.moveTo.X) + this.moveTo.Sum[0],
                newY = parseInt(this.moveTo.Y) + this.moveTo.Sum[1];
            console.log(`${newX} - ${newY}`);
            $el.parentElement.style.left = `${newX}px`;
            $el.parentElement.style.top = `${newY}px`;
            this._mSelection.setCoords(this.currentButton,[newX,newY]);
            this.moveTo = false;
        }
    },
    dragAllowDrop: function(e){
        e.preventDefault();
    },
    selectButton: function($el,$id){
        this.currentButton = this._mSelection.getButtonPerId($id);
        this.currentElement = $el.parentElement;
    
        document.getElementById(`coordX`).value = parseInt(this.currentElement.style.left);
        document.getElementById(`coordY`).value = parseInt(this.currentElement.style.top);
    },
    dragButtonStart: function(e,$el,$id){
        let shadow = $el.cloneNode(true);
        e.dataTransfer.setDragImage(shadow, 0, 0);
        if($id) this.selectButton($el,$id);
        //this.currentElement = $el.parentElement;
        //e.preventDefault();
        //if($wndId) _wnd = objWND[$wndId];
        //this.startX = parseInt($el.style.left);
        //this.startY = parseInt($el.style.top);
        this.startX = (e.pageX - $el.parentElement.getBoundingClientRect().left);
        this.startY = (e.pageY - $el.parentElement.getBoundingClientRect().top);
    },
    dragButton: function(e,$el){
        this.dragButtonEnd(e,$el);
        this.dragButtonStart(e,$el);
    
        document.getElementById(`coordX`).value = parseInt($el.parentElement.style.left);
        document.getElementById(`coordY`).value = parseInt($el.parentElement.style.top);
    },
    dragButtonEnd: function(e,$el){
        let mouseX = (e.pageX - $el.parentElement.getBoundingClientRect().left) - this.startX,
            newX = parseInt($el.parentElement.style.left) + mouseX,
            mouseY = (e.pageY - $el.parentElement.getBoundingClientRect().top) - this.startY,
            newY = parseInt($el.parentElement.style.top) + mouseY;
        //console.log(`${this.startX} => ${parseInt($el.parentElement.style.left) + mouseX}px - ${parseInt($el.parentElement.style.top) + mouseY}px`);
        //console.log(`${parseInt($el.style.left.replace(`px`,``)) + mouseX} - ${mouseY}`);
        //console.log($el.parentElement.getBoundingClientRect().left);
        //_wnd.move(`${parseInt(_wnd.wnd.style.left) + mouseX}px`,`${parseInt(_wnd.wnd.style.top) + mouseY}px`);
        $el.parentElement.style.top = `${newY}px`;
        $el.parentElement.style.left = `${newX}px`;
        document.getElementById(`coordX`).value = newX;
        document.getElementById(`coordY`).value = newY;
        
        //console.log($el.parentElement.id.split(`_`)[1]);
        //console.log(this.currentButton);
        this._mSelection.setCoords(this.currentButton,[newX,newY]);
        /*
        this.currentButton.Button.editDBR({
            bitmapPositionY: `${newY}`,
            bitmapPositionX:`${newX}`
        });
        this.currentButton.Text.editDBR({
            bitmapPositionY: `${newY}`,
            bitmapPositionX: `${newX}`
        });
        */
        //this.currentButton.Text.__setField();
    },
    
    loadSelectionModule(){
        this._mSelection = new WZ.GrimDawn.Mastery.mSelection(this.Base._tagsClasses);
    },
    
    content_UI: function(){
        let out_,tempSelection;
        
        if(!this._mSelection) this.loadSelectionModule();
        tempSelection = this._mSelection;
        //this._mSelection = tempSelection;
        out_ = `${tempSelection.genOutput()}`;
    
        setTimeout(() => {
            tempSelection.placeButtons();
        },10);
        
        
        return out_;
    },
    conent_Setup: function(){
        let out_ = `Coming Soon`;
        
        return out_;
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Work In Progress - currently only skills from the skill tree are possible to be edited, more in the future (such as generating new skills)`;
        
        if(this.contentType){
            if(this.contentType === `Setup [ip]`){
                out_ = this.conent_Setup();
            }else if(this.contentType === `UI`){
                out_ = this.content_UI();
            }
        }
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [
            {
                "ONCLICK": "_cms.saveCurrentData()",
                "TEXT": "Save Selection"
            }
        ];
    },
    sidebarList_: function(){
        return {
            'Setup [ip]':[],
            'UI': []
        }
    }
    
};
