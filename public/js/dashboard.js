async function getData() {
  const labels = [];
  const totalSpends = [];
  try {
    const response = await fetch("/dashboard/lastReceiptCategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    const res = data.map((item) => {
      labels.push(item.name.name);
      totalSpends.push(item.totalSpend);
      return {
        categoryName: item.name.name,
        totalSpend: item.totalSpend,
      };
    });
    return { labels, totalSpends };
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error as needed
    return null;
  }
}

async function createChart() {
  const { labels, totalSpends } = await getData();

  new Chart(document.getElementById("chartjs-4"), {
    type: "doughnut",
    data: {
      labels: labels, // Use the labels obtained from getData
      datasets: [
        {
          label: "spending",
          data: totalSpends, // Use the totalSpends obtained from getData
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

createChart(); // Call this function to create the chart with the data

//// picklist ///

async function picklist() {
  const { labels, _id } = await getData();
  const categoriesContainer = document.querySelector(
    "#oneReceiptSubcategories"
  );

  categoriesContainer.innerHTML = "";

  console.log(_id);
  labels.forEach((el) => {
    console.log(el);
    const option = document.createElement("option");
    option.innerHTML = el;
    option.value = el._id;
    categoriesContainer.appendChild(option);
  });
}

picklist();

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

new Chart(document.getElementById("chartjs-7"), {
  type: "bar",
  data: {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Page Impressions",
        data: [10, 20, 30, 40],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Adsense Clicks",
        data: [5, 15, 10, 30],
        type: "line",
        fill: false,
        borderColor: "rgb(54, 162, 235)",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

new Chart(document.getElementById("chartjs-0"), {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Views",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        lineTension: 0.1,
      },
    ],
  },
  options: {},
});

new Chart(document.getElementById("chartjs-1"), {
  type: "bar",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Likes",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

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
