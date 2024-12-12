const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const age =  document.getElementById('age');


/**
 * 
 * to store user and user family data
 * 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} age 
 * @param {*} email 
 * 
 */
function User(firstName,lastName,age,email){
    this.firstName = firstName,
    this.lastName = lastName,
    this.age = age,
    this.email = email;
    this.family = [];
}

/**
 * login/signup form - create new user if not exists before login
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form); 
    if(validate(formData))
    {        
        const user = new User(formData.get('fname'),formData.get('lname'),formData.get('age'),formData.get('email'));
        console.log(user.firstName +"  "+user.lastName +"  " + user.age + "  " + user.email);
        if(localStorage.getItem(user.email)===null){
            localStorage.setItem(user.email,JSON.stringify(user));
        }
        localStorage.setItem("login",user.email);

        window.location.href = 'familyy.html';
    }
})

/***
 * to check wether user alredy exists or not
 */
emailInput.addEventListener('input',function(){
    
    const user = localStorage.getItem(emailInput.value);
    if(user===null)
    {
        fname.removeAttribute('disabled')
        lname.removeAttribute('disabled')
        age.removeAttribute('disabled')
    }else{
        showUserLoginDetail(JSON.parse(user));
    }
})

/**
 * to show user details if already exists
 * @param {*} user 
 */
function showUserLoginDetail(user){
    fname.setAttribute('disabled',true);
    lname.setAttribute('disabled',true);
    age.setAttribute('disabled',true);
    fname.value = user.firstName;
    lname.value = user.lastName;
    age.value = user.age;
}


/**
 * 
 * this function is use to validate the form data before saving
 * 
 * @param {*} formData 
 * @returns {boolean} - true : if it is validate and false if not
 */
function validate(formData)
{
    if( 
          formData.get('fname') === ""
       || formData.get('lname') === ""
       || formData.get('age') === ""
       || formData.get('email') === null
       || formData.get('email') === ""
    )
    {
        window.alert('please fill all the required filed');
        return false;
    }
    return true;
}
 