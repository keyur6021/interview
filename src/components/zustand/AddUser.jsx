import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useUserStore, { selectLoading, selectActions } from '../../store/userStore'

// This component only subscribes to `loading` and `addUser`.
// It has ZERO knowledge of the users array — it won't re-render when users change.
// This is the power of fine-grained selectors.
const AddUser = () => {
    const loading = useUserStore(selectLoading)
    const { addUser } = useUserStore(useShallow(selectActions))
    const [form, setForm] = useState({ name: '', email: '', phone: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name.trim() || !form.email.trim()) return

        await addUser(form)
        setForm({ name: '', email: '', phone: '' })
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 2500)
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Add New User</h3>

            {submitted && (
                <div style={styles.successBanner}>✓ User added successfully!</div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="name"
                    placeholder="Full name *"
                    value={form.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email address *"
                    value={form.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    name="phone"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" disabled={loading} style={styles.btn}>
                    {loading ? 'Adding...' : '+ Add User'}
                </button>
            </form>
        </div>
    )
}

const styles = {
    container: { background: '#1e1e2e', border: '1px solid #2d2d3f', borderRadius: 10, padding: 20 },
    title: { color: '#c4b5fd', margin: '0 0 16px', fontSize: 16 },
    form: { display: 'flex', flexDirection: 'column', gap: 10 },
    input: { background: '#0f0f1a', color: '#e2e8f0', border: '1px solid #374151', borderRadius: 6, padding: '10px 12px', fontSize: 14, outline: 'none' },
    btn: { background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', cursor: 'pointer', fontWeight: 600, fontSize: 14 },
    successBanner: { background: '#14532d', color: '#86efac', borderRadius: 6, padding: '8px 12px', marginBottom: 12, fontSize: 13 },
}

export default AddUser
