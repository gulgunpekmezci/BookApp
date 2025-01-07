# 📚 BookApp

BookApp is a mobile application designed for searching and listing books, with the ability to navigate to detailed pages for more information. Built using the **React Native Framework** and **TypeScript**, this app provides a smooth and intuitive experience for book enthusiasts.

## 🛠 Features

- **Search Page**: Easily search for books by title or keyword.
- **Details Page**: View detailed information about selected books.
- **Pagination**: Implements a custom hook to handle paginated data fetching.
- **Navigation**: Powered by `react-navigation` for seamless page transitions.

---

## 🚀 How to Run the Project

Follow these steps to set up and run the project on your local machine:

### 1. Install Dependencies

First, install the required libraries and dependencies:

```bash
npm install
```

### 2. Start the Development Server

Start the development server by running:

```bash
npm start
```

This will launch the development server and display options in your terminal for running the app on different platforms.

- For iOS:
  Run the following command:

```bash
npm run ios
```

Ensure you have Xcode, command-line-tools and cocoapods installed and set up correctly.
If any problem for pods please follow this steps;

```bash
cd ios
pod install
cd ..
npm run ios
```

- For Android:
  First, update the sdk.dir in the local.properties file within the Android folder to match your SDK directory.
  Run the following command:

```bash
npm run android
```

Make sure you have an Android emulator or a connected device with developer mode enabled.

### 🧰 Technologies Used:

- React Native: For building the user interface.
- TypeScript: For type safety and improved developer experience.
- React Navigation: For managing navigation between pages.
- Custom Hooks: Used for handling pagination logic.
