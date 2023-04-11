const btnEncrypt = document.querySelector('.cta-ctaButton--blue'),
  btnDecrypt = document.querySelector('.cta__ctaButton--grey'),
  btnCopy = document.querySelector('.cta-ctaButton-desative'),
  textarea = document.querySelector('textarea'),
  divResult = document.querySelector('.result'),
  para = document.querySelector('.result__paragraph'),
  error = document.querySelector('.cta_ctaInfowrapper');

const regexUppercase = /[A-Z]/g,
  regexAccents = /[áéíóúñ]/gi;

const KEYS_ENCRYPT = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

const KEYS_REVERSEENCRYPT = {
  enter: 'e',
  imes: 'i',
  ai: 'a',
  ober: 'o',
  ufat: 'u',
};

const isUpperCaseOrIsAccent = (text) => regexAccents.test(text) || regexUppercase.test(text);
const toEncrypt = (text) => text.replace(/[eiou]/gi, (word) => KEYS_ENCRYPT[word]);
const toReverseEncrypt = (text) => text.replace(/enter|imes|ai|ober|ufat/gi, (word) => KEYS_REVERSEENCRYPT[word]);

function animate(textResult) {
  let index = 0;
  const interval = setInterval(() => {
    if (index < textResult.length) {
      para.innerHTML += textResult[index++];
    } else {
      clearInterval(interval);
    }
  }, 145);
}

const handleClick = (mode = 'encrypt') => {
  const text = textarea.value;
  if (isUpperCaseOrIsAccent(text) || text.length === 0) {
    error.classList.add('active');
  } else {
    error.classList.remove('active');
    const textResult = mode === 'decrypt' ? toReverseEncrypt(text) : toEncrypt(text);
    para.innerHTML = '';
    divResult.classList.add('active');
    animate(textResult);
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(para.textContent);
  btnCopy.classList.add('copy');
  setTimeout(() => btnCopy.classList.remove('copy'), 2000);
};

const isEmpty = (event) => {
  if (event.target.value.length === 0) {
    divResult.classList.remove('active');
    para.innerHTML = '';
  }
};

textarea.addEventListener('input', isEmpty);
btnEncrypt.addEventListener('click', handleClick);
btnDecrypt.addEventListener('click', () => handleClick('decrypt'));
btnCopy.addEventListener('click', handleCopy);