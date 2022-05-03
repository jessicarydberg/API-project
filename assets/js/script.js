const API_KEY = "-KS46TFwDAj6Mti5r1_Gy2_xxLU"
const API_URL = "https://ci-jshint.herokuapp.com/api"
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"))

document.getElementById("status").addEventListener("click", e => getStatus(e))
document.getElementById("submit").addEventListener("click", e => postForm(e))

async function postForm (e) {
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    })

    const data = await response.json()

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    
    const response = await fetch(queryString)
    
    const data = await response.json()

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let modalHeader = document.getElementById("resultsModalTitle")
    let modalBody = document.getElementById("results-content")
    
    modalHeader.innerHTML = ("API Key Status")
    modalBody.innerHTML = (`<div>Your key is valid until</div><div class="key-status">${data.expiry}</p>`)
    
    resultsModal.show()
}
