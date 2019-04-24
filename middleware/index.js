



export const allMiddlewareChecker=({getState,dispatch})=>{

     return function(next){

           return function(action){

                if (action.type==='example') {

                }

             return next(action)
           }
     }
}
