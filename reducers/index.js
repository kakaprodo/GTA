/*All my reducers will be combined here*/


var initialState={
    user:null,
    isLoggedIn:false,
    loading:false,
    info_page:{},//path with parameters,and other information
    inputState:{

    }
};



export const allReducers=(state=initialState,action=[])=>{
    switch (action.type) {
      case H.const.SET_CURRENT_PAGE:
              
              return Object.assign({},state,{
                               info_page:action.info_page
                             })
        break;
      case H.const.SUCCESS_LOGGIN:
              return Object.assign({},state,{
                               user:action.user,
                               isLoggedIn:true,
                             })
        break;
      case H.const.LOGOUT:
              state= Object.assign({},state,initialState);
              if (action.done) {
                 
                 action.done();
              }
              return state;
        break;

      case H.const.LOADING:

           return Object.assign({},state,{
                               loading:action.state
                             })
        break;
      default:
      return state;

    }

}
