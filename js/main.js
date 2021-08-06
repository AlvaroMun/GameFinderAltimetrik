document.addEventListener("DOMContentLoaded", function () {
  let mainContent = document.querySelector(".contentWrapper");
  let logOutBtn = document.querySelector("#logOutBtn");
  let searchBtn = document.querySelector("#searchBtn");
  let searchInput = document.querySelector("#searchInput");
  let sideNavMenu = document.querySelector(".sideNav");
  let sideMenuToggle = document.querySelector(".sideMenuToggle");
  let pageTitle = document.querySelector("#pageTitle");
  let header = document.querySelector(".header");
  let modalWindow = document.querySelector("#modalWindow");
  let backgroundOutisdeModal = document.querySelector(
    "#backgroundOutsideModal"
  );

  let listToggleBtn = document.querySelector("#listToggleBtn");
  let gridToggleBtn = document.querySelector("#gridToggleBtn");

  let gridView = true;

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
    console.log(e.target);
    if (e.target.id !== "sideMenuToggle") {
      sideNavMenu.style.left = "-330px";
      console.log("estoy en primer if");
    }
  });

  gridToggleBtn.addEventListener("click", () => {
    if (gridView === false) {
      let gameCardDesc = document.querySelectorAll(".gameCardDesc");
      let cardParagraph = document.querySelectorAll(".cardDescriptionP");
      let gameCardAtt = document.querySelectorAll(".gameCardAtt");
      let genResListed = document.querySelectorAll(".marg-l");
      let genResValListed = document.querySelectorAll(".pad-l");

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

      gridView = true;
    }
  });

  listToggleBtn.addEventListener("click", () => {
    if (gridView) {
      let gameCardDesc = document.querySelectorAll(".gameCardDesc");
      let cardParagraph = document.querySelectorAll(".cardDescriptionP");
      let gameCardAtt = document.querySelectorAll(".gameCardAtt");
      let genResListed = document.querySelectorAll(".marg-l");
      let genResValListed = document.querySelectorAll(".pad-l");

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

      gridView = false;
    }
  });

  backgroundOutisdeModal.addEventListener("click", closeModalAction);
  header.addEventListener("click", closeModalAction);

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

  async function getDetails(id) {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}?key=795574157c904a59976d02fb5d132e4e`
    );

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  async function getScreenShots(id) {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/screenshots?key=795574157c904a59976d02fb5d132e4e`
    );
    if (response.ok) {
      return response.json();
    } else {
      return Error(response.statusText);
    }
  }

  /*------End of Async functions------- */

  /*--------initial list game ---------*/
  getGames()
    .then((json) => {
      console.log("JSON");
      ngFor(json.results);
    })
    .catch((err) => console.log(err));

  let ul = "";

  /*------- function for listing games------ */
  function ngFor(listOfGames) {
    let i = 1;
    let listItems = "";
    let li = "";

    let gameDescription = null;

    /*forEachGame-------------------------------------- */
    listOfGames.forEach(async (game) => {
      let genRes = game.genres;
      let genResString = [];

      /*---get list genres------- */
      genRes.forEach((gen) => {
        genResString.push(gen.name);
      });

      /*get desc for each game */

      let description = await getDescription(game.id);
      description = description.replaceAll("<p>", "");
      description = description.replaceAll("</p>", "");

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
                                  <h6 class="pad-l">${genResString.join(
                                    ", "
                                  )}</h6>
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
                      <p class="cardDescriptionP">${description}</p>
                  </div>
              </button>
        </li>`;
      listItems += li;
      i++;
      ul = `<ul id="listContent">${listItems}</ul>`;

      mainContent.innerHTML = ul;

      let btnCards = document.querySelectorAll(".btnCard");
      btnCards.forEach((card) => {
        card.addEventListener("click", async (e) => {
          let modalContent = "";
          let idGame = e.currentTarget.dataset.game;

          if (window.innerWidth > 1290) {
            backgroundOutisdeModal.classList.add("showBackgroundOutsideModal");
          }

          modalWindow.style.display = "initial";
          modalWindow.innerHTML = loader;

          await getDetails(idGame).then(async (game) => {
            let genRes = game.genres;
            let genResString = [];
            let gameDevelopers = "";
            let gamePublishers = "";
            let ersbRating = "";
            let description = game.description;
            let listOfImages = "";

            description = description.replaceAll("<p>", "");
            description = description.replaceAll("</p>", "");

            console.log("forEach listOfGames");

            /*---get list genres------- */

            if (genRes.length) {
              genRes.forEach((gen) => {
                genResString.push(gen.name);
              });
              genResString = genResString.join(", ");
            } else {
              genResString = "genres not found";
            }

            /*get game devoleprs */

            if (game.developers.length > 0) {
              game.developers.forEach((developer) => {
                gameDevelopers += developer.name + " ";
              });
            } else {
              gameDevelopers = "developer not found";
            }

            /*get game publishers */

            if (game.publishers.length > 0) {
              game.publishers.forEach((publisher) => {
                gamePublishers += publisher.name + " ";
              });
            } else {
              gamePublishers = "game publisher not found";
            }

            /*get ersb rating */
            if (game.esrb_rating !== null) {
              ersbRating = game.esrb_rating.name;
            } else {
              ersbRating = "not defined";
            }

            /*getScreenshots */

            await getScreenShots(idGame).then((listOfSS) => {
              let SS = listOfSS.results;

              for (let index = 0; index < 5; index++) {
                listOfImages += `<li><img src="${SS[index].image}" alt="Screenshot" /></li>`;
              }
            });

            modalContent = `
            <div class="modalContent">
              <div class="modalBackground">
                <img src="${game.background_image}" alt="Screenshot" />
              </div>
              <div class="modalWrapper">
              
              <button id="closeModalBtn" class="closeModal">
                <svg id="closeModalBtnSvg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="closeModalBtnPath" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.354 4.646C5.26011 4.55211 5.13278 4.49937 5 4.49937C4.86722 4.49937 4.73989 4.55211 4.646 4.646C4.55211 4.73989 4.49937 4.86722 4.49937 5C4.49937 5.13278 4.55211 5.26011 4.646 5.354L7.293 8L4.646 10.646C4.59951 10.6925 4.56264 10.7477 4.53748 10.8084C4.51232 10.8692 4.49937 10.9343 4.49937 11C4.49937 11.0657 4.51232 11.1308 4.53748 11.1916C4.56264 11.2523 4.59951 11.3075 4.646 11.354C4.73989 11.4479 4.86722 11.5006 5 11.5006C5.06574 11.5006 5.13084 11.4877 5.19158 11.4625C5.25232 11.4374 5.30751 11.4005 5.354 11.354L8 8.707L10.646 11.354C10.6925 11.4005 10.7477 11.4374 10.8084 11.4625C10.8692 11.4877 10.9343 11.5006 11 11.5006C11.0657 11.5006 11.1308 11.4877 11.1916 11.4625C11.2523 11.4374 11.3075 11.4005 11.354 11.354C11.4005 11.3075 11.4374 11.2523 11.4625 11.1916C11.4877 11.1308 11.5006 11.0657 11.5006 11C11.5006 10.9343 11.4877 10.8692 11.4625 10.8084C11.4374 10.7477 11.4005 10.6925 11.354 10.646L8.707 8L11.354 5.354C11.4005 5.30751 11.4374 5.25232 11.4625 5.19158C11.4877 5.13084 11.5006 5.06574 11.5006 5C11.5006 4.93426 11.4877 4.86916 11.4625 4.80842C11.4374 4.74768 11.4005 4.69249 11.354 4.646C11.3075 4.59951 11.2523 4.56264 11.1916 4.53748C11.1308 4.51232 11.0657 4.49937 11 4.49937C10.9343 4.49937 10.8692 4.51232 10.8084 4.53748C10.7477 4.56264 10.6925 4.59951 10.646 4.646L8 7.293L5.354 4.646Z" fill="white"/>
                </svg>

              
              </button>
              <div class="modalData">
                <div class="modalPlatformsIcons">
                  <svg
                    width="92"
                    height="20"
                    viewBox="0 0 92 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M92 9.16667H81.1667V1.53647L92 0V9.16667ZM80.3333 1.66667V9.16667H72V2.77865L80.3333 1.66667ZM80.3333 10H72V17.0992L80.3333 18.3333V10ZM81.1667 18.3262V10H92V20L81.1667 18.3262Z"
                      fill="white"
                    />
                    <path
                      d="M10.1462 0.229868L10.1462 18.5072L14.1729 19.8184L14.1729 4.49304C14.1729 3.77089 14.4861 3.29141 14.9886 3.45631C15.6456 3.64358 15.7732 4.30881 15.7732 5.02293L15.7732 11.1436C18.2796 12.3904 20.2528 11.143 20.2528 7.85331C20.2528 4.49174 19.0959 2.99421 15.6919 1.79019C14.3492 1.3307 11.8608 0.555315 10.1462 0.229868Z"
                      fill="white"
                    />
                    <path
                      d="M15.2195 17.143L21.3061 14.5504C21.9947 14.2449 22.0999 13.8299 21.5426 13.6118C20.9766 13.3897 19.9664 13.4533 19.2705 13.7523L15.2195 15.4626V12.7338L15.4515 12.6421C15.4515 12.6421 16.6241 12.1449 18.2733 11.9309C19.9194 11.7149 21.9382 11.959 23.5248 12.6747C25.3121 13.3542 25.5124 14.3454 25.0602 15.0352C24.6015 15.7178 23.4891 16.2116 23.4891 16.2116L15.2195 19.7668"
                      fill="white"
                    />
                    <path
                      d="M1.85605 17.4446C-0.0435029 16.8743 -0.360267 15.6694 0.506297 14.9734C1.30563 14.3379 2.66693 13.8594 2.66693 13.8594L8.29423 11.6974V14.1581L4.24848 15.7208C3.53185 15.997 3.4244 16.3857 4.00163 16.589C4.58917 16.8006 5.63185 16.7437 6.3489 16.4586L8.29423 15.7028V17.8994C8.16885 17.9221 8.02944 17.945 7.9022 17.9683C5.96264 18.3152 3.89625 18.1728 1.85605 17.4446Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.1741 19.6889C25.0142 19.8445 24.8044 19.9324 24.5784 19.9324C24.3525 19.9324 24.1358 19.8445 23.9757 19.6889C23.8177 19.5304 23.7302 19.3236 23.7302 19.1006C23.7302 18.6388 24.1095 18.2657 24.5784 18.2657C24.8044 18.2657 25.0142 18.3508 25.1741 18.5098C25.3321 18.6652 25.4213 18.8756 25.4213 19.1006C25.4213 19.3236 25.3321 19.5304 25.1741 19.6889ZM23.8727 19.1006C23.8727 18.9108 23.9448 18.7367 24.0764 18.6076C24.2113 18.4757 24.3914 18.4047 24.5784 18.4047C24.7657 18.4047 24.9411 18.4757 25.0728 18.6076C25.2056 18.7367 25.2773 18.9108 25.2773 19.1006C25.2773 19.4811 24.9635 19.7899 24.5784 19.7899C24.3914 19.7899 24.2113 19.7195 24.0764 19.5894C23.9448 19.4581 23.8727 19.2858 23.8727 19.1006ZM24.9643 19.4468C24.9719 19.4683 24.981 19.4811 24.9941 19.4848L25.0058 19.4913V19.5443H24.8224L24.819 19.5336L24.8064 19.5016C24.8044 19.4848 24.8019 19.4627 24.7994 19.4257L24.7913 19.2807C24.7892 19.2293 24.7721 19.1994 24.7406 19.1796C24.7173 19.1719 24.6854 19.1659 24.638 19.1659H24.3832V19.5443H24.2161V18.6149H24.6543C24.7258 18.6149 24.786 18.6274 24.8321 18.6467C24.9244 18.6895 24.9719 18.7668 24.9719 18.8754C24.9719 18.9287 24.9584 18.9787 24.9353 19.0155C24.9151 19.0415 24.8914 19.0653 24.8656 19.0885L24.8725 19.0932C24.89 19.1054 24.9074 19.1173 24.9176 19.135C24.9409 19.1605 24.9516 19.2031 24.9535 19.2579L24.9576 19.3763C24.9584 19.4066 24.9609 19.4302 24.9643 19.4468ZM24.7666 18.9899C24.7937 18.9727 24.8064 18.9385 24.8064 18.8861C24.8064 18.8309 24.7871 18.7941 24.7491 18.7758C24.7258 18.7668 24.6968 18.7602 24.6579 18.7602H24.3832V19.0213H24.6427C24.6943 19.0213 24.7353 19.0109 24.7666 18.9899Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M50 0C51.9286 0 53.5238 0.616246 54.9762 1.65266C55 1.65266 55 1.68067 55 1.70868C55 1.73669 54.9762 1.73669 54.9524 1.73669C53.0952 1.2605 50.2857 3.13725 50.0238 3.33333H50H49.9762C49.7143 3.13725 46.9048 1.2605 45.0476 1.73669C45.0238 1.73669 45 1.73669 45 1.70868C45 1.68067 45 1.65266 45.0238 1.65266C46.4762 0.616246 48.0714 0 50 0ZM56.3903 17.5988C57.8903 16.0464 52.9308 10.5648 50.0035 8.33333C50.0035 8.33333 49.9794 8.33333 49.9794 8.35759C47.0763 10.5648 42.0926 16.0464 43.6167 17.5988C45.3102 19.1026 47.5601 20 50.0035 20C52.447 20 54.6727 19.1026 56.3903 17.5988ZM42.7397 3.38078C42.7283 3.38078 42.7226 3.38705 42.7169 3.39332C42.7112 3.39959 42.7055 3.40585 42.6941 3.40585C41.0274 5.2358 40 7.76763 40 10.5501C40 12.8313 40.7078 14.9621 41.8721 16.6416C41.8721 16.6667 41.895 16.6667 41.9178 16.6667C41.9406 16.6667 41.9406 16.6416 41.9178 16.6165C41.21 14.2351 44.7945 8.4946 46.6438 6.0881L46.6667 6.06303C46.6667 6.03796 46.6667 6.03796 46.6438 6.03796C43.8356 2.9797 42.8995 3.30558 42.7397 3.38078ZM53.3333 6.05268L53.3562 6.02759C56.1644 2.99144 57.1005 3.31764 57.2374 3.36782C57.2469 3.36782 57.2525 3.36782 57.2574 3.36962C57.2642 3.37215 57.2698 3.37825 57.2831 3.39291C58.9726 5.22464 60 7.75895 60 10.5442C60 12.8276 59.2922 14.9604 58.1279 16.6416C58.1279 16.6667 58.105 16.6667 58.0822 16.6667V16.6165C58.7671 14.2327 55.2055 8.48662 53.3562 6.07777C53.3333 6.07777 53.3333 6.05268 53.3333 6.05268Z"
                      fill="white"
                    />
                  </svg>
                </div>
      
                <h2>${game.name}</h2>
                <div class="rankingAndActionButtons">
                  <div class="modalRanking">top 1</div>
                  <div class="modalActionButtons">
                    <button>
                      <div>
                        Where to <br />
                        <span>buy</span>
                      </div>
                      <div>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.21094 7.82812H0.675781V5.26172H5.21094V0.691406H7.77734V5.26172H12.3125V7.82812H7.77734V12.3398H5.21094V7.82812Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </button>
                    <button>
                      <div class="actionBtnText">
                        Add to <br />
                        <span>wish list</span>
                      </div>
                      <div id="giftIconCard">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.6875 3.90625C4.6875 1.74889 6.43639 0 8.59375 0C10.7511 0 12.5 1.74889 12.5 3.90625C12.5 1.74889 14.2489 0 16.4062 0C18.5636 0 20.3125 1.74889 20.3125 3.90625V3.91563C20.3125 4.025 20.3125 4.3375 20.2531 4.6875H23.4375C24.3004 4.6875 25 5.38705 25 6.25V7.8125C25 8.67544 24.3004 9.375 23.4375 9.375H1.5625C0.699555 9.375 0 8.67544 0 7.8125V6.25C0 5.38705 0.699555 4.6875 1.5625 4.6875H4.74687C4.70561 4.43231 4.68574 4.17412 4.6875 3.91563V3.90625ZM6.35625 4.6875H10.9375V3.90625C10.9375 3.06891 10.4908 2.29517 9.76562 1.8765C9.04047 1.45783 8.14703 1.45783 7.42188 1.8765C6.69672 2.29517 6.25 3.06891 6.25 3.90625C6.25 4.03906 6.25313 4.33437 6.32031 4.57812C6.3297 4.61538 6.34171 4.65193 6.35625 4.6875ZM18.6437 4.6875H14.0625V3.90625C14.0625 2.61183 15.1118 1.5625 16.4062 1.5625C17.7007 1.5625 18.75 2.61183 18.75 3.90625C18.75 4.03906 18.7469 4.33437 18.6797 4.57812C18.6701 4.61533 18.6581 4.65187 18.6437 4.6875ZM23.4375 10.9375V22.6562C23.4375 23.9507 22.3882 25 21.0938 25H14.0625V10.9375H23.4375ZM1.5625 22.6562C1.5625 23.9507 2.61183 25 3.90625 25H10.9375V10.9375H1.5625V22.6562Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
      
                <p class="modalParagraph">
                  ${description}
                </p>
              </div>
              <div class="modalCommentsActions">
                <button>
                  Left a comment
                  <div class="commentIcon">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 14C12.418 14 16 10.866 16 7C16 3.134 12.418 0 8 0C3.582 0 0 3.134 0 7C0 8.76 0.744 10.37 1.969 11.6C1.873 12.616 1.553 13.73 1.199 14.566C1.12 14.752 1.272 14.96 1.472 14.928C3.728 14.558 5.069 13.99 5.653 13.694C6.41859 13.8982 7.20765 14.0011 8 14ZM4 6C4.55228 6 5 6.44772 5 7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6ZM9 7C9 6.44772 8.55229 6 8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8C8.55229 8 9 7.55228 9 7ZM13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </button>
                <button>
                  Write a review <br />
                  <div class="commentIcon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.90625 8.10938H0.546875V4.96875H4.90625V0.667969H8.05859V4.96875H12.418V8.10938H8.05859V12.3398H4.90625V8.10938Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div class="commentsAndData">
                <div class="modalGridData">
                  <ul>
                    <li>
                      <h6>Platforms</h6>
                      <h6>Playstation 5, PC Xbox One</h6>
                    </li>
                    <li>
                      <h6>Genres</h6>
                      <h6>${genResString}</h6>
                    </li>
                    <li>
                      <h6>Release date</h6>
                      <h6>${game.released}</h6>
                    </li>
                    <li>
                      <h6>Developer</h6>
                      <h6>${gameDevelopers}</h6>
                    </li>
                    <li>
                      <h6>Publisher</h6>
                      <h6>${gamePublishers}</h6>
                    </li>
                    <li>
                      <h6>Age rating</h6>
                      <h6>${ersbRating}</h6>
                    </li>
                    <li>
                      <h6>Website</h6>
                      <a href="#">https://biomutant.com</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="modalImages">
                <ul>
                  ${listOfImages}
                </ul>
              </div>
            </div>
          </div>
            `;
          });

          modalWindow.innerHTML = modalContent;

          let closeModalBtn = document
            .querySelector("#closeModalBtn")
            .addEventListener("click", closeModalAction);
        });
      });
    });

    console.log("test", listItems);
  }

  function closeModalAction() {
    modalWindow.style.display = "none";
    backgroundOutisdeModal.classList.remove("showBackgroundOutsideModal");
  }

  function logOut() {
    window.location.replace("../login/index.html");
  }
});
