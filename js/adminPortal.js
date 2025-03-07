document.addEventListener('DOMContentLoaded', initializeTicketSystem);

const table = document.getElementById('ticketTable')
table.addEventListener("change",handleEventChanged);

function initializeTicketSystem() {
    // DOM Elements
    const addItemButton = document.getElementById('addItem');
    const addItemWindow = document.querySelector(".addItemWindow");
    const addItemWindowButton = document.querySelector("#addItemWindowButton");
    const addItemWindowAllInputValues = document.querySelectorAll("#name,#department,#ticketDescription,#roomNumber");
    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    const name = document.getElementById("name");
    const roomNumber = document.getElementById('roomNumber');
    const department = document.getElementById('department');
    const ticketDescription = document.getElementById("ticketDescription");


    // Create status element
    const statusElement = createStatusElement();

    // Get formatted date
    const formattedDate = getFormattedDate();



    // Event Listeners
   
    document.getElementById("addItemWindowCloseWindow").addEventListener("click", showAddItemWindow)
    addItemButton.addEventListener('click', showAddItemWindow);
    addItemWindowButton.addEventListener('click', () => {
        let tableSize = table.rows.length;
        addItem(
            tableSize,
            name.value,
            department.value ,
            roomNumber.value,
            ticketDescription.value, 
            statusElement.cloneNode(true), 
            formattedDate,
            currentTime);
       
    });

    // Functions
    function showAddItemWindow() {
        addItemWindow.classList.toggle("hidden");
        document.getElementById("overlay").classList.toggle("hidden");
    }

    function addItem(ticketNumber,name,department,room,ticketDescription, status, date,time) {
        if(![name,department,ticketDescription,room].some(item => item === "")){
            
            const newRow = table.insertRow(-1);
            newRow.insertCell(0).textContent = ticketNumber;
            newRow.insertCell(1).textContent = name;
            newRow.insertCell(2).textContent = department;
            newRow.insertCell(3).textContent = room;
            newRow.insertCell(4).textContent = ticketDescription;
            newRow.insertCell(5).appendChild(status);
            newRow.insertCell(6).textContent = date;
            newRow.insertCell(7).textContent = time;

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

function handleEventChanged(event) {
    if (event.target.tagName === "SELECT") {
            let target = event.target;
            if (target.value.toLowerCase() === "completed") {
                target.closest("tr").style.backgroundColor = "lightgreen";
            } else {
                target.closest("tr").style.backgroundColor = "transparent";
            }
        }
}
