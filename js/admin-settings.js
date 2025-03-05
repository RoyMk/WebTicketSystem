document.addEventListener("DOMContentLoaded", initializeSettingsPage);


function initializeSettingsPage(){
    document.querySelector(".savePermissionsButton").addEventListener(
        "click", (e) =>{
            document.querySelector(".overlay").classList.toggle("hidden");
        }
    )
    const permissionsPanel = document.querySelector(".editPermissionsWindow");

    
    
    document.querySelector(".closePermissionsWindow").addEventListener("click", () =>{
        closePermissionWindow(permissionsPanel)
    });

    

}


function closePermissionWindow(window){
    window.style.display = "none"
}