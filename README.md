# 🌌 Dream Journal: A Desktop MVP (Electron.js)

This project is a Minimum Viable Prototype (MVP) for a desktop Dream Journal application, built using **Electron.js**. It serves as a foundational demonstration of core functionalities and showcases the application of various development skills in a practical context.

Presentation link: https://www.canva.com/design/DAGswmD79CY/k03hAy09iD5Fzh6bg7BScg/view?utm_content=DAGswmD79CY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1c21c591ee

---

## ✨ Features Implemented in this MVP:

* **Dream Input & Saving:** Users can intuitively input dream descriptions, associated emotions, and relevant keywords. All dream entries are securely saved to a local JSON file (`dreams.json`), ensuring data persistence.
* **Dream Loading & Display:** Saved dreams are efficiently loaded and presented in multiple user-friendly formats:
    * **Calendar View:** A fully functional **interactive calendar** allows users to browse dream entries by date. Days with recorded dreams are visually highlighted.
    * **Filtered List:** When a date is selected on the calendar, dreams from that specific day are displayed in a concise list within the sidebar, each showing the **exact date and time of entry**.
    * **Comprehensive Grid View:** A dedicated screen provides a responsive grid display of **all recorded dreams**, sorted by most recent, allowing for easy Browse and access to full details.
* **Real AI Analysis (Powered by Google Gemini):** A dedicated button now sends dream context (description, emotion, keywords) to the **Google Gemini API** for a real, concise, and insightful interpretation.
* **Local Persistence:** All user data is stored locally using Node.js's file system module, ensuring privacy and accessibility.

---

## 🛠️ How This MVP Addresses Project Criteria:

### Hard Skills:

* **Object-Oriented Concepts:** The `DreamEntry` data structure is implemented as a JavaScript object, directly mirroring object-oriented design principles, analogous to a class implementation in an existing Java project.
* **Algorithmic Skills:** Core logic for dream management, including saving (appending to arrays, writing to files), loading (reading files, parsing JSON), and **calendar date calculation/rendering**, demonstrates practical algorithmic implementation.
* **Tool Use:** Proficiency in Electron.js, Node.js, npm, Visual Studio Code, and Git is evident through the project's robust setup, development, and version control.
* **AI Skills:** **Successfully integrated with Google's Gemini API** for real-time dream analysis, demonstrating practical application of generative AI tools.
* **Code Production:** Emphasis on producing clean, functional, and maintainable code within the defined MVP scope.
* **Lambda Expressions (Arrow Functions):** The project extensively utilizes **arrow functions**, which are JavaScript's equivalent of lambda expressions, for concise event handlers and asynchronous operations (e.g., in `app.on()` callbacks, `ipcMain.handle()` methods, and Promise `.then()`/`.catch()` chains in `main.js`). This demonstrates adherence to modern JavaScript coding practices.

### Procedural Skills:

* **Design Skills:** Successful translation of Figma-inspired UI/UX concepts into functional and responsive HTML/CSS, creating the application's layout and interactive components.
* **Computational Thinking:** Effective breakdown of complex dream management functionalities (input, storage, display, analysis, **calendar interaction, data filtering**) into discrete, manageable components.
* **Critical Thinking:** Strategic prioritization of essential features to deliver a functional MVP within a constrained timeframe, while acknowledging and planning for more complex future integrations (e.g., encryption, advanced AI features).

### Soft Skills:

* **Problem Solving:** Demonstrated by overcoming initial setup challenges with Electron, implementing robust cross-process communication (IPC) between the main and renderer processes, handling date manipulation, and **debugging AI API integration issues**.
* **Time Management:** Successful delivery of a functional prototype, including new calendar, grid view, and AI analysis features, within the allocated development timeframe.
* **Self-efficacy:** Proactive initiative in building a working application from scratch, integrating diverse technical and design requirements independently.

---
