document.addEventListener("DOMContentLoaded", initializeSettingsPage);
const permissionsPanel = document.querySelector(".editPermissionsWindow");
const notificationSave = document.querySelector(".savedPermissionsNotification");
const activeUser = document.querySelector(".activeUser");



function initializeSettingsPage(){
    document.querySelector(".closePermissionsWindow").addEventListener("click", () =>{
        closePermissionWindow(permissionsPanel)
    });

    document.querySelectorAll(".user").forEach((element) => {
        element.addEventListener("click", function (e) {
            e.preventDefault();
            openPermissionsWindow(permissionsPanel);
            activeUser.textContent = e.target.textContent;
        })
    })


    document.querySelector(".savePermissionsButton").addEventListener(
        "click", () => {savePermissions(permissionsPanel)});
}

function savePermissions(window){
    document.querySelector(".overlay").classList.toggle("hidden");
    notificationSave.style.visibility = "visible";
    notificationSave.style.left = "50%";
    notificationSave.style.transform = "translate(-50%,-50%)";
    window.style.visibility = "hidden";
    setTimeout(() =>{
        notificationSave.style.left = "500%";
        notificationSave.style.visibility = "hidden";
    },3000)
    
}

function openPermissionsWindow(window){
    window.style.visibility = "visible";
    document.querySelector(".overlay").classList.toggle("hidden");

}
function closePermissionWindow(window){
    window.style.visibility = "hidden"
    document.querySelector(".overlay").classList.toggle("hidden");
    
}

