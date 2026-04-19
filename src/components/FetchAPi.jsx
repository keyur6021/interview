import React, { useEffect } from 'react'

const FetchApi = () => {

    const api = "https://jsonplaceholder.typicode.com/posts"
    const [data, setData] = React.useState([])
    const fetchData = () => {
        fetch(api)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div style={{ border: '1px solid white', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column' }}>
            {data?.map((e) => (
                <div key={e.id}>
                    <h1 style={{ color: 'white', fontSize: "20px", fontWeight: "bold" }}>{e.title}</h1>
                    <p style={{ color: "gray" }}>{e.body}</p>
                </div>
            ))}
        </div>
    )
}

export default FetchApi;
