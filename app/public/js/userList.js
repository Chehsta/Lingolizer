document.addEventListener("DOMContentLoaded", () => {
    const usersTableBody = document.querySelector("#users-table tbody");
    const paginationDiv = document.getElementById("pagination");

    let currentPage = 1;
    const limit = 10; // Number of users per page

    // Fetch paginated users from the API
    async function fetchUsers(page = 1) {
        let url = `/api/users?page=${page}&limit=${limit}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                renderUsers(data.users);
                renderPagination(data.totalPages, data.currentPage);
            } else {
                usersTableBody.innerHTML = `<tr><td colspan="3">${data.message}</td></tr>`;
                paginationDiv.innerHTML = "";
            }
        } catch (error) {
            usersTableBody.innerHTML = `<tr><td colspan="3">Error fetching users</td></tr>`;
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
        <td>
          <a href="/listing/${user.id}">View Details</a>
        </td>
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
            btn.addEventListener("click", () => {
                fetchUsers(i);
            });
            paginationDiv.appendChild(btn);
        }
    }

    // Initial fetch
    fetchUsers(currentPage);
});
