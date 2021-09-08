document.addEventListener('DOMContentLoaded', () => {
  const btnOpenModal = document.querySelector('#btnOpenModal'),
        modalBlock = document.querySelector('#modalBlock'),
        btnCloseModal = document.querySelector('#closeModal'),
        questionTitle = document.querySelector('#question'),
        formAnswers = document.querySelector('#formAnswers');

  const playTest = () => {
    const renderQuestions = () => {
      questionTitle.textContent = 'Какого цвета бургер вы хотите?';

      const src = './image/burger.png';
      const burgerTitle = 'Стандарт';
      formAnswers.innerHTML = `
        <div class="answers-item d-flex flex-column">
          <input type="radio" id="answerItem1" name="answer" class="d-none">
          <label for="answerItem1" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${src}" alt="burger">
            <span>${burgerTitle}</span>
          </label>
        </div>
      `;
    };
    renderQuestions();
  };

  const openModal = () => {
    modalBlock.classList.add('d-block');
    playTest();
  };

  const closeModal = () => modalBlock.classList.remove('d-block');

  btnOpenModal.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
});

