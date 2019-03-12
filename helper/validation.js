/* This will keep all validation we are going to use*/


import {ValidationMsg} from "./validationMsg"

// var super=new ValidationMsg();

export class Validation extends ValidationMsg{
    constructor(){
      super();
      this.msg=[];//msg to return in case the validation was false
      this.error=false;
      this.checkAll=false;
      this.allValidation=[];
      this.testMsg="";
      this.result=[];
    }

    setMsg(msg){
        this.testMsg=msg;
        return this;
    }
    getMsg(){
       return this.testMsg;
    }

    me(){
      return this;
    }
    reset(){
      this.msg=[];//msg to return in case the validation was false
      this.error=false;
      this.checkAll=false;
      this.allValidation=[];

    }

    /*
      this function helps to add new validation in the variable allValidation.
      the variable data contains :{name:["val:param","..."],value:"value_to_be_validated",key:"variable_name_to_contain_the_error_msg"}

      data=[{name:["email"],value:"proms@gmail.com",key:"validEmail"}];

    */

    add(ruleNames=[],value,key){

       this.allValidation.push({name:ruleNames,value:value,key:key});
    }

    checkAll(){
       this.checkAll=true;
    }

    validate(model){
       var result={success:true,msg:{}};
       var allValidations=this.allValidation;
       for (var i = 0; i < allValidations.length; i++) {

          var currentValidation=allValidations[i];
          var rules=currentValidation.name;//this one is an array of rules and value ,key
          // console.log("n",rules);
          for (var j = 0; j < rules.length; j++) {
            //the rule has two parts,name of rule and a parameter if needed separated by a semi colon (:)
             var currentRule=rules[j].split(":");

             var ruleName=currentRule[0];
             var ruleParam=currentRule[1];
            var isOkay=ruleParam==undefined?this[ruleName](currentValidation.value):this[ruleName](currentValidation.value,ruleParam);//we call the appropriate function

            if (!isOkay) {//if the validation return false we register the msg error in the key_validation_msg of a registered validation
               var msg=super.giveErrorMsg(ruleName,isOkay,{[ruleName]:ruleParam});//geting the msg of the validation

               this.success=false;
               //this.msg.push({rule:rules[j],msg:msg,key:this.allValidation[i].key});

               //we are assigning msg error to all keys in the state of the model where the class is called
               model.setState({[currentValidation.key]:msg.msg});
              this.msg.push({"msg":msg});
               result={success:false,msg:this.msg};
               this.result=result;

            }
          }

       }
       return result.success;
    }

    email(email){

      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    islength(caracter,length){

    }

    image(file,returnValue=false){
      var ext=file.name.split(".")[1];
      var result=true;

      if (H.$.inArray(ext,["jpeg","png","PNG","JPEG","jpg","svg","JPG"])<0) {
        result=false;
      }


     if (returnValue) {//if we call this function out of this class
        var msg=super.giveErrorMsg("image",result);
        if (result==false) {
          return {success:false,msg:msg};
        }
        else{
           return {success:true};
        }

     }
     else{
       return result;
     }
    }

    min(caracter,value){//this is for string only
       /*this function return true when the length of the string is greater or equal to the param value*/

       var lengthCar=H.$.trim(caracter).length;
       return lengthCar<value?false:true;
    }

    number(value){
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    required(value){//this return true if the value is not empty and false if is empty

      return H.isEmpty(value)?false:true;

    }
}
