// JavaScript code

let entries = [];

function showTab(tab) {
    document.getElementById("selectedTab").innerHTML = tab;

    // Modify labels based on selected tab
    if (tab === "Transfer") {
        document.getElementById("accountLabel").innerHTML = "From:";
        document.getElementById("categoryLabel").innerHTML = "To:";
    } else {
        document.getElementById("accountLabel").innerHTML = "Account:";
        document.getElementById("categoryLabel").innerHTML = "Category:";
    }
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

        // Save entries to local storage
        localStorage.setItem("entries", JSON.stringify(entries));

        // Clear input fields
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
    localStorage.setItem("entries", JSON.stringify(entries));
}

function exportToExcel() {
    // Logic to export entries to Excel (not implemented in this example)
    // You might want to use a library or additional code for Excel export
    alert("Export to Excel feature is not implemented in this example.");
}

function clearInputFields() {
    document.getElementById("dateInput").value = "";
    document.getElementById("accountInput").value = "";
    document.getElementById("categoryInput").value = "";
    document.getElementById("amountInput").value = "";
    document.getElementById("noteInput").value = "";
}

// Retrieve entries from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
        entries = JSON.parse(storedEntries);
        updateEntryList();
    }
});
