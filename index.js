const fetchUrl = "https://testapi.io/api/Doviaks/resource/usersList";

const usersTable = document.querySelector("#userTable tbody");
const addUserForm = document.querySelector("#userForm");

async function fetchUsers() {
  try {
    const response = await fetch(fetchUrl);
    const result = await response.json();

    const users = Array.isArray(result) ? result : result.data || [];
    usersTable.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="deleteUser('${user.id}')">Delete</button>
                </td>
            `;
      usersTable.appendChild(row);
    });
  } catch (error) {
    console.error("Nepavyko gauti vartotoju sarasas:", error);
  }
}

addUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  try {
    await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    fetchUsers();
    addUserForm.reset();
  } catch (error) {
    console.error("Error", error);
  }
});

async function deleteUser(userId) {
  try {
    await fetch(`${fetchUrl}/${userId}`, { method: "DELETE" });
    fetchUsers();
  } catch (error) {
    console.error("Nepavyko istrinti vartotojo");
  }
}

fetchUsers();
