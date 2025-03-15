import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const button = document.querySelector('#button');
const input = document.querySelector('#input');
const gallery = document.querySelector('.gallery');
const API_KEY = '49258483-ada97ff0ca07db67d4b766dd0';
const loader = document.querySelector('.loader');
const loadButton = document.querySelector('#load-button');
let rect = gallery.getBoundingClientRect();

let page = 1;
let previousQuery = '';
let lightbox;
let totalImagesFetched = 0;

button.addEventListener('click', async () => {
  const query = input.value.trim();
  if (query === '') return;

  loader.style.display = 'block';

  if (query !== previousQuery) {
    page = 1;
    totalImagesFetched = 0;
    gallery.innerHTML = '';
  }

  previousQuery = query;

  await fetchImages();
});

loadButton.addEventListener('click', async () => {
  loader.style.display = 'inline-block';
  page++;
  await fetchImages();
  window.scrollBy({
    top: rect.top * 7.3,
    behavior: 'smooth',
  });
});

async function fetchImages() {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    previousQuery
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  try {
    const { data } = await axios.get(URL);
    loader.style.display = 'none';

    if (data.hits.length === 0) {
      throw new Error('Sorry, no images found! Please try another query.');
    }

    totalImagesFetched += data.hits.length;

    if (totalImagesFetched >= data.totalHits) {
      loadButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      loadButton.style.display = 'inline-block';
    }

    const insertHTML = data.hits
      .map(
        image => `
        <li class="gallery-item">
          <div class="photo-cards">
            <ul class="photo-information">
              <li class="photo-information-list"><b>Likes:</b> ${image.likes}</li>
              <li class="photo-information-list"><b>Views:</b> ${image.views}</li>
              <li class="photo-information-list"><b>Comments:</b> ${image.comments}</li>
              <li class="photo-information-list"><b>Downloads:</b> ${image.downloads}</li>
            </ul>
          </div>
          <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" 
                 data-source="${image.largeImageURL}" alt="${image.tags}" />
          </a>
        </li>`
      )
      .join('');

    gallery.insertAdjacentHTML('beforeend', insertHTML);
    input.value = '';

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
      });
    } else {
      lightbox.refresh();
    }

    if (totalImagesFetched >= data.totalHits) {
      loadButton.style.display = 'none';
    } else {
      loadButton.style.display = 'inline-block';
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: error.response?.data?.message || error.message,
      position: 'topRight',
      timeout: 5000,
    });
  }
}
