$(".toggle-password").click(function(){
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input =$($(this).attr("toggle"));
    if(input.attr("type")=="password"){
        input.attr("type", "text");
        
    }else{
        input.attr("type","password");
    }
});


var myInput = document.getElementById("psw");
var letter =document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");


myInput.onfocus =function(){
    document.getElementById("validation_box").style.display="block";
}

myInput.onblur = function(){
    document.getElementById("validation_box").style.display="none";
}

myInput.onkeyup = function(){
      var lowerCaseletters =/[a-z]/E;
      if(myInput.value.match(lowerCaseletters)){
         letter.classlist.remove ("invalid");
         letter.classList.add("valid");
}else{
         letter.classList.remove("valid");
         letter.classList.add("invalid");
}
var upperCaseletters =/[A-2]/g;
if(myInput.value.match(upperCaseletters)){
   capital.classList.remove("invalid");
   capital.classList.add("valid");
}else{
   capital.classlist.remove("valid");
   capital.classlist.add("invalid");
}
var numbers =/[0-9]/g;
if(myInput.value.match(numbers)){
   number.classList.remove("invalid");
   number.classList.add("valid");
}else{
   number.classList.remove("valid");
   number.classList.add("invalid");
}
}
console.log("zaina");