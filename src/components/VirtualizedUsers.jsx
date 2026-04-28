import React, { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

const TOTAL_ITEMS = 10000

function buildLargeList(users) {
  return Array.from({ length: TOTAL_ITEMS }, (_, index) => {
    const user = users[index % users.length]

    return {
      ...user,
      virtualId: `${user.id}-${index}`,
      itemNumber: index + 1,
    }
  })
}

const VirtualizedUsers = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = await response.json()

        if (isMounted) {
          setUsers(buildLargeList(data))
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message || 'Something went wrong while loading users')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <p className="loading">Loading 10,000 users...</p>
  }

  if (error) {
    return <p className="loading">{error}</p>
  }

  return (
    <section className="virtualized-page">
      <div className="virtualized-header">
        <h2>React Virtuoso Large List</h2>
        <p>
          This list fetches 10 users from a dummy API and expands them into 10,000 rows.
          Virtuoso only renders the visible rows, so scrolling stays smooth.
        </p>
      </div>

      <div className="virtualized-stats">
        <span>Total rows: {users.length}</span>
        <span>Rendered with virtualization</span>
      </div>

      <div className="virtualized-list-shell">
        <Virtuoso
          style={{ height: 480 }}
          rangeChanged={(range) => {
    console.log('Rendered range:', range, range.endIndex - range.startIndex + 1)
  }}
          data={users}
          itemContent={(index, user) => (
            <article className="virtualized-row" key={user.virtualId}>
              <div>
                <strong>
                  #{user.itemNumber} {user.name}
                </strong>
                <p>{user.email}</p>
              </div>
              <div className="virtualized-meta">
                <span>{user.company?.name}</span>
                <span>{user.address?.city}</span>
              </div>
            </article>
          )}
        />
      </div>
    </section>
  )
}

export default VirtualizedUsers
