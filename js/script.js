document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('status');
  status.textContent = '';

  const token = grecaptcha.getResponse();
  if (!token) {
    status.textContent = 'Please complete the reCAPTCHA.';
    return;
  }

  const payload = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    token
  };

  try {
    const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      status.textContent = 'Message sent successfully!';
      form.reset();
      grecaptcha.reset();
    } else {
      throw new Error(result.error);
    }
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  }
});