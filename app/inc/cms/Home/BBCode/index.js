/**
 * Created by WareBare on 4/28/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    Forms:{},
    tplContent: {},
    
    html: `# Header 1 #
with some text,

## Header 2 ##
* with a list
* changes
 * are
 * saved
 * to clipboard
* end
 * of demo


### Header 3 ###

#### Header 4 ####`,
    _md: false,
    mdSettings: {
        h1: {
        
        },
        h2: {
            //underline: true,
            //color: `silver`
        },
        h3: {
            //underline: true,
            //color: `green`
        },
        h4: {
            //underline: true,
            //color: `green`
        }
    },
    
    changeColor: function($newColor, $type){
        //console.log($type);
        this.mdSettings[$type].color = $newColor;
    
        this._md.updateMarkdown(false,this.mdSettings);
        this.refreshContents();
    },
    changeStyle: function($newStyle, $type){
        //console.log($type);
        this.mdSettings[$type][$newStyle] = !this.mdSettings[$type][$newStyle];
        
        this._md.updateMarkdown(false,this.mdSettings);
        this.refreshContents();
    },
    
    refreshContents: function(){
        let elOutput = document.getElementById(`mdHTML`);
    
        elOutput.innerHTML = this._md.html;
        clipboard.writeText(this._md.bbcode, 'bbcode');
        
    },
    
    parseMd: function(e,$el){
        if(e.ctrlKey || e.ctrlKey && e.keycode === `67` || e.ctrlKey && e.keycode === `86` || e.ctrlKey && e.keycode === `65`){
            //  && e.keycode === `67`
        }else{
            //let _md = new WZ.Core.cMarkdown($el.value);
            this._md.updateMarkdown($el.value,this.mdSettings);
    
            //this.html = this._md.html;
    
            //wzCMS(appConfig.get('cms'));
            this.refreshContents();
        }
    
    },
    
    content_: function($contentType){
        this.contentType = $contentType || this.contentType;
        
        let out_ = `Markdown to BBCode converter`,
            basicColor = ``,
            basicStyle = ``,
            aOptions = [`black`,`sienna`,`darkolivegreen`,`darkgreen`,`darkslateblue`,`navy`,`indigo`,`darkslategray`,`darkred`,`darkorange`,`olive`,`green`,`teal`,`blue`,`slategray`,`dimgray`,`red`,`sandybrown`,`yellowgreen`,`seagreen`,`mediumturquoise`,`royalblue`,`purple`,`gray`,`magenta`,`orange`,`yellow`,`lime`,`cyan`,`deepskyblue`,`darkorchid`,`silver`,`pink`,`wheat`,`lemonchiffon`,`palegreen`,`paleturquoise`,`lightblue`,`plum`,`white`];
    
        this._md = new WZ.Core.cMarkdown(this.html);
    
        for(let $_Index in aOptions){
            basicColor += `<span style="background-color:${aOptions[$_Index]};" onClick="_cms.changeColor('${aOptions[$_Index]}','{TYPE}')"></span>`;
        }
        basicStyle += `<span style="text-decoration: underline;" onClick="_cms.changeStyle('underline','{TYPE}')">U</span>`;
        basicStyle += `<span style="font-weight: bold;" onClick="_cms.changeStyle('bold','{TYPE}')">B</span>`;
        basicStyle += `<span style="font-style: italic;" onClick="_cms.changeStyle('italic','{TYPE}')">I</span>`;
        
        out_ += `<div>Header 1: ${basicStyle.replace(/\{TYPE\}/g,`h1`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h1`)}</div></div>`;
        out_ += `<div>Header 2: ${basicStyle.replace(/\{TYPE\}/g,`h2`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h2`)}</div></div>`;
        out_ += `<div>Header 3: ${basicStyle.replace(/\{TYPE\}/g,`h3`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h3`)}</div></div>`;
        out_ += `<div>Header 4: ${basicStyle.replace(/\{TYPE\}/g,`h4`)} <div class="colorPicker">${basicColor.replace(/\{TYPE\}/g,`h4`)}</div></div>`;
        out_ += `<div id="mdInput"><textarea rows="20" onChange="_cms.parseMd(event,this);" onkeydown="_cms.parseMd(event,this);">${this._md.iMarkdown}</textarea></div>`; //
        out_ += `<div id="mdHTML" class="md">${this._md.html}</div>`;
        
        clipboard.writeText(this._md.bbcode, 'bbcode');
        
        return out_;
    },
    
    sidebarBtns_: function(){
        return [];
    },
    sidebarList_: function(){
        return {}
    }
    
};
