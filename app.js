// JavaScript code

let entries = [];
let currentTab = 'Form'; // Default tab

function showTab(tab) {
    currentTab = tab;
    updatePageContent();
}

function saveEntry() {
    const date = document.getElementById("dateInput").value;
    const account = document.getElementById("accountInput").value;
    const category = document.getElementById("categoryInput").value;
    const amount = document.getElementById("amountInput").value;
    const note = document.getElementById("noteInput").value;

    if (date && account && category && amount) {
        const entry = {
            date,
            account,
            category,
            amount,
            note
        };

        entries.push(entry);
        updateEntryList();
        clearInputFields();
    } else {
        alert("Please fill in all required fields (Date, Account, Category, Amount).");
    }
}

function updateEntryList() {
    const entryList = document.getElementById("entryList");
    entryList.innerHTML = "";

    entries.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${entry.date}</strong> - ${entry.amount} - ${entry.category} - ${entry.note} <button onclick="deleteEntry(${index})">Delete</button>`;
        entryList.appendChild(listItem);
    });
}

function deleteEntry(index) {
    entries.splice(index, 1);
    updateEntryList();
}

function clearInputFields() {
    document.getElementById("dateInput").value = "";
    document.getElementById("accountInput").value = "";
    document.getElementById("categoryInput").value = "";
    document.getElementById("amountInput").value = "";
    document.getElementById("noteInput").value = "";
}

function updatePageContent() {
    const pageTitle = document.getElementById("pageTitle");
    const buttonContainer = document.getElementById("button-container");

    // Update page title and button visibility based on the current tab
    switch (currentTab) {
        case 'Form':
            pageTitle.innerText = 'Form';
            buttonContainer.style.display = 'flex';
            break;
        case 'Transaction':
            pageTitle.innerText = 'Transaction';
            buttonContainer.style.display = 'none';
            break;
        case 'Report':
            pageTitle.innerText = 'Report';
            buttonContainer.style.display = 'none';
            break;
        case 'Accounts':
            pageTitle.innerText = 'Accounts';
            buttonContainer.style.display = 'none';
            break;
    }
}

// Retrieve entries from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
        entries = JSON.parse(storedEntries);
        updateEntryList();
    }
});
