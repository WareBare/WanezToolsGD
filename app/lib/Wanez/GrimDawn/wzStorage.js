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
        this.objStorage[$relFilePath] = {
            time: new Date().getTime(),
            parser: ($parser) ? $parser : false,
            class: new libWZ.GrimDawn.cData(`/${$relFilePath}`,$parser)
        };
        
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
                }
            }catch (err){}
        }else{
            loadClass = true;
        }
        
        if(loadClass){ //  || this.objStorage[$relFilePath].time < stats.mtime.getTime()
            this.load($relFilePath,{override: true,parser: $parser});
            console.log(`reload: ${$relFilePath}`);
        }
        
        return this.objStorage[$relFilePath].class;
    },
    
    update($relFilePath,$opt){
        let tempClass = this.__get($relFilePath);
    
        tempClass.class.__setFields($opt);
        tempClass.time = new Date().getTime();
        console.log(`set new time: ${$_RelFilePath}`);
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
                    console.log(`checking`);
                    if(storage[$_RelFilePath].time < stats.mtime.getTime()){
                        wzStorageGD.load($_RelFilePath,{override: true});
                        console.log(`reload: ${$_RelFilePath}`);
                    }
                });
            }catch(err){
            
            }
            
        }
        
        //this.lastCheck = new Date().getTime();
    }
    
};
