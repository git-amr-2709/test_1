const subjects = [
    "Mathematics-I", "Mathematics-II", "Discrete Mathematics",
    "Software Project Management", "Automata Theory"
];

// Example Data (Add more as needed)
const pyqData = {
    "Mathematics-I": [
        { id: "MAT101-1", exam: "ES", year: "2017" },
        { id: "MAT101-2", exam: "ES", year: "2018" }
    ],
    "Mathematics-II": [
        { id: "MAT102-1", exam: "ES", year: "2019" },
        { id: "MAT102-2", exam: "ES", year: "2021" }
    ]
};

const searchInput = document.getElementById("searchInput");
const collegeInput = document.getElementById("collegeInput");
const suggestions = document.getElementById("suggestions");
const dataTable = document.getElementById("dataTable");
const tableBody = document.getElementById("tableBody");

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    suggestions.innerHTML = "";
    if (!query) {
        suggestions.classList.add("hidden");
        return;
    }

    const filteredSubjects = subjects.filter(subj => subj.toLowerCase().includes(query));
    if (filteredSubjects.length > 0) {
        suggestions.classList.remove("hidden");
        filteredSubjects.forEach(subj => {
            const item = document.createElement("li");
            item.textContent = subj;
            item.classList.add("cursor-pointer", "p-2", "hover:bg-gray-700");
            item.onclick = () => selectSubject(subj);
            suggestions.appendChild(item);
        });
    } else {
        suggestions.classList.add("hidden");
    }
});

function selectSubject(subject) {
    searchInput.value = subject;
    suggestions.classList.add("hidden");
    displayTable(subject);
}

function displayTable(subject) {
    const college = collegeInput.value.trim();
    if (!college) {
        alert("Please enter your college name first.");
        return;
    }

    tableBody.innerHTML = "";
    if (!pyqData[subject]) {
        dataTable.classList.add("hidden");
        return;
    }

    pyqData[subject].forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="border border-gray-600 px-4 py-2">${college}</td>
            <td class="border border-gray-600 px-4 py-2">${item.id}</td>
            <td class="border border-gray-600 px-4 py-2">${item.exam}</td>
            <td class="border border-gray-600 px-4 py-2">${item.year}</td>
            <td class="border border-gray-600 px-4 py-2">
                <button class="bg-green-600 px-3 py-1 rounded text-white">View</button>
                <button class="bg-green-600 px-3 py-1 rounded text-white ml-2">Download</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    dataTable.classList.remove("hidden");
}
