import React, { useEffect } from 'react'

const FetchApi = () => {

    const api = "https://jsonplaceholder.typicode.com/posts"
    const [data, setData] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const fetchData = () => {
        fetch(api)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }

    const filteredData = data.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.body.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filterData = data?.filter((e) => e.title.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{ border: '1px solid white', width: '100%', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column' }}>
            <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', padding: '10px', marginBottom: '10px' }}
            />
            {filteredData?.length > 0 ? filteredData.map((e) => (
                <div key={e.id}>
                    <h1 style={{ color: 'white', fontSize: "20px", fontWeight: "bold" }}>{e.title}</h1>
                    <p style={{ color: "gray" }}>{e.body}</p>
                </div>
            ))
                :
                <div className='loading'> NO data Found ................ </div>
            }
        </div>
    )
}

export default FetchApi;
