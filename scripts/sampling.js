function startSampling() {
    return fetch(`http://localhost:3000/stats/lengths?duration=5&interval=5`, {
        method: "PUT"
    })
}