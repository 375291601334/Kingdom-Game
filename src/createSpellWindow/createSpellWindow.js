import { createModalWindow, clearElement } from '../modalWindow/modalWindow';
import mathExample from '../tasks/math';
import englishTranslate from '../tasks/englishTranslate/englishTranslate';
import makeWord from '../tasks/makeWord';
import { pressEnterAndEscAndArrowsHandler } from '../playWithKeyboard/keyPressHandlers';

export const kindOfAnimation = {};

function createTitle(parent, text) {
  const title = document.createElement('h3');
  title.innerText = text;
  parent.appendChild(title);
}

function createSpellButton(parent, text, func, className) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.innerHTML = text;
  parent.appendChild(button);
  button.addEventListener('click', func);
}

function chooseTaskWithKeyboard(focusIndex) {
  switch (focusIndex) {
    case 0:
      return mathExample;
    case 1:
      return englishTranslate;
    case 2:
      return makeWord;
    default:
      return false;
  }
}

function showTasksWindow(event) {
  switch (event.target) {
    case document.getElementsByClassName('spell-button')[0]:
      kindOfAnimation.animation = 'playerGoingToHit';
      break;
    case document.getElementsByClassName('spell-button')[1]:
      kindOfAnimation.animation = 'playerThrowingGun';
      break;
    case document.getElementsByClassName('spell-button')[2]:
      kindOfAnimation.animation = 'addPlayerHealth';
      break;
    default:
      break;
  }
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  clearElement(modalWindow);
  modalWindow.classList.add('choose-task-window');
  createTitle(modalWindow, 'Выберите тип задания: ');
  
  const container = document.createElement('div');
  container.classList.add('task-type-container');
  modalWindow.appendChild(container);
  
  createSpellButton(modalWindow, 'Математика', mathExample, 'task-type-button');
  createSpellButton(modalWindow, 'Перевод слова', englishTranslate, 'task-type-button');
  createSpellButton(modalWindow, 'Составить слово', makeWord, 'task-type-button');
  pressEnterAndEscAndArrowsHandler(chooseTaskWithKeyboard, 'task-type-container', false);
}

export function showSpellWindow() {
  createModalWindow();
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  modalWindow.classList.add('spell-window');
  createTitle(modalWindow, 'Выберите тип воздействия: ');
  
  const container = document.createElement('div');
  container.classList.add('spell-button-container');
  modalWindow.appendChild(container);
  
  createSpellButton(container, 'УДАР', showTasksWindow, 'spell-button');
  createSpellButton(container, 'БРОСОК', showTasksWindow, 'spell-button');
  createSpellButton(container, 'ЛЕЧЕНИЕ', showTasksWindow, 'spell-button');
  pressEnterAndEscAndArrowsHandler(showTasksWindow, 'spell-button-container', true);
}
