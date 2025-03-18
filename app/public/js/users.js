document.addEventListener("DOMContentLoaded", async () => {
    let currentPage = 1;
    const limit = 5;
  
    const fetchUsers = async (page = 1, category = "") => {
      const response = await fetch(`/api/users?page=${page}&limit=${limit}&category=${category}`);
      const data = await response.json();
      
      if (!response.ok) {
        document.getElementById("user-table").innerHTML = "<tr><td colspan='4'>No users found</td></tr>";
        return;
      }
  
      renderUsers(data.users);
      updatePagination(data.currentPage, data.totalPages);
    };
  
    const renderUsers = (users) => {
      const userTable = document.getElementById("user-table");
      userTable.innerHTML = "";
      
      users.forEach(user => {
        const row = `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.category}</td>
          <td><a href="/users/${user.id}">View</a></td>
        </tr>`;
        userTable.innerHTML += row;
      });
    };
  
    const updatePagination = (current, total) => {
      document.getElementById("page-info").textContent = `Page ${current} of ${total}`;
      document.getElementById("prev-btn").disabled = current === 1;
      document.getElementById("next-btn").disabled = current === total;
    };
  
    document.getElementById("prev-btn").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchUsers(currentPage, document.getElementById("category").value);
      }
    });
  
    document.getElementById("next-btn").addEventListener("click", () => {
      currentPage++;
      fetchUsers(currentPage, document.getElementById("category").value);
    });
  
    document.getElementById("filter-form").addEventListener("submit", (e) => {
      e.preventDefault();
      currentPage = 1;
      fetchUsers(currentPage, document.getElementById("category").value);
    });
  
    fetchUsers();
  });
  