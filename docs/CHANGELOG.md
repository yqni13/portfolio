## 📜 $\textsf{\color{salmon}{List\ of\ updates}}$

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

<br>

### $\textsf{\color{skyblue}2026/04/19}$

$\textsf{[v1.1.4\ =>\ v1.1.6]}$ app
- $\textsf{\color{orange}Patch:}$ Updated 'footer' to display current version.
- $\textsf{\color{red}Bugfix:}$ Images in section 'about' are now shown after loading. [Before: Preload of images and initialization of theme setting had different timing which lead to loading but not showing the images. Fixed by adding manual change detection after setting the images.]

<br>

### $\textsf{\color{skyblue}2026/04/16}$

$\textsf{[v1.1.2\ =>\ v1.1.4]}$ app
- $\textsf{\color{orange}Patch:}$ Updated:
  + moved observation of navigation from "app" to "navbar" component
  + use delay by setTimeout to prevent highlighted button flickering while loading work-card for better UX

<br>

### $\textsf{\color{skyblue}2026/04/15}$

$\textsf{[v1.0.0\ =>\ v1.1.2]}$ app
- $\textsf{\color{teal}Addition:}$ Added preload service for differnt resources (img, video).
- $\textsf{\color{orange}Patch:}$ Updated:
  + images to be loaded from cdn instead of in-memory
  + init root with respective theme background-color (backup styling on loading/refresh)
  + use @defer to lazy load rendering in browser for stylesheet loading delay (temp solution for Angular flickering issue)
  => https://stackoverflow.com/questions/79207839/angular-flickering-issue

<br>

### $\textsf{\color{skyblue}2026/04/13}$

$\textsf{[v0.10.0\ =>\ v1.0.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added cv for download and final about image format.

<br>

### $\textsf{\color{skyblue}2026/04/10}$

$\textsf{[v0.9.0\ =>\ v0.10.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added responsive design for devices with 500px > width <= 1440px.

<br>

### $\textsf{\color{skyblue}2026/04/08}$

$\textsf{[v0.8.0\ =>\ v0.9.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added responsive design for smartphone portrait-mode size.

<br>

### $\textsf{\color{skyblue}2026/04/07}$

$\textsf{[v0.6.0\ =>\ v0.8.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added notification modal component + service.
- $\textsf{\color{teal}Addition:}$ Added notification api service for sending messages to admin via Telegram API.

<br>

### $\textsf{\color{skyblue}2026/04/05}$

$\textsf{[v0.4.0\ =>\ v0.6.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added custom input, select and validation components.
- $\textsf{\color{teal}Addition:}$ Added context for component 'contact'.

<br>

### $\textsf{\color{skyblue}2026/04/03}$

$\textsf{[v0.3.0\ =>\ v0.4.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added context for components 'work' and'about'.

<br>

### $\textsf{\color{skyblue}2026/04/02}$

$\textsf{[v0.2.0\ =>\ v0.3.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added context for components 'hero', 'skills' and 'experience'.

<br>

### $\textsf{\color{skyblue}2026/03/31}$

$\textsf{[v0.1.0\ =>\ v0.2.0]}$ app
- $\textsf{\color{teal}Addition:}$ Added base layout as SPA, theme settings, and navbar/footer basics.

<br>

### $\textsf{\color{skyblue}2026/03/30}$

$\textsf{[v0.0.0\ =>\ v0.1.0]}$ app
- $\textsf{\color{teal}Addition:}$ Started new portfolio with Angular v21.

<br>

