/**
 * Created by WareBare on 4/10/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = class cImageLoader extends libWZ.GrimDawn.cBase{
    
    constructor($image,$opt){
        super();
        
        this.iOpt = Object.assign({
            id: Math.random() * (1000 - 1) + 1
        },$opt);
        this.iPath = `${this.fn.getPaths().Source}/${$image}`;
        
        this.tpl = `<img draggable="false" id="{ID}"{OPTIONS}>`;
        
        this.out_ = this.iniImageLoader();
        
    }
    
    iniImageLoader(){
        //console.log(this.iPath);
        let imgSrc = ` src="${this.iOpt.default}"`,imgPath = this.iPath.replace(`.tex`,`.tga`),opt = ``,isFalse = false;
        
        try{
            fs.accessSync(imgPath, fs.F_OK);
            
            let tga = new TGA();
            tga.load(new Uint8Array(fs.readFileSync(imgPath)));
            
            imgSrc = ` src="${tga.getCanvas().toDataURL()}"`;
            
        }catch(err){
            imgPath = imgPath.replace(`.tga`,`.png`);
            try{
                fs.accessSync(imgPath, fs.F_OK);
                imgSrc = ` src="${imgPath}"`;
            }catch(err){
                //if(this.iOpt.altText){
                    //imgSrc = ` alt="${this.iOpt.altText}"`;
                //}
                if(this.iOpt.retFalse){
                    isFalse = true;
                }
            }
        }
    
        opt += imgSrc;
        return (isFalse) ? false : this.tpl.wzOut({
            ID: this.iOpt.id,
            OPTIONS: opt
        })
        
    }
    
    load(){
        return this.out_;
    }
    
};
