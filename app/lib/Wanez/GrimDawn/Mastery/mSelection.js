/**
 * Created by WareBare on 4/10/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class mSelection extends libWZ.GrimDawn.cModule{
    
    constructor($tags){
        super();
        
        this.iTagsClass = $tags;
        
        this.aFiles = {};
        this.aButtons = [];
        this.backgroundImage = ``;
        this.tpl = {
            Frame: `{FIELDS}<div id="appGD_Selection" ondragover="_cms.dragAllowDrop(event);">{WINDOW}</div>`,
            Fields: `X: <input id="coordX" type="number" wzType="Number" onchange="_cms.saveCoords(this,'x');"> Y: <input id="coordY" type="number" onchange="_cms.saveCoords(this,'y');">`
        };
        
        this.iniSelection();
    
        this.aModuleData = this.aButtons;
    }
    
    iniSelection(){
        let tempClass,tempClass2,tempImg,aButtons,aText,tempPath;
    
        tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/records/ui/skills/skills_mastertable.dbr`);
        this.aFiles.skillsMasterTable = tempClass;
        tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${tempClass.__getField(`masterySelectWindow`)}`);
        this.aFiles.masterySelectWindow = tempClass;
    
        aButtons = tempClass.__getField(`masteryMasteryButtons`);
        aText = tempClass.__getField(`masteryMasteryText`);
        for(let $_Index in aButtons){
            if(aButtons[$_Index].includes(`.dbr`)){
                this.aButtons[$_Index] = this.aButtons[$_Index] || {};
                try{
                    // BTN \\
                    tempPath = `${this.fn.getPaths().Mod}/${aButtons[$_Index]}`;
                    //fs.accessSync(tempPath, fs.F_OK);
                    tempClass2 = new libWZ.GrimDawn.cData(`${tempPath}`);
                    this.aButtons[$_Index].Button = tempClass2;
                    this.aButtons[$_Index].Image = new libWZ.GrimDawn.cImageLoader(`${tempClass2.__getField(`bitmapNameUp`)}`,{
                        id: `selectionButtonImg_${$_Index}`,
                        default: `img/skills_buttonclassselectionup01.png`
                    }).load();
                    
                    // TEXT \\
                    tempPath = `${this.fn.getPaths().Mod}/${aText[$_Index]}`;
                    //fs.accessSync(tempPath, fs.F_OK);
                    tempClass2 = new libWZ.GrimDawn.cData(`${tempPath}`);
                    this.aButtons[$_Index].Text = tempClass2;
                    this.aButtons[$_Index].Name = this.iTagsClass.__getField(tempClass2.__getField(`textTag`)) || tempClass2.__getField(`textTag`);
                    
                    this.aButtons[$_Index].Output = `<div id="selectionButton_${$_Index}" class="selectionBtn">${this.aButtons[$_Index].Image}<span draggable="true" ondrag="_cms.dragButton(event,this);" ondragstart="_cms.dragButtonStart(event,this,${$_Index});" ondragend="_cms.dragButtonEnd(event,this);" onclick="_cms.selectButton(this,${$_Index});" ondblclick="_cms.moveButtonTo(this,${$_Index});">${this.aButtons[$_Index].Name}</span></div>`;
                    //console.log(this.aButtons[$_Index].Output);
                }catch(err){
                    console.log(err);
                }
            }
            
        }
        //this.aButtons
        
        // get Background Image \\
        tempClass = new libWZ.GrimDawn.cData(`${this.fn.getPaths().Mod}/${tempClass.__getField(`masteryBaseBitmap`)}`);
        tempImg = new libWZ.GrimDawn.cImageLoader(`${tempClass.__getField(`bitmapName`)}`,{
            id: `selectionBackground`,
            default: `img/skills_classselectionbackgroundimage.png`
        });
        this.backgroundImage = tempImg.load();
        
    }
    
    setCoords($_button,$aCoords){
        $_button.Button.editDBR({
            bitmapPositionY: $aCoords[1] || $_button.Button.__getField(`bitmapPositionY`),
            bitmapPositionX: $aCoords[0] || $_button.Button.__getField(`bitmapPositionX`)
        });
        $_button.Text.editDBR({
            textBoxY: $aCoords[1] || $_button.Text.__getField(`textBoxY`),
            textBoxX: $aCoords[0] || $_button.Text.__getField(`textBoxX`)
        });
    }
    
    genOutput(){
        let out_,btn_ = ``,fields_=``;
        
        for(let $_Index in this.aButtons){
            btn_ += this.aButtons[$_Index].Output;
        }
        fields_ = this.tpl.Fields.wzOut({});
        
        out_ = this.tpl.Frame.wzOut({
            WINDOW: `${this.backgroundImage}${btn_}`,
            FIELDS: `${fields_}`
        });
        
        return out_;
    }
    getButtonPerId($id){
        return this.aButtons[$id] || false;
    }
    
    placeButtons(){
        //console.log(`${document.getElementById(`selectionBackground`).naturalHeight} - ${document.getElementById(`selectionBackground`).naturalWidth}`);
    
        
        document.getElementById(`appGD_Selection`).style.height = `${document.getElementById(`selectionBackground`).naturalHeight}px`;
        document.getElementById(`appGD_Selection`).style.width = `${document.getElementById(`selectionBackground`).naturalWidth}px`;
        
        for(let $_Index in this.aButtons){
            try{
                document.getElementById(`selectionButton_${$_Index}`).style.left = `${this.aButtons[$_Index].Button.__getField(`bitmapPositionX`)}px`;
                document.getElementById(`selectionButton_${$_Index}`).style.top = `${this.aButtons[$_Index].Button.__getField(`bitmapPositionY`)}px`;
            }catch(err){
                console.log(err);
            }
        }
    }
    
};
