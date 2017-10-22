/**
 * Created by Ware on 10/12/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Mods (Wanez)`,
    
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
            title: `Wanez Mods`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Enable Tools': {
                    'settings-app::WanezMods.Enabled': {
                        label: `Enable WanezMod Tools`,
                        type: `checkBox`
                    }
                },
                'Legendary Crafter': {
                    'settings-app::WanezMods.LegendaryCrafter.allFiles': {
                        label: `Parse all Files, if unchecked the Tool will only load files prefixed with "c" and "d" (d001_blunt.dbr)`,
                        type: `checkBox`
                    },
                    'settings-app::WanezMods.LegendaryCrafter.excludeEpic': {
                        label: `Exclude Epics (only create Blueprints for Legendaries when checked, this will also ignore files prefixed with "c")`,
                        type: `checkBox`
                    }
                }
            }
        });
        out_ = `You can find different tools I used to make the Mods I released (Wanez) in here:`;
        out_ += this.forms.gd_settings.create();
        
        return out_;
    }
    
};
