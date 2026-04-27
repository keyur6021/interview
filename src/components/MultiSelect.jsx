import React, { useState } from 'react'

const MultiSelect = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])

    const options = ["HTML", "CSS", "JavaScript", "React", "Node.js"]

    const handleSelect = (option) => {
        setSelectedOptions((prev) => [...prev, option])
        // setSelectedOptions((currentOptions) => {
        //     if (currentOptions.includes(option)) {
        //         return currentOptions.filter((item) => item !== option)
        //     }

        //     return [...currentOptions, option]
        // })
    }

    return (
        <div style={{ maxWidth: "320px", marginTop: "20px", position: "relative" }}>
            <h3>Multi Select Dropdown</h3>

            <button
                type="button"
                onClick={() => setIsOpen((currentValue) => !currentValue)}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    backgroundColor: "#ff0000",
                    textAlign: "left",
                    cursor: "pointer"
                }}
            >
                {selectedOptions.length > 0
                    ? selectedOptions.join(", ")
                    : "Select your skills"}
            </button>

            {isOpen && (
                <div
                    style={{
                        marginTop: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        padding: "10px",
                        backgroundColor: "#fff"
                    }}
                >
                    {options.map((option) => (
                        <label
                            key={option}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "8px",
                                cursor: "pointer"
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleSelect(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}

            <div style={{ marginTop: "16px" }}>
                <h4>Selected Options:</h4>
                {selectedOptions.length > 0 ? (
                    selectedOptions.map((option) => (
                        <p key={option} style={{ margin: "4px 0" }}>
                            {option}
                        </p>
                    ))
                ) : (
                    <p>No option selected yet.</p>
                )}
            </div>
        </div>
    )
}

export default MultiSelect
