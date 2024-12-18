













export const governors = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()

        let html = ""
        html += `
        <div>
        <select id="governors">
        ${governors.map(
            (governor) => {
                return `<option value="${governor.id}">${governor.name}</option>`
            }
        ).join("")}
        </select>
        </div>
        `
    

}
