## 📈 React + TypeScript + Axios + MUI + Chart(2)JS 📊

This ReactJs project is designed to visualize data via a combined bar and linear graph based on the data fed by the API (currently Norweigan housing prices)

## TechStack:

<div>
 <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="ReactJs" alt="ReactJs" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/axios/axios-plain.svg" title="Axios" alt="Axios" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux"  alt="Redux" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="MUI" alt="MUI" width="40" height="40"/>&nbsp;
 </div>

## 🎥 Features:

- **Custom Filters**: Easily check interval changes based on housing type and yearly quarter ranges.
- **Interactive/Dynamic Graph**: A graph that updates data real-time and has interactive features.
- **Consensual History Tracking**: Maintain a record of all filter requests made in the browser's local storage. _(which is preserved until cleared by user themselves)_
- **Shareable Results**: The results obtained from fitlering can be shared with any other user by sharing the url with the parameters

## ⇟ Installation:

To install and run the project, follow these steps:

1.  **Clone the repository:**

```bash
git clone https://github.com/kenshanta/graph-housing-prices.git
```

2.  **Install dependencies:**

```bash
npm install
```

3.  **Start the server:**

```bash
npm start
```

4.  **Access the application in your web browser at `http://localhost:5173`.**

## Example:

- Checkout the live [demo](https://graph-housing-prices.vercel.app/)

## 📝 TODO :

- Lazy Load Custom Chart Component
- add Test via jest
- Storybook ?

## 🪙 Additional Credits:

- Data & API both are provided by [Statistics Norway](https://data.ssb.no)
- Made possible using [ChartJS](https://www.npmjs.com/package/chart.js?activeTab=readme) and [React-Chart-JS-2](https://www.npmjs.com/package/react-chartjs-2)
