const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('messageBox');
    const phoneInput = document.getElementById('phone');

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);
    phoneInput.addEventListener('input', validatePhone);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      validateName();
      validateEmail();
      validateSubject();
      validateMessage();
      validatePhone();
    });

    function validateName() {
      const name = nameInput.value.trim();
      const validationMessage = document.getElementById('one');
      if (name === '') {
        validationMessage.textContent = 'Name field cannot be empty';
        return false;
      } else {
        validationMessage.textContent = '';
        return true;
      }
    }

    function validateEmail() {
      const email = emailInput.value.trim();
      const validationMessage = document.getElementById('two');
      if (email === '') {
        validationMessage.textContent = 'Email field cannot be empty';
      } else if (!isValidEmail(email)) {
        validationMessage.textContent = 'Invalid email format';
        return false;
      } else {
        validationMessage.textContent = '';
        return true;
      }
    }

    function isValidEmail(email) {
      // Simple email format validation using regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);

    }

    function validateSubject() {
      const subject = subjectInput.value.trim();
      const validationMessage = document.getElementById('three');
      if (subject === '') {
        validationMessage.textContent = 'Subject field cannot be empty';
        return false;
      } else {
        validationMessage.textContent = '';
        return true;
      }
    }

    function validateMessage() {
      const message = messageInput.value.trim();
      const validationMessage = document.getElementById('four');
      if (message === '') {
        validationMessage.textContent = 'Message field cannot be empty';
        return false;
      } else {
        validationMessage.textContent = '';
        return true;
      }
    }

    function validatePhone() {
      const phone = phoneInput.value.trim();
      const validationMessage = document.getElementById('five');
      if (phone === '') {
        validationMessage.textContent = 'Phone number field cannot be empty';
        return false;
      } else if(!isValidPhone(phone)){
        validationMessage.textContent = 'Phone number should only contain numbers';
        return false;
      }
      else if (phone.length !== 10) {
        validationMessage.textContent = 'Phone number should contain 10 digits';
        return false;
      } 
      else {
        validationMessage.textContent = '';
        return true;
      }
      // Simple phone number format validation using regular expression
      function isValidPhone(phone){
        const phoneRegex = /^\d+$/;
        return phoneRegex.test(phone);
      }
    }




    // email submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxWrEqEFD3OT6ctPN0oN44DHYvd_Ueu3ZYg-MioUDCH7FvQu90XZqG7e_5ABU7AvpOV/exec';

const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault();
  const isValid = validateName(); 
  const phoneValid = validatePhone();
  const emailValid = validateEmail();
  const subjectValid = validateSubject();                                 // Call validateForm() once and store the result.
  const messageValid = validateMessage();                                 // Call validateForm() once and store the result.
  if (isValid && phoneValid && emailValid && subjectValid && messageValid) {

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Sent Successfully";
        alert('Sent successfully')
        setTimeout(function () {
          msg.innerHTML = "";
        }, 3000);
        form.reset();
        validationMessage.innerHTML=''
      })
      .catch(error => console.error('Error!', error.message));
  }
else{
  alert('Fill all fields')
}
});
