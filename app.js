async function handleDelete(id){
  try {
    const response = await fetch("https://backendtask-d800b53a6ba1.herokuapp.com/users/"+id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.reload();
    } else {
        console.error("Failed to send data:", response.statusText);
    }
} catch (error) {
    console.error("Error:", error);
}
}
async function handleUpdate(item){
    const nameInput = document.getElementById("nameInput")
    const phoneNumberInput = document.getElementById("phoneNumberInput")
    const emailInput = document.getElementById("emailInput")
    const hobbiesInput = document.getElementById("hobbiesInput")
    const idInput = document.getElementById("idInput")
    nameInput.value  = item.name;
    phoneNumberInput.value = item.phoneNumber;
    emailInput.value = item.email;
    hobbiesInput.value = item.hobbies;
    idInput.value = item.id;
    openAddForm();
    console.log(item);
}
async function handleSend(item){
    console.log('inside send',item);
    try {
        const response = await fetch("https://backendtask-d800b53a6ba1.herokuapp.com/users/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        if (response.ok) {
            console.log("Mail Sent");
        } else {
            console.error("Failed to send email:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
function openAddForm() {
    var addForm = document.getElementById("addForm");
    addForm.style.display = "block";
}
function addValueToFrom(){

}
function closeAddForm() {
    var addForm = document.getElementById("addForm");
    addForm.style.display = "none";
    window.location.reload();
}

function createTable(data) {
    // Create a table element
    const table = document.createElement("table");

    // Create a header row
    const headerRow = table.insertRow();
    for (const key in data[0]) {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    }
    const updateTh = document.createElement("th");
    updateTh.textContent = "Update";
    headerRow.appendChild(updateTh);

    const deleteTh = document.createElement("th");
    deleteTh.textContent = "Delete";
    headerRow.appendChild(deleteTh);
    data.forEach((item) => {
        const row = table.insertRow();
        for (const key in item) {
            const cell = row.insertCell();
            cell.textContent = item[key];
        }
        const updateCell = row.insertCell();
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => handleUpdate(item));
        updateCell.appendChild(updateButton);

        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => handleDelete(item.id));
        deleteCell.appendChild(deleteButton);

        const send = row.insertCell()
        const sendButton = document.createElement('button');
        sendButton.textContent = "Send";
        sendButton.addEventListener('click',()=>handleSend(item))
        send.appendChild(sendButton);
    });

    // Append the table to the container
    const tableContainer = document.getElementById("table-container");
    tableContainer.appendChild(table);
}
async function saveFormData() {
    const nameInput = document.getElementById("nameInput").value;
    const phoneNumberInput = document.getElementById("phoneNumberInput").value;
    const emailInput = document.getElementById("emailInput").value;
    const hobbiesInput = document.getElementById("hobbiesInput").value;
    const idInput = document.getElementById("idInput").value;
    const formData = {
        name: nameInput,
        phoneNumber: phoneNumberInput,
        email: emailInput,
        hobbies: hobbiesInput,
    };
    console.log(idInput);
    if(idInput && idInput.length > 0){
      formData.id = idInput
      console.log('insideif');
    }
    try {
        const response = await fetch("https://backendtask-d800b53a6ba1.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            closeAddForm();
        } else {
            console.error("Failed to save data:", response);
            const data = await response.json();
            console.log(data.message);
            var alertMessage = '';
            for(var i = 0;i<data.message.length;i++){
                alertMessage = alertMessage + data.message[i]+',  \n';
            }
            alert(alertMessage);

        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function myFunction() {
    console.log("HTML is fully loaded");
    try {
        const response = await fetch("https://backendtask-d800b53a6ba1.herokuapp.com/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            createTable(data);
            console.log(data);
        } else {
            console.error("Failed to send data:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Attach the function to the window.onload event
window.onload = myFunction;
