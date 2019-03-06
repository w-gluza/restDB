const myHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'x-apikey': '5a8152af16d5526228b4234b',
  'cache-control': 'no-cache'
};

function get() {
  fetch('https://articles-38dc.restdb.io/rest/music', {
    method: 'get',
    headers: myHeaders
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(showArtists);
    });
}

function editArtist(e) {
  const parent = e.target.parentElement;
  const id = e.target.parentElement.dataset.id;
  console.log(parent.querySelector('h1').textContent);
}

// DELETE BUTTON -------------------------------------

function deleteArtist(id) {
  fetch('https://articles-38dc.restdb.io/rest/music/' + id, {
    method: 'delete',
    headers: myHeaders
  })
    .then(res => res.json())
    .then(data => {});
}

// ---------------------------------------------------

function showArtists(artist) {
  const template = document.querySelector('template').content;
  const clone = template.cloneNode(true);
  clone.querySelector('h1').textContent = artist.title;
  clone.querySelector('p').textContent = artist.date;
  clone.querySelector('article').dataset.id = artist._id;
  clone.querySelector('article').setAttribute('id', 'dynamicID_' + artist._id);

  clone.querySelector('#deleteButton').addEventListener('click', el => {
    document.querySelector('#dynamicID_' + artist._id).remove();

    // delete document.querySelector('article').dataset.id;
    // deleteArtist(el).remove();
  });

  clone.querySelector('#editButton').addEventListener('click', editArtist);

  document.querySelector('main').appendChild(clone); // apend child always last
}

get();

// ------ fake button to create extra artist
function post(newArtist) {
  fetch('https://articles-38dc.restdb.io/rest/music', {
    method: 'post',
    body: JSON.stringify(newArtist),
    headers: myHeaders
  })
    .then(res => res.json())
    .then(data => {
      //   console.log(data);
      showArtists(data);
    });
}

document.querySelector('#buttonAdd').addEventListener('click', () => {
  const object = {
    title: 'Fake button title',
    content: 'Fake button content',
    data: '2016-09-09'
  };
  post(object);
});

// ------ fake button to create extra artist
