
// subcategories

class Picklist {
    constructor(selector, route) {
      const selects = document.querySelectorAll(selector);
      this.route = route;
      Array.from(selects).forEach((el) => {
        el.addEventListener("change", (event) => this.getPicklist(event));
      });
    }
  
    async getPicklist(event) {
      const elementID = event.target.value;
      const index = event.target.id.split("-")[2];
      console.log(index);
      try {
        console.log(elementID);
        const response = await fetch(`${this.route}/${elementID}`);
        const data = await response.json();
        const subCategorySelect = document.getElementById(`sub-categories-${index}`);
        subCategorySelect.innerHTML = ""; // Clear existing options
  
        data.forEach((subCategory) => {
          const option = document.createElement("option");
          option.value = subCategory._id;
          option.textContent = subCategory.name;
          subCategorySelect.appendChild(option);
        });
        console.log("getpiclist se zavrsava");
      } catch (err) {
        console.log(err);
      }
    }
  }
  
  const list = new Picklist(".main-categories-options", "/process-receipt/getSubCategories");



// get receipt from dom

document.getElementById("saveChanges").addEventListener("click", getReceiptArticles);
console.log('dugme radi')
async function getReceiptArticles() {
  const articles = [];
  const tableRows = document.querySelectorAll(".table-row");

  tableRows.forEach((_, index) => {
    const articleName = document.getElementById(`element-name-${index}`).innerText;
    const price = document.getElementById(`element-price-${index}`).innerText;
    const quantity = document.getElementById(`element-quantity-${index}`).innerText;
    const totalPrice = document.getElementById(`element-total-${index}`).innerText;
    const mainCategory = document.getElementById(`main-categories-${index}`).value;
    const subCategory = document.getElementById(`sub-categories-${index}`).value;

    articles.push({
      name: articleName,
      price: price,
      quantity: quantity,
      total: totalPrice,
      category: mainCategory,
      subCategory: subCategory,
    });
  });
  console.log(articles, 'test1')
  try {
    console.log(articles, 'test2')
    // POST request to send data
    const response = await fetch("/process-receipt/saveChanges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ReceiptArticles: articles,
        ReceiptId: document.querySelector('#saveChanges').getAttribute('name')
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // Handle the response as needed, e.g., redirecting to a success page
    
    window.location.href = data.redirectUrl;
    console.log('all good')
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error as needed
  }
}
