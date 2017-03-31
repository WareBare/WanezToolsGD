/**
 * Created by WareBare on 3/25/2017.
 */

module.exports = class cData extends libWZ.Core.cBase{
    
    /**
     *
     * @param {String} $filePath path and file name
     * @param {Object} $cParser the parser instance used to parse and save the data
     */
    constructor($filePath,$cParser,$aData = false){
        super();
        //console.log(`cData - Core`);
        this.filepath = $filePath;
        this.cParser = $cParser;
        
        this.aData = ($aData) ? JSON.parse(JSON.stringify($aData)) : this.cParser.parseData(wzIO.file_get_contents(this.filepath));
        
    }
    
    reload(){
        this.aData = this.cParser.parseData(wzIO.file_get_contents(this.filepath));
    }
    changeFilePath($newFilePath){
        this.filepath = $newFilePath;
    }
    getFilePath(){
        return this.filepath;
    }
    
    /**
     * loops through $optKeys to determine the correct key-value pair to change or add
     * @param {Array|String} $optKeys
     * @param {String|int} $value
     */
    editData($optKeys,$value){
        if(typeof this.aData === 'object'){
            let curEntry = this.aData,finalKey = (typeof $optKeys === 'string') ? $optKeys : false;
            
            if(Array.isArray($optKeys)){
                for( let $_key in $optKeys){
                    if($_key == $optKeys.length -1){
                        finalKey = $optKeys[$_key];
                    }else{
                        if(!curEntry[$optKeys[$_key]]) curEntry[$optKeys[$_key]] = ($_key == $optKeys.length -2 && $optKeys[$optKeys.length -1] === true) ? [] : {};
                        curEntry = curEntry[$optKeys[$_key]];
                    }
                }
            }
            
            if(finalKey === true){
                curEntry.push($value);
            }else{
                curEntry[finalKey] = $value;
            }
            this.dataUpdated = true;
        }else if(typeof this.aData === 'string'){
            // ToDo: editData for Strings
            this.dataUpdated = true;
        }else{
            console.log('Main-Edit ERROR: can only edit arrays and strings');
        }
        return this.getData();
    }
    
    /**
     *
     * @param {String} [$filePath] default: this.filepath - use false if this.filepath should be used
     * @param {Boolean} $alwaysSave [default: false]
     */
    saveData($filePath,$alwaysSave = false){
        $filePath = $filePath || this.filepath;
        let path = $filePath.substring(0, $filePath.lastIndexOf("/"));
        //console.log(`save: ${$filePath}`);
        try{
            fs.accessSync(path, fs.F_OK);
            //console.log(`it exists already`);
        }catch(err){
            console.log(`create path ${path}`);
            mkpath.sync(path);
        }
        // check if data has been updated, otherwise saving it is pointless
        if(this.checkState() || $alwaysSave){
            let data_ = this.cParser.stringifyData(this.aData); // if there is nothing to save, dont bother
            if(data_){
                //console.log(data_);
                wzIO.file_put_contents(
                    $filePath,
                    data_
                );
                
            }else{
                console.log('cParser.stringifyData returned false - may have been intentional');
            }
            
            //console.log('Main saved in: '+this.filepath);
            this.dataUpdated = false;
        }
        
    }
    
    /**
     * checks if data has been edited and requires saving / returns the value of >this.dataUpdated<
     * @return {boolean} this.dataUpdated
     */
    checkState(){
        return this.dataUpdated;
    }
    
    printData(){
        console.log(this.aData);
    }
    
    /**
     * returns data, however changes to the data will be made inside its instance, saving said data in an external variable is not recommended. Editing data will also return new data!
     * @return (Object/String) Main
     */
    getData($dataPath){
        $dataPath = $dataPath || false;
        let aData = this.aData;
        
        if(typeof $dataPath === 'string'){
            $dataPath = $dataPath.split('/');
        }
        if(Array.isArray($dataPath)){
            for( let $_Index in $dataPath ){
                aData = aData[$dataPath[$_Index]];
            }
        }
        
        return aData;
    }
    
}
