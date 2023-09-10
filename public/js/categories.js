async function showSubcategories(categoryId) {
  try {
      const subcategoriesDiv = document.getElementById("subCategory-container");
      const response = await fetch(`/categories/getSubCategories/${categoryId}`);
      const data = await response.json();
      console.log(data);
      
      subcategoriesDiv.innerHTML = ""; // Clear any existing subcategories
      
      const ul = document.createElement('ul');
      ul.className = "divide-y divide-gray-200"; // Tailwind class for line divisions
      
      data.forEach(el => {
          const li = document.createElement('li');
          li.textContent = el.name;
          li.className = "py-2 cursor-pointer hover:bg-gray-50"; // Tailwind classes for padding and hover effect
          
          ul.appendChild(li);
      });

      subcategoriesDiv.appendChild(ul);
  
  } catch (error) {
      console.error("An error occurred:", error);
  }
}
