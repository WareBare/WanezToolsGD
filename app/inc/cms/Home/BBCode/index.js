/**
 * Created by Ware on 10/23/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    tplContent: {},
    
    BasePath: `C:/Users/Ware/Desktop/MarkDown`,
    mFiles: {},
    
    FileLoader: function(){
        let out_ = `Loading...`;
        
        if(!_watcher){
            this.bIsReady = false;
            _watcher = chokidar.watch(`${this.BasePath.replace(/\\/g,`/`)}`, {
                ignored: /(^|[\/\\])\../,
                //ignored: /^[^.]+$|\.(?!(txt|md)$)([^.]+$)/,
                persistent: true,
                disableGlobbing: true,
                depth: 1
            });
            _watcher
                .on('add', (path) => {
                    //this.mFiles = this.mFiles || {};
                    if( (path.toLowerCase().endsWith(`.md`) || path.toLowerCase().endsWith(`.txt`)) && (!path.toLowerCase().includes(`text_en`)) ) this.mFiles[path.wzGetFileFromPath(this.BasePath)] = path.wzNormalizePath();
                    //console.log(`File ${path.replace(/\\/g,`/`).replace(this.BasePath, ``).replace()} has been added`);
                    //console.log(path.wzGetFileFromPath());
    
                    this.WatcherUpdate = true;
                    
                    if(this.bIsReady){
                        wzWatcherCMS();
                    }
                })
                .on('change', path => {
                    //Log(`File ${path} has been changed`);
                    
                    this.WatcherUpdate = true;
                    
                    if(this.mFiles[this.contentType] === path.wzNormalizePath()){
                        wzWatcherCMS();
                    }
                    
                })
                .on('unlink', path => {
                    //Log(`File ${path} has been removed`);
                    if(this.mFiles[path.wzGetFileFromPath(this.BasePath)]){
                        delete this.mFiles[path.wzGetFileFromPath(this.BasePath)];
                    }
                    
                    this.WatcherUpdate = true;
                    
                    if(this.bIsReady){
                        wzWatcherCMS();
                    }
                })
                .on('ready', () => {
                    //Log('Initial scan complete. Ready for changes');
                    this.bIsReady = true;
        
                    wzWatcherCMS();
                });
            
            if(appConfig.get(`GrimDawn.Paths.Mods`) && appConfig.get(`GrimDawn.Paths.Working`)){
                for(let kModId in appConfig.get(`GrimDawn.Paths.Mods`)){
                    _watcher.add([
                        `${appConfig.get(`GrimDawn.Paths.Working`)}/mods/${appConfig.get(`GrimDawn.Paths.Mods`)[kModId]}/`
                    ]);
                    //console.log(appConfig.get(`GrimDawn.Paths.Mods`)[kModId]);
                }
            }
            
            if(app.getName() === `Electron`){
                //let ElectronGrimDawnPath = `C:/Program Files (x86)/Steam/steamapps/common/Grim Dawn/mods`;
                _watcher.add([
                    //`${ElectronGrimDawnPath}/dev_Wanez_LegendaryCrafting/`
                ]);
            }
            
        }else{
            out_ = `Finished Loading!`;
        }
        
        return out_;
    },
    
    content_: function(InContentType){
        this.contentType = InContentType || this.contentType;
    
        let out_ = this.FileLoader(), md_ = ``;
        
        
        
        if(this.contentType){
            md_ = marked(fs.readFileSync(`${this.mFiles[this.contentType]}`, 'utf8'));
    
            setTimeout(() => {
                document.getElementById(`md_content`).innerHTML = md_;
            },10);
            
            out_ = `<div id="md_content" class="md">${md_}</div>`;
        }else{
        
        }
        
        
        return out_;
    },
    
    OpenFile: function(){
        child_process.exec(`"${this.mFiles[this.contentType]}"`, function(err, data) {
            if(err){
                console.error(err);
                return;
            }
        });
    },
    
    sidebarBtns_: function(){
        let OpenFileBTN = {};
        
        if(this.contentType){
            OpenFileBTN = {
                "ONCLICK": "_cms.OpenFile()",
                "TEXT": "Open File"
            };
        }
        
        return [
            OpenFileBTN
        ];
    },
    sidebarList_: function(){
        //let aFilesMD = wzIO.dir_get_contentsSync(this.BasePath);
        let mList = {};
        
        if(_watcher){
            for(let kFileName in this.mFiles){
                /*
                try{
                    fs.accessSync(this.mFiles[kFileName]);
                    
                }catch(err){
                    delete this.mFiles[kFileName];
                }
                */
                mList[kFileName] = {
                    text: kFileName.replace(`${kFileName.replace(/\/[a-zA-Z0-9_\- ]*\/[a-zA-Z0-9_\- ]*$/, ``)}/`, ``)
                };
            }
        }
        
        return mList;
    }
    
};
