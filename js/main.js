document.addEventListener("DOMContentLoaded", function () {
  let mainContent = document.querySelector(".contentWrapper");
  let logOutBtn = document.querySelector("#logOutBtn");
  let searchBtn = document.querySelector("#searchBtn");
  let searchInput = document.querySelector("#searchInput");
  let sideNavMenu = document.querySelector(".sideNav");
  let sideMenuToggle = document.querySelector(".sideMenuToggle");
  let pageTitle = document.querySelector("#pageTitle");
  let header = document.querySelector(".header");

  let toggleListClicked = false;

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

  async function getDescription(id) {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}?key=795574157c904a59976d02fb5d132e4e`
    );

    if (response.ok) {
      let data = await response.json();
      let desc = await data.description;
      return desc;
    } else {
      throw Error(response.statusText);
    }
  }

  /*------End of Async functions------- */

  /*--------initial list game ---------*/
  getGames()
    .then((json) => ngFor(json.results))
    .catch((err) => console.log(err));

  let listItems = "";
  /*------- function for listing games------ */
  function ngFor(listOfGames) {
    let i = 1;

    let li = "";
    let gameDescription = null;

    /*forEachGame-------------------------------------- */
    listOfGames.forEach((game) => {
      let genRes = game.genres;
      let genResString = "";

      /*---get list genres------- */
      genRes.forEach((gen) => {
        genResString += gen.name + ", ";
      });

      /*get desc for each game */

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
                                <h6 class="marg-l">Genres</h6>
                                <h6 class="pad-l">${genResString}</h6>
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
                    <p class="cardDescriptionP">test</p>
                </div>
            </button>
      </li>`;

      listItems += li;

      i++;
    });

    /*end of FOREACH */

    let ul = '<ul id="listContent" class="gridContent">' + listItems + "</ul>";
    mainContent.innerHTML = ul;

    /*-------Event listener that depend of the list to be render first ------*/

    if (ul) {
      let btnCards = document.querySelectorAll(".btnCard");

      /*------Cards Clicked--------- */
      btnCards.forEach((card) => {
        card.addEventListener("click", (e) => {
          console.log("dataset Att id", e.currentTarget.dataset.game);
        });
      });

      /*let listContent = document
          .querySelector("#listToggleBtn")
          .addEventListener("click", toggleList);*/

      /*Toggle between list of cards or grid of cards */

      let gameCardDesc = document.querySelectorAll(".gameCardDesc");
      let cardParagraph = document.querySelectorAll(".cardDescriptionP");
      let gameCardAtt = document.querySelectorAll(".gameCardAtt");
      let genResListed = document.querySelectorAll(".marg-l");
      let genResValListed = document.querySelectorAll(".pad-l");

      let listToggleBtn = document
        .querySelector("#listToggleBtn")
        .addEventListener("click", () => {
          if (toggleListClicked) {
            toggleListClicked = false;

            listContent.classList.remove("cardListSelected");
            gameCardDesc.forEach((desc) => {
              desc.classList.remove("gameCardDescListSelected");
            });
            cardParagraph.forEach((descP) => {
              descP.classList.remove("paragraphListSelected");
            });
            gameCardAtt.forEach((cardAtt) => {
              cardAtt.classList.remove("gameCardAttListSelected");
            });
            genResListed.forEach((genRes) => {
              genRes.classList.remove("marg-l-40");
            });
            genResValListed.forEach((genResVal) => {
              genResVal.classList.remove("pad-l-40");
            });
          } else {
            toggleListClicked = true;

            listContent.classList.add("cardListSelected");
            gameCardDesc.forEach((desc) => {
              desc.classList.add("gameCardDescListSelected");
            });
            cardParagraph.forEach((descP) => {
              descP.classList.add("paragraphListSelected");
            });
            gameCardAtt.forEach((cardAtt) => {
              cardAtt.classList.add("gameCardAttListSelected");
            });
            genResListed.forEach((genRes) => {
              genRes.classList.add("marg-l-40");
            });
            genResValListed.forEach((genResVal) => {
              genResVal.classList.add("pad-l-40");
            });
          }
        });
    }
  }

  /*END OF NGFOR----------------------- */
  /*li.onclick = test();*/

  function toggleList() {}

  function logOut() {
    window.location.replace("http://localhost:5500/GameFinderAltimetrik/");
  }
});
