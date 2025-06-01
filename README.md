# 📦 Inventory App (Expo + React Native)

This mobile application is built using **React Native** and **Expo** as part of IFN666 Assessment 03. It allows users to manage inventory items with features like adding, viewing, deleting, deep linking, and sharing.

---

## 🚀 Getting Started

### 1. Install Dependencies

Make sure you have Node.js and Expo CLI installed.

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root with:

```env
EXPO_PUBLIC_BASE_URL=http://<your-api-host>:<port>
EXPO_PUBLIC_BASE_TOKEN=<your-api-token>
```

Replace `<your-api-host>` and `<your-api-token>` with your backend API base URL and token.

### 3. Run the App

```bash
npx expo start
```

Use Expo Go on a physical device or run on an emulator.

---

## 📱 Features

- ✅ **Item Management**: View, create, and delete items
- ✅ **Camera Upload**: Add item photo using the device camera
- ✅ **Deep Linking**: Open item details via `expo-url://item/<id>`
- ✅ **Swipe to Delete**: Delete items with left swipe gesture
- ✅ **Sharing**: Share item via link using system share sheet
- ✅ **Safe Area Support**: Layout works across notched and curved screens
- ✅ **Splash Screen & Navigation**: Splash on load and tab navigation

---

## 🧱 Project Structure

```
.
├── App.js                   # Root app component with navigation and linking
├── ItemsStack.js            # Stack navigator for Items
├── components/              # Layout and UI components
├── context/                 # Theme context
├── screens/                 # Screen components (Item, ItemsList, PhotoForm, Settings)
├── assets/                  # Fonts, images
└── .env                     # API credentials

Or share it from the app and click on the link.

## 📦 Deployment & Submission Notes

- This app is not deployed to App Store or Play Store.
- For submission, include this project folder (excluding node_modules).
- Also include `a03-response-to-criteria.md`, demo video, and essay.

---

## 👨‍🎓 Author

**Name**: Behzad Banikarimi  
**Student ID**: n123456789  
**Unit**: IFN666 Web & Mobile App Development  
**Assessment**: 03 - Mobile App

---