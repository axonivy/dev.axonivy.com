document.addEventListener("DOMContentLoaded", () => {
  let navPanel = document.querySelector('#nav').cloneNode(true);
  navPanel.id = 'navPanel';
  let closeBtn = document.createElement('a');
  closeBtn.setAttribute('role', 'button');
  closeBtn.onclick = () => hideNavPanel();
  closeBtn.classList.add('close');
  const closeBtnIcon = document.createElement('span');
  closeBtnIcon.classList.add('si', 'si-close');
  closeBtn.appendChild(closeBtnIcon);
  navPanel.appendChild(closeBtn);

  const body = document.querySelector('body');
  body.appendChild(navPanel);
  body.classList.remove('is-loading');
});

function showNavPanel() {
  document.querySelector('#navPanel')?.classList.add('visible');
}

function hideNavPanel() {
  document.querySelector('#navPanel')?.classList.remove('visible');
}
