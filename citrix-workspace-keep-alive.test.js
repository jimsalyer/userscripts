describe('Citrix Workspace Keep Alive', () => {
  let consoleInfoSpy;

  beforeEach(() => {
    jest.useFakeTimers();
    consoleInfoSpy = jest.spyOn(console, 'info');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('automatically clicks the button to keep the login session alive', () => {
    document.body.innerHTML = `
      <div data-active-modal>
        <button>Keep me logged in</button>
      </div>
    `;

    require('./citrix-workspace-keep-alive');

    const button = document.querySelector('div[data-active-modal] button');
    let buttonClicked = false;

    button.addEventListener('click', () => {
      buttonClicked = true;
    });

    jest.advanceTimersToNextTimer();

    expect(consoleInfoSpy).toHaveBeenNthCalledWith(
      1,
      'Looking for the "Keep me logged in" button...',
    );
    expect(consoleInfoSpy).toHaveBeenNthCalledWith(
      2,
      'Button found. Clicking it...',
    );
    expect(buttonClicked).toBeTruthy();
  });

  it('will not click buttons without the proper text content', () => {
    document.body.innerHTML = `
      <div data-active-modal>
        <button>Don't click me</button>
      </div>
    `;

    require('./citrix-workspace-keep-alive');

    const button = document.querySelector('div[data-active-modal] button');
    let buttonClicked = false;

    button.addEventListener('click', () => {
      buttonClicked = true;
    });

    jest.advanceTimersToNextTimer();

    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(buttonClicked).toBeFalsy();
  });
});
