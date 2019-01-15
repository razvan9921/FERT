function initToolbar() {
  var email = localStorage.getItem('email');
  var firstName = localStorage.getItem('firstName');
  var lastName = localStorage.getItem('lastName');
  document.getElementById('name').innerHTML = firstName + ' ' + lastName;
  document.getElementById('email').innerHTML = email;
}