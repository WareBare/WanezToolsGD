/**
 * Created by WareBare on 10/31/2016.
 *
 * checks if file exists
 * if it doesn't it will change mod path to core path
 * and use mod path to save the file
 * => files that don't exist will use their extracted core files and are created inside the mod directory
 *
 */

module.exports = class cData extends libWZ.Core.cData{
    
    constructor($filePath,$parser,$ini,$aData = false){
        let changePath = false,temp,
            path = ``;
    
        switch($parser){
            case `LuaFN`:
                $parser = new libWZ.GrimDawn.Parser.cLuaFN();
                break;
            case `Lua`:
                temp = $filePath.replace(`.lua`,``).replace(`scripts/`,``).replace(/\//g,`.`).replace(/\\/g,`.`).replace(/^\./,``);
                //console.log(temp);
                $parser = new libWZ.GrimDawn.Parser.cLua(temp);
                break;
            case `Tags`:
                $parser = new libWZ.GrimDawn.Parser.cTags();
                break;
            default:
                //$parser = (typeof $parser === `string`) ? false : $parser;
                break;
        }
        
        $filePath = $filePath || ``;
        if($filePath.startsWith(`/`)){
            $filePath = (!$parser) ? `${libWZ.GrimDawn.tFn.getPaths().Mod}${$filePath}` : `${libWZ.GrimDawn.tFn.getPaths().Source}${$filePath}`;
        }
        
        $parser = $parser || new libWZ.GrimDawn.Parser.cDBR();
        
        try{
            fs.accessSync(`${$filePath}`); // check if file exists
        }catch(err){
            changePath = $filePath;
            //console.log(err);
            // if mod file does not exist, change mod path to core path
            $filePath = $filePath.replace(`${libWZ.GrimDawn.tFn.getPaths().Mod}`,`${libWZ.GrimDawn.tFn.getPaths().Core}`);
        }
        
        super($filePath,$parser,$aData);
        
        this.aTags = {};
        this.aLua = {};
        this.aLuaFN = {};
        this.aDataMisc = false;

        $ini = $ini || false;
        if($ini) this.editDBR($ini);

        //this._dataGD = _wzData.GrimDawn;
        //this._propertiesGD = this._dataGD.Properties;

        //this.pathDatabase = `${wzGD_dataSet.PathsDS.Mod.Home}/database`;
        //this.pathSource = `${wzGD_dataSet.PathsDS.Mod.Home}/source`;
        this.fn = libWZ.GrimDawn.tFn;
        //this._TemplateGD = this.fetchTemplate();
        if(changePath) this.changeFilePath(changePath);
    }
    
    changeFilePath($newFilePath){
        if($newFilePath.startsWith(`/`)) $newFilePath = `${libWZ.GrimDawn.tFn.getPaths().Mod}${$newFilePath}`;
        this.filepath = $newFilePath;
    }
    
    getTemplate(){
        return this.aData.templateName;
    }
    
    fetchTemplate($template){
        //console.log();
        this.editDBR(wzTemplates.__getDBR($template));
    }
    /*
    fetchTemplate(){
        return wzGD_tpl.getDataPath(this.getTemplate());
    }
    */
    reparseData(){
        let tpl = this.fetchTemplate().getData();
        
        
        for( let $_Index in tpl ){
            if(typeof this.aData[tpl[$_Index].name] === "undefined") {
                this.aData[tpl[$_Index].name] = tpl[$_Index].defaultValue;
            }
        }
    }
    
    getFileDescription(){
        return this.aData.FileDescription || this.filepath.replace(/^.*[\\\/]/, '').replace(/\.dbr/,'');
    }
    
    getFieldsTPL($ignoreGRP){
        let newData = [],ignoreGRP = {};
        
        for( let $_Index in $ignoreGRP ){
            ignoreGRP[$ignoreGRP[$_Index]] = true;
        }
        
        for( let $_Index in this.getData() ){
            if(ignoreGRP[this.getData()[$_Index].group]){
                
            }else{
                newData.push(this.getData()[$_Index]);
            }
            
        }
        
        return newData;
    }
    
    /**
     *
     * @param {Array | Boolean} $dataMisc [TAGS,LUA,LUA_FN] - cData (cTags||cLua||cLuaFN Parser)
     * @param {Boolean} $saveDBR - save dbr or not
     */
    saveDataGD($dataMisc,$saveDBR){
        $dataMisc = $dataMisc || false;
        
        // prepare tags,lua,luaFN for saving (outside this class)
        if($dataMisc){
            let tempArray = this.aDataMisc || [this.aTags,this.aLua,this.aLuaFN];
            for( let $_Index in tempArray ){
                if(tempArray[$_Index]){
                    for( let $_fieldName in tempArray[$_Index] ){
                        if($dataMisc[$_Index]){
                            $dataMisc[$_Index].editData($_fieldName,tempArray[$_Index][$_fieldName]);
                        }
                    }
                }
            }
        }
        
        // save the classes aData obj into the correct file using the inherited fn from cData
        if($saveDBR) this.saveData();
    }
    
    /**
     * should only save if any changes have been made to the .dbr
     * @param {Array} $dataMisc
     * @param {Boolean} $alwaysSave
     *
     */
    saveDBR($dataMisc,$alwaysSave = false){
        $dataMisc = $dataMisc || false;
        
        // remove empty fields (to reduce filesize)
        for(let $_Key in this.aData){
            if(this.aData[$_Key] == ''){
                delete this.aData[$_Key];
            }
        }
        
        let saveDBR = false;
        // check if any changes have been made to the item \\
        // open file
        if(!this.prevFile){
            try{
                fs.accessSync(`${this.filepath}`); // check if file exists
                this.prevFile = new libWZ.GrimDawn.cData(this.filepath);
            }catch(err){
                this.prevFile = false;
            }
        }else{
            this.prevFile.reload();
        }
    
        try{
            this.prevFile.editDBR({"FileDescription":this.getData().FileDescription});
            if(this.cParser.stringifyData(this.getData()) !== this.cParser.stringifyData(this.prevFile.getData())){
                saveDBR = true;
            }
        }catch(err){ // if it fails there is no such file = save the file
            saveDBR = true;
        }
        
        this.saveDataGD($dataMisc,$alwaysSave || saveDBR);
    }
    
    getScalableFields(){
        let retValue,ignoreFields = {
            skillConnectionOff: true,
            skillConnectionOn: true,
            spawnObjects: true,
            charFxPakOtherNames: true,
            ragDollDirection: true,
            ragDollEffect: true,
            ragDollElevation: true,
            ragDollPush: true,
            conversionInType: true,
            conversionOutType: true,
            charBuffFxType: true,
            skillProjectileName: true,
            targetingMode: true,
            fxChanges: true
        };
        
        retValue = {};
        for(let $_FieldName in this.aData){
            if(Array.isArray( this.aData[$_FieldName] ) && !ignoreFields[$_FieldName] && !$_FieldName.startsWith(`toolMath`)){
                retValue[$_FieldName] = this.aData[$_FieldName];
            }
        }
        return retValue;
    }
    
    /**
     *
     * @param {Array} $dataMisc
     * @param {object} $opt
     * @param {Boolean} $useDefaultFileDescription
     */
    updateDBR($dataMisc,$opt,$useDefaultFileDescription = true){
        this.editDBR($opt,$useDefaultFileDescription);
        
        this.saveDBR($dataMisc,true);
    }
    
    editTagFields($name,$desc){
        $name = $name || false;
        $desc = $desc || false;
        
        if($name){
            this.editData('description',$name);
        }
        if($desc){
            this.editData('itemText',$desc);
        }
    }
    
    /**
     *
     * @param {string} $field
     */
    getFieldDBR($field){
        return this.getData()[$field];
    }
    
    /**
     *
     * @param {Object} $opt - data to change {field: `value`}
     * @param {Boolean} $useDefaultFileDescription [default: false]
     *
     */
    editDBR($opt,$useDefaultFileDescription = false){
        if($useDefaultFileDescription){
            $opt = $opt || {
                    "FileDescription": this.getData().FileDescription
                };
        }else{
            $opt = wzSetArDef($opt,{
                "FileDescription": "Updated with WanezToolsGD - "+(moment().format("DD/MM/YYYY hh:mm a"))
            });
        }
        
        for( let $_fieldName in $opt ){
            this.editData($_fieldName,$opt[$_fieldName]);
        }
    }
    
    getFieldValue($field){
        return (this.aData[$field]) ? this.aData[$field] : ``; //  && this.aSkills[$type] !== `undefined`
    }
    getSkillTag(){
        return this.aData.skillDisplayName;
    }
    getSkillName(){
        return wzGD_dataSet.getTags()[this.getSkillTag()] || this.getSkillTag();
    }
    getSkillIcon($modPath){
        let imgPath = $modPath+'/'+this.aData.skillUpBitmapName.replace(/\.tex$/g,'.tga'),canvas = '';
    
        try{
            fs.accessSync(imgPath, fs.F_OK); // check if file exists
            /*
            let tga = new TGA();
            tga.open(imgPath,function(){
                //document.body.appendChild( tga.getCanvas() );
                document.getElementById('canvas').appendChild( tga.getCanvas() );
                canvas = tga.getCanvas();
                console.log(canvas);
            });
            */
            let tga = new TGA();
            tga.load(new Uint8Array(fs.readFileSync(imgPath)));
            canvas = tga;
            //document.getElementById('canvas').appendChild( tga.getCanvas() );
            //console.log(canvas);
        }catch(err){
            imgPath = $modPath+'/'+this.aData.skillUpBitmapName.replace(/\.tex$/g,'.psd');
            canvas = ``;
            
            try{
                fs.accessSync(imgPath, fs.F_OK); // check if file exists
                var psd = PSD.fromFile(imgPath);
                psd.parse();
                canvas = psd;
            }catch(err2){
            
            }
            
        }
        
        return canvas;
        /*
        var tga = new TGA();
        tga.open( "C:/Users/WareBare/WebstormProjects/GDModdingEditor/app/img/target.tga", function(){
            document.body.appendChild( tga.getCanvas() );
            console.log(tga.getCanvas());
        });
        */
    }
    
    mathStatIndex($level){
        let ret = $level / 10;
        
        if(ret.toString().indexOf('.') != -1){
            //console.log('needs math');
            let tempDown = Math.floor(ret),
                tempUp = Math.ceil(ret),
                tempFraction = ret - tempDown;
            ret = [tempDown,tempUp,tempFraction];
        }
        
        return ret;
    }
    
    mathStatValue($fieldName,$level,$dec,$mul){
        let prop = appData[`gd-properties`].properties, // this._propertiesGD.getData().properties
            settings = appData[`gd-properties`].settings, // this._propertiesGD.getData().settings
            ret = false;
        
        $fieldName = $fieldName || 'characterLife';
        $level = $level || 10;
        $mul = $mul || 1;
        
        let iLevel = $level,
            reqLevel = ($level >= 85) ? 85 : $level,
            mulIndex = this.mathStatIndex($level);
        
        let fieldValue = prop[$fieldName].value,
            fieldMul = (Array.isArray(mulIndex)) ?
            ((settings.scale[prop[$fieldName].scale][mulIndex[1]] - settings.scale[prop[$fieldName].scale][mulIndex[0]]) * mulIndex[2]) + settings.scale[prop[$fieldName].scale][mulIndex[0]]:
                settings.scale[prop[$fieldName].scale][mulIndex];
        
        ret = Math.ceil(fieldValue * fieldMul * $mul).toFixed($dec);
        return ret;
    }
    
    genTag($key,$value){
        this.aTags = this.aTags || {};
        
        this.aTags[$key] = $value;
    }
    
    __setTags($opt){
        $opt = $opt || false;
        let tempOpt;
        
        if($opt){
            for(let $_FieldDBR in $opt){
                tempOpt = {};
                this.genTag($opt[$_FieldDBR].key,$opt[$_FieldDBR].value);
                tempOpt[$_FieldDBR] = $opt[$_FieldDBR].key;
                this.editDBR(tempOpt,true);
            }
        }
        
    }
    
};
