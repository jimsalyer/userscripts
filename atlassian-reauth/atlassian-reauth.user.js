// ==UserScript==
// @name         Atlassian Reauthentication Continue
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Continue with a remembered Atlassian account after reauthentication is requested.
// @author       You
// @match        https://*.atlassian.com/*
// @match        https://*.atlassian.net/*
// @grant        none
// @sandbox      JavaScript
// ==/UserScript==

(function () {
  'use strict';

  const CHECK_INTERVAL = 1000;
  const CONTINUE_BUTTON_SELECTOR =
    '[data-testid="remember-me-select-account-continue-button"]';

  function continueReauth() {
    const continueButton = document.querySelector(CONTINUE_BUTTON_SELECTOR);

    if (
      continueButton instanceof HTMLButtonElement &&
      !continueButton.disabled
    ) {
      continueButton.click();
    }
  }

  window.setInterval(continueReauth, CHECK_INTERVAL);
})();
