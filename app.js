// Local storage key for storing entries
const localStorageKey = 'personalKhataEntries';

// Function to save entry
function saveEntry() {
    const date = document.getElementById('dateInput').value;
    const category = document.getElementById('categoryInput').value;
    const amount = document.getElementById('amountInput').value;

    if (date && category && amount) {
        const entry = { date, category, amount };
        let entries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        entries.push(entry);
        localStorage.setItem(localStorageKey, JSON.stringify(entries));

        displayEntries();
        clearInputs();
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to display entries
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const entryList = document.getElementById('entryList');
    entryList.innerHTML = '';

    entries.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date} - ${entry.category} - ${entry.amount}`;
        entryList.appendChild(listItem);
    });
}

// Function to clear input fields
function clearInputs() {
    document.getElementById('dateInput').value = '';
    document.getElementById('categoryInput').value = '';
    document.getElementById('amountInput').value = '';
}

// Function to export entries to Excel
function exportToExcel() {
    const entries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const xlsContent = entries.map(entry => `${entry.date}\t${entry.category}\t${entry.amount}`).join('\n');
    const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'personal_khata_entries.xls';
    a.click();
}
