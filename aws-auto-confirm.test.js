describe('AWS Auto Confirm', () => {
  let consoleInfoSpy;

  beforeEach(() => {
    jest.useFakeTimers();
    consoleInfoSpy = jest.spyOn(console, 'info');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('automatically fills the confirmation boxes on "are you sure" action dialogs', () => {
    document.body.innerHTML = `
      <div role="dialog" aria-modal="true">
        <input type="text" placeholder="Testing" />
      </div>
    `;

    require('./aws-auto-confirm');

    const confirmTextbox = document.querySelector(
      'input[type=text][placeholder]',
    );

    jest.advanceTimersToNextTimer();

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Found active confirmation dialog. Autofilling confirmation prompt...',
    );
    expect(confirmTextbox.value).toEqual(confirmTextbox.placeholder);
  });

  it("won't fill in confirmation boxes on hidden action dialogs", () => {
    document.body.innerHTML = `
      <div class="awsui_hidden" role="dialog" aria-modal="true">
        <input type="text" placeholder="Testing" />
      </div>
    `;

    require('./aws-auto-confirm');

    const confirmTextbox = document.querySelector(
      'input[type=text][placeholder]',
    );

    jest.advanceTimersToNextTimer();

    expect(consoleInfoSpy).not.toHaveBeenCalled();
    expect(confirmTextbox.value).not.toEqual(confirmTextbox.placeholder);
  });
});
