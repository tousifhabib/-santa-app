window.onload = () => {
    const santaForm = document.getElementById('wish-form');

    santaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = santaForm.userid.value;
        const wish = santaForm.wish.value;

        if (wish.length > 100) {
            alert('Your wish is too long. Please keep it under 100 characters.');
            return;
        }

        try {
            const response = await axios.post('/submit', { userid: username, wish: wish });
            displayResponse(response.data);
        } catch (error) {
            if (error.response) {
                displayResponse(error.response.data);
            } else {
                console.error(error);
            }
        }
    });
};

function displayResponse(data) {
    document.documentElement.innerHTML = data;
    setTimeout(() => {
        window.location.href = '/';
    }, 5000);
}
