document.addEventListener("DOMContentLoaded", async () => {
    const detailsDiv = document.getElementById("listing-details");

    // Assume the URL is like /listing/1 – extract the ID
    const pathParts = window.location.pathname.split('/');
    const userId = pathParts[pathParts.length - 1];

    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        if (response.ok) {
            detailsDiv.innerHTML = `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
      `;
        } else {
            detailsDiv.innerHTML = `<p>Error: ${user.message}</p>`;
        }
    } catch (error) {
        detailsDiv.innerHTML = `<p>Error fetching listing details</p>`;
    }
});
