/**
 * Created by Ware on 10/29/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Grim Dawn :: Auto Sync`,
    
    forms: {
        gd_settings:false
    },
    submitForm: function($el){
        console.log(`custom submit: ${$el.value}`);
    },
    
    content_: function(){
        let out_ = ``;
        
        this.forms.gd_settings = new WZ.Core.cForm({
            id: 'gd_settings',
            title: `Auto Sync Settings`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'General': {
                    'settings-app::GrimDawn.AutoSync.BlockDeletion': {
                        label: `Should File Deletion for Auto Sync be blocked? Unchecked will delete files in the Target Directory if a file is renamed, moved or deleted in the Source Directory.`,
                        type: `checkBox`
                    }
                },
                'Particle Systems (PFX)': {
                    'settings-app::GrimDawn.Mastery.PSSource': {
                        label: `PFX Sources`,
                        type: `listArea`
                    },
                    'settings-app::GrimDawn.Mastery.PSTarget': {
                        label: `PFX Targets`,
                        type: `listArea`
                    }
                }
            }
        });
        out_ = this.forms.gd_settings.create();
        
        return out_;
    }
    
};
