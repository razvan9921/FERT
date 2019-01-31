
var course = {}

function getCurrentCourse() {
    const db = firebase.firestore();
    const courseRef = db.collection('courses').doc('qZYonM6UT4KU51z2h9D9');
    courseRef.onSnapshot(function(doc) {
        course =  doc.data();

    });
}

function voteQuestion(votes,id){
    const db = firebase.firestore();
    const courseRef = db.collection('courses').doc('qZYonM6UT4KU51z2h9D9');

    course.questions[id].votes =  course.questions[id].votes + 1
    courseRef.set(course);
}

function addQuestion(){
    const app = firebase.app();
    const db = firebase.firestore();
    const courseRef = db.collection('courses').doc('qZYonM6UT4KU51z2h9D9');
    var question1 = document.getElementById("question_field").value;
    course.questions.push({
        'title': question1,
        'votes': 0,
        'isValidated': false
    })
    courseRef.set(course)
    .then( () => {
        window.location.href = "/student/current-course.html?";
      })
    
   }

function getQuestions() {
    const app = firebase.app();
    const db = firebase.firestore();
    
    var courses = db.collection('courses').doc('qZYonM6UT4KU51z2h9D9');

    courses.onSnapshot((doc) => {
        var coursesDOM = document.getElementById('courses');
        coursesDOM.innerHTML = '';
        var elements =doc.data().questions;
        coursesDOM.innerHTML = '';
        var id=0;
        elements.forEach( (element) => {
            
            var courseDIV = document.createElement('div');
            courseDIV.classList.add('student-question-card', 'display-flex', 'flex-column');
            coursesDOM.appendChild(courseDIV);

            div2 = document.createElement('div');
            div2.classList.add('title');
        
            courseDIV.appendChild(div2);
            var h4 = document.createElement('h4');
            h4.innerHTML="Pentru professor";
            title = document.createElement('h3');
            title.classList.add('title-center');
            title.setAttribute('id', element);


            title.innerHTML = element.title;
            anonim = document.createElement('h4');
            anonim.innerHTML="Pentru professor";
            
            div2.appendChild(h4);
            div2.appendChild(title);
            div2.appendChild(anonim);
            var answers = document.createElement('div');
            answers.classList.add('answers');

            courseDIV.appendChild(answers);

            var btn1 = document.createElement('div');
            btn1.classList.add('bttn2');
            btn1.setAttribute('onclick','voteQuestion('+element.votes+','+id+')');

            answers.appendChild(btn1);

            var p1 = document.createElement('p');
            p1.innerHTML ="Voturi: " + element.votes;
            var p2 = document.createElement('p');
            p2.innerHTML = "Like";

            btn1.appendChild(p1);
            btn1.appendChild(p2);
            id=id+1;
        });
    });
}