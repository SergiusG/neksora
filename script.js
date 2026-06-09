const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const form = document.querySelector('[data-form]');
const formNote = document.querySelector('[data-form-note]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  document.body.classList.toggle('nav-open', Boolean(isOpen));
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach((field) => {
    const invalid = !field.value.trim();
    field.classList.toggle('is-invalid', invalid);
    if (invalid) isValid = false;
  });

  if (!isValid) {
    formNote.textContent = 'Заполните обязательные поля: имя, телефон и тип объекта.';
    formNote.classList.remove('success');
    return;
  }

  formNote.textContent = 'Заявка подготовлена. Подключите обработчик формы: email, CRM, Telegram или backend.';
  formNote.classList.add('success');
  form.reset();
});

form?.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => field.classList.remove('is-invalid'));
  field.addEventListener('change', () => field.classList.remove('is-invalid'));
});
