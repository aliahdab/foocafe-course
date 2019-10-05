'use strict';

const getData = async url => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

const generateContributions = async element => {
  const anArray = await getData(element.contributors_url);
  const rightDiv = document.createElement('div');
  rightDiv.setAttribute('id', 'rightDiv');
  const paragraph = document.createElement('p');
  paragraph.setAttribute('id', 'paragraph');
  anArray.forEach(ele => {
    const uList = document.createElement('ul');
    uList.setAttribute('id', 'ul');
    const liList = document.createElement('li');
    uList.setAttribute('id', 'li');
    uList.append(liList);
    const a = document.createElement('a');
    a.href = ele['html_url'];
    a.textContent = ele.login;
    (a.target = '_blank'), liList.append(a);
    const img = document.createElement('img');
    img.setAttribute('src', ele.avatar_url);
    img.setAttribute('alt', 'Repo Image');
    liList.append(img);
    paragraph.append(uList);
  });
  return paragraph;
};

const generateRepoDetails = el => {
  const uList = document.createElement('ul');
  uList.setAttribute('id', 'mlist');
  const liList1 = document.createElement('li');
  liList1.setAttribute('id', 'liList');
  liList1.appendChild(document.createTextNode(`Repository : ${el.name}`));
  // console.log(el);
  uList.appendChild(liList1);
  const liList2 = document.createElement('li');
  liList2.setAttribute('id', 'liList');
  liList2.appendChild(document.createTextNode(`Descriptions: ${el.description}`));
  uList.appendChild(liList2);
  const liList3 = document.createElement('li');
  liList3.setAttribute('id', 'liList');
  liList3.appendChild(document.createTextNode(`Forks : ${el.forks}`));
  uList.appendChild(liList3);
  const liList4 = document.createElement('li');
  liList4.setAttribute('id', 'liList');
  liList4.appendChild(document.createTextNode(`Updated : ${el.updated_at}`));
  uList.appendChild(liList4);
  return uList;
};

const generateRepoList = async () => {
  const aArray = await getData('https://api.github.com/orgs/foocoding/repos?per_page=100');
  const myArray = customizingTheArray(aArray);
  const root = document.getElementById('root');
  let leftDiv = document.createElement('div');
  leftDiv.setAttribute('id', 'leftDiv');
  let rightDiv = document.createElement('div');
  rightDiv.setAttribute('id', 'rightDiv2');
  const uList = document.createElement('ul');
  let details = document.createElement('div');
  details.setAttribute('id', 'details');
  let str;
  uList.setAttribute('id', 'mainList');

  myArray.forEach(element => {
    const liList = document.createElement('li');
    str = capitalizeFirstLetter(`${element.name}`);
    const btn = document.createElement('button');
    liList.appendChild(btn);
    btn.appendChild(document.createTextNode(str));
    btn.setAttribute('id', str);
    uList.appendChild(liList);
    leftDiv.appendChild(uList);
    btn.addEventListener('click', async element => {
      details.remove();
      rightDiv.remove();
      details = await generateRepoDetails(element);
      rightDiv = await generateContributions(element);
      root.append(details);
      root.append(rightDiv);
    });
    root.append(leftDiv);
  });
};

const customizingTheArray = anArray => {
  let myArray = [];
  anArray.map(item => {
    item.name = capitalizeFirstLetter(item.name);
    myArray.push(item);
  });
  myArray.sort((a, b) => a.name.localeCompare(b.name));
  return myArray;
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

generateRepoList();
