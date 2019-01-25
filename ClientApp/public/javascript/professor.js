function getCourses() {
  const app = firebase.app();
  const db = firebase.firestore();
  var email = localStorage.getItem('email');
  var courses = db.collection('courses');

  var coursesDOM = document.getElementById('courses');
  coursesDOM.innerHTML = '';

  courses = courses.where('createdBy', '==', email);
  courses.onSnapshot(querySnapshot => {
    querySnapshot.forEach(function (doc) {
      console.log(doc.data())
      element = doc.data();

      var coursesDOM = document.getElementById('courses');
      // items.forEach(element => {
      var courseDIV = document.createElement('div');
      courseDIV.classList.add('course', 'display-flex', 'flex-column', 'space-between', 'margin-10', 'padding-10');
      coursesDOM.appendChild(courseDIV);

      title = document.createElement('h4');
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