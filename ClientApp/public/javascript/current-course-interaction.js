var course = {}

function getCurrentCouse() {
  var app = firebase.app();
  var db = firebase.firestore();
  courseId = localStorage.getItem('courseId');

  if (courseId) {
    res = db.collection("courses").doc(courseId);
    res.onSnapshot(function (doc) {
      course = doc.data();
      document.getElementById('courseTitle').innerHTML = course.title;
      document.getElementById('students-likes').value = course.studentLikes;
      document.getElementById('quiz-correct-answer').value = course.quizCorrectAnswer;

      document.getElementById('number-students').innerHTML = course.students.length;

      section = document.getElementById('questions');
      section.innerHTML = '';
      for (var index = 0; index < course.questions.length; index++) {
        element = course.questions[index];
        if (!element.isValidated && element.votes >= (course.studentLikes * course.students.length) / 100) {
          div = document.createElement('div');
          div.classList.add('question', 'padding-10', 'margin-10', 'display-flex', 'space-between');
          section.appendChild(div);
          p = document.createElement('p');
          p.innerHTML = element.title;

          input = document.createElement('input');
          input.setAttribute('type', 'checkbox');
          input.classList.add('form-checkbox', 'visibility-hidden');
          input.setAttribute('id', `question-${index}`);
          input.setAttribute('onclick', `clearQuestion("question-${index}")`);
          div.appendChild(p);
          div.appendChild(input);
        }
      }
    });
  }
}

function updateCourse() {
  var app = firebase.app();
  var db = firebase.firestore();

  courseId = localStorage.getItem('courseId');
  if (courseId == undefined) {
    return false;
  }
  res = db.collection("courses").doc(courseId);
  studentLikes = document.getElementById('students-likes').value;
  quizCorrectAnswer = document.getElementById('quiz-correct-answer').value;
  course.studentLikes = studentLikes;
  course.quizCorrectAnswer = quizCorrectAnswer;
  res.set(course);
}

function clearQuestion(id) {
  var app = firebase.app();
  var db = firebase.firestore();

  courseId = localStorage.getItem('courseId');
  if (courseId == undefined) {
    return false;
  }
  res = db.collection("courses").doc(courseId);
  course.questions[id.split('-')[1]].isValidated = true

  setTimeout(() => {
    document.getElementById(id).remove();
    res.set(course);
  }, 500);
}