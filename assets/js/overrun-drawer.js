let players = [];
let drawings = [];

function insertPlayer(playerName) {
  let playersList = document.querySelector('#players-list');
  let playersListItem = document.createElement('li');
  let actionButtons = document.querySelector('#list-action-buttons');

  if (players.length == 0) {
    let emptyListItem = document.querySelector('.overrun-players-list-item.is-empty');

    emptyListItem.classList.toggle('is-hidden');
    actionButtons.classList.toggle('is-hidden');
  }

  players.push(playerName);
  playersListItem.setAttribute('class', 'overrun-players-list-item');
  playersListItem.innerHTML = '\
    <div class="overrun-player-data-container"> \
      <div class="overrun-player-data"> \
        <span class="overrun-player-data-number">' + players.length + '</span> \
        <span class="overrun-player-data-name">' + playerName + '</span> \
      </div> \
      <button class="overrun-player-menu-button" title="Mostrar opções" data-target="' + String(players.length-1) + '"> \
        <span class="overrun-player-menu-button-icon"></span> \
      </button> \
      <div class="overrun-player-menu is-hidden"> \
        <ul> \
          <li class="overrun-player-menu-option edit-option" title="Editar nome do jogador" data-target="' + String(players.length-1) + '"> \
            <i class="overrun-player-menu-option-icon"></i> \
            <span class="overrun-player-menu-option-label">Editar</span> \
          </li> \
          <li class="overrun-player-menu-option remove-option" title="Remover jogador" data-target="' + String(players.length-1) + '"> \
            <i class="overrun-player-menu-option-icon"></i> \
            <span class="overrun-player-menu-option-label">Remover</span> \
          </li> \
        </ul> \
      </div> \
      <div class="overrun-player-edit-modal is-hidden"> \
        <div class="overrun-player-edit-modal-container"> \
          <div class="overrun-player-edit-data-container"> \
            <span class="overrun-player-data-number">' + players.length + '</span> \
            <input class="overrun-player-edit-input" type="text" value="' + playerName + '"> \
          </div> \
          <div class="overrun-edit-buttons-container"> \
            <button class="overrun-edit-button save-edit" title="Salvar alterações" data-target="' + String(players.length-1) + '"> \
              <i class="overrun-edit-button-icon"></i> \
            </button> \
            <button class="overrun-edit-button cancel-edit" title="Cancelar alteração" data-target="' + String(players.length-1) + '"> \
              <i class="overrun-edit-button-icon"></i> \
            </button> \
          </div> \
        </div> \
      </div> \
    </div>';

  playersList.appendChild(playersListItem);

  console.log(players);
}

function showToastNotification(message) {
  let toastList = document.querySelector('#toast-list');

  if (!toastList) {
    toastList = document.createElement('div');

    toastList.setAttribute('id', 'toast-list');
    toastList.setAttribute('class', 'toast-list');
    document.body.appendChild(toastList);
  }

  let toast = document.createElement('span');

  toast.textContent = message;
  toast.setAttribute('class', 'toast');

  toastList.appendChild(toast);
  setTimeout(function () { toastList.removeChild(toast) }, 4000);
}

function showConfirmationModal(title, description) {
  let modal = document.createElement('div');
  let modalOverlay = document.querySelector('#overlay');

  modal.setAttribute('id', 'confirmation-modal');
  modal.setAttribute('class', 'confirmation-modal');

  modal.innerHTML = '\
    <div class="confirmation-modal-content"> \
      <h3 class="confirmation-modal-content-title">' + title + '</h3> \
      <p class="confirmation-modal-content-description">' + description + '</p> \
    </div> \
    <div class="confirmation-modal-action-buttons"> \
      <button class="confirmation-modal-action-button cancel-confirmation">Cancelar</button> \
      <button class="confirmation-modal-action-button ok-confirmation">Ok</button> \
    </div>';

  modalOverlay.classList.toggle('is-hidden');
  document.body.appendChild(modal);
}

function updateIndices(playerNumber) {
  console.log('UPDATE INDICES');

  let playersMenu = document.getElementsByClassName('overrun-player-menu');
  let playersMenuButton = document.getElementsByClassName('overrun-player-menu-button');
  let playersEditButton = document.getElementsByClassName('edit-option');
  let playersRemoveButton = document.getElementsByClassName('remove-option');
  let playersSaveEditButton = document.getElementsByClassName('save-edit');
  let playersCancelEditButton = document.getElementsByClassName('cancel-edit');
  let playersNumber = document.getElementsByClassName('overrun-player-data-number');

  for (let i = playerNumber; i < players.length; i++) {
    playersMenu[i].dataset.target = i;
    playersMenuButton[i].dataset.target = i;
    playersEditButton[i].dataset.target = i;
    playersRemoveButton[i].dataset.target = i;
    playersSaveEditButton[i].dataset.target = i;
    playersCancelEditButton[i].dataset.target = i;
    playersNumber[2*i].innerHTML = i+1;
    playersNumber[2*i+1].innerHTML = i+1;
  }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawPlayers() {
  let playerNumber = getRandomInt(0, players.length-1);

  while (drawings.includes(players[playerNumber]))
    playerNumber = getRandomInt(0, players.length-1);

  drawings.push(players[playerNumber]);

  console.log(players);
  console.log(drawings);
  console.log(playerNumber);
  console.log('Sorteado: ', players[playerNumber], ' (', drawings.length,'º)');

  let animation = document.querySelector('#loading-animation');
  let drawingsContainer = document.querySelector('#drawings');
  let actionText = document.querySelector('.overrun-drawings-action-text')
  let actionButtons = document.querySelector('#drawings-action-buttons');
  let drawingsList = document.querySelector('#drawing-list');
  let hasHighlight = document.querySelector('.has-highlight');
  let title = document.querySelector('.overrun-page-title');

  if (drawings.length > 1) {
    title.innerHTML = 'Sorteados';
  } else {
    title.innerHTML = 'Sorteado';
  }

  if (!drawingsList) {
    drawingsList = document.createElement('div');

    drawingsList.setAttribute('id', 'drawing-list');
    drawingsList.setAttribute('class', 'overrun-drawing-list');
  } else {
    drawingsList.classList.toggle('is-hidden');
  }

  if (hasHighlight)
    hasHighlight.classList.remove('has-highlight');

  drawingsList.insertAdjacentHTML('afterbegin', '<span class="has-highlight">' + players[playerNumber] + ' - ' + drawings.length + 'º' + '</span>');

  animation.classList.toggle('is-hidden');
  drawingsContainer.prepend(drawingsList);

  if (drawings.length == players.length) {
    let drawButton = document.querySelector('.draw-button');

    actionText.innerHTML = 'Todos os jogadores foram sorteados';
    drawButton.classList.toggle('is-hidden');
  }

  actionText.classList.toggle('is-hidden');
  actionButtons.classList.toggle('is-hidden');
}

document.addEventListener('click', function(e) {
  if (e.target.className.includes('overrun-add-button')) {
    let nameInput = document.querySelector('#player-name');
    let playerName = nameInput.value;

    if (playerName != '') {
      console.log(playerName);

      insertPlayer(playerName);
      showToastNotification(playerName + ' foi adicionado à lista');

      nameInput.value = '';
    }
  }

  if (e.target.className.includes('overrun-player-menu-button')) {
    console.log('MENU');

    let playerNumber = e.target.dataset.target;
    let playersMenu = document.getElementsByClassName('overrun-player-menu');

    (playersMenu[playerNumber]).classList.toggle('is-hidden');
  }

  if (e.target.className.includes('edit-option')) {
    console.log('EDIT');

    let playerNumber = e.target.dataset.target;
    let modalOverlay = document.querySelector('.overrun-modal-overlay');
    let playersMenu = document.getElementsByClassName('overrun-player-menu');
    let playersEditModal = document.getElementsByClassName('overrun-player-edit-modal');

    (modalOverlay).classList.toggle('is-hidden');
    (playersMenu[playerNumber]).classList.toggle('is-hidden');
    (playersEditModal[playerNumber]).classList.toggle('is-hidden');
  }

  if (e.target.className.includes('cancel-edit')) {
    console.log('CANCEL EDIT');

    let playerNumber = e.target.dataset.target;
    let modalOverlay = document.querySelector('#overlay');
    let playersEditModal = document.getElementsByClassName('overrun-player-edit-modal');
    let nameInput = document.getElementsByClassName('overrun-player-edit-input');

    (nameInput[playerNumber]).value = players[playerNumber];

    modalOverlay.classList.toggle('is-hidden');
    (playersEditModal[playerNumber]).classList.toggle('is-hidden');
  }

  if (e.target.className.includes('save-edit')) {
    console.log('SAVE EDIT');

    let playerNumber = e.target.dataset.target;
    let modalOverlay = document.querySelector('.overrun-modal-overlay');
    let playersEditModal = document.getElementsByClassName('overrun-player-edit-modal');
    let playersName = document.getElementsByClassName('overrun-player-data-name');
    let nameInput = document.getElementsByClassName('overrun-player-edit-input');

    players[playerNumber] = (nameInput[playerNumber]).value;
    (playersName[playerNumber]).innerHTML = '' + players[playerNumber];

    modalOverlay.classList.toggle('is-hidden');
    (playersEditModal[playerNumber]).classList.toggle('is-hidden');
  }

  if (e.target.className.includes('remove-option')) {
    console.log('REMOVE');

    let playerNumber = parseInt(e.target.dataset.target);
    let playersName = document.getElementsByClassName('overrun-player-data-name');
    let playersListItem = document.getElementsByClassName('overrun-players-list-item');
    let playerName = (playersName[playerNumber]).innerHTML;
    let actionButtons = document.querySelector('#list-action-buttons');

    (playersListItem[playerNumber+1]).remove();
    players.splice(playerNumber, 1);
    showToastNotification(playerName + ' foi removido da lista');
    updateIndices(playerNumber);

    if (players.length == 0) {
      playersListItem[0].classList.toggle('is-hidden');
      actionButtons.classList.toggle('is-hidden');
    }
  }

  if (e.target.className.includes('clear-button')) {
    console.log('CLEAR');

    showConfirmationModal('Limpar Lista?', 'Ao realizar esta ação todos os jogadores da lista serão removidos');
  }

  if (e.target.className.includes('cancel-confirmation')) {
    console.log('CANCEL CONFIRMATION');

    let modal = document.querySelector('#confirmation-modal')
    let modalOverlay = document.querySelector('#overlay');

    modal.remove();
    modalOverlay.classList.toggle('is-hidden');
  }

  if (e.target.className.includes('ok-confirmation')) {
    console.log('OK CONFIRMATION');

    let playersListItem = document.getElementsByClassName('overrun-players-list-item');
    let modal = document.querySelector('#confirmation-modal')
    let modalOverlay = document.querySelector('#overlay');
    let actionButtons = document.querySelector('#list-action-buttons');

    for (let i = 0; i < players.length; i++)
      (playersListItem[1]).remove();

    players = [];

    modal.remove();
    modalOverlay.classList.toggle('is-hidden');
    actionButtons.classList.toggle('is-hidden');
    (playersListItem[0]).classList.toggle('is-hidden');
  }

  if (e.target.className.includes('drawing-button')) {
    console.log('DRAWING');

    let players = document.querySelector('#players');
    let drawingsContainer = document.querySelector('#drawings');
    let title = document.querySelector('.overrun-page-title');

    title.innerHTML = 'Sorteando';
    players.classList.toggle('is-hidden');
    drawingsContainer.classList.toggle('is-hidden');

    setTimeout(drawPlayers, 4000);
  }

  if (e.target.className.includes('finish-button')) {
    console.log('FINISH DRAWING');

    let players = document.querySelector('#players');
    let drawingsContainer = document.querySelector('#drawings');
    let title = document.querySelector('.overrun-page-title');
    let drawingsList = document.querySelector('#drawing-list');
    let animation = document.querySelector('#loading-animation');
    let actionText = document.querySelector('.overrun-drawings-action-text')
    let actionButtons = document.querySelector('#drawings-action-buttons');
    let drawButton = document.querySelector('.draw-button');

    drawings = [];
    title.innerHTML = 'Jogadores';

    if (drawButton.classList.contains('is-hidden')) {
      console.log('IHHH');

      drawButton.classList.remove('is-hidden');
      actionText.innerHTML = 'Deseja sortear mais uma vez?';
    }

    players.classList.toggle('is-hidden');
    drawingsContainer.classList.toggle('is-hidden');
    animation.classList.toggle('is-hidden');
    actionText.classList.toggle('is-hidden');
    actionButtons.classList.toggle('is-hidden');
    drawingsList.remove();
  }

  if (e.target.className.includes('draw-button')) {
    console.log('DRAWING');

    let title = document.querySelector('.overrun-page-title');
    let drawingsList = document.querySelector('#drawing-list');
    let animation = document.querySelector('#loading-animation');
    let actionText = document.querySelector('.overrun-drawings-action-text')
    let actionButtons = document.querySelector('#drawings-action-buttons');

    title.innerHTML = 'Sorteando';
    drawingsList.classList.toggle('is-hidden');
    animation.classList.toggle('is-hidden');
    actionText.classList.toggle('is-hidden');
    actionButtons.classList.toggle('is-hidden');

    setTimeout(drawPlayers, 4000);
  }
});
