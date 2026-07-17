# yqni13 | $\texttt{\color{blueviolet}{PORTFOLIO}}$
### $\textsf{\color{brown}{v2.2.1}}$

<br>

### $\textsf{\color{teal}Hosting}$
My portfolio is live (see link) - hosted via <a href="https://app.netlify.com/">Netlify</a>.<br>
### visit my <a href="https://yqni13.com">Portfolio LIVE</a>

<br>

## 🪄 $\textsf{\color{salmon}Getting started}$

### $\textsf{\color{teal}Prerequisites}$

- node: v22+
- Angular v22

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

### $\textsf{\color{teal}Angular Signal-Form}$

With the update to Angular v22, Angular's new Signal Forms have been integrated into the custom form components: text-input, select-input, textarea and validation [(see form components)](./frontend/src/app/components/common/form).<br>The form on the 'contact' page allows visitors to write and send a text message [(see contact)](./frontend/src/app/components/pages/contact).

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

$\textsf{[v2.2.0\ =>\ {\textbf{\color{brown}v2.2.1}]}}$ app
- $\textsf{\color{red}Bugfix:}$ Builds application with correct node package information. [Before: package-lock.json file was on .gitignore and cached git data on node package dependencies failed Netlify build on merge to 'stag' environment.]
