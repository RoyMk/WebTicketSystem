document.addEventListener('DOMContentLoaded', initializeTicketSystem);

function initializeTicketSystem() {
    // DOM Elements
    const table = document.getElementById('ticketTable');
    const tableContextMenu = document.querySelector(".context-menu-row");
    const deleteItemOption = document.querySelector('.option-delete');
    const addItemButton = document.getElementById('addItem');
    const addItemWindow = document.querySelector(".addItemWindow");
    const addItemWindowButton = document.querySelector("#addItemWindowButton");
    const addItemWindowAllInputValues = document.querySelectorAll("#name,#department,#ticketDescription,#roomNumber");
    const name = document.getElementById("name");
    const roomNumber = document.getElementById('roomNumber');
    const department = document.getElementById('department');
    const ticketDescription = document.getElementById("ticketDescription");

    // Constants
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const formattedDate = getFormattedDate();

    // Initialize
    loadTableData();
    const observer = new MutationObserver(saveTableData);
    observer.observe(table, { childList: true, subtree: true });

    // Event Listeners
    document.addEventListener('click', handleOutsideClick);
    table.addEventListener("change", handleEventChanged);
    table.addEventListener("contextmenu", deleteTableItem);
    document.getElementById("addItemWindowCloseWindow").addEventListener("click", toggleAddItemWindow);
    addItemButton.addEventListener('click', toggleAddItemWindow);
    addItemWindowButton.addEventListener('click', handleAddItem);

    // Functions
    function toggleAddItemWindow() {
        addItemWindow.classList.toggle("hidden");
        document.getElementById("overlay").classList.toggle("hidden");
    }

    function handleAddItem() {
        let tableSize = table.rows.length;
        addItem(
            tableSize,
            name.value,
            department.value,
            roomNumber.value,
            ticketDescription.value,
            createStatusElement(),
            formattedDate,
            currentTime
        );
    }

    function addItem(ticketNumber, name, department, room, ticketDescription, status, date, time) {
        if ([name, department, ticketDescription, room].every(item => item !== "")) {
            const newRow = table.insertRow(-1);
            [ticketNumber, name, department, room, ticketDescription, status, date, time].forEach((value, index) => {
                const cell = newRow.insertCell(index);
                if (index === 5) {
                    cell.appendChild(value);
                } else {
                    cell.textContent = value;
                }
            });

            addItemWindowAllInputValues.forEach(input => input.value = "");
        } else {
            alert("Please fill out all the inputs");
        }
    }

    function createStatusElement() {
        const statusElement = document.createElement("select");
        ["Active", "Completed", "Pending"].forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.textContent = option;
            statusElement.appendChild(optionElement);
        });
        return statusElement;
    }

    function getFormattedDate() {
        return new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/New_York'
        });
    }

    function handleEventChanged(event) {
        if (event.target.tagName === "SELECT") {
            const target = event.target;
            const row = target.closest("tr");
            row.style.backgroundColor = target.value.toLowerCase() === "completed" ? "lightgreen" :
                target.value.toLowerCase() === "pending" ? "#FF8C00" :
                    "transparent";
        }
    }

    function loadTableData() {
        const savedData = localStorage.getItem('tableData');
        if (savedData) {
            JSON.parse(savedData).slice(1).forEach(rowData => {
                const row = table.insertRow();
                rowData.forEach(cellData => {
                    row.insertCell().innerText = cellData;
                });
            });
        }
    }

    function saveTableData() {
        const tableData = Array.from(table.rows).map(row =>
            Array.from(row.cells).map(cell => cell.innerText)
        );
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }

    function deleteTableItem(item) {
        item.preventDefault();
        const mouseCoords = { clientX: item.clientX, clientY: item.clientY };
        showContextMenu(mouseCoords);
        const clickedItem = item.target;

        deleteItemOption.addEventListener('click', () => {
            if (clickedItem.tagName === "TD") {
                const getRow = clickedItem.closest("tr");
                if (getRow.rowIndex > 0) {
                    table.deleteRow(getRow.rowIndex);
                    hideContextMenu();
                }
            } else {
                alert("Cannot delete headers row");
                hideContextMenu();
            }
        }, { once: true });
    }

    function showContextMenu(coords) {
        tableContextMenu.style.visibility = "visible";
        tableContextMenu.style.left = `${coords.clientX}px`;
        tableContextMenu.style.top = `${coords.clientY}px`;
    }

    function hideContextMenu() {
        tableContextMenu.style.visibility = "hidden";
    }

    function handleOutsideClick(event) {
        if (!tableContextMenu.contains(event.target)) {
            hideContextMenu();
        }
    }
}
