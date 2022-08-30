const loadPhones = async (searchText) => {
   // const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
   const res = await fetch(url);
   const data = await res.json();
   displayPhones(data.data);
}

const displayPhones = (phones) => {
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.textContent = '';

   // slice
   phones = phones.slice(0, 20);

   phones.forEach((phone) => {
      const phoneDiv = document.createElement('div');
      phoneDiv.classList.add('col');
      phoneDiv.innerHTML = `
         <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="img">
            <div class="card-body">
               <h5 class="card-title">${phone.brand}</h5>
               <p class="card-text">${phone.phone_name}</p>
            </div>
         </div>
      `
      phoneContainer.appendChild(phoneDiv);
   })
}

document.getElementById('search-btn').addEventListener('click', function(){
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   loadPhones(searchText);
   searchField.value = '';
})

loadPhones()