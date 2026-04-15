# yqni13 | $\texttt{\color{blueviolet}{PORTFOLIO}}$
### $\textsf{\color{brown}{v1.1.2}}$

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
$ npm ci
```
Start the application in local environment:
```sh
npm run start:dev
```
which will open automatically on `http://localhost:4200/`.

<br>

## 📈 $\textsf{\color{salmon}Updates}$
[see changelog for all updates](./docs/CHANGELOG.md)

$\textsf{[v1.0.0\ =>\ {\textbf{\color{brown}v1.1.2}]}}$ app
- $\textsf{\color{teal}Addition:}$ Added preload service for differnt resources (img, video).
- $\textsf{\color{orange}Patch:}$ Updated:
  + images to be loaded from cdn instead of in-memory
  + init root with respective theme background-color (backup styling on loading/refresh)
  + use @defer to lazy load rendering in browser for stylesheet loading delay (temp solution for Angular flickering issue)
  => https://stackoverflow.com/questions/79207839/angular-flickering-issue
