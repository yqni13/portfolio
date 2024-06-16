# yqni13 portfolio

### $\texttt{\color{olive}{LIST\ OF\ UPDATES}}$

<br>

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