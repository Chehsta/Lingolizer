document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.querySelector("#users-table tbody");
    const paginationDiv = document.getElementById("pagination");

    // Search UI elements
    const searchContainer = document.createElement("div");
    searchContainer.id = "search-container";
    searchContainer.innerHTML = `
        <input type="text" id="search-name" class="input-box" style="margin-top:20px" placeholder="Search Name">
        <input type="text" id="search-language" class="input-box" placeholder="Search Language">
        <button id="search-btn" class="button">Search</button>
    `;
    document.body.appendChild(searchContainer);

    const searchNameInput = document.getElementById("search-name");
    const searchLanguageInput = document.getElementById("search-language");
    const searchBtn = document.getElementById("search-btn");

    let currentPage = 1;
    const limit = 10; // Number of users per page

    // Fetch paginated and filtered users from the API
    async function fetchUsers(page = 1) {
        currentPage = page;
        let url = `/api/users?page=${page}&limit=${limit}`;

        const nameFilter = searchNameInput.value.trim();
        const langFilter = searchLanguageInput.value.trim();
        if (nameFilter) url += `&search_name=${encodeURIComponent(nameFilter)}`;
        if (langFilter) url += `&search_language=${encodeURIComponent(langFilter)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                renderUsers(data.users);
                renderPagination(data.totalPages, data.currentPage);
            } else {
                usersTableBody.innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                paginationDiv.innerHTML = "";
            }
        } catch (error) {
            usersTableBody.innerHTML = `<tr><td colspan="4">Error fetching users</td></tr>`;
            paginationDiv.innerHTML = "";
        }
    }

    // Render user rows in the table
    function renderUsers(users) {
        usersTableBody.innerHTML = "";
        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.native_language}</td>
                <td><a href="/listing/${user.id}">View Details</a></td>
            `;
            usersTableBody.appendChild(tr);
        });
    }

    // Render pagination buttons
    function renderPagination(totalPages, currentPage) {
        paginationDiv.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("pagination-btn");
            if (i === currentPage) {
                btn.classList.add("active");
            }
            btn.addEventListener("click", () => fetchUsers(i));
            paginationDiv.appendChild(btn);
        }
    }

    // Search button event
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fetchUsers(1);
    });

    // Initial fetch
    fetchUsers(currentPage);
});