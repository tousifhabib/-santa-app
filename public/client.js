window.onload = function() {
    const santaForm = document.getElementById('wish-form');

    santaForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = santaForm.userid.value;
        const wish = santaForm.wish.value;

        if (wish.length > 100) {
            alert('Your wish is too long. Please keep it under 100 characters.');
            return;
        }

        axios.post('/submit', {
            userid: username,
            wish: wish
        })
            .then(function (response) {
                document.documentElement.innerHTML = response.data;
                setTimeout(function () {
                    window.location.href = '/';
                }, 5000);
            })
            .catch(function (error) {
                if (error.response) {
                    document.documentElement.innerHTML = error.response.data;
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 5000);
                } else {
                    console.error(error);
                }
            });
    });
};
