// const myObject={
//     name: "Dave",
//     hobbies:["eat", "sleep", "code"],
//     logName: function (){
//        console.log(this.name);}
//   };
//   const myArray= ["eat", "sleep", "code"];
//   sessionStorage.setItem("mySessionStore",JSON.stringify(myArray));
//   const mySessionData=JSON.parse(sessionStorage.getItem ("mySessionStore"));
//   console.log(mySessionData);
var interval;
         $(document).on('mousemove', function () {
             clearInterval(interval);
             var coutdown = 5 * 60, $timer = $('.timer'); // After 5 minutes session expired  (mouse button click code)
             $timer.text(coutdown);
             interval = setInterval(function () {
                 $timer.text(--coutdown);

                 if (coutdown === 0) {

                     alert("Session expired. User successfully logged out.");
                     window.location = "index.hbs";
                 }

             }, 1000);
         }).mousemove();

         var interval;
                     $(document).on('keydown', function () {
             clearInterval(interval);
             var coutdown = 5 * 60, $timer = $('.timer'); // After 5 minutes session expired (keyboard button press code)
             $timer.text(coutdown);
             interval = setInterval(function () {
                 $timer.text(--coutdown);

                 if (coutdown === 0) {

                     alert("Session expired User successfully logout.");
                     window.location = "index.hbs";
                 }

             }, 1000);
         }).mousemove();
   