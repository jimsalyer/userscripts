describe('Jira Issue Links in New Tabs', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('replaces all Jira issue links to remove the sidebar click handlers', () => {
    document.body.innerHTML = `
      <div data-testid="platform-card.common.ui.key.key">
        <a href="/browse/ISSUE-1">Issue 1</a>
      </div>
      <div data-testid="platform-card.common.ui.key.key">
        <a href="/browse/ISSUE-2">Issue 2</a>
      </div>
      <div data-testid="platform-card.common.ui.key.key">
        <a href="/browse/ISSUE-3">Issue 3</a>
      </div>
      <a href="/browse/OTHER-1">Other link</a>
    `;

    const issueLinks = document.querySelectorAll(
      '[data-testid="platform-card.common.ui.key.key"] a',
    );
    const otherLink = document.querySelector('a[href="/browse/OTHER-1"]');
    const issueClickHandler = jest.fn();
    const otherClickHandler = jest.fn();
    issueLinks[0].addEventListener('click', issueClickHandler);
    otherLink.addEventListener('click', otherClickHandler);

    require('./jira-new-tab-links.user');

    jest.advanceTimersToNextTimer();

    const updatedIssueLinks = document.querySelectorAll(
      '[data-testid="platform-card.common.ui.key.key"] a',
    );

    expect(updatedIssueLinks).toHaveLength(3);
    expect([...updatedIssueLinks].map((link) => link.href)).toEqual([
      'http://localhost/browse/ISSUE-1',
      'http://localhost/browse/ISSUE-2',
      'http://localhost/browse/ISSUE-3',
    ]);
    expect(updatedIssueLinks[0]).not.toBe(issueLinks[0]);
    expect(document.querySelector('a[href="/browse/OTHER-1"]')).toBe(otherLink);

    updatedIssueLinks[0].dispatchEvent(new MouseEvent('click'));
    otherLink.dispatchEvent(new MouseEvent('click'));

    expect(issueClickHandler).not.toHaveBeenCalled();
    expect(otherClickHandler).toHaveBeenCalledTimes(1);
  });
});
