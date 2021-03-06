function getCourses() {
    const app = firebase.app();
    const db = firebase.firestore();
    
    var courses = db.collection('courses');

    courses.onSnapshot(querySnapshot => {
      var coursesDOM = document.getElementById('courses');
      coursesDOM.innerHTML = '';
      querySnapshot.forEach(function (doc) {
        element = doc.data();
        element.id = doc.id;
        var coursesDOM = document.getElementById('courses');
        var courseDIV = document.createElement('div');
        courseDIV.classList.add('course', 'display-flex', 'flex-column', 'space-between', 'margin-10', 'padding-10');
        coursesDOM.appendChild(courseDIV);
  
        title = document.createElement('h4');
        title.setAttribute('id', element.id);
        title.setAttribute('onclick', `redirectToCourse("${element.id}")`)
        title.innerHTML = element.title;
        courseDIV.appendChild(title);
  
        detailsDIV = document.createElement('div');
        detailsDIV.classList.add('display-flex', 'space-between', 'margin-top-5');
        courseDIV.appendChild(detailsDIV);
  
        classroom = document.createElement('p');
        classroom.innerHTML = element.classroom;
        detailsDIV.appendChild(classroom);
  
        date = document.createElement('p');
        date.classList.add('margin-left-10');
        date.innerHTML = element.date;
        detailsDIV.appendChild(date);
      });
    });
  }