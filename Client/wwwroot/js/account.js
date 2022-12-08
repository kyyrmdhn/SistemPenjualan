function register() {
    e.preventDefault();
    let register = new Object();
    register.PhoneNumber = $("#phoneNumberR").val();
    register.Email = $("#emailR").val();
    register.Password = $("#passwordR").val();
    register.Name = $("#nameR").val();
    register.Address = $("#addressR").val();

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
        }).done(function (data) {
            alert(data);
            console.log(data);
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