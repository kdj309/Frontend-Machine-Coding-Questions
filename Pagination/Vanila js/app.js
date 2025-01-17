const KEY = "PwY49lEEY5T88MoamrFLtZnZxlEsrPc1qycB1hmHr3E6Z1Q17pxghZqD";
const gallery = document.querySelector(".gallery");
const pagewisebtncontainer = document.querySelector(
  ".pagination_pagewise-btncontainer"
);
const prevbtn = document.querySelector(".pagination_btn-prev");
const nextbtn = document.querySelector(".pagination_btn-next");

let currentPage = 1;
const per_page = 12;
let totalpages = null;
const activebtn = [];

async function getPhotos() {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${per_page}`,
      {
        headers: {
          Authorization: KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return { photos: data.photos, picslength: data.total_results };
  } catch (error) {
    return { photos: [], picslength: 0 };
  }
}
function createPhotoCard(src, alt) {
  const picdiv = document.createElement("div");
  picdiv.className = "gallery_item";
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  picdiv.appendChild(image);
  return picdiv;
}
function createPageBtn(page) {
  const btn = document.createElement("button");
  btn.setAttribute("data-pageno", page);
  btn.className = "pagwise_btn";
  if (page === 1) {
    btn.classList.add("active");
    activebtn.push(page);
  }
  btn.innerText = page;
  btn.id = `btnpage-${page}`;
  return btn;
}
async function loadImages() {
  const { photos, picslength } = await getPhotos();
  const fragment = document.createDocumentFragment();
  photos.forEach((pic) => {
    fragment.appendChild(createPhotoCard(pic.src.medium, pic.alt));
  });
  if (totalpages == null) {
    const btnsfragment = document.createDocumentFragment();
    totalpages = Math.floor(picslength / per_page);
    if (totalpages) {
      for (let index = 0; index < totalpages; index++) {
        btnsfragment.appendChild(createPageBtn(index + 1));
      }
    }
    pagewisebtncontainer.appendChild(btnsfragment);
  }
  if (gallery.children.length) {
    gallery.replaceChildren();
  }
  gallery.appendChild(fragment);
}
prevbtn.addEventListener("click", async (e) => {
  if (currentPage > 1) {
    currentPage--;
    await loadImages();
    updateBtn(currentPage);
  }
});
nextbtn.addEventListener("click", async (e) => {
  if (currentPage < totalpages) {
    currentPage++;
    await loadImages();
    updateBtn(currentPage);
  }
});
function updateBtn(page) {
  activebtn.push(page);
  const pagebtn = document.querySelector(`#btnpage-${page}`);
  pagebtn.focus();
  if (activebtn.length === 2) {
    const prevactive = activebtn.shift();
    const prevactivebtn = document.querySelector(`#btnpage-${prevactive}`);
    prevactivebtn.classList.remove("active");
  }
  if (currentPage >= totalpages) {
    nextbtn.disabled = true;
  }
  if (currentPage <= 1) {
    prevbtn.disabled = true;
  }
  pagebtn.classList.add("active");
}
pagewisebtncontainer.addEventListener("click", async (e) => {
  if (e.target.nodeName === "BUTTON") {
    const pageno = e.target.dataset.pageno;
    currentPage = parseInt(pageno);
    await loadImages();
    updateBtn(currentPage);
  }
});
loadImages();
