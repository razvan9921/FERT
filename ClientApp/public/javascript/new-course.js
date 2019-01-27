function newCourse() {
  const app = firebase.app();
  const db = firebase.firestore();

  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  var classroom = document.getElementById('classroom').value;
  var studentLikes = document.getElementById('students-likes').value;
  var quizCorrectAnswer = document.getElementById('quiz-correct-answer').value;

  var email = localStorage.getItem('email');
  
  course = {
    "title": title,
    "description": description,
    "date": date,
    "time": time,
    "classroom": classroom,
    "studentLikes": studentLikes,
    "quizCorrectAnswer": quizCorrectAnswer,
    "createdBy": email,
    "quizzes":[],
    "questions":[]
  };

  res = db.collection("courses").add(course)
  .then(function (docRef) {
    window.location.href="../professor/home.html"
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });
}