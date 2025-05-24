# 💰 Personal Finance Tracker

A responsive single-page web application built with **Next.js** and **Tailwind CSS** that allows users to track their **income** and **expenses** efficiently. This app supports transaction categorization, filtering, sorting, local data persistence, and CSV export.

> 🔗 **Live Demo:** [https://your-deployment-link.vercel.app](https://your-deployment-link.vercel.app)

---

## ✨ Features

### ✅ Core Functionalities
- **Add Transactions**: Input your income or expense with fields like amount, date, category, and notes.
- **Persistent Storage**: Transactions are saved in `localStorage` and remain available across sessions—even if you close or refresh the browser.
- **Transaction List**: View a list of all transactions with relevant details.
- **Filtering & Sorting**: Filter transactions by type and category or sort them by amount or date.
- **Custom Categories**: Users can add and select from custom income/expense categories.
- **Financial Summary**: View dynamic summaries of your total income, total expenses, and balance.
- **Export as CSV** *(optional)*: Download your entire transaction history in CSV format.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Storage**: Browser `localStorage`
- **Deployment**: Vercel / GitHub Pages

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Using the App Locally

After running the development server, open your browser and visit [http://localhost:3000](http://localhost:3000).

From there:

* You can **add your income or expense transactions** using the form.
* Transactions will appear instantly in the transaction list.
* The app **stores all your data in your browser**, so your entries will **persist even after you refresh or close the page**.
* You can **filter, sort, and export** your transactions easily from the UI.

---


## 🚢 Deployment

This app was deployed easily to a live link using [Vercel](https://vercel.com/).

### Deploying to Vercel:

1. Push your project to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and connect your GitHub account.
3. Import your repo and follow the prompts to deploy.

> The live link will look like: `https://your-project-name.vercel.app`

---

## 🙌 Acknowledgments

This project was built as part of the **Web3Bridge Cohort XIII Pre-Qualification Exercise**.

---

## 📬 Contact

If you have questions or feedback, feel free to reach out:

* GitHub: [@your-username](https://github.com/your-username)
* Email: [youremail@example.com](mailto:youremail@example.com)

---
