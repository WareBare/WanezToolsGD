/**
 * Created by WareBare on 4/14/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Grim Dawn`,
    
    forms: {
        gd_settings:false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = `Grim Dawn - Settings`;
        
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Additional Paths, leave empty if using the defaults`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Mastery': {
                    'settings-app::GrimDawn.Mastery.PathUI': {
                        label: `Path to Additional UI Files [optional]`,
                        type: `textLargeX`,
                        ph: `records/ui/skills`
                    },
                    'settings-app::GrimDawn.Mastery.PathSkill': {
                        label: `Path to Additional Skill Files [optional]`,
                        type: `textLargeX`,
                        ph: `records/skills`
                    }
                },
                'Quick Creation (used in Mastery/Skill Wizard for default paths, if empty core paths are used)': {
                    'settings-app::GrimDawn.Mastery.PathSource': {
                        label: `Path to Additional Source UI Files [optional]`,
                        type: `textLargeX`,
                        ph: `ui/skills`,
                        newLine: true
                    },
                    'settings-app::GrimDawn.Mastery.SourcePFX': {
                        label: `Mastery PFX Source Folder (Install Directory) [optional]`,
                        type: `text`,
                        ph: `dev`
                    },
                    'settings-app::GrimDawn.Mastery.PathPFX': {
                        label: `Path to Mastery PFX Folder (Working Directory - Source) [optional]`,
                        type: `textLarge`,
                        ph: `fx/particlesystems`
                    }
                }
            }
        });
        out_ = this.forms.gd_settings.create();
        
        //console.log(wzWND('Settings').__getContent().contentType);
        
        return out_;
    }
    
};
