describe('Jira Issue Links in New Tabs', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates all issue links to open in new tabs', () => {
    document.addEventListener = jest
      .fn()
      .mockImplementationOnce((event, callback) => callback());

    document.body.innerHTML = `
      <div class="js-detailview js-issue">
        <a href="#">Issue 1</a>
      </div>
      <div class="js-detailview js-issue">
        <a href="#">Issue 2</a>
      </div>
      <div class="js-detailview js-issue">
        <a href="#">Issue 3</a>
      </div>
    `;

    require('./jira-issue-links-in-new-tabs');

    jest.advanceTimersToNextTimer();

    document.querySelectorAll('.js-detailview').forEach((el) => {
      expect(el.classList.contains('js-issue')).toBeFalsy();
      expect(el.querySelector('a').target).toEqual('_blank');
    });
  });
});
