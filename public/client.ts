declare const axios: any;

interface AxiosError {
  response?: {
    data: any;
    status: number;
    headers: any;
  };
  message: string;
}

function displayResponse(data: string): void {
  document.documentElement.innerHTML = data;
  setTimeout(() => {
    window.location.href = '/';
  }, 5000);
}

window.onload = () => {
  const santaForm = document.getElementById('wish-form') as HTMLFormElement;
  const wishTextarea = document.getElementById('wish') as HTMLTextAreaElement;
  const characterCount = document.getElementById('character-count');

  if (!characterCount) {
    console.error('Character count element not found');
    return;
  }

  characterCount.textContent = `${wishTextarea.value.length} / 100`;

  wishTextarea.addEventListener('input', () => {
    characterCount.textContent = `${wishTextarea.value.length} / 100`;
  });

  santaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let username = santaForm.userid.value;
    const wish = santaForm.wish.value;

    if (username.length > 50) {
      alert('Your username is too long. Please keep it under 50 characters.');
      return;
    }

    if (wish.length > 100) {
      alert('Your wish is too long. Please keep it under 100 characters.');
      return;
    }

    username = username.replace(/\s/g, '');

    if (!/^[A-Za-z\.]+$/.test(username)) {
      alert('Username should only contain letters and a dot.');
      return;
    }

    try {
      const response = await axios.post('/submit', { userid: username, wish: wish });
      displayResponse(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        displayResponse(axiosError.response.data);
      } else {
        console.error(axiosError.message);
      }
    }
  });
};
