import UserList from './UserList'
import AddUser from './AddUser'
import ComparisonPanel from './ComparisonPanel'
import useUserStore from '../../store/userStore'

const ZustandDemo = () => {
    return (
        <div style={styles.page}>
            {/* Inject the spinner keyframe animation */}
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

            <div style={styles.header}>
                <h1 style={styles.heading}>Zustand State Management</h1>
                <p style={styles.sub}>
                    A complete beginner-to-advanced demo with async actions, selectors,
                    devtools middleware, and localStorage persistence.
                </p>
            </div>

            {/* Concept callout boxes */}
            <div style={styles.conceptGrid}>
                <Callout icon="🏪" title="Single Store" text="All state lives in one create() call. No Provider, no reducers." />
                <Callout icon="⚡" title="Direct Updates" text="Call set() directly inside actions. No action types or dispatch." />
                <Callout icon="🎯" title="Selectors" text="Subscribe to only what you need. Prevents unnecessary re-renders." />
                <Callout icon="💾" title="Persistence" text="persist() middleware auto-saves to localStorage and rehydrates." />
            </div>

            <div style={styles.grid}>
                <div style={styles.left}>
                    <UserList />
                </div>
                <div style={styles.right}>
                    <AddUser />
                    <StoreInspector />
                </div>
            </div>

            <ComparisonPanel />
        </div>
    )
}

// Live store inspector — shows raw Zustand state in real time
// This is a great debugging tool during development
const StoreInspector = () => {
    // Subscribe to the entire store for inspection purposes only
    // In real components, always use selectors instead
    const state = useUserStore()

    return (
        <div style={styles.inspector}>
            <p style={styles.inspectorTitle}>🔍 Live Store State</p>
            <pre style={styles.pre}>
                {JSON.stringify(
                    { usersCount: state.users.length, loading: state.loading, error: state.error },
                    null, 2
                )}
            </pre>
            <p style={styles.hint}>
                💡 Open Redux DevTools extension to see full state history
            </p>
        </div>
    )
}

const Callout = ({ icon, title, text }) => (
    <div style={styles.callout}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div>
            <p style={styles.calloutTitle}>{title}</p>
            <p style={styles.calloutText}>{text}</p>
        </div>
    </div>
)

const styles = {
    page: { maxWidth: 1100, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' },
    header: { marginBottom: 24 },
    heading: { color: '#c4b5fd', fontSize: 28, margin: '0 0 8px' },
    sub: { color: '#94a3b8', margin: 0, lineHeight: 1.6 },
    conceptGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 },
    callout: { background: '#1e1e2e', border: '1px solid #2d2d3f', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' },
    calloutTitle: { color: '#e2e8f0', fontWeight: 600, margin: '0 0 4px', fontSize: 14 },
    calloutText: { color: '#94a3b8', margin: 0, fontSize: 12, lineHeight: 1.5 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' },
    left: { minWidth: 0 },
    right: { display: 'flex', flexDirection: 'column', gap: 16 },
    inspector: { background: '#0f0f1a', border: '1px solid #2d2d3f', borderRadius: 8, padding: 14 },
    inspectorTitle: { color: '#94a3b8', margin: '0 0 8px', fontSize: 13, fontWeight: 600 },
    pre: { color: '#86efac', fontSize: 12, margin: 0, lineHeight: 1.6 },
    hint: { color: '#4b5563', fontSize: 11, margin: '8px 0 0', lineHeight: 1.5 },
}

export default ZustandDemo
