$(document).ready(function () {
    $("#loginButton").on("click", function (e) {
        e.preventDefault();
        var loginData = {
            username: $("#loginUsername").val(),
            password: $("#loginPassword").val()
        };
        $.ajax({
            type: "POST",
            url: "/Umbraco/Api/Membership/Login",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(loginData)
        }).done(function (data) {
            if (data.success === true) {
                $("#registerContainer").hide();
                $("#loginContainer").hide();
                $("#loginRegisterButtons").hide();
                $("#loggedIn").show();
            } else {
                $("#loginPassword").val("");
                $("#errorMessage").val(data.errorMessage);
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