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

    iterateStatuses(table)

    // Event Listeners
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
    console.log(tableElement.rows[1].querySelector("select").value);
}
   