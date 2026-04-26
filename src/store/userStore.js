import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { fetchUsersAPI, addUserAPI } from '../services/userService'

// ─────────────────────────────────────────────────────────────────────────────
// HOW ZUSTAND WORKS (vs Redux)
//
// Redux flow:  Component → dispatch(action) → reducer → new state → re-render
// Zustand flow: Component → calls set() directly → new state → re-render
//
// Zustand has NO:
//   - action types / action creators
//   - reducers
//   - Provider wrapping (no <Provider store={store}>)
//   - connect() or mapStateToProps
//
// Everything lives in ONE create() call. That's it.
// ─────────────────────────────────────────────────────────────────────────────

// MIDDLEWARE EXPLAINED:
//
// devtools  → connects to Redux DevTools browser extension so you can inspect
//             state changes in real time (works even though it's not Redux!)
//
// persist   → automatically saves state to localStorage and rehydrates on
//             page reload. You choose WHICH slices to persist via `partialize`.
//
// Wrapping order matters: devtools wraps persist wraps the store creator.

const useUserStore = create(
    devtools(
        persist(
            (set, get) => ({
                // ── STATE ────────────────────────────────────────────────────
                users: [],       // array of user objects
                loading: false,  // true while API call is in-flight
                error: null,     // string error message or null

                // ── ACTIONS ──────────────────────────────────────────────────

                // fetchUsers: async action — sets loading, calls API, handles errors
                // `set` is Zustand's way to update state (like setState but global)
                // It does a SHALLOW MERGE, so you only need to pass changed keys.
                fetchUsers: async () => {
                    // Avoid re-fetching if we already have data (performance optimization)
                    if (get().users.length > 0) return
                    set({ loading: true, error: null })
                    try {
                        const users = await fetchUsersAPI()
                        set({ users, loading: false })
                    } catch (err) {
                        set({ error: err.message, loading: false })
                    }
                },

                // addUser: async action — calls API then appends to local state
                // We use get() to read current state inside an action
                addUser: async (userData) => {
                    set({ loading: true, error: null })
                    try {
                        const newUser = await addUserAPI(userData)
                        // JSONPlaceholder returns id:11 for all POSTs, so we
                        // generate a unique id using Date.now() for local state
                        const userWithUniqueId = { ...newUser, id: Date.now() }
                        set({ users: [...get().users, userWithUniqueId], loading: false })
                    } catch (err) {
                        set({ error: err.message, loading: false })
                    }
                },

                // removeUser: sync action — filters out user by id
                // No API call needed for this demo (JSONPlaceholder doesn't persist deletes)
                removeUser: (id) => {
                    set({ users: get().users.filter((u) => u.id !== id) })
                },

                // clearError: utility action to reset error state from UI
                clearError: () => set({ error: null }),

                // forceRefetch: clears users so fetchUsers will re-fetch
                forceRefetch: () => set({ users: [] }),
            }),
            {
                name: 'user-store', // localStorage key name
                // partialize: choose ONLY what to persist — don't persist loading/error
                // This is a best practice: transient UI state should NOT be persisted
                partialize: (state) => ({ users: state.users }),
            }
        ),
        { name: 'UserStore' } // label shown in Redux DevTools
    )
)

export default useUserStore

// ─────────────────────────────────────────────────────────────────────────────
// SELECTORS — Performance Optimization
//
// By default, any component using useUserStore() re-renders when ANY part of
// the store changes. Selectors let you subscribe to ONLY what you need.
//
// BAD  (re-renders on every store change):
//   const { users, loading } = useUserStore()
//
// GOOD (re-renders only when `users` changes):
//   const users = useUserStore(selectUsers)
//
// Zustand uses strict equality (===) by default. For derived/computed values
// that return new arrays/objects, use `useShallow` from 'zustand/react/shallow'.
// ─────────────────────────────────────────────────────────────────────────────

export const selectUsers = (state) => state.users
export const selectLoading = (state) => state.loading
export const selectError = (state) => state.error
// selectActions returns an object, so we must use useShallow in components
// to prevent a new reference on every render (which causes infinite loops).
export const selectActions = (state) => ({
    fetchUsers: state.fetchUsers,
    addUser: state.addUser,
    removeUser: state.removeUser,
    clearError: state.clearError,
    forceRefetch: state.forceRefetch,
})
