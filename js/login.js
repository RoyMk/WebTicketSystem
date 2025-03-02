document.addEventListener('DOMContentLoaded', () => {
    const username_field = document.querySelector('#username');
    const password_field = document.querySelector('#password');
    const login_button = document.querySelector('#login-button');
    const loginSection = document.querySelector('.login-section');
    let isStandardUser = ""
    let isAdmin = ""
    const databaseUser = {
        username: "user",
        password: "123",

    }

    const databaseAdmin = {
        username: "admin",
        password: "admin",
    }
    
    loginSection.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' && e.target.tagName === 'INPUT') {
            login_button.click();
        }
    })
    

    login_button.addEventListener('click',() => {

        function verifyUser(username, password, db) {
            if (db.username === username && db.password === password) {
                return "Valid"
            }
            return "Invalid";
        }
        isStandardUser  = verifyUser(username_field.value, password_field.value, databaseUser);
        isAdmin = verifyUser(username_field.value, password_field.value, databaseAdmin);
        if(isStandardUser === "Valid"){
            window.location.assign("/pages/standardUserPortal.html")
            
        }
        else if(isAdmin === "Valid"){
            window.location.replace("/pages/adminPortal.html")
            
        }
        else {
            alert("Unauthorized")
        }
    })
})
