/**
 * Created by Ware on 7/28/2017.
 *
 * @author Ware (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    title: `Settings :: Merger Tools`,
    
    forms: {
        merger_settings:false
    },
    
    content_: function(){
        let out_ = `Merger Tools - Settings`;
        
        this.forms.merger_settings = new WZ.Core.cForm({
            id: 'merger_settings',
            title: `Merger Tools`,
            isWnd: `Settings`,
            onChange: {
                /*custom: `submitForm(this)`*/
            },
            items: {
                'Setup': {
                    'settings-app::Merger.Enabled': {
                        label: `Enable Merger (Experimental)`,
                        type: `checkBox`
                    }
                },
                'Paths & Directories': {
                    'settings-app::Merger.Paths.Sources': {
                        label: `Path to (Mod) Sources for Merging (doesn't have to be your Working Directory)`,
                        type: `textLargeX`
                    }
                }
            }
        });
        out_ = this.forms.merger_settings.create();
        
        return out_;
    }
    
};
