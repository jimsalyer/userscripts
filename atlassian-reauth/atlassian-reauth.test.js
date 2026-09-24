describe('Atlassian Reauthentication Continue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('clicks the remembered-account Continue button', () => {
    document.body.innerHTML = `
			<button
				data-testid="remember-me-select-account-continue-button"
				type="button"
			>
				Continue
			</button>
		`;

    const continueButton = document.querySelector(
      '[data-testid="remember-me-select-account-continue-button"]',
    );
    const clickSpy = jest.spyOn(continueButton, 'click');

    require('./atlassian-reauth.user');

    jest.advanceTimersToNextTimer();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the remembered-account Continue button is absent', () => {
    document.body.innerHTML = '';

    require('./atlassian-reauth.user');

    expect(() => jest.advanceTimersToNextTimer()).not.toThrow();
  });
});
