# ExpensifyIt: Your Intelligent Receipt Manager

Transform the way you manage your receipts with **ExpensifyIt**! Whether you upload them directly or simply email them, our app handles the rest. With features like automatic categorization and visual spending analytics, you can gain insights into your spending habits with ease.

[**Live Demo of ExpensifyIt**](https://expensifyit.cyclic.app/)

![ExpensifyIt Screenshot](https://github.com/Vastradamus/receipts/assets/122864019/8a8b1faa-2eac-420f-8ca7-3e7d1bf24e11)

## Features:

- **Seamless Receipt Integration**: Forward receipts to a designated email, and ExpensifyIt will handle the rest.
- **Automatic Categorization**: Each item on your receipt is automatically sorted into categories. Want to override? That's an option too.
- **Interactive Dashboards**: Get a comprehensive view of your spending with interactive graphs powered by ChartJS.

## Tech Stack:

- **Frontend**: HTML, Tailwind, JavaScript, EJS
- **Backend**: Node, Express
- **Other**: Uses IMAP library for email tracking, Tesseract for receipt parsing, and stores data in Cloudinary.

## Room for Improvement:

- **Dashboard Diversity**: Expand with a wider variety of graphs and insights.
- **IMAP Efficiency**: Currently, IMAP fetches one email at a time; this could be optimized for bulk fetching.
- **User Feedback**: Improve the feedback loop during the receipt parsing stage, so users are always in the know.

## Lessons & Reflection:

Working with ExpensifyIt was an enlightening experience. I delved deep into the challenges of dealing with deprecated libraries, such as IMAP. To enhance the accuracy of receipt parsing, I crafted a Regex function which was a significant learning curve. However, one key takeaway was the importance of robust planning. While the project began as a straightforward endeavor, unanticipated feature additions led to code refactoring. It underscored the value of detailed initial planning.

## More From My Portfolio:

- **TickBoxed**: An innovative tool to customize and design palettes. [View on GitHub](https://github.com/Vastradamus/TickBoxed)
- **Apartmani Petra**: Analyze and engage with Twitter data like never before. [View on GitHub](https://github.com/Vastradamus/Petra)

---

*Interested in collaborating or hiring? Let's [connect](https://www.linkedin.com/in/marko-vasic/)!*
