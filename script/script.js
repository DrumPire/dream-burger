document.addEventListener('DOMContentLoaded', () => {
  const btnOpenModal = document.querySelector('#btnOpenModal'),
        modalBlock = document.querySelector('#modalBlock'),
        btnCloseModal = document.querySelector('#closeModal'),
        questionTitle = document.querySelector('#question'),
        formAnswers = document.querySelector('#formAnswers'),
        prevButton = document.querySelector('#prev'),
        nextButton = document.querySelector('#next'),
        sendButton = document.querySelector('#send');

  const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];

  const playTest = () => {
    const finalAnswers = [];

    let numberQuestion = 0;
    const renderAnswers = (index) => {
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
        formAnswers.append(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';

      switch(true) {
        case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);

          nextButton.classList.remove('d-none');
          prevButton.classList.remove('d-none');
          sendButton.classList.add('d-none');
          break;
        case (numberQuestion === 0):
          prevButton.classList.add('d-none');
          break;
        case (numberQuestion === questions.length):
          questionTitle.textContent = '';
          nextButton.classList.add('d-none');
          prevButton.classList.add('d-none');
          sendButton.classList.remove('d-none');
          formAnswers.innerHTML = `
            <div class="form-group">
              <label for="numberPhone">Введите ваш номер телефона</label>
              <input type="tel" class="form-control" id="numberPhone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required>
            </div>
          `;
          break;
        case (numberQuestion === questions.length + 1):
          formAnswers.textContent = 'Спасибо за пройденный тест!';
          setTimeout(closeModal, 2000);
          break;
      }
      // if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
      //   questionTitle.textContent = `${questions[indexQuestion].question}`;
      //   renderAnswers(indexQuestion);

      //   nextButton.classList.remove('d-none');
      //   prevButton.classList.remove('d-none');
      //   sendButton.classList.add('d-none');
      // }

      // if (numberQuestion === 0) {
      //   prevButton.classList.add('d-none');
      // }

      // if (numberQuestion === questions.length){
      //   questionTitle.textContent = '';
      //   nextButton.classList.add('d-none');
      //   prevButton.classList.add('d-none');
      //   sendButton.classList.remove('d-none');
      //   formAnswers.innerHTML = `
      //     <div class="form-group">
      //       <label for="numberPhone">Введите ваш номер телефона</label>
      //       <input type="tel" class="form-control" id="numberPhone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      //       required>
      //     </div>
      //   `;
      // }

      // if (numberQuestion === questions.length +1) {
      //   formAnswers.textContent = 'Спасибо за пройденный тест!';
      //   setTimeout(closeModal, 2000);
      // }
    };
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};

      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone');
      
      inputs.forEach((input, index) => {
        if(numberQuestion >= 0 && numberQuestion <= questions.length -1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if(numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    };
  };

  const openModal = () => {
    modalBlock.classList.add('d-block');
    playTest();
  };

  const closeModal = () => modalBlock.classList.remove('d-block');

  btnOpenModal.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
});

