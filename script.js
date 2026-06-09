const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('[data-form]');
const formMessage = document.querySelector('[data-form-message]');

const setHeaderState = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => observer.observe(item));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input[required]')];
  let hasError = false;

  fields.forEach((field) => {
    const isEmpty = field.value.trim().length === 0;
    field.classList.toggle('is-error', isEmpty);
    if (isEmpty) hasError = true;
  });

  formMessage.className = 'form-message';

  if (hasError) {
    formMessage.textContent = 'Заполните имя и телефон — подсветили нужные поля.';
    formMessage.classList.add('is-error');
    return;
  }

  formMessage.textContent = 'Спасибо! Заявка подготовлена. Подключите обработчик формы на сервере или в CRM.';
  formMessage.classList.add('is-success');
  form.reset();
});

form?.querySelectorAll('input').forEach((field) => {
  field.addEventListener('input', () => field.classList.remove('is-error'));
});
