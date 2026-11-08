const usersStatus = document.querySelector("#users-status");
const usersList = document.querySelector("#users-list");

async function loadUsers() {
    try {
        const { data: users, error } = await db
            .from("User")
            .select("Name")
            .order("Name", { ascending: true });

        if (error) {
            usersStatus.textContent = `Could not load users: ${error.message}`;
            return;
        }

        if (users.length === 0) {
            usersStatus.textContent = "No users have signed up yet.";
            return;
        }

        users.forEach((user) => {
            const card = document.createElement("li");
            card.className = "userCard";
            card.textContent = user.Name;
            usersList.appendChild(card);
        });

        usersStatus.textContent = `${users.length} user${users.length === 1 ? "" : "s"}`;
    } catch (error) {
        usersStatus.textContent = `Could not load users: ${error.message}`;
    } finally {
        usersStatus.setAttribute("aria-busy", "false");
    }
}

loadUsers();
