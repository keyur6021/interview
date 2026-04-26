// Pure UI component — no store dependency. Just educational content.
const ComparisonPanel = () => {
    const rows = [
        { aspect: 'Setup',          redux: 'store + Provider + reducer + action types + dispatch', zustand: 'create() — that\'s it, no Provider needed' },
        { aspect: 'Boilerplate',    redux: 'High — action types, creators, reducers, selectors',   zustand: 'Minimal — state + actions in one object' },
        { aspect: 'Async actions',  redux: 'redux-thunk or redux-saga middleware required',         zustand: 'Just use async/await inside the action' },
        { aspect: 'Data flow',      redux: 'Strict unidirectional: action → reducer → state',      zustand: 'Direct: call set() anywhere, anytime' },
        { aspect: 'DevTools',       redux: 'Built-in via Redux DevTools',                          zustand: 'Via devtools() middleware (same extension)' },
        { aspect: 'Persistence',    redux: 'redux-persist (separate package)',                     zustand: 'persist() middleware built-in' },
        { aspect: 'Performance',    redux: 'useSelector with equality fn needed',                  zustand: 'Selector functions, useShallow for objects' },
        { aspect: 'Learning curve', redux: 'Steep — many concepts to learn upfront',               zustand: 'Gentle — feels like useState but global' },
        { aspect: 'Bundle size',    redux: 'react-redux + @reduxjs/toolkit ≈ ~40KB',              zustand: '≈ 1KB gzipped' },
        { aspect: 'Best for',       redux: 'Large teams, complex state machines, strict patterns', zustand: 'Most apps — fast iteration, clean code' },
    ]

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>⚡ Zustand vs Redux</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Aspect</th>
                            <th style={{ ...styles.th, color: '#f87171' }}>Redux</th>
                            <th style={{ ...styles.th, color: '#86efac' }}>Zustand ✓</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={row.aspect} style={{ background: i % 2 === 0 ? '#0f0f1a' : 'transparent' }}>
                                <td style={{ ...styles.td, color: '#c4b5fd', fontWeight: 600 }}>{row.aspect}</td>
                                <td style={{ ...styles.td, color: '#fca5a5' }}>{row.redux}</td>
                                <td style={{ ...styles.td, color: '#86efac' }}>{row.zustand}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const styles = {
    container: { background: '#1e1e2e', border: '1px solid #2d2d3f', borderRadius: 10, padding: 20, marginTop: 24 },
    title:     { color: '#e2e8f0', margin: '0 0 16px', fontSize: 16 },
    table:     { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th:        { textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #374151', color: '#94a3b8' },
    td:        { padding: '8px 12px', verticalAlign: 'top', lineHeight: 1.5 },
}

export default ComparisonPanel
