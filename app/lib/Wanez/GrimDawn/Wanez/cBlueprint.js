/**
 * Created by WareBare on 4/23/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cBlueprint extends libWZ.GrimDawn.cData{
    
    constructor($blueprintData,$artifactName,$fileData,$forcedRandomArtifactAsset){
        //super(wzAssets.newItemArtifactFormula);
        super();
        this.aData = new libWZ.GrimDawn.Assets.aBlueprint().getData();
        
        this.iData = $blueprintData;
        this.iFileData = $fileData;
        this.iTier = $fileData.TIER;
        this.iFileData.TIER = (`0${this.iFileData.TIER}`).slice(-2); // this.parseIntToString(this.iFileData.TIER,1)
        this.iForcedRandomArtifactAsset = $forcedRandomArtifactAsset;
        this.forcedRandomArtifact = false;
        
        this.iniBlueprint($artifactName);
    }
    
    iniBlueprint($artifactName){
        
        
        this.editDBR({
            "artifactName": $artifactName,
            "forcedRandomArtifactName": this.iniRandomArtifact(true),
            "artifactCreateQuantity": 1,
            "artifactCreationCost": this.iData.creationCost[this.iTier],
            "reagentBaseBaseName": this.iData.reagents.base.name,
            "reagentBaseQuantity": this.iData.reagents.base.quantity[this.iTier]
        });
    }
    
    /**
     * ini forcedRanomArtifact and return relative path for blueprint
     * @param {Boolean} $hasRandomArtifact
     * @return {String} randomArtifactFile - return relative path for blueprint
     */
    iniRandomArtifact($hasRandomArtifact){
        let randomArtifactFile = "";
        if($hasRandomArtifact){
            let filePath = this.iData.forcedRandomArtifact.path,
                fileName = this.iData.forcedRandomArtifact.tpl.wzOut(this.iFileData),
                tagText_NAME = this.iData.forcedRandomArtifact.name.wzOut(this.iFileData),
                tagText_DESC = this.iData.forcedRandomArtifact.desc.wzOut(this.iFileData);
            randomArtifactFile = (filePath+fileName+'.dbr').toLowerCase();
            
            // create new cData instance if it hasn't been done yet
            if(!this.forcedRandomArtifact) {
                this.forcedRandomArtifact = new libWZ.GrimDawn.Assets.aGear(false,this.iForcedRandomArtifactAsset); // new libWZ.GrimDawn.cData(this.iForcedRandomArtifactAsset)
                //this.forcedRandomArtifact - this.iForcedRandomArtifactAsset[0]][this.iForcedRandomArtifactAsset[1]
            }
            
            // change savePath
            this.forcedRandomArtifact.changeFilePath(`${this.fn.getPaths().Mod}/${randomArtifactFile}`);
            //console.log(this.forcedRandomArtifact);
            // set tag
            let tag_NAME = "tagWaGear"+fileName+"_NAME",
                tag_DESC = "tagWaGear"+fileName+"_DESC";
            this.aTags = this.aTags || {};
            this.aTags[tag_NAME] = tagText_NAME;
            this.aTags[tag_DESC] = tagText_DESC;
            this.forcedRandomArtifact.editDBR({
                "itemNameTag": tag_NAME,
                "itemText": tag_DESC,
                "bitmap": "items/craftingparts/customblueprints/randoms/legendary_misc_neclace01.tex",
                "itemLevel": this.iFileData.LVL,
                "levelRequirement": this.iFileData.LVL
            });
            /*
             items/craftingparts/customblueprints/randoms/legendary_torso_caster01.tex
             items/craftingparts/customblueprints/randoms/legendary_weapon1h_caster01.tex
             items/craftingparts/customblueprints/randoms/legendary_weapon1h_sword01.tex
             items/craftingparts/customblueprints/randoms/legendary_weapon2h_gun01.tex
             */
        }
        
        return randomArtifactFile;
    }
    
    saveRandomArtifactFile(){
        //console.log(this.forcedRandomArtifact);
        if(this.forcedRandomArtifact) this.forcedRandomArtifact.saveDBR(false,true);
    }
    
    genFileName(){
        let $opt = this.iFileData;
        let filePath = this.iData.file.path,
            fileName = this.iData.file.tpl.wzOut($opt),
            itemFile = (filePath+fileName+'.dbr').toLowerCase();
        
        this.itemFile = itemFile;
        
        this.changeFilePath(`${this.fn.getPaths().Mod}/${itemFile}`);
    }
    
};
