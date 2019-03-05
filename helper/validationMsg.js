
/*This class will contain all msg for validation*/

export class ValidationMsg{

    constructor(H){

       this.messages={
               "email":"Your email is not correct",
               "required":"This field is required",
               "min":"This field must have {min} caracters at minimum",
               "image":"Only jpeg,png,jpg,svg extensions are allowed",
               "number":"The field must contain a number only"
            };
    }

    giveErrorMsg(signleRule,booleanValue,placeholders){//it checks if the validation is true or false then return the message

       if (!booleanValue) {
          var msg=this.messages[signleRule];
          if (msg) {
            if (typeof placeholders === 'undefined') {
              return msg;
             }

             return H.replacePararam(msg,placeholders)
          }
          else{
            alert("No validation message for :"+signleRule);
          }

       }
    }
}
