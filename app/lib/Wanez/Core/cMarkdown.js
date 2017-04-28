/**
 * Created by WareBare on 4/28/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cMarkdown extends libWZ.Core.cBase{
    
    constructor($markdown){
        super();
        
        this.iMarkdown = $markdown;
        this.iSettings = {
            h1: {},
            h2: {},
            h3: {},
            h4: {}
        };
        
        this.objMarkdown = {};
        
        this.html = ``;
        this.bbcode = ``;
        
        this.iniMarkdown();
        
    }
    
    iniMarkdown(){
        let aData = this.iMarkdown.split(`\n`),
            tempList,out,newList = true,newSubList = true;
        
        //console.log(aData);
        this.html = ``;
        this.bbcode = ``;
        
        for(let $_Index in aData){
            if(this.bbcode !== ``) this.bbcode += `\n`;
            out = aData[$_Index];
            if(out.startsWith(`# `)){
                out = out.replace(/^# /g,``).replace(/ #$/g,``);
                this.html += `<h1 style="${(this.iSettings.h1.color) ? `color:${this.iSettings.h1.color}"];` : ``}${(this.iSettings.h1.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h1.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h1.italic) ? `font-style:italic;` : ``}">${out}</h1>`;
                this.bbcode += `[SIZE="7"]${(this.iSettings.h1.color) ? `[COLOR="${this.iSettings.h1.color}"]` : ``}${(this.iSettings.h1.underline) ? `[U]` : ``}${(this.iSettings.h1.bold) ? `[B]` : ``}${(this.iSettings.h1.italic) ? `[I]` : ``}${out}${(this.iSettings.h1.italic) ? `[/I]` : ``}${(this.iSettings.h1.bold) ? `[/B]` : ``}${(this.iSettings.h1.underline) ? `[/U]` : ``}${(this.iSettings.h1.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`## `)){
                out = out.replace(/^## /g,``).replace(/ ##$/g,``);
                this.html += `<h2 style="${(this.iSettings.h2.color) ? `color:${this.iSettings.h2.color}"];` : ``}${(this.iSettings.h2.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h2.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h2.italic) ? `font-style:italic;` : ``}">${out}</h2>`;
                this.bbcode += `[SIZE="6"]${(this.iSettings.h2.color) ? `[COLOR="${this.iSettings.h2.color}"]` : ``}${(this.iSettings.h2.underline) ? `[U]` : ``}${(this.iSettings.h2.bold) ? `[B]` : ``}${(this.iSettings.h2.italic) ? `[I]` : ``}${out}${(this.iSettings.h2.italic) ? `[/I]` : ``}${(this.iSettings.h2.bold) ? `[/B]` : ``}${(this.iSettings.h2.underline) ? `[/U]` : ``}${(this.iSettings.h2.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`### `)){
                out = out.replace(/^### /g,``).replace(/ ###$/g,``);
                this.html += `<h3 style="${(this.iSettings.h3.color) ? `color:${this.iSettings.h3.color}"];` : ``}${(this.iSettings.h3.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h3.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h3.italic) ? `font-style:italic;` : ``}">${out}</h3>`;
                this.bbcode += `[SIZE="5"]${(this.iSettings.h3.color) ? `[COLOR="${this.iSettings.h3.color}"]` : ``}${(this.iSettings.h3.underline) ? `[U]` : ``}${(this.iSettings.h3.bold) ? `[B]` : ``}${(this.iSettings.h3.italic) ? `[I]` : ``}${out}${(this.iSettings.h3.italic) ? `[/I]` : ``}${(this.iSettings.h3.bold) ? `[/B]` : ``}${(this.iSettings.h3.underline) ? `[/U]` : ``}${(this.iSettings.h3.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`#### `)){
                out = out.replace(/^#### /g,``).replace(/ ####$/g,``);
                this.html += `<h3 style="${(this.iSettings.h4.color) ? `color:${this.iSettings.h4.color}"];` : ``}${(this.iSettings.h4.underline) ? `text-decoration:underline;` : ``}${(this.iSettings.h4.bold) ? `font-weight:bold;` : ``}${(this.iSettings.h4.italic) ? `font-style:italic;` : ``}">${out}</h3>`;
                this.bbcode += `[SIZE="4"]${(this.iSettings.h4.color) ? `[COLOR="${this.iSettings.h4.color}"]` : ``}${(this.iSettings.h4.underline) ? `[U]` : ``}${(this.iSettings.h4.bold) ? `[B]` : ``}${(this.iSettings.h4.italic) ? `[I]` : ``}${out}${(this.iSettings.h4.italic) ? `[/I]` : ``}${(this.iSettings.h4.bold) ? `[/B]` : ``}${(this.iSettings.h4.underline) ? `[/U]` : ``}${(this.iSettings.h4.color) ? `[/COLOR]` : ``}[/SIZE]`;
            }else if(out.startsWith(`* `)){
                if(!newSubList) {
                    newSubList = true;
                    this.html += `</ul>`;
                    this.bbcode += `[/LIST]\n`;
                }
                if(newList) {
                    this.html += `<ul>`;
                    this.bbcode += `[LIST]\n`;
                    newList = false;
                }
                out = out.replace(/^\* /g,``);
                this.html += `<li>${out}</li>`;
                this.bbcode += `[*]${out}`;
            }else if(out.startsWith(`  * `) || out.startsWith(` * `)){
                if(newSubList) {
                    newSubList = false;
                    this.html += `<ul>`;
                    this.bbcode += `[LIST]\n`;
                }
                //out = out.replace(/\s/g, '');
                out = out.replace(/^ +\* /g,``);
                this.html += `<li>${out}</li>`;
                this.bbcode += `[*]${out}`;
            }else if(out === ``){
                if(!newSubList) {
                    newSubList = true;
                    this.html += `</ul>`;
                    this.bbcode += `[/LIST]\n`;
                }
                if(!newList) {
                    this.html += `</ul>`;
                    this.bbcode += `[/LIST]`;
                    newList = true;
                }
                this.html += `<br />`;
                this.bbcode += `\n`;
            }else{
                this.html += `${out}`;
                this.bbcode += `${out}`;
            }
        }
        if(!newList) {
            this.html += `</ul>`;
            this.bbcode += `\n[/LIST]`;
            newList = true;
        }
        
        //console.log(this.bbcode);
    }
    
    updateMarkdown($markdown,$settings){
        if($markdown) this.iMarkdown = $markdown;
        if($settings) this.iSettings = $settings;
    
        this.iniMarkdown();
    }
    
    getHtml(){
    
    }
    
    getBBCode(){
    
    }
    
};