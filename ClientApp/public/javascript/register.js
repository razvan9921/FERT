function createAccount(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var userFirstName = document.getElementById("firstName_field").value;
    var userLastName = document.getElementById("lastName_field").value;

    console.log(userEmail,userPass,userFirstName,userLastName);

    firebase.auth().createUserWithEmailAndPassword(userEmail,userPass);

    this.registerInDatabase(userEmail,userFirstName,userLastName);
}


function registerInDatabase(userEmail,userFirstName,userLastName){
    debugger
    const db = firebase.firestore();
    const post = db.collection('students');
    post.add({email: userEmail,
              firstName: userFirstName,
              lastName: userLastName})
              .then( () => {
                window.location.href = "/login/login.html";
              }) 
              .catch((error) => {
                  console.log(error);
              });
}