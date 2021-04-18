const selectInputs = document.querySelectorAll('.select__input');
const selectInputsWraps = document.querySelectorAll('.select__input-wrap');
const selectOptions = document.querySelectorAll('.select__options');


const setSelects = () => {
  for (let i = 0; i < selectInputs.length; i++) {
    selectInputs[i].readOnly = true;

    const setDefaultOptions = () => {
      let defaultOption = selectOptions[i].querySelector('.select__btn--default');

      if (defaultOption) {
        selectInputs[i].value = defaultOption.textContent.replace(/\s+/g, " ").trim();
      }
    }

    setDefaultOptions();

    const hideOptions = () => {
      selectOptions[i].classList.remove('select__options--open');
      selectInputsWraps[i].classList.remove('select__input-wrap--open');
    }

    const onOptionsClick = (evt) => {
      let currentValue = evt.target.textContent.replace(/\s+/g, " ").trim();
      selectInputs[i].value = currentValue;

      hideOptions();
      selectOptions[i].removeEventListener('click', onOptionsClick);
    }

    const onDocumentClick = (evt) => {
      if (evt.target !== selectInputs[i] && evt.target !== selectOptions) {
        hideOptions();
      }

      if (!selectOptions[i].classList.contains('select__options--open')) {
        document.removeEventListener('click', onDocumentClick);
        selectOptions[i].removeEventListener('click', onOptionsClick);
      }
    }

    const onInputAction = () => {
      selectOptions[i].classList.toggle('select__options--open');
      selectInputsWraps[i].classList.toggle('select__input-wrap--open');

      if (selectOptions[i].classList.contains('select__options--open')) {
        selectOptions[i].addEventListener('click', onOptionsClick);
        document.addEventListener('click', onDocumentClick)
      }
    }

    selectInputs[i].addEventListener('click', onInputAction)

    selectInputs[i].addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) {
        onInputAction();
      }
    })
  }
}

setSelects();
