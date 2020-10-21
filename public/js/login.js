document.addEventListener("DOMContentLoaded", function (event) {

    function init() {
        let login = document.getElementById('login');
        login.addEventListener('click', function () {
            let email = document.getElementById('email');
            let password = document.getElementById('password');;

            if (email.value === "" && email.value.trim() === "" &&
                password.value === "" && password.value.trim() === "") {

            } else {
                // Execute POST request to add user
                axios.post("/login", {
                    "email": email,
                    "password": password
                })
                    .then(response => {
                        var result = response.data;
                        if (result && result.status === "ok") {
                            // Redirect to header
                            window.location.replace("/export");
                        } else {
                            showErr("errorMsg", result.msg);
                        }
                    })
                    .catch(error => {
                        if (error.response.status == 401) {
                            showErr("errorMsg", error.response.data.msg);
                        } else {
                            showErr("errorMsg", msgNotAcceded);
                        }
                    });
            }
        });
    };

    init();
});