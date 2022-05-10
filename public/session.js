const myObject={
    name: "Dave",
    hobbies:["eat", "sleep", "code"],
    logName: function (){
       console.log(this.name);}
  };
  const myArray= ["eat", "sleep", "code"];
  sessionStorage.setItem("mySessionStore",JSON.stringify(myArray));
  const mySessionData=JSON.parse(sessionStorage.getItem ("mySessionStore"));
  console.log(mySessionData);