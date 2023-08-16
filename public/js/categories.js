async function showSubcategories(categoryId) {

    try {
      const subcategoriesDiv = document.getElementById("subCategory-container");
      const response = await fetch(`/api/subcategories/${categoryId}`);
      const data = await response.json();
    console.log(data)
      subcategoriesDiv.innerHTML = ""; // Clear any existing subcategories
      
      const ul = document.createElement('ul')
      data.forEach(el => {
        const li = document.createElement('li')
        li.textContent = el.name
        ul.appendChild(li);
      })
      subcategoriesDiv.appendChild(ul);
    
    } catch (error) {
      console.error("An error occurred:", error);
    }
    
     }
  