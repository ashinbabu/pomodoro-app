# Forest Focus 🌲

Forest Focus is a gamified Pomodoro timer application designed to help you stay productive. By focusing on your tasks for a set period, you grow virtual trees. If you give up, your tree withers.

## Features

- **Gamified Focus Timer**: Watch a tree grow from a seed to a full tree as you focus.
- **Customizable Timer**: Set your preferred focus duration.
- **Progress Tracking**: View your session history and stats with interactive charts.
- **Mobile Ready**: Built with Capacitor for easy deployment to Android/iOS.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Tailwind Animate
- **Icons**: Lucide React
- **Charts**: Recharts
- **Dates**: date-fns
- **Mobile**: Capacitor
- **Animations**: Framer Motion, Canvas Confetti

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "pomodoro app"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

### Mobile Development (Capacitor)

To sync the web app with the native layer:

```bash
npx cap sync
```

To open the project in Android Studio:

```bash
npx cap open android
```

## Project Structure

- `src/components`: Reusable UI components (Timer, Tree, Stats).
- `src/App.jsx`: Main application logic and state management.
- `capacitor.config.json`: Capacitor configuration for mobile builds.
- `vite.config.js`: Vite configuration.

## License

MIT
