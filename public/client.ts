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
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        displayResponse(axiosError.response.data);
      } else {
        console.error(axiosError.message);
      }
    }
  });
};
