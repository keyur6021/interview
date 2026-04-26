const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Centralized API layer — keeps fetch logic OUT of the store and components.
// This makes it easy to swap APIs (e.g., mock vs real) without touching store logic.

export const fetchUsersAPI = async () => {
    const res = await fetch(`${BASE_URL}/users`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return res.json()
}

// Simulates a POST — JSONPlaceholder doesn't persist, but returns a fake response
export const addUserAPI = async (user) => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return res.json()
}

