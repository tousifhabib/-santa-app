console.log('hello world :o');

window.onload = function() {
    const santaForm = document.getElementById('wish-form');

    santaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = santaForm.userid.value;
        const wish = santaForm.wish.value;

        // check the text isn't more than 100chars before submitting
        if (wish.length > 100) {
            alert('Your wish is too long. Please keep it under 100 characters.');
            return;
        }

        axios.post('/submit', {
            userid: username,
            wish: wish
        })
            .then(function (response) {
                alert(response.data);
                santaForm.reset();  // reset form fields after successful submission
            })
            .catch(function (error) {
                console.error(error);
            });
    });
};
