var date = new Date();
var coursesList = new Array();

function getCourses() {
  const app = firebase.app();
  const db = firebase.firestore();
  var email = localStorage.getItem('email');
  var courses = db.collection('courses');

  courses = courses.where('createdBy', '==', email);
  courses.onSnapshot(querySnapshot => {
    coursesList = []
    querySnapshot.forEach(function (doc) {
      coursesList.push(doc.data());
    });
    weekCourses = getCoursesByWeek();
    addCoursesIntoSchedule(weekCourses);
  });
}

function resetScheduleBySection(section) {
  for (i = 1; i < section.length; i++) {
    section[i].innerHTML = ''
  }
}

function resetSchedule() {
  for (var i = 8; i <= 20; i += 2) {
    section = document.getElementById(`${i}`).children;
    resetScheduleBySection(section);
  }
}

function writeHtmlBySection(section, element) {
  section.innerHTML = '';
  p = document.createElement('p');
  p.innerHTML = element.title;
  section.appendChild(p);
}

function addCoursesIntoSchedule(courses) {
  resetSchedule();
  courses.forEach(element => {
    for(var i=8; i<=20; i+=2) {
      // get courses in interval: i : i+2
      if (parseInt(element.time.split(':')[0]) >= i && parseInt(element.time.split(':')[0]) < i+2) {
        section = document.getElementById(`${i}`).children[new Date(element.date).getDay() == 0 ? 7 : new Date(element.date).getDay()];
        writeHtmlBySection(section, element);
      }
    }
  })
}

function getCoursesByWeek() {
  weekCourses = []
  coursesList.forEach(element => {
    startDate = document.getElementById('start-week').value
    endDate = document.getElementById('end-week').value;
    if (new Date(startDate) <= new Date(element.date) && new Date(new Date(endDate).setDate(new Date(endDate).getDate()+1)) > new Date(element.date))
      weekCourses.push(element)
  })
  return weekCourses;
}

function nextWeek() {
  date.setDate(date.getDate() + 7);
  getCurrentWeek(new Date(date));
  weekCourses = getCoursesByWeek();
  addCoursesIntoSchedule(weekCourses);
}

function previousWeek() {
  date.setDate(date.getDate() - 7);
  getCurrentWeek(new Date(date));
  weekCourses = getCoursesByWeek();
  addCoursesIntoSchedule(weekCourses);
}

function getMonday(d) {
  // get first day of a week
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -7 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff)).toLocaleDateString();
}

function getSunday(d) {
  // get last day of a week
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 7); // adjust when day is sunday
  return new Date(d.setDate(diff)).toLocaleDateString();
}

function getCurrentWeek(date) {
  document.getElementById('start-week').value = getMonday(date);
  document.getElementById('end-week').value = getSunday(date);
}
