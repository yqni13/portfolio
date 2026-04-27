# yqni13 | $\texttt{\color{blueviolet}{PORTFOLIO}}$
### $\textsf{\color{brown}{v1.1.9}}$

<br>

### $\textsf{\color{teal}Hosting}$
My portfolio is live (see link) - hosted via <a href="https://app.netlify.com/">Netlify</a>.<br>
### visit my <a href="https://yqni13.com">Portfolio LIVE</a>

<br>

## 🪄 $\textsf{\color{salmon}Getting started}$

### $\textsf{\color{teal}Prerequisites}$

- node: v22+
- Angular v21

<br>

### $\textsf{\color{teal}Local setup}$


Download or clone project

```sh
git clone https://github.com/yqni13/portfolio
```

Create new environment file and fill in your credentials/other env data [(see docs)](./docs/CONFIGURATION.md).
<br>Navigate/cd into the root path /frontend and install dependencies via npm:
```sh
npm ci
```
Start the application in local environment:
```sh
npm run start:dev
```
which will open automatically on `http://localhost:4200/`.

<br>

### $\textsf{\color{teal}Angular ESLint}$

Using Angular ESLint to test for keeping rulesets and guidelines within the code for easier maintenance and first bug prevention.<br>
Install basic dependencies:
```sh
ng add @angular-eslint/schematics
```
Run command for linting the project:
```sh
ng lint
```

<br>

## 📈 $\textsf{\color{salmon}Updates}$
[see changelog for all updates](./docs/CHANGELOG.md)

$\textsf{[v1.1.6\ =>\ {\textbf{\color{brown}v1.1.9}]}}$ app
- $\textsf{\color{teal}Addition:}$ Added ESLint to check code against rules and guidelines.
- $\textsf{\color{orange}Patch:}$ Updated
  + 'work-card' component to use signal for displaying content only when preload is finished
  + all modules/pages/services/forms/etc on the following ESLint rulesets from (https://github.com/angular-eslint/angular-eslint/tree/main/packages/eslint-plugin/docs/rules):
    * no-async-lifecycle-method
    * no-input-rename
    * prefer-output-readonly
    * prefer-inject
    * prefer-signals
    * sort-keys-in-type-decorator
