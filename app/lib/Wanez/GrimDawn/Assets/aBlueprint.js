/**
 * Created by WareBare on 4/22/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class aBlueprint extends libWZ.GrimDawn.Assets.cAsset{
    
    constructor($saveFilePath){
        super($saveFilePath);
        
        this.opt = {
            artifactFormulaBitmapName: `items/craftingparts/materials/blueprint_a003_epic.tex`,
            itemClassification: `Common`,
            dropSound: `records/sounds/items/spak_itemdropgeneric.dbr`,
            dropSound3D: `records/sounds/items/spak_itemdropgeneric.dbr`,
            dropSoundWater: `records/sounds/items/spak_itemdropwaterplunksm.dbr`,
            itemCost: `100`,
            itemLevel: `1`,
            //actorRadius: `1.0`,
            //actorHeight: `0.5`,
            description: `tagBlueprint_ArmorC002`,
            mesh: `items/misc/blueprint02.msh`,
        };
        
        this.fetchTemplate(`database/templates/itemartifactformula.tpl`);
        this.editDBR(this.opt);
    }
    
    
    /**
     * - artifactName
     * - RandomArtifact
     * - ForceCompletion
     * - CreateQuantity
     * - CreationCost
     * @param {Object} $optArtifact
     */
    setArtifact($optArtifact){
        // Basics
        this.editData('artifactName',$optArtifact.Name);
        if($optArtifact.RandomArtifact)  this.editData('forcedRandomArtifactName',$optArtifact.RandomArtifact);
        if($optArtifact.ForceCompletion)  this.editData('forcedRelicCompletion',$optArtifact.ForceCompletion);
        
        // Creation
        if($optArtifact.CreateQuantity)  this.editData('artifactCreateQuantity',$optArtifact.CreateQuantity);
        if($optArtifact.CreationCost)  this.editData('artifactCreationCost',$optArtifact.CreationCost);
    }
    
    /**
     * Needs to be called first, otherwise it will override some edits
     * @param {Array} $arrBase [{string} "BaseReagent", {int} Quantity]
     * @param {Array} [$arrOptional]
     */
    setReagent($arrBase,$arrOptional){
        $arrOptional = $arrOptional || false;
        let tempCount;
        
        this.editData('reagentBaseBaseName',$arrBase[0]);
        this.editData('reagentBaseQuantity',$arrBase[1] || 1);
        this.editData('artifactCreationCost',$arrBase[2] || 1);
        
        if($arrOptional){
            for(let $_Index in $arrOptional){
                tempCount = parseInt($_Index) + 1;
                this.editData('reagent'+tempCount+'BaseName',$arrOptional[$_Index]);
                this.editData('reagent'+tempCount+'Quantity',1);
            }
        }
        
    }
    
};
