import React, { useState } from 'react'
import InterviewForm from './InterviewForm';

const CounterApp = () => {
    const [count, setCount] = useState(0);
    const array = [15, 25, 23, 285, 258, 52, 85, 2, 5, 8, 5, 29, 5, 8, 5, 2, 55, 98, 65, 28, 5, 8, 5, 2, 5, 8]
    const max = Math.max(...array);
    const min = Math.min(...array);
    const sum = array.reduce((acc, curr) => acc + curr, 0);
    console.log("sum of all values====", sum)

    console.log("max====", max)

    let mins = array[0]
    let maxs = array[0]

    for (let i = 0; i <= array.length; i++) {
        if (array[i] < mins) {
            mins = array[i]
        }
        if (array[i] > maxs) {
            maxs = array[i]
        }
    }
    console.log("min===***=", mins)
    console.log("max===***=", maxs)
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}

export default CounterApp
