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
            numberMax: 0,
            max: 100,
            type: `inc`,
            round: false,
            dec: 0,
            mul: false,
            incEvery: 1,
            incInc: 0,
            incOnceEvery: 1
        },$opt || {});
        
        let $number = parseFloat($opt.number),
            $numberMax = parseFloat($opt.numberMax),
            $start = parseFloat($opt.start) || $number,
            $incInc = parseFloat($opt.incInc),
            $max = $opt.max,
            prevInc = 0,
            tempInc = 0;
        
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
            
            tempInc = (i / $opt.incEvery) % 1;
            if(tempInc === 0){
                //prevInc = tempInc;
                $number = $number + $incInc;
            }
            
            if((i / $opt.incOnceEvery) % 1 === 0){
                if($opt.type === `inc`) {
                    $start = $start + $number;
                }else if($opt.type === `mul`){
                    $start = $start * $number;
                }
            }
            
            
            if($opt.mul){
                $start = $start * $opt.mul;
            }
            if($numberMax > 0 && $start > $numberMax){
                $start = $numberMax;
            }
        }
        
        return aValues;
    }
    
};
