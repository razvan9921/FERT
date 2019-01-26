function login() {
  const app = firebase.app();
  const db = firebase.firestore();

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      var professors = db.collection('professors');
      professors = professors.where('email', '==', email).limit(1);
      professors.onSnapshot(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          userInfo = doc.data();
          localStorage.setItem('email', email);
          localStorage.setItem('firstName', userInfo.firstName);
          localStorage.setItem('lastName', userInfo.lastName);

          window.location.href = '../professor/home.html';
        });
      });
      var students = db.collection('students');
      students = students.where('email', '==', email).limit(1);
      students.onSnapshot(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          userInfo = doc.data();
          localStorage.setItem('email', email);
          localStorage.setItem('firstName', userInfo.firstName);
          localStorage.setItem('lastName', userInfo.lastName);

          window.location.href = '../student/home.html';
        });
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      document.getElementById('error').innerHTML = error.message;
    });
}