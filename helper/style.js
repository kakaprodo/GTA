/*Here we will put all customiwed style*/
import {StyleSheet} from "react-native"

/* list of fontFamilly:
San Francisco
Academy Engraved LET
AcademyEngravedLetPlain
Al Nile
AlNile-Bold
American Typewriter
AmericanTypewriter-Bold
AmericanTypewriter-Condensed
AmericanTypewriter-CondensedBold
AmericanTypewriter-CondensedLight
AmericanTypewriter-Light

*/

export var globalStyle={
    app_color:"white",
    text_color:"black",
    back_color:"#4caf50",
    green_color:"#4caf50",
    react_dns:"http://localhost:3000",
    transp_color2:"rgba(0, 0, 0, 0.2)",
    transp_color3:"rgba(0, 0, 0, 0.3)",
   transp_color4:"rgba(0, 0, 0, 0.4)",
   transp_color5:"rgba(0, 0, 0, 0.5)",
   transp_color6:"rgba(0, 0, 0, 0.6)",
   transp_color7:"rgba(0, 0, 0, 0.7)",
   transp_color8:"rgba(0, 0, 0, 0.8)",
   transp_color9:"rgba(0, 0, 0, 0.9)",
   a_size:"13px",
   placeholder:"#999",
   error_color:"#ffcdd2",
   white_color:"#eeeeee",
   center:{textAlign: "center"},
   fontSize(value){
      return {fontSize:value}
   },
   padding(value){
     return {padding:value};
   },

}

export var style=StyleSheet.create({
   app_layout:{backgroundColor: globalStyle.transp_color3,flex:1},
   noBack:{backgroundColor: "white",flex:1},
   app_color:{color:globalStyle.app_color},
   text_color:{color:globalStyle.text_color},
   white_color:{color:globalStyle.white_color},
   green_color:{color:globalStyle.green_color},
   error_color:{
     textAlign: 'center',
     color:globalStyle.error_color,
     backgroundColor: globalStyle.transp_color5
   },
  spinner:{flex:1,justifyContent: "center",
             alignItems: "center",
             backgroundColor:globalStyle.transp_color5
           },
    spinColor:{color:globalStyle.app_color},
    center:{textAlign: "center",margin:5},
    headers:{
        backgroundColor:globalStyle.back_color,

    },
    base_headers:{
        backgroundColor:globalStyle.back_color,
        height:"35%",
        paddingTop:"4%"
    },
    content:{
       marginTop:"-40%",flex:1
    }
    ,
    title:{color:"white"},

    container:{
     backgroundColor: "transparent"
    },
    bodyDashboard:{
       flex:60,
       flexDirection: "row",
       alignItems: "center",


    },
   headerDash:{
      flex:20,
      justifyContent: 'center',
      padding:10


   },
   rounded:{margin:5,
             borderColor: globalStyle.app_color,
             borderWidth: 1,
             textAlign:'center',
             alignItems: 'center',
             height:60,
             width:60,
             paddingLeft:3,
             backgroundColor: globalStyle.transp_color5
      }

   ,
   cotationBtn:{
     flex:20,
     flexDirection: 'row',
     color:globalStyle.app_color,
     justifyContent: "center",
   },
   alertBtnContent:{


     // height: "80px",
     // flex:60,
     width:"55%",
     // borderColor:globalStyle.app_color,
     // borderWidth:2,
     margin:"2%"


   },
   img_border:{

   }
   ,
   btn:{
     margin:15,
     backgroundColor:globalStyle.transp_color5,
     borderWidth: 1,
     borderColor:globalStyle.app_color,


   },
   btnIcon:{
      color:globalStyle.app_color,
      fontSize: 17
   },
   btnText:{
     color:globalStyle.app_color,
   }
   ,
   alertBtn:{
     margin:15,
     backgroundColor:globalStyle.transp_color5,
     borderWidth: 1,
     borderColor:globalStyle.app_color,


   },
   textBtn:{
     color:globalStyle.white_color,
   }
   ,
   helperClient:{

     borderColor:globalStyle.app_color,
     borderTopWidth: 0,
     borderLeftWidth: 0,
     borderBottomWidth: 0,
     borderTopRightRadius: 15,
     borderBottomRightRadius: 15,
     borderWidth:2,
     // flex:20,
     width:"20%",
     height: "60%",


     // display: "none",
   },
   defAvatar:{

       borderTopRightRadius: 15,
       borderBottomRightRadius: 15,
       borderTopLeftRadius: 15,
       borderBottomLeftRadius: 15,
       height: "100px",
       width: "100px"
   }
   ,
   clientCotation:{

     borderColor:globalStyle.app_color,
     borderTopWidth: 0,
     borderRightWidth: 0,
     borderBottomWidth: 0,
     borderTopLeftRadius: 15,
     borderBottomLeftRadius: 15,
     borderWidth:1,
     // flex:20,
     width:"20%",
     height: "60%",
     // border
     //  borderTop:"none",
     //  borderRight:"none",
     //  borderBottom:"none",
     //  borderRadius: "30px"
   },
   logForm:{
     backgroundColor: globalStyle.transp_color5,
     padding:10,
     borderTopRightRadius: 20,
     borderBottomRightRadius: 20,
     borderTopLeftRadius: 20,
     borderBottomLeftRadius: 20,
   },
   label:{

     color:globalStyle.white_color,
   },
   textArea:{
     color:globalStyle.app_color,
     borderBottomWidth:1,
     borderColor:globalStyle.app_color,
     padding:10,
     borderTopRightRadius: 10,
     borderBottomRightRadius: 10,
     borderTopLeftRadius: 10,
     borderBottomLeftRadius: 10,
   }
   ,
   inputField:{

   borderBottomWidth:1,
   borderColor:globalStyle.app_color,

 },
 sidebarIcon:{
    color:globalStyle.green_color
 }

})
