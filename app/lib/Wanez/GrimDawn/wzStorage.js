/**
 * Created by WareBare on 4/20/2017.
 *
 * .loadClass(String relFilePath, Object opt) - basic class loader
 * - relFilePath: relative file path, the path to database/source is not required (can start with records/ || text_en/)
 * - opt:
 *   - {Boolean} override [default: false]: should it reload the class
 *   - {String|false} parser [default: false]: `LuaFN`, `Lua`, `Tags` or false for .dbr
 *
 * .getClass(String relFilePath, String|false parser) - Most commonly used method
 *
 * .updateClass(String relFilePath, Object opt) - used to update the file and sync with changes made outside
 * - opt: fields in an Object to edit - calling cData.__setFields(opt)
 * -> method will also set the last updated time to now and reload the file before if any changes have been made to it from outside
 *
 * .watchClasses() - reload classes if changes have been made to the file
 *
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    lastCheck: new Date().getTime(),
    
    objStorage: {},
    
    addClass($relFilePath,$parser){
        let isFile = true;
        
        try{
            //console.log()
            fs.accessSync(`${libWZ.GrimDawn.tFn.getPaths().Mod}/${$relFilePath}`); // check if file exists
        }catch(err1){
            try{
                fs.accessSync(`${libWZ.GrimDawn.tFn.getPaths().Core}/${$relFilePath}`); // check if file exists
            }catch(err2){
                try{
                    fs.accessSync(`${libWZ.GrimDawn.tFn.getPaths().Source}/${$relFilePath}`); // check if file exists
                }catch(err3){
                    isFile = false;
                    log.error(`${err1}`);
                    log.error(`${err2}`);
                    log.error(`${err3}`);
                    console.log(`${err1}`);
                    console.log(`${err2}`);
                    console.log(`${err3}`);
                }
                
            }
        }
        if(isFile){
            this.objStorage[$relFilePath] = {
                time: new Date().getTime(),
                parser: ($parser) ? $parser : false,
                class: ($relFilePath) ? new libWZ.GrimDawn.cData(`/${$relFilePath}`,$parser) : false
            };
        }else{
            this.objStorage[$relFilePath] = {
                time: new Date().getTime(),
                parser: ($parser) ? $parser : false,
                class: ($relFilePath) ? false : false
            };
        }
        
        return this.objStorage[$relFilePath];
    },
    
    load($relFilePath,$opt){
        $opt = $opt || {};
        Object.assign({
            override: false,
            parser: false
        },$opt);
        //let useParser = $opt.parser;
        if(!this.objStorage[$relFilePath] || $opt.override){
            if(this.objStorage[$relFilePath] && !$opt.parser){
                $opt.parser = this.objStorage[$relFilePath].parser;
            }
            this.addClass($relFilePath,$opt.parser);
        }
        return this.objStorage[$relFilePath].class;
    },
    
    __get($relFilePath,$parser){
        $parser = $parser || false;
        let stats,loadClass = false;
        
        if(this.objStorage[$relFilePath]){
            try{
                stats = fs.statSync(this.objStorage[$relFilePath].class.getFilePath());
                if(this.objStorage[$relFilePath].time < stats.mtime.getTime()){
                    loadClass = true;
                    //console.log(`reload: ${$relFilePath}`);
                }
            }catch (err){}
        }else{
            loadClass = true;
            //console.log(`load: ${$relFilePath}`);
        }
        
        if(loadClass){ //  || this.objStorage[$relFilePath].time < stats.mtime.getTime()
            this.load($relFilePath,{override: true,parser: $parser});
            //console.log(`load: ${$relFilePath}`);
        }
        
        return this.objStorage[$relFilePath].class;
    },
    
    update($relFilePath,$opt,$dataMisc,$useDefaultFileDescription = false){
        let tempClass = this.__get($relFilePath);
    
        if($relFilePath.endsWith(`.dbr`)){
            tempClass.editDBR($opt,$useDefaultFileDescription);
            tempClass.saveDataGD($dataMisc,true);
        }else{
            tempClass.__setFields($opt);
            tempClass.saveData();
        }
        this.objStorage[$relFilePath].time = new Date().getTime() + 100;
        //console.log(`set new time: ${this.objStorage[$relFilePath].time}`);
    },
    updateDBR($relFilePath,$opt,$useDefaultFileDescription = false){
        //let tempClass = this.__get($relFilePath);
        
        this.__get($relFilePath).editDBR($opt,$useDefaultFileDescription);
        this.objStorage[$relFilePath].time = new Date().getTime() + 100;
        //console.log(`set new time: ${$relFilePath} - ${new Date().getTime()}`);
    },
    
    reload(){
    
    },
    
    watch(){
        let storage = this.objStorage;
        for(let $_RelFilePath in storage){
            //console.log(storage[$_RelFilePath].getFilePath());
            
            try{
                //console.log(storage[$_RelFilePath].class.getFilePath());
                fs.accessSync(`${storage[$_RelFilePath].class.getFilePath()}`); // check if file exists
                fs.stat(storage[$_RelFilePath].class.getFilePath(), (err,stats) => {
                    //console.log(`checking`);
                    if(storage[$_RelFilePath].time < stats.mtime.getTime()){
                        wzStorageGD.load($_RelFilePath,{override: true});
                        //console.log(`reload: ${$_RelFilePath}`);
                    }
                });
            }catch(err){
            
            }
            
        }
        
        //this.lastCheck = new Date().getTime();
    }
    
};
