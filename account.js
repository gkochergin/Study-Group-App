const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const authMessage = document.querySelector("#auth-message");

function showAuthMessage(message) {
    authMessage.textContent = message;
}

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const submitButton = signupForm.querySelector('button[type="submit"]');

    if (!name) {
        showAuthMessage("Please enter your name.");
        return;
    }

    submitButton.disabled = true;
    showAuthMessage("Creating your account...");

    try {
        const { data, error } = await db.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });

        if (error) {
            showAuthMessage(`Could not create account: ${error.message}`);
        } else if (data.session) {
            showAuthMessage(`Account created. Welcome, ${name}!`);
            signupForm.reset();
        } else {
            showAuthMessage("Account created. Check your email to confirm your account.");
            signupForm.reset();
        }
    } catch (error) {
        showAuthMessage(`Could not create account: ${error.message}`);
    } finally {
        submitButton.disabled = false;
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const submitButton = loginForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    showAuthMessage("Logging in...");

    try {
        const { data, error } = await db.auth.signInWithPassword({ email, password });

        if (error) {
            showAuthMessage(`Could not log in: ${error.message}`);
        } else {
            const name = data.user.user_metadata.name || email;
            showAuthMessage(`Logged in. Welcome, ${name}!`);
            loginForm.reset();
        }
    } catch (error) {
        showAuthMessage(`Could not log in: ${error.message}`);
    } finally {
        submitButton.disabled = false;
    }
});
