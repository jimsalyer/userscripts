// ==UserScript==
// @name         Jira Issue Links in New Tabs
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Open Jira issue links in a new tab instead of the sidebar view.
// @author       You
// @match        https://jira.[REPLACE].com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jira.com
// @grant        none
// @sandbox      JavaScript
// ==/UserScript==

(function () {
  'use strict';

  const CHECK_INTERVAL = 1000;

  function updateIssueLinks() {
    document.querySelectorAll('.js-detailview.js-issue').forEach((el) => {
      el.classList.remove('js-issue');
      el.querySelector('a').target = '_blank';
    });
  }

  window.setInterval(updateIssueLinks, CHECK_INTERVAL);
})();
