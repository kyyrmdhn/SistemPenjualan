$(".register").submit(function (e) {
    e.preventDefault();
    let register = new Object();
    register.Name = $("#nameR").val();
    register.Address = $("#addressR").val();
    register.PhoneNumber = $("#phoneNumberR").val();
    register.Email = $("#emailR").val();
    register.Password = $("#passwordR").val();

    console.log(register);
    $.ajax({
        url: 'https://localhost:7254/api/Account/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(register),
        success: function (data) {
            console.log(data);
            switch (data.statusCode) {
                case 200:
                    Swal.fire(
                        'Good job!',
                        `${data.message}`,
                        'success'
                    ).then(function () {
                        window.location.replace('Login')
                    })
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong Email or Password',
                    })
            }
        },
        error: function (ts) {
            alert(ts.responseText);
        }
    })
})

 $(".login").submit(function (e) {
     e.preventDefault();
     let login = {};
     login.Email = $("input[name = 'Email']").val();
     login.Password = $("input[name='Password']").val();
     console.log(login);
     if (login.Email != "" && login.Password != "") {
         $.ajax({
             url: 'login',
             type: 'post',
             contentType: 'application/json',
             data: JSON.stringify(login),
             success: function (data) {
                 console.log(data);
                 if (data.statusCode == 200) {
                     Swal.fire(
                         'Good job!',
                         `${data.message}`,
                         'success'
                     ).then(function () {
                         window.location.replace('../AdminProduct')
                     })
                 } else {
                     Swal.fire({
                         icon: 'error',
                         title: 'Oops...',
                         text: 'Error!',
                     })
                 }
             },
             error: function () {
                 Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: 'Error!',
                 })
             }
         })
     } else {
         Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Email and Password Required',
         })
     }
 })

function register() {
    //e.preventDefault();
    let register = new Object();
    register.Name = $("#nameR").val();
    register.Address = $("#addressR").val();
    register.PhoneNumber = $("#phoneNumberR").val();
    register.Email = $("#emailR").val();
    register.Password = $("#passwordR").val();

    console.log(register);
    $.ajax({
        url: 'https://localhost:7254/api/Account/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(register),
        success: function (data) {
            Swal.fire(
                'Good job!',
                `${data.message}`,
                'success'
            ).then(function () {
                location.href = 'Login';
            })
        },
        error: function (ts) {
            alert(ts.responseText);
        }
    })
}

function login() {
    //e.preventDefault()
    let login = {};
    login.Email = $("#emailL").val();
    login.Password = $("#passwordL").val();
    console.log(login);
    if (login.Email != "" && login.Password != null) {
        $.ajax({
            url: 'https://localhost:7254/api/Account/login',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(login),
            complete: function (result) {
                alert("tes");
                console.log("tes");
            }
        }).done(function (data) {
            alert("done");
            console.log("done");
        })
    } else {
        alert("Email dan password harus diisi")
    }
}

function forgotPassword() {
    let forgot = new Object;
    forgot.email = $("#emailFP").val();
    forgot.name = $("#nameFP").val();
    forgot.newPass = $("#newPassFP").val();
    forgot.confPass = $("#confPassFP").val();
    $.ajax({
        url: `https://localhost:7254/api/Account/login`,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(login),
        success: function (data) {
            Swal.fire(
                'Good job!',
                `${data.message}`,
                'success'
            ).then(function () {
                location.href = 'Login';
            })
        },
        error: function (err) {
            alert(err);
        }
    })
}