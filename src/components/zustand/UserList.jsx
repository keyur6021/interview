import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useUserStore, { selectUsers, selectLoading, selectError, selectActions } from '../../store/userStore'

// Each selector call creates an INDEPENDENT subscription.
// This component only re-renders when users, loading, or error changes —
// NOT when unrelated store slices change (e.g., a counter in the same store).
const UserList = () => {
    const users = useUserStore(selectUsers)
    const loading = useUserStore(selectLoading)
    const error = useUserStore(selectError)
    console.log("object0", users)
    // useShallow does a shallow comparison of the returned object's keys,
    // so Zustand won't see a new reference on every render — fixing the infinite loop.
    const { fetchUsers, removeUser, clearError, forceRefetch } = useUserStore(useShallow(selectActions))

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    if (loading) return (
        <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={{ color: '#aaa', marginTop: 12 }}>Loading users...</p>
        </div>
    )

    if (error) return (
        <div style={styles.errorBox}>
            <p>⚠️ {error}</p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={clearError} style={styles.btnSecondary}>Dismiss</button>
                <button onClick={() => { clearError(); forceRefetch(); fetchUsers() }} style={styles.btn}>Retry</button>
            </div>
        </div>
    )

    return (
        <div>
            <div style={styles.header}>
                <h2 style={styles.title}>Users ({users.length})</h2>
                <button onClick={() => { forceRefetch(); fetchUsers() }} style={styles.btnSecondary}>
                    ↺ Refetch
                </button>
            </div>

            {users.length === 0 && (
                <p style={{ color: '#888' }}>No users found. Add one below!</p>
            )}

            <ul style={styles.list}>
                {users.map((user) => (
                    <li key={user.id} style={styles.card}>
                        <div>
                            <p style={styles.name}>{user.name}</p>
                            <p style={styles.meta}>{user.email}</p>
                            <p style={styles.meta}>{user.phone}</p>
                        </div>
                        <button
                            onClick={() => removeUser(user.id)}
                            style={styles.removeBtn}
                            title="Remove user"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const styles = {
    center: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 },
    spinner: { width: 36, height: 36, border: '4px solid #333', borderTop: '4px solid #7c3aed', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
    errorBox: { background: '#2d1a1a', border: '1px solid #7f1d1d', borderRadius: 8, padding: 16, color: '#fca5a5' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    title: { color: '#e2e8f0', margin: 0 },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
    card: { background: '#1e1e2e', border: '1px solid #2d2d3f', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    name: { color: '#c4b5fd', fontWeight: 600, margin: '0 0 4px' },
    meta: { color: '#94a3b8', fontSize: 13, margin: '2px 0' },
    btn: { background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' },
    btnSecondary: { background: 'transparent', color: '#94a3b8', border: '1px solid #4b5563', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' },
    removeBtn: { background: 'transparent', color: '#f87171', border: '1px solid #7f1d1d', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 },
}

export default UserList
