# yqni13 portfolio

### $\texttt{\color{olive}{LIST\ OF\ UPDATES}}$

<br>

### 2024/6/28 - $\textsf{update\ 2.4.3\ >>\ {\color{pink}2.5.0}}$

- $\textsf{\color{green}Change:}$ Added 'angular-eslint' and fixed all lint errors.

### 2024/6/24 - $\textsf{update\ 2.3.2\ >>\ {\color{pink}2.4.3}}$

- $\textsf{\color{green}Change:}$ Upgraded from Angular v17 to Angular v18.
- $\textsf{\color{red}Bugfix:}$ Colored text in warning issues have no inherited hover effects. [Before: Text that has used 'span' tags had inherited hover effects from navbar items and misleading styling.]
- $\textsf{\color{red}Bugfix:}$ Only the message part from an issue warning has now a background-color and rest of it has blurred effect to see scheme of webpage. [Before: The warning message would cover the complete display and mislead the user to thinking that the webpage would not be working at all.]
- $\textsf{\color{red}Bugfix:}$ Clicking on the logo navigates to the 'home' component and closes the unfolded navbar in the mobile version. [Before: The logo was missing logic to close the unfolded navbar in the mobile version, so it navigated to the 'home' component but didn't close.]

### 2024/6/23 - $\textsf{update\ 2.2.2\ >>\ {\color{pink}2.3.2}}$

- $\textsf{\color{green}Change:}$ New issue alert added. Warnings will be shown automatically when webpage is firstly navigated to since a new warning was issued and reading will be saved in local storage. To see if any issue is still ongoing or to re-read the warning, a new menu item '-current issues-' was added to bottom of navigation menu.

### 2024/6/22 - $\textsf{update\ 2.2.1\ >>\ {\color{pink}2.2.2}}$

- $\textsf{\color{teal}Addition:}$ New content added to 'Portfolio' component.
- $\textsf{\color{red}Bugfix:}$ An explaining msg is shown if results were empty for searching. [Before: Empty search results did not show anything.]

### 2024/6/22 - $\textsf{update\ 1.3.1\ >>\ {\color{pink}2.2.1}}$

- $\textsf{\color{green}Change:}$ The number for age in 'about' component is now displayed as calculated value.
- $\textsf{\color{green}Change:}$ Removed individual portfolio components and implemented template to display portfolio cards via ngFor. 
- $\textsf{\color{cyan}Change:}$ Portfolio cards/projects can be filtered by type (all/frontend/fullstack/module). Additionally, users can filter by keywords below the type menu. Clicking on magnifier symbol filters data and displays all results containing current keyword. Unless the filter-input is not empty, a red "x" is available to click on and removes keyword and automatically resets filter and displays everything on default settings.
- $\textsf{\color{red}Bugfix:}$ Portfolio component is navigated to by pathname 'mywork' in URL. [Before: Pathname for 'portfolio' component was 'portfolio' and misleading due to hosted URL which also ends in 'portfolio' => '...github.io/portfolio/portfolio'.]

### 2024/6/16 - $\textsf{update\ 1.1.2\ >>\ {\color{pink}1.3.1}}$

- $\textsf{\color{green}Change:}$ Navbar in mobile version is displayed on top instead on the left to give more space for the content in smaller viewports.
- $\textsf{\color{green}Change:}$ Data binding between components improved. Json data is now handled centralized in portfolio parent component and adapted with project-name as key for the regarding data object for easier maintenance.
- $\textsf{\color{red}Bugfix:}$ GitHub link in the projects 'Clock' and 'Rating' from 'Portfolio' component navigate to the regarding repository. [Before: Links were missing and navigating back to Portfolio page.]

### 2024/6/8 - $\textsf{update\ 1.0.0\ >>\ {\color{pink}1.1.2}}$

- $\textsf{\color{teal}Addition:}$ New content added to 'Portfolio' component.
- $\textsf{\color{green}Change:}$ Logo in navbar redirects to 'Home' component.
- $\textsf{\color{green}Change:}$ Portfolio cards show keywords instead of text for easier search/highlighting.
- $\textsf{\color{green}Change:}$ Screen resolution detection checks now for change in zoom level too.
- $\textsf{\color{red}Bugfix:}$ Portfolio project 'Tourplanner' displays correct data on details card. [Before: Details card for project 'Tourplanner' was showing data from another project.]
- $\textsf{\color{red}Bugfix:}$ Application stays on current component after reload. [Before: Application always redirected to 'Home' component from everywhere after reload.]