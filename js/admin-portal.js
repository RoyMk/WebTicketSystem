document.addEventListener('DOMContentLoaded', function () {
    // const getLinkToLogin = document.getElementById('returnToLogin');
    // getLinkToLogin.addEventListener('click', function(event) {
    //     event.preventDefault(); // Prevent default link behavior
    //     window.location.replace('/WebTicketSystem/pages/login.html');
    // });

    const addItemButton = document.getElementById('addItem');
    const table = document.getElementById('ticketTable');
    const addItemWindow = document.querySelector(".addItemWindow")
    let values = []

   

    addItemButton.addEventListener('click', function (event) {

        addItemWindow.classList.toggle("hidden");


    });

    document.querySelector("#addItemWindowButton")
        .addEventListener("click", () => {

            for (const ticketValue of ["ticketNumber", "ticketDescription", "ticketStatus", "date"]) {
                values.push(document.getElementById(ticketValue).value)
                
            }
            addItem(values[0],values[1],values[2],values[3]);
            // reset the values
            values.length = 0
        });


    function addItem(ticketNum, ticketDescription, status, date) {
        const newRow = table.insertRow(-1)

        // Insert cells
        const cell1 = newRow.insertCell(0).textContent = ticketNum;
        const cell2 = newRow.insertCell(1).textContent = ticketDescription;
        const cell3 = newRow.insertCell(2).textContent = status;
        const cell4 = newRow.insertCell(3).textContent = date;

    }
});