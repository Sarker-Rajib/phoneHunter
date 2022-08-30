const loadPhones = async (searchText, dataLimit) => {
   // const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
   const res = await fetch(url);
   const data = await res.json();
   displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.textContent = '';

   // display 10
   const moreSection = document.getElementById('more-items');
   if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 10);
      moreSection.classList.remove('d-none');
   }
   else{
      moreSection.classList.add('d-none');
   }

   // display warning for no phone Found
   const noPhoneFound = document.getElementById('warning-message');

   if(phones.length === 0){
      noPhoneFound.classList.remove('d-none');
   }
   else{
      noPhoneFound.classList.add('d-none');
   }

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
            <div class="text-center py-2">
               <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDisplay">Show Details</button>
            </div>
         </div>
      `
      phoneContainer.appendChild(phoneDiv);
   });
   // stop loader
   toggleSpinner(false);
}

const processSearch =(dataLimit) => {
   toggleSpinner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   loadPhones(searchText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function(){
   processSearch(10);
   // 
})

document.getElementById('search-field').addEventListener('keypress', function(e) {
   // console.log(e.key);
   if(e.key === 'Enter'){
      processSearch(10);
   }
})


const toggleSpinner = isLoading => {
   const loaderSection = document.getElementById('loader');
   if(isLoading){
      loaderSection.classList.remove('d-none');
   }
   else{
      loaderSection.classList.add('d-none');
   }
} 


document.getElementById('btn-show-all').addEventListener('click', function(){
   processSearch();
})

const loadPhoneDetails = async id => {
   const url = `https://openapi.programming-hero.com/api/phone/${id}`;
   const res = await fetch(url);
   const data = await res.json();
   dPD(data.data);
}

const dPD = phone =>{
   const modalHeader = document.getElementById('phoneDisplayLabel');
   modalHeader.innerText = phone.name;
   const modalbody = document.getElementById('phone-details');
   modalbody.innerHTML = `
      <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
      <p>Storage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'no release date found'}</p>
      <p>Others: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'no release date found'}</p>
   `
}

// loadPhones()