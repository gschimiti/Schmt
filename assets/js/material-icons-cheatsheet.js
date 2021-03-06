function showToastNotification(iconName) {
  let toastList = document.querySelector('#toast-list');

  if (!toastList) {
    toastList = document.createElement('div');

    toastList.setAttribute('id', 'toast-list');
    toastList.setAttribute('class', 'toast-list');
    document.body.appendChild(toastList);
  }

  let toast = document.createElement('span');

  toast.textContent = iconName + ' copied to clipboard';
  toast.setAttribute('class', 'toast');

  toastList.appendChild(toast);
  setTimeout(function () { toastList.removeChild(toast) }, 4000);
}

function copyToClipboard(content) {
  let textArea = document.createElement('textarea');

  document.body.appendChild(textArea);

  textArea.value = content;
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function stringPlurarize(count, string, suffix, suffixOffset) {
  if (count > 1) {
    return string.substring(0, string.length+suffixOffset) + suffix;
  } else {
    return string;
  }
}

function updateListSummary() {
  let iconsListSummary = document.getElementById('icons-list-summary');
  let categories = document.querySelectorAll('.section-header').length;
  let icons = document.querySelectorAll('.icons-list-card-icon').length;

  if (icons) {
    iconsListSummary.textContent = 'Showing ' + icons + stringPlurarize(icons, ' icon', 's', 0) + ' in ' + categories + stringPlurarize(categories, ' category', 'ies', -1);
  } else {
    iconsListSummary.textContent = 'No icons found';
  }
}

function insertCategories(JSONData) {
  let main = document.querySelector('main');
  let iconsList = document.createElement('div');

  iconsList.setAttribute('id', 'icons-list');
  main.appendChild(iconsList);

  for (let key in JSONData) {
    let iconsCategory = document.createElement('section');

    iconsCategory.innerHTML = '\
      <h3 class="section-header">' + key + '</h3> \
      <div class="section-body"> \
        <div id="' + key + '-list" class="row icons-list"> \
        </div> \
      </div>';

    iconsList.appendChild(iconsCategory);
    insertIcons(JSONData, key);
  }

  updateListSummary();
}

function insertIcons(JSONData, category) {
  let htmlString = '';
  let element = document.getElementById(category + '-list');

  JSONData[category].forEach(function(item, index) {
    htmlString += '\
      <div class="card icons-list-card" title="Copy ' + item + '"> \
        <div class="icons-list-card-thumbnail"> \
          <i class="material-icons icons-list-card-icon">' + item + '</i> \
        </div> \
        <span class="label icons-list-card-label">' + item + '</span> \
      </div>';
  });

  element.innerHTML = htmlString;
}

const JSONData = JSON.parse(materialIcons);
insertCategories(JSONData[0]);

document.addEventListener('click', function(e) {
  if(e.target.className.includes("icons-list-card")) {
    let iconName = e.target.innerText.split('\n', 1)[0];

    copyToClipboard(iconName);
    showToastNotification(iconName);
  }
});

document.addEventListener('input', function(e) {
  let iconsList = document.getElementById('icons-list');
  let JSONDataFiltered = [{}];

  for (let key in JSONData[0]) {
    JSONData[0][key].forEach(function(item, index) {
      if(item.includes(e.target.value)) {
        if (!(key in JSONDataFiltered[0]))
          JSONDataFiltered[0][key] = [];

        JSONDataFiltered[0][key].push(item);
      }
    });
  }

  iconsList.parentNode.removeChild(iconsList);
  insertCategories(JSONDataFiltered[0]);
});
