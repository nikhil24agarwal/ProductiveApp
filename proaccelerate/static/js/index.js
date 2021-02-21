// DOM elements
const guideList = document.querySelector(".guides");
const hero=document.getElementById("hero-section");

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
          <div>Logged in as ${user.email}</div>
          <div>Name : ${doc.data().name}</div>
          <div>Bio : ${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html;
      });
    // toggle user UI elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    hero.style.display="none"
  } else {
    // clear account info
    accountDetails.innerHTML = "";
    // toggle user elements
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
    hero.style.display="none"
   
  }
};

// setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
            <li>
            <input style="opacity:1 ; pointer-events: auto; " type="radio" name="me" value='${guide.Time}' >
            <br>
              <label style="font-size:30; float:left;" class="grey lighten-4"> ${guide.Title} </label>
              <br>
              <label style="font-size:30;  " class="white"> ${guide.Time} </label>
            </li>
          `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '';
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
