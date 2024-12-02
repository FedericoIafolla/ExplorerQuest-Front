// Funzione per effettuare il login
export const loginUser = async (username, password) => {
    try {
        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        // Salva il token JWT nel localStorage per l'autenticazione
        localStorage.setItem("token", data.token);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Funzione per recuperare i dettagli dell'utente autenticato
export const getUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User not logged in");
    }

    try {
        const response = await fetch("http://localhost:8080/api/user/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user details");
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

// Funzione per effettuare il logout
export const logoutUser = () => {
    localStorage.removeItem("token");
};

// Funzione per cancellare l'account dell'utente autenticato
export const deleteUserAccount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("User not logged in");
    }

    try {
        const response = await fetch("http://localhost:8080/api/user/delete", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete user account");
        }

        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
