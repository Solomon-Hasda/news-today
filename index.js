const loadCatagories = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
  const data = await response.json();
  // console.log(data);

  const tabContainer = document.getElementById('tab-container');
  const catagories = data.data.news_category;
  catagories.slice(0, 3).forEach((category) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <a onclick="loadNewsId('${category.category_id}')" 
        
        class="tab">${category.category_name}</a>
        `;

    tabContainer.appendChild(div);
  });
}

const loadNewsId = async (categoryId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}
    `);
  const data = await response.json();

  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  data.data?.forEach((news) => {
    console.log(news);
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card w-{420px} bg-base-100 shadow-xl">
        <figure><img src="${news?.image_url}" /></figure>
        <div class="card-body">
          <h2 class="card-title">
            ${news.title.slice(0, 40)}${'...'}
            <div class="badge p-5 badge-secondary">${news?.rating?.badge}</div>
          </h2>
          <p>${news.details.slice(0, 40)}${'...'} </p>
          <div class="card-footer flex justify-between mt-5">
          <div>
            <div class="avatar online">
              <div class="w-14 rounded-full">
                <img src="${news?.author?.img}" alt="">
              </div>
            </div>
            <div>
              <h6>${news?.author?.name}</h6>
              <small>${news?.author?.published_date}</small>
            </div>
          </div>
          <div>
            <div class="card-detail-button">
              <button onclick=loadModal('${news._id}') class="btn btn-outline btn-primary">Details</button>
            </div>
          </div>
        </div>
        </div>
      </div>
        
        `;
    newsContainer.appendChild(div);
  });
}

const loadModal = async(newsId) => {
  console.log(newsId);

  const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
  const data = await response.json();
  console.log(data?.data[0]?.details);


  const modalContainer = document.getElementById('modal-container');
  const div = document.createElement('div');
  div.innerHTML = `
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">${data.data[0].title}</h3>
    <p class="py-4">${data?.data[0]?.details}</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
      `;
modalContainer.appendChild(div);

const  modal = document.getElementById('my_modal_5');
modal.showModal();

}

loadCatagories();
loadNewsId("01");