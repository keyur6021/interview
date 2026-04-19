import React from 'react'

const KeyurTest = () => {

    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5];

    console.log(arr2); // [1, 2, 3, 4, 5]

    const user = { name: "Keyur" };
    const updatedUser = { ...user, age: 25 };

    console.log(updatedUser);
    // { name: "Keyur", age: 25 }

    function sum(...numbers) {
        return numbers.reduce((a, b) => a + b, 0);
    }

    const a = sum(1, 2, 3, 4); // 10
    console.log(a)
    //rest operater
    const [first, ...rest] = [10, 20, 30, 50]
    console.log("test====", rest)

    const testObj = {
        name: 'keyur',
        gateName() {
            return this.name
        }
    }
    console.log("yyyy", testObj.gateName())


    function fetchData() {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json());
    }

    return (
        <div>
            This is and interview Prectice
        </div>
    )
}

export default KeyurTest
