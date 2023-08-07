# Userscripts

This repository is essentially a place to store and easily manage userscripts across multiple systems.

To use these, you'll need to install a Userscripts compatible browser extension like Tampermonkey. Once installed, you can import the files you want/need from the extension's configuration page.

## Formatting and Linting

```shell
npm run format     # Show formatting issues for all applicable files
npm run format:fix # Fix formatting issues for all applicable files
npm run lint       # Show linting issues for all applicable files
npm run lint:fix   # Fix linting issues for all applicable files
```

## Unit Tests

```shell
npm t
npm test
npm run test
```
