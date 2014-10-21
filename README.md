cross references npm and our [plugin index](https://github.com/Strider-CD/ecosystem-index) to inform which plugins require publishing

Example:

```
keyvan@mini:~/P/S/npm-outdated git:master ❯❯❯ node index.js
GET [ecosystem]/plugins.yml
✘ strider-bitbucket@1.0.4 is NOT on npm
✓ strider-custom@0.5.3 is on npm
✓ strider-docker-build@1.0.1 is on npm
✘ strider-docker-runner@1.3.0 is NOT on npm
✓ strider-dot-net@0.4.0 is on npm
✘ strider-email-notifier@0.4.1 is NOT on npm
✘ strider-env@0.4.5 is NOT on npm
✘ strider-git@0.2.1 is NOT on npm
✓ strider-github@1.3.0 is on npm
✓ strider-gitlab@1.0.4 is on npm
✓ strider-heroku@0.1.1 is on npm
✓ strider-metadata@0.0.2 is on npm
✘ strider-node@0.3.6 is NOT on npm
✘ strider-python@0.2.2 is NOT on npm
✘ strider-ruby@0.0.3 is NOT on npm
✘ strider-sauce@0.6.3 is NOT on npm
✓ strider-simple-runner@0.13.1 is on npm
✓ strider-slack@1.0.2 is on npm
✓ strider-ssh-deploy@0.3.5 is on npm
✓ strider-status-report@0.0.2 is on npm
✓ strider-webhooks@0.1.1 is on npm
✓ strider-build-badge@0.0.0 is on npm
```
