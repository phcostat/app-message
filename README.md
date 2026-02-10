# Message App

Professional message generator that collects user inputs, validates context, and displays polished feedback for educational demos or lightweight onboarding flows.

## Contact

Github: @phcostat
Email: peh.costa11@gmail.com
Instagram: @phcostat @_pedrohct

## Features
- **Guided Input Flow** – Captures user name, message, and parameters with validation hints.
- **Dynamic Rendering** – Builds the final message instantly with responsive formatting.
- **Visual Feedback** – Highlights required fields and success states for clarity.
- **Modular Codebase** – Separates UI, logic, and assets for maintainability.

## Architecture
| Layer | Responsibility |
|-------|----------------|
| UI (XML/XAML/HTML) | Layout composition, accessibility labels, theming. |
| Logic (ViewModel/Controller) | Field validation, state handling, message synthesis. |
| Resources | Strings, icons, and localization assets. |

## Getting Started
1. **Clone** the repository: `git clone https://github.com/phcostat/app-message.git`
2. **Open** the project folder in your IDE (e.g., VS Code, Android Studio, Visual Studio).
3. **Restore dependencies** using your platform’s package manager.
4. **Run** on emulator or device; confirm the message preview updates with each input.

## Usage
1. Enter sender and recipient details.
2. Provide the core message and optional context (tone, tags, priority).
3. Press **Generate Message** to view the formatted output.
4. Use **Clear** to reset fields and start over.

## Customization
- Update validation rules in `MessageValidator`.
- Adjust themes or layout spacing in the UI resource file.
- Extend localization by adding entries to the resource bundle.

## Roadmap
- Export messages as PDF/Markdown.
- Persist recent templates locally.
- Add automated tests for validation and preview logic.

## License
Distributed under the MIT License. See `LICENSE` for details.
