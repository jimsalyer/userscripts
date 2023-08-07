// ==UserScript==
// @name         Citrix Workspace Keep Alive
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically keep your Citrix Workspace login session alive.
// @author       You
// @match        https://efleets.cloud.com/Citrix/StoreWeb/*
// @icon         https://efleets.cloud.com/Citrix/StoreWeb/assets/workspace/favicon.png
// @grant        none
// @sandbox      JavaScript
// ==/UserScript==

(function () {
  'use strict';

  const FIND_BUTTON_INTERVAL = 30000;

  function findAndClickButton() {
    console.info('Looking for the "Keep me logged in" button...');
    for (const button of document.querySelectorAll(
      'div[data-active-modal] button',
    )) {
      if (button.textContent.includes('Keep me logged in')) {
        console.info('Button found. Clicking it...');
        button.click();
        break;
      }
    }
  }

  window.setInterval(findAndClickButton, FIND_BUTTON_INTERVAL);
})();
