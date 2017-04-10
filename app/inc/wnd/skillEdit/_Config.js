/**
 * Created by WareBare on 4/8/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    //title: `Settings :: Grim Dawn`,
    titlePage: `UI`,
    
    forms: {
        main_form:false
    },
    
    content_: function(){
        let out_;
        
        this.forms.main_form = new WZ.Core.cForm({
            id: 'main_form',
            //title: `Skill UI`,
            isWnd: this.wndId,
            isModule: this._mSkill,
            _tags: this._tagsSkills,
            onChange: {
                //custom: `submitForm(this)`
            },
            items: {
                'Skill File': {
                    /*
                    'logic::skillMasteryLevelRequired': {
                        label: `skillMasteryLevelRequired`,
                        type: `number`
                    },
                    */
                    'logic::skillMaxLevel': {
                        label: `skillMaxLevel`,
                        type: `number`
                    },
                    'logic::skillUltimateLevel': {
                        label: `skillUltimateLevel`,
                        type: `number`
                    },
                    'logic::skillDisplayName': {
                        label: `skillDisplayName (tag)`,
                        type: `textLargeX`
                    },
                    'logic::skillBaseDescription': {
                        label: `skillBaseDescription (tag)`,
                        type: `textLargeX`
                    },
                    'logic::skillDownBitmapName': {
                        label: `skillDownBitmapName (.tex)`,
                        type: `textLargeX`
                    },
                    'logic::skillUpBitmapName': {
                        label: `skillUpBitmapName (.tex)`,
                        type: `textLargeX`
                    }
                }
            }
        });
        out_ = this.forms.main_form.create();
        
        return out_;
    }
    
};
