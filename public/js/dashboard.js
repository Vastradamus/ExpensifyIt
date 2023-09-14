// async function getData() {
//   const labels = [];
//   const totalSpends = [];
//   try {
//     const response = await fetch("/dashboard/lastReceiptCategories", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log(data);
//     const res = data.map((item) => {
//       labels.push(item.name.name);
//       totalSpends.push(item.totalSpend);
//       return {
//         categoryName: item.name.name,
//         totalSpend: item.totalSpend,
//       };
//     });
//     return { labels, totalSpends };
//   } catch (error) {
//     console.error("An error occurred:", error);
//     // Handle the error as needed
//     return null;
//   }
// }

// async function createChart() {
//   const { labels, totalSpends } = await getData();

//   new Chart(document.getElementById("chartjs-4"), {
//     type: "doughnut",
//     data: {
//       labels: labels, // Use the labels obtained from getData
//       datasets: [
//         {
//           label: "spending",
//           data: totalSpends, // Use the totalSpends obtained from getData
//           backgroundColor: [
//             "rgb(255, 99, 132)",
//             "rgb(54, 162, 235)",
//             "rgb(255, 205, 86)",
//             "rgb(0, 99, 132)",
//             "rgb(72, 162, 235)",
//             "rgb(255, 50, 86)",
//             "rgb(20, 50, 86)",
//             "rgb(255, 80, 86)",
//             "rgb(212, 50, 30)",
//             "rgb(60, 50, 50)",
//             "rgb(21, 50, 86)",
//           ],
//         },
//       ],
//     },
//   });
// }

// createChart(); // Call this function to create the chart with the data

// //// picklist ///

// async function picklist() {
//   const { labels, _id } = await getData();
//   const categoriesContainer = document.querySelector(
//     "#oneReceiptSubcategories"
//   );

//   categoriesContainer.innerHTML = "";

//   console.log(_id);
//   labels.forEach((el) => {
//     console.log(el);
//     const option = document.createElement("option");
//     option.innerHTML = el;
//     option.value = el._id;
//     categoriesContainer.appendChild(option);
//   });
// }

// picklist();

// new Chart(document.getElementById("chartjs-4"), {
//     "type": "doughnut",
//     "data": {
//         "labels": ["P1", "P2", "P3","P4","P5", "P6", "P7","P8","P9", "P10", "P11","P12"],
//         "datasets": [{
//             "label": "Issues",
//             "data": [300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80],
//             "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)","rgb(0, 99, 132)", "rgb(72, 162, 235)", "rgb(255, 50, 86)"]
//         }]
//     }
// });

// new Chart(document.getElementById("chartjs-7"), {
//   type: "bar",
//   data: {
//     labels: ["January", "February", "March", "April"],
//     datasets: [
//       {
//         label: "Page Impressions",
//         data: [10, 20, 30, 40],
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//       },
//       {
//         label: "Adsense Clicks",
//         data: [5, 15, 10, 30],
//         type: "line",
//         fill: false,
//         borderColor: "rgb(54, 162, 235)",
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

// new Chart(document.getElementById("chartjs-0"), {
//   type: "line",
//   data: {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Views",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         lineTension: 0.1,
//       },
//     ],
//   },
//   options: {},
// });

// new Chart(document.getElementById("chartjs-1"), {
//   type: "bar",
//   data: {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Likes",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//           "rgba(255, 205, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(201, 203, 207, 0.2)",
//         ],
//         borderColor: [
//           "rgb(255, 99, 132)",
//           "rgb(255, 159, 64)",
//           "rgb(255, 205, 86)",
//           "rgb(75, 192, 192)",
//           "rgb(54, 162, 235)",
//           "rgb(153, 102, 255)",
//           "rgb(201, 203, 207)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });

/*Toggle dropdown list*/
/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

// var userMenuDiv = document.getElementById("userMenu");
// var userMenu = document.getElementById("userButton");

// var navMenuDiv = document.getElementById("nav-content");
// var navMenu = document.getElementById("nav-toggle");

// document.onclick = check;

// function check(e) {
//     var target = (e && e.target) || (event && event.srcElement);

//     //User Menu
//     if (!checkParent(target, userMenuDiv)) {
//         // click NOT on the menu
//         if (checkParent(target, userMenu)) {
//             // click on the link
//             if (userMenuDiv.classList.contains("invisible")) {
//                 userMenuDiv.classList.remove("invisible");
//             } else { userMenuDiv.classList.add("invisible"); }
//         } else {
//             // click both outside link and outside menu, hide menu
//             userMenuDiv.classList.add("invisible");
//         }
//     }

//     //Nav Menu
//     if (!checkParent(target, navMenuDiv)) {
//         // click NOT on the menu
//         if (checkParent(target, navMenu)) {
//             // click on the link
//             if (navMenuDiv.classList.contains("hidden")) {
//                 navMenuDiv.classList.remove("hidden");
//             } else { navMenuDiv.classList.add("hidden"); }
//         } else {
//             // click both outside link and outside menu, hide menu
//             navMenuDiv.classList.add("hidden");
//         }
//     }

// }

function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}

document.querySelector("#add-receipt").addEventListener("click", addReceipt);
document
  .querySelector("#receipt-modal > div:first-child")
  .addEventListener("click", closeModal);
document
  .querySelector("#receipt-modal > div > div:nth-child(2)")
  .addEventListener("click", function (event) {
    document
      .querySelector("#terminate-btn")
      .addEventListener("click", closeModal);
    event.stopPropagation();
  });

function closeModal() {
  const modal = document.getElementById("receipt-modal");
  modal.classList.add("hidden");
}

async function addReceipt() {
  const modal = document.getElementById("receipt-modal");
  const modalText = modal.querySelector("#modal-text");
  const modalImg = modal.querySelector("#modal-img");
  const proceedBtn = modal.querySelector("#proceed-btn");
  const terminateBtn = modal.querySelector("#terminate-btn");

  // Show the modal with loading text
  modalText.innerText = "Loading...";
  modal.classList.remove("hidden");

  try {
    const response = await fetch("/process-receipt/getEmail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.success === false) {
      modalText.innerText = "There are no emails.";
    } else {
      modalText.innerText = "Receipt processed successfully!";
      modalImg.src = data.url;
      modalImg.classList.remove("hidden");
      proceedBtn.classList.remove("hidden");
      terminateBtn.classList.remove("hidden");
    }
  } catch (error) {
    modalText.innerText = "An error occurred.";
    console.error("Error:", error);
  }
}


const proceedBtn = document.querySelector("#proceed-btn");

proceedBtn.addEventListener("click", function() {
  document.getElementById("loading-spinner").classList.remove("hidden");
})

// CHARTS


// class ChartBuilder {
//   constructor(route, chartType, elementId, picklistId = null) {
//     this.route = route;
//     this.chartType = chartType;
//     this.elementId = elementId;
//     this.picklistId = picklistId;
//     this.labels = [];
//     this.totalSpends = [];
//   }

//   async fetchData() {
//     try {
//       const response = await fetch(this.route, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       data.forEach((item) => {
//         this.labels.push(item.name.name);
//         this.totalSpends.push(item.totalSpend);
//       });

//       return { labels: this.labels, totalSpends: this.totalSpends };
//     } catch (error) {
//       console.error("An error occurred:", error);
//       return null;
//     }
//   }

//   async renderChart() {
//     const { labels, totalSpends } = await this.fetchData();
//     new Chart(document.getElementById(this.elementId), {
//       type: this.chartType,
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: "spending",
//             data: totalSpends,
//             backgroundColor: [
//                           "rgb(255, 99, 132)",
//                           "rgb(54, 162, 235)",
//                           "rgb(255, 205, 86)",
//                           "rgb(0, 99, 132)",
//                           "rgb(72, 162, 235)",
//                           "rgb(255, 50, 86)",
//                           "rgb(20, 50, 86)",
//                           "rgb(255, 80, 86)",
//                           "rgb(212, 50, 30)",
//                           "rgb(60, 50, 50)",
//                           "rgb(21, 50, 86)",
//                         ],
//           },
//         ],
//       },
//     });
//   }

//   async updatePicklist() {
//     if (!this.picklistId) return;

//     const { labels } = await this.fetchData();
//     const categoriesContainer = document.querySelector(this.picklistId);
//     categoriesContainer.innerHTML = "";

//     labels.forEach((el) => {
//       const option = document.createElement("option");
//       option.innerHTML = el;
//       option.value = el._id;
//       categoriesContainer.appendChild(option);
//     });
//   }
// }

// // Use the class to create different charts
// const categoryChart = new ChartBuilder("/dashboard/lastReceiptCategories", "doughnut", "chartjs-4", "#oneReceiptSubcategories");
// categoryChart.renderChart();
// categoryChart.updatePicklist();

// const subCategoryChart = new ChartBuilder("/dashboard/lastReceiptSubCategories", "doughnut", "chartjs-5");
// subCategoryChart.renderChart();


class ChartBuilder {
  constructor(route, chartType, elementId, picklistId = null, lastReceiptOnly = false, data = null) {
    this.route = route;
    this.chartType = chartType;
    this.elementId = elementId;
    this.picklistId = picklistId;
    this.lastReceiptOnly = lastReceiptOnly;
    this.labels = [];
    this.totalSpends = [];
    this.data = data;  // New data property
  }

  async fetchData() {
    console.log("Fetching data...");

    // If data already exists, use it
    if (this.data) {
      return this.lastReceiptOnly ? [this.data.lastReceipt] : this.data.allReceipts;  // Wrapped lastReceipt in an array
    }

    // Fetch data from the server if data property is not set
    try {
      const response = await fetch(this.route, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Fetched data:", result);
      return this.lastReceiptOnly ? result.lastReceipt : result.allReceipts;
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      return null;
    }
  }

  aggregateByCategory(aggregatedData) {
    console.log("Aggregating by category...");
    console.log(aggregatedData);

    const aggregated = {};

    // Ensure data is an array
    if (!Array.isArray(aggregatedData)) {
        aggregatedData = [aggregatedData];
    }

    // Flatten the data if it's an array of arrays
    if (aggregatedData.length && Array.isArray(aggregatedData[0])) {
        aggregatedData = [].concat(...aggregatedData);
    }

    // Go through each category in the array
    for (let category of aggregatedData) {
        // Check for 'name' structure and use it if exists
        if (category.name && category.name.name && category.totalSpend !== undefined) {
            const categoryName = category.name.name;
            if (aggregated[categoryName]) {
                aggregated[categoryName] += category.totalSpend;
            } else {
                aggregated[categoryName] = category.totalSpend;
            }
        } else {
            // Otherwise, consider the direct structure
            for (let categoryName in category) {
                if (category[categoryName].totalSpend !== undefined) {
                    if (aggregated[categoryName]) {
                        aggregated[categoryName] += category[categoryName].totalSpend;
                    } else {
                        aggregated[categoryName] = category[categoryName].totalSpend;
                    }
                }
            }
        }
    }
    return aggregated;
}


  


  async renderCategoryChart() {
    const receipts = await this.fetchData();
    const aggregated = this.aggregateByCategory(receipts);
    console.log(aggregated, 'ovde')
    const labels = Object.keys(aggregated);
    const totalSpends = Object.values(aggregated);
    console.log("Rendering category chart with labels:", labels, "and values:", totalSpends);

    new Chart(document.getElementById(this.elementId), {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: "spending",
            data: totalSpends,
            backgroundColor: [
                                        "rgb(255, 99, 132)",
                                        "rgb(54, 162, 235)",
                                        "rgb(255, 205, 86)",
                                        "rgb(0, 99, 132)",
                                        "rgb(72, 162, 235)",
                                        "rgb(255, 50, 86)",
                                        "rgb(20, 50, 86)",
                                        "rgb(255, 80, 86)",
                                        "rgb(212, 50, 30)",
                                        "rgb(60, 50, 50)",
                                        "rgb(21, 50, 86)",
                                      ],
          },
        ],
      },
    });
  }

  async renderSubCategoryChart(categoryName) {
    console.log("Rendering subcategory chart for category:", categoryName);

    const receipts = await this.fetchData();
    const relevantReceipt = this.lastReceiptOnly ? receipts[0] : receipts[receipts.length - 1];

    // Find the category based on the categoryName and extract its subcategories
    const category = relevantReceipt.find(cat => cat.name.name === categoryName);
    console.log(category, "rel categorija")
    const labels = category.name.subCategories.map(subCat => subCat.name);
    console.log(labels, "rel csubacategorija")
    const totalSpends = category.subCategories.map(subCat => subCat.totalSpend);

    new Chart(document.getElementById(this.elementId), {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: "spending",
            data: totalSpends,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(0, 99, 132)",
              "rgb(72, 162, 235)",
              "rgb(255, 50, 86)",
              "rgb(20, 50, 86)",
              "rgb(255, 80, 86)",
              "rgb(212, 50, 30)",
              "rgb(60, 50, 50)",
              "rgb(21, 50, 86)",
            ],
           
          },
        ],
      },
    });
  }

  async updatePicklist() {
    if (!this.picklistId) return;

    console.log("Updating picklist...");

    const receipts = await this.fetchData();
    if( this.lastReceiptOnly) {
      const relevantReceipt = this.lastReceiptOnly ? receipts[receipts.length-1] : receipts
      console.log(relevantReceipt, "rel receiptsssssssssssssss")
      const categoriesContainer = document.querySelector(this.picklistId);
      categoriesContainer.innerHTML = "";
      console.log(relevantReceipt, "ovde gledas rel receipt")
      relevantReceipt.forEach(category => {
        const option = document.createElement("option");
        option.innerHTML = category.name.name;
        option.value = category.name.name;
        categoriesContainer.appendChild(option);
      });
  
      categoriesContainer.addEventListener('change', (e) => {
        this.renderSubCategoryChart(e.target.value);
      });
    }

  }
}

async function initCharts() {
  // Fetch data once
  const response = await fetch("/dashboard/lastReceiptCategories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch data.");
    return;
  }

  const data = await response.json();

  // Pass the fetched data to the ChartBuilder instances
  const aggregateCategoryChart = new ChartBuilder("/dashboard/lastReceiptCategories", "bar", "chartjs-7", null, false, data);
  aggregateCategoryChart.renderCategoryChart();

  // const aggregateSubCategoryChart = new ChartBuilder("/dashboard/lastReceiptCategories", "pie", "chartjs-0", "#allReceiptCategoriesPicklist", false, data);
  // aggregateSubCategoryChart.updatePicklist();

  const lastReceiptCategoryChart = new ChartBuilder("/dashboard/lastReceiptCategories", "bar", "chartjs-1", null, true, data);
  lastReceiptCategoryChart.renderCategoryChart();

  const lastReceiptSubCategoryChart = new ChartBuilder("/dashboard/lastReceiptCategories", "pie", "chartjs-4", "#lastReceiptCategoriesPicklist", true, data);
  lastReceiptSubCategoryChart.updatePicklist();
  return {
    aggregateCategoryChart,
    // aggregateSubCategoryChart, 
    lastReceiptCategoryChart,
    lastReceiptSubCategoryChart
  };
}

initCharts();

document.addEventListener("DOMContentLoaded", async function() {
  const charts = await initCharts();

  // Check if the picklist has options.
  const picklistElement = document.querySelector("#lastReceiptCategoriesPicklist");
  if (picklistElement && picklistElement.options.length > 0) {
    // Call renderSubCategoryChart with the value of the first option.
    charts.lastReceiptSubCategoryChart.renderSubCategoryChart(picklistElement.options[0].value);
  }
});
