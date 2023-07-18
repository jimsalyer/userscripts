// ==UserScript==
// @name         AWS Auto Confirm
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Automatically fill in the "type ... to agree" boxes on confirmation dialogs
// @author       You
// @match        https://*.console.aws.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// @sandbox      JavaScript
// ==/UserScript==

(function () {
  'use strict';

  const CHECK_INTERVAL = 500;

  function autofillConfirm() {
    document
      .querySelectorAll(
        '[role=dialog][aria-modal=true]:has(input[type=text][placeholder])',
      )
      .forEach((dialog) => {
        const confirmTextbox = dialog.querySelector(
          'input[type=text][placeholder]',
        );
        const confirmTextboxFilled =
          confirmTextbox &&
          confirmTextbox?.value !== confirmTextbox?.placeholder;

        if (!isHidden(dialog) && confirmTextboxFilled) {
          console.info(
            'Found active confirmation dialog. Autofilling confirmation prompt...',
          );
          confirmTextbox.value = confirmTextbox.placeholder;
        }
      });
  }

  function isHidden(element) {
    return !!Array.from(element.classList).find((className) =>
      className.includes('awsui_hidden'),
    );
  }

  window.setInterval(autofillConfirm, CHECK_INTERVAL);
})();
