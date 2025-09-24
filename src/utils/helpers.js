export function setButtonText(
  btn,
  isLoading,
  loadingText,
  defaultText,) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }

};

