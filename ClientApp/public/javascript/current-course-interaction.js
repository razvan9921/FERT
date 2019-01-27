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
          var div = document.createElement('div');
          div.classList.add('question', 'padding-10', 'margin-10', 'display-flex', 'space-between');
          section.appendChild(div);

          var container = document.createElement('div');
          container.classList.add('display-flex', 'flex-column');

          p = document.createElement('p');
          p.innerHTML = element.title;

          var span = document.createElement('span');
          span.classList.add('question-info', 'margin-top-10');
          span.innerHTML = 'Votes: ' + element.votes;

          div.appendChild(container);

          container.appendChild(p);
          container.appendChild(span);


          var input = document.createElement('input');
          input.setAttribute('type', 'checkbox');
          input.classList.add('form-checkbox', 'visibility-hidden');
          input.setAttribute('id', `question-${index}`);
          input.setAttribute('onclick', `clearQuestion("question-${index}")`);
          div.appendChild(input);
        }
      }

      var quizzes = document.getElementById('quizzes');
      quizzes.innerHTML = '';
      for (var index = 0; index < course.quizzes.length; index++) {
        element = course.quizzes[index];

        var div = document.createElement('div');
        div.classList.add('question', 'padding-10', 'margin-10');
        quizzes.appendChild(div);
        var p = document.createElement('p');
        p.innerHTML = element.text;
        div.appendChild(p);
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

function saveData() {
  var app = firebase.app();
  var db = firebase.firestore();

  res = db.collection("courses").doc(courseId);

  text = document.getElementById('quiz-text').value;
  answer1 = document.getElementById('answer1').value;
  answer2 = document.getElementById('answer2').value;
  answer3 = document.getElementById('answer3').value;
  answer4 = document.getElementById('answer4').value;

  document.getElementById('quiz-text').value = '';
  document.getElementById('answer1').value = '';
  document.getElementById('answer2').value = '';
  document.getElementById('answer3').value = '';
  document.getElementById('answer4').value = '';

  var1 = document.getElementById('correctAnswer1').checked;
  var2 = document.getElementById('correctAnswer2').checked;
  var3 = document.getElementById('correctAnswer3').checked;
  var4 = document.getElementById('correctAnswer4').checked;
 
  if (course.quizzes == undefined) {
    course.quizzes = [];
  }
  var correctAnswer = 0;
  if (var1) {
    correctAnswer = 0;
  }
  if (var2) {
    correctAnswer = 1;
  }
  if (var3) {
    correctAnswer = 2
  }
  if (var4) {
    correctAnswer = 3
  }

  obj = {
    'text': text,
    'answers': [
      answer1,
      answer2,
      answer3,
      answer4
    ],
    'correctAnswer': correctAnswer,
    'isValidated': false
  }

  course.quizzes.push(obj);
  res.set(course);
}