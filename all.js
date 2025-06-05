const alertText = document.querySelector('.alertText');
function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio) {  // 當敲擊鍵盤其他按鍵
    alertText.innerHTML = '<p>請敲擊與螢幕英文字母相符的鍵盤按鍵</p>';
    return;
  };
  alertText.innerHTML = '';

  audio.currentTime = 0;
  audio.play();  // play the sound source

  key.classList.add('playing');  // 加入播放 class
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');  // 移除播放 class
}

const keys = document.querySelectorAll('.key');
const title = document.querySelector('.title');

// 新增 transition end 事件監聽，結束時移除播放的 class
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
})

// matchMedia 判斷裝置是否為觸控，以不同事件監聽播放音效
if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
  title.innerHTML = '<h1>點擊按鈕打鼓</h1>';
  keys.forEach(key => {
    key.addEventListener('touchstart', e => {
      const keyCode = e.currentTarget.getAttribute('data-key');
      playSound(keyCode);
    });
  })
} else {
  title.innerHTML = '<h1>敲擊螢幕顯示的鍵盤按鍵打鼓</h1>';
  window.addEventListener('keydown', e => {
    playSound(e.keyCode)
  });
}

// 監聽 resize 事件，重新執行 matchMedia 判斷
window.addEventListener('resize', () => {
  location.reload();
});