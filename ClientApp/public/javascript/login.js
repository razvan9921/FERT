function login() {
  const app = firebase.app();
  const db = firebase.firestore();


  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var isProfessor = document.getElementById('isProfessor').checked;
  var isStudent = document.getElementById('isStudent').checked;
  debugger
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    document.getElementById('error').innerHTML = error.message;;
    return false;
  });
  var userInfo = null;

  if (isProfessor) {
    var professors = db.collection('professors');

    professors = professors.where('email', '==', email).limit(1);
    professors.onSnapshot(querySnapshot => {
      querySnapshot.forEach(function (doc) {
        userInfo = doc.data();
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', userInfo.firstName);
        localStorage.setItem('lastName', userInfo.lastName);

        window.location.href = '../professor/home.html';
      });
    });
  } else {
    var students = db.collection('students');

    students = students.where('id', '==', 1).limit(1);
    students.onSnapshot(querySnapshot => {
      querySnapshot.forEach(function (doc) {
        userInfo = doc.data();
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', userInfo.firstName);
        localStorage.setItem('lastName', userInfo.lastName);

        window.location.href = '../student/home.html';
      });
    });
  }
  return false;
}