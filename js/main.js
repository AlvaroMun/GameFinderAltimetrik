document.addEventListener("DOMContentLoaded", function () {
  let listOfCards = document.querySelector("#listContent");
  let mainContent = document.querySelector(".contentWrapper");
  let logOutBtn = document.querySelector("#logOutBtn");
  let searchBtn = document.querySelector("#searchBtn");
  let searchInput = document.querySelector("#searchInput");
  let sideNavMenu = document.querySelector(".sideNav");
  let sideMenuToggle = document.querySelector(".sideMenuToggle");
  let pageTitle = document.querySelector("#pageTitle");
  let header = document.querySelector(".header");

  if (window.innerWidth <= 690) {
    let searchBtnMovil = document.querySelector("searchBtnMovil");
  }

  /*let li = "";
  let listItems = "";*/
  let loader = `
  <div class="loader">
    <div class="loading"></div>
  </div>
`;

  /*--------events listeners---------- */
  logOutBtn.addEventListener("click", logOut);

  searchBtn.addEventListener("click", () => {
    console.log("toy");
    search(searchInput.value)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.status);
        }
      })
      .then((json) => ngFor(json.results));
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      search(searchInput.value)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw Error(res.status);
          }
        })
        .then((json) => ngFor(json.results));
    }
  });

  searchBtnMovil.addEventListener("click", () => {
    console.log(header.style.height);
    if (header.style.height === "170px") {
      header.style.height = "104px";
    } else {
      header.style.height = "170px";
    }
  });

  sideMenuToggle.addEventListener("click", () => {
    if (sideNavMenu.classList.contains("sideNav")) {
      sideNavMenu.style.left = "0px";
      /* pageTitle.classList.add("h1SideMenu");*/
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id !== "sideMenuToggle") {
      sideNavMenu.style.left = "-330px";
    }
  });

  /*--------end of events listeners---------- */

  getGames()
    .then((json) => ngFor(json.results))
    .catch((err) => console.log(err));

  /*------Async functions------- */
  async function getGames() {
    mainContent.innerHTML = loader;

    console.log("getGames");
    const response = await fetch(
      "https://api.rawg.io/api/games?key=795574157c904a59976d02fb5d132e4e"
    );

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  async function search(searchQuery) {
    if (searchQuery === 0) {
      let response = getGames();
    } else {
      mainContent.innerHTML = loader;
      response = await fetch(
        `https://api.rawg.io/api/games?key=795574157c904a59976d02fb5d132e4e&search=${searchQuery}`
      );
    }

    return response;
  }

  /*------End of Async functions------- */

  /*------- function for listing games------ */
  function ngFor(listOfGames) {
    let i = 1;
    let listItems = "";
    let li = "";

    listOfGames.forEach((game) => {
      let genRes = game.genres;
      let genResString = "";

      genRes.forEach((gen) => {
        genResString += gen.name + ", ";
      });

      li = `
      <li>
            <button data-game=${game.id}  class="btnCard">
                <div class="gameCard">
                    <img
                        src="${game.background_image}"
                        class="gameCardCover"
                        alt="game cover"
                    />
                    <div class="gameCardDesc">
                        <div class="gameCardData">
                            <h3>${game.name}</h3>
                            <div class="gameCardAtt">
                                <h6>Release date</h6>
                                <h6>${game.released}</h6>
                                <h6>Genres</h6>
                                <h6>${genResString}</h6>
                            </div>
                        </div>
                        <div class="gameCardIcons">
                            <img
                                src="/GameFinderAltimetrik/icons/platform.svg"
                                alt="platformsIcons"
                            />
                            #${i}
                            <a class="giftBtn">
                                <img
                                id="plusIcon"
                                src="/GameFinderAltimetrik/icons/plus.svg"
                                alt="plus"
                                />
                                <img
                                id="giftIcon"
                                src="/GameFinderAltimetrik/icons/gift-fill.svg"
                                alt="gift"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </button>
      </li>`;

      listItems += li;

      i++;
    });

    ul = '<ul id="listContent">' + listItems + "</ul>";
    mainContent.innerHTML = ul;

    if (ul) {
      let btnCards = document.querySelectorAll(".btnCard");
      btnCards.forEach((card) => {
        card.addEventListener("click", (e) => {
          console.log("dataset Att id", e.currentTarget.dataset.game);
        });
      });
    }
  }
  /*li.onclick = test();*/

  function test() {
    console.log("ahi va papaaaa");
  }

  function logOut() {
    window.location.replace("http://localhost:5500/GameFinderAltimetrik/");
  }
});
