/**
 * Form - 폼 유효성 검사
 */

export const initFormValidation = () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // 브라우저 기본 유효성 검사 사용
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }

      form.classList.add('was-validated');
    });
  });
};
