/**
 * Created by WareBare on 4/15/2017.
 *
 * @author WareBare (Daniel Kamp)
 * @license MIT
 * @website https://github.com/WareBare
 *
 */

module.exports = {
    
    genValues($opt){ // $number,$max,$type,$round
        $opt = Object.assign({
            start: false,
            number: 1,
            max: 100,
            type: `inc`,
            round: false,
            dec: 0
        },$opt || {});
        
        let $number = parseFloat($opt.number),
            $start = parseFloat($opt.start) || $number,
            $max = $opt.max;
        
        let aValues = [];
        
        for(let i=1; i<=$max; i++){
            
            if($opt.round === `up`){
                //$start = Math.ceil($start);
                aValues.push(Math.ceil($start).toFixed($opt.dec));
            }else if($opt.round === `down`){
                //$start = Math.floor($start);
                aValues.push(Math.floor($start).toFixed($opt.dec));
            }else{
                aValues.push($start.toFixed($opt.dec));
            }
    
            if($opt.type === `inc`) {
                $start = $start + $number;
            }else if($opt.type === `mul`){
                $start = $start * $number;
            }
            
            
        }
        
        return aValues;
    }
    
};
