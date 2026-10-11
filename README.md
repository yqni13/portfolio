# yqni13 | $\texttt{\color{blueviolet}{PORTFOLIO}}$
### $\textsf{\color{brown}{v2.3.3}}$

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

$\textsf{[v2.2.1\ =>\ {\textbf{\color{brown}v2.3.3}]}}$ app
- $\textsf{\color{green}Change:}$ Changed custom input logic to display validation message + styling on different focus state regarding error.
- $\textsf{\color{orange}Patch:}$ Updated:
  + working focus detection of input fields by mouse/keyboard navigation
  + display limit for active validation messages
  + fixed space under input fields for validation message
