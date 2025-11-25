const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Existing button click handlers
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.textContent === 'C') {
      display.value = '';
    } else if (btn.textContent === '←') {
      display.value = display.value.slice(0, -1);
    } else if (btn.textContent === '=') {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    } else {
      display.value += btn.textContent;
    }
  });
});

// ✅ Bonus: Keyboard input support
document.addEventListener('keydown', (e) => {
  if(/[0-9+\-*/.%]/.test(e.key)) {
    display.value += e.key;
  } else if(e.key === 'Enter') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else if(e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if(e.key === 'Escape') {
    display.value = '';
  }
});
