// ==UserScript==
// @name         Jira Issue Links in New Tabs
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Open Jira issue links in a new tab instead of the sidebar view.
// @author       You
// @match        https://*.atlassian.com/jira/*
// @match        https://*.atlassian.net/jira/*
// @grant        none
// @sandbox      JavaScript
// ==/UserScript==

(function () {
  'use strict';

  const CHECK_INTERVAL = 1000;
  const ISSUE_LINK_SELECTOR =
    '[data-testid="platform-card.common.ui.key.key"] a';
  const PROCESSED_DATA_ATTRIBUTE =
    'data-user-script-jira-new-tab-links-processed';

  function updateIssueLinks() {
    document.querySelectorAll(ISSUE_LINK_SELECTOR).forEach((link) => {
      if (!link.hasAttribute(PROCESSED_DATA_ATTRIBUTE)) {
        const newLink = link.cloneNode(true);
        newLink.setAttribute('target', '_blank');
        newLink.setAttribute(PROCESSED_DATA_ATTRIBUTE, '');
        link.parentNode.replaceChild(newLink, link);
      }
    });
  }

  window.setInterval(updateIssueLinks, CHECK_INTERVAL);
})();
