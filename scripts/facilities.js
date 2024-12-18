








export const facilities = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()

        let html = ""
        html += `
        <div>
        <select id="facilities">
        ${facilities.map(
            (facility) => {
                return `<option value="${facility.id}">${facility.name}</option>`
            }
        ).join("")}
        </select>
        </div>
        `
    
}
