document.addEventListener('DOMContentLoaded', initializeTicketSystem);

function initializeTicketSystem() {
    // DOM Elements
    const addItemButton = document.getElementById('addItem');
    const table = document.getElementById('ticketTable');
    const addItemWindow = document.querySelector(".addItemWindow");
    const addItemWindowButton = document.querySelector("#addItemWindowButton");
    const addItemWindowAllInputValues = document.querySelectorAll("#name,#department,#ticketDescription");
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    // Create status element
    const statusElement = createStatusElement();

    // Get formatted date
    const formattedDate = getFormattedDate();



    // Event Listeners
    iterateStatuses(table)
    document.getElementById("addItemWindowCloseWindow").addEventListener("click", showAddItemWindow)
    addItemButton.addEventListener('click', showAddItemWindow);
    addItemWindowButton.addEventListener('click', () => {
        const ticketDescription = document.getElementById("ticketDescription").value;
        addItem(table.rows.length, ticketDescription, statusElement.cloneNode(true), formattedDate,currentTime);
       
    });

    // Functions
    function showAddItemWindow() {
        addItemWindow.classList.toggle("hidden");
        document.getElementById("overlay").classList.toggle("hidden");
    }

    function addItem(ticketNum, ticketDescription, status, date,time) {
        if(![ticketNum,ticketDescription,status,date].some(item => item === "")){
            
            const newRow = table.insertRow(-1);
            newRow.insertCell(0).textContent = ticketNum;
            newRow.insertCell(1).textContent = ticketDescription;
            newRow.insertCell(2).appendChild(status);
            newRow.insertCell(3).textContent = date;
            newRow.insertCell(4).textContent = time;

            for (const addItemWindowInput of addItemWindowAllInputValues) {
                addItemWindowInput.value = ""
            }
        }
        else {
            alert("Please fill out all the inputs")
            
        }
       
        
    }
}

function createStatusElement() {
    const statusElement = document.createElement("select");
    const statusOptions = ["Active", "Completed"];
    statusOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        statusElement.appendChild(optionElement);
    });
    return statusElement;
}

function getFormattedDate() {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/New_York'  // Adjust this to your timezone
    });
}

function iterateStatuses(tableElement) {
    tableElement.querySelectorAll("select").forEach(item => {
        item.addEventListener("change", function(e) {
            
            let target = e.target;

            if(target.value.toLowerCase() === "completed") {
                console.log("item changed", target);
                target.closest("tr").style.backgroundColor ="red"
            }
            else{
                target.closest("tr").style.backgroundColor ="transparent"
            }
        })
    })
}





// Why use event delegation?
//     Performance: With many select elements, attaching individual listeners can be memory-intensive and slow, especially on older devices.
//
//     Dynamic content: If you're adding or removing rows dynamically, you don't need to manually add/remove event listeners for new elements.
//
// Cleaner code: It can lead to more maintainable code by centralizing your event handling logic.


// function iterateStatuses(tableElement) {
//     tableElement.addEventListener("change", function(e) {
//         if (e.target.tagName === "SELECT") {
//             let target = e.target;
//             if (target.value.toLowerCase() === "completed") {
//                 target.closest("tr").style.backgroundColor = "red";
//             } else {
//                 target.closest("tr").style.backgroundColor = "transparent";
//             }
//         }
//     });
// }
