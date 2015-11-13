$(document).ready(function () {
    $("#loginButton").on("click", function (e) {
        e.preventDefault();
        var loginData = {
            Username: $("#loginUsername").val(),
            Password: $("#loginPassword").val()
        };
        $.ajax({
            type: "POST",
            url: "/Umbraco/Api/Membership/Login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(loginData)
        }).done(function (data) {
            if (data.Success === true) {
                $("#registerContainer").hide();
                $("#loginContainer").hide();
                $("#loginRegisterButtons").hide();
                $("#loginUsername").val("");
                $("#loginPassword").val("");
                $("#loggedIn").show();
            } else {
                $("#loginPassword").val("");
                $("#errorMessage").text(data.ErrorMessage);
                $("#errorMessage").show();
            }
        });
    });

    $("#registerButton").on("click", function (e) {
        e.preventDefault();
        var username = $("#registerUsername").val();
        var password = $("#registerPassword").val();
        var confirmPassword = $("#registerConfirmPassword").val();

        if (password !== confirmPassword) {
            $("#errorMessage").text("Passwords must match!");
            $("#errorMessage").show();
        }
        else if(password.length < 8 || confirmPassword.length < 8) {
            $("#errorMessage").text("Password length must be at least 8 characters!");
            $("#errorMessage").show();
        } else {
            $("#errorMessage").text("");
            $("#errorMessage").hide();
            var registerData = {
                Username: username,
                Password: password
            };
            $.ajax({
                type: "POST",
                url: "/Umbraco/Api/Membership/Register",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(registerData)
            }).done(function (data) {
                if (data.Success === true) {
                    $("#registerContainer").hide();
                    $("#loginContainer").hide();
                    $("#loginRegisterButtons").hide();
                    $("#registerUsername").val("");
                    $("#registerPassword").val("");
                    $("#registerConfirmPassword").val("");
                    $("#loggedIn").show();
                } else {
                    $("#registerPassword").val("");
                    $("#registerConfirmPassword").val("");
                    $("#errorMessage").text(data.Message);
                    $("#errorMessage").show();
                }
            });
        }
    });

    $("#logoutButton").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/Umbraco/Api/Membership/Logout",
        }).done(function (data) {
            if (data.Success === true) {
                $("#registerContainer").hide();
                $("#loginContainer").show();
                $("#loginRegisterButtons").show();
                $("#loggedIn").hide();
            } else {
            }
        });
    });

    $("#showLogin").on("click", function (e) {
        e.preventDefault();
        $("#registerContainer").hide();
        $("#loginContainer").show();
    });

    $("#showRegister").on("click", function (e) {
        e.preventDefault();
        $("#registerContainer").show();
        $("#loginContainer").hide();
    });
});