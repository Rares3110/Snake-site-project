var navMenuIsOpen = false;
function openNav() 
{
    navMenuContent = document.getElementById("navMenuContent");

    if(navMenuIsOpen == false)
    {
        navMenuContent.style.width = "160px";
        navMenuIsOpen = true;
    }
    else
    {
        navMenuContent.style.width = "0px";
        navMenuIsOpen = false;
    }
}

function openLogin()
{
    loginBox = document.getElementById("loginBox");

    if(loginBox.style.height != "60vh")
    {
        loginBox.style.height = "60vh";
        loginBox.style.visibility = "visible";
        document.getElementById("loginUserName").value = "";
        document.getElementById("loginPass").value = "";
        document.getElementById("hydeOnLogin2").value = "";
        loginActive = true;
    }
    else
    {
        loginBox.style.height = "0vh";
        loginBox.style.visibility = "collapse";
        loginActive = false;
    }
}

var registerActive = false;
function showRegister()
{
    if(registerActive == false)
    {
        document.getElementById("hydeOnLogin1").style.visibility = "visible";
        document.getElementById("hydeOnLogin2").style.visibility = "visible";
        document.getElementById("loginButton").innerHTML = "REGISTER";
        registerActive = true;
    }
    else
    {
        document.getElementById("hydeOnLogin1").style.visibility = "collapse";
        document.getElementById("hydeOnLogin2").style.visibility = "collapse";
        document.getElementById("loginButton").innerHTML = "LOGIN";
        registerActive = false;
    }
}

function goGuest()
{
    document.getElementById("backToGuest").submit();
}