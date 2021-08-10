document.addEventListener("DOMContentLoaded", function () {
  let listContent = document.querySelector("#listContent");
  let mainContent = document.querySelector(".contentWrapper");
  let logOutBtn = document.querySelector("#logOutBtn");
  let searchBtn = document.querySelector("#searchBtn");
  let searchInput = document.querySelector("#searchInput");
  let searchInputContainer = document.querySelector(".searchContainer");
  let sideNavMenu = document.querySelector(".sideNav");
  let sideMenuToggle = document.querySelector(".sideMenuToggle");
  let pageTitle = document.querySelector("#pageTitle");
  let header = document.querySelector(".header");
  let modalWindow = document.querySelector("#modalWindow");
  let backgroundOutisdeModal = document.querySelector(
    "#backgroundOutsideModal"
  );
  let lastSearches = document.querySelector("#lastSearches");
  let homeAnchor = document.querySelector("#home");

  let listToggleBtn = document.querySelector("#listToggleBtn");
  let gridToggleBtn = document.querySelector("#gridToggleBtn");
  let suggestionList = document.querySelector("#suggestionList");

  let lastSearchesList = JSON.parse(localStorage.getItem("lastSearches")) || [];

  let nextGamesPage = "";
  let firstTimeFetching = true;
  let gridView = true;

  /*Platform icons */
  let nintendoSwitch = `<svg id="nintendo" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67443 13H7.67506C7.62406 13 7.58325 12.9591 7.58325 12.908V0.081761C7.58325 0.0408805 7.61385 0 7.66486 0H9.67443C11.5106 0 12.9999 1.49214 12.9999 3.33176V9.66824C12.9999 11.5079 11.5106 13 9.67443 13ZM11.4596 7.15409C11.4596 6.42846 10.8679 5.83569 10.1437 5.83569C9.41941 5.83569 8.83796 6.42846 8.82776 7.15409C8.82776 7.87972 9.41941 8.47248 10.1437 8.47248C10.8679 8.47248 11.4596 7.87972 11.4596 7.15409Z" fill="white"/>
  <path d="M2.16675 4.33333C2.16675 4.92917 2.65425 5.41667 3.25008 5.41667C3.84591 5.41667 4.33341 4.92917 4.33341 4.33333C4.33341 3.7375 3.84591 3.25 3.25008 3.25C2.64522 3.25 2.16675 3.72847 2.16675 4.33333Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.45677 0H6.40457C6.45759 0 6.5 0.0408805 6.5 0.0919811V12.908C6.5 12.9591 6.45759 13 6.40457 13H3.45677C1.54812 13 0 11.5079 0 9.66824V3.33176C0 1.49214 1.54812 0 3.45677 0ZM3.45677 11.9575H5.41843V1.04245H3.45677C2.82055 1.04245 2.22675 1.28774 1.7814 1.71698C1.32545 2.14623 1.08157 2.71855 1.08157 3.33176V9.66824C1.08157 10.2814 1.33605 10.8538 1.7814 11.283C2.22675 11.7225 2.82055 11.9575 3.45677 11.9575Z" fill="white"/>
  </svg>
  `;
  let playstation = `<svg id="playstation"  viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.5 0.149439L6.5 12.0297L9.07955 12.882L9.07955 2.9205C9.07955 2.4511 9.28024 2.13944 9.60212 2.24662C10.023 2.36835 10.1048 2.80075 10.1048 3.26493L10.1048 7.24338C11.7104 8.05381 12.9745 7.24296 12.9745 5.10468C12.9745 2.91966 12.2334 1.94626 10.0527 1.16365C9.19249 0.864976 7.59836 0.360979 6.5 0.149439Z" fill="white"/>
  <path d="M9.75 11.1429L13.6492 9.45771C14.0903 9.25915 14.1578 8.9894 13.8008 8.84764C13.4382 8.70325 12.791 8.74457 12.3452 8.93895L9.75 10.0506V8.27688L9.89861 8.21729C9.89861 8.21729 10.6498 7.89415 11.7064 7.75502C12.7609 7.61465 14.0541 7.77328 15.0706 8.2385C16.2156 8.68019 16.3439 9.32446 16.0542 9.77281C15.7603 10.2165 15.0478 10.5375 15.0478 10.5375L9.75 12.8484" fill="white"/>
  <path d="M1.18907 11.3388C-0.0278308 10.9682 -0.230758 10.185 0.324385 9.7326C0.836458 9.31949 1.70854 9.0085 1.70854 9.0085L5.31353 7.6032L5.31353 9.20264L2.72172 10.2184C2.26263 10.3979 2.1938 10.6505 2.56358 10.7827C2.93997 10.9202 3.60794 10.8832 4.0673 10.6979L5.31353 10.2067V11.6345C5.23321 11.6492 5.1439 11.6641 5.06238 11.6793C3.81985 11.9048 2.49607 11.8122 1.18907 11.3388Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1271 12.7978C16.0247 12.8989 15.8903 12.9561 15.7455 12.9561C15.6008 12.9561 15.462 12.8989 15.3594 12.7978C15.2582 12.6948 15.2021 12.5603 15.2021 12.4154C15.2021 12.1153 15.4451 11.8727 15.7455 11.8727C15.8903 11.8727 16.0247 11.928 16.1271 12.0314C16.2284 12.1324 16.2855 12.2692 16.2855 12.4154C16.2855 12.5603 16.2284 12.6948 16.1271 12.7978ZM15.2934 12.4154C15.2934 12.292 15.3396 12.1788 15.4239 12.095C15.5104 12.0092 15.6257 11.963 15.7455 11.963C15.8655 11.963 15.9779 12.0092 16.0622 12.095C16.1473 12.1788 16.1932 12.292 16.1932 12.4154C16.1932 12.6627 15.9922 12.8634 15.7455 12.8634C15.6257 12.8634 15.5104 12.8177 15.4239 12.7331C15.3396 12.6477 15.2934 12.5358 15.2934 12.4154ZM15.9927 12.6405C15.9976 12.6544 16.0034 12.6627 16.0118 12.6651L16.0193 12.6694V12.7038H15.9018L15.8996 12.6969L15.8916 12.6761C15.8903 12.6651 15.8887 12.6508 15.8871 12.6267L15.8819 12.5325C15.8805 12.4991 15.8696 12.4796 15.8494 12.4667C15.8345 12.4617 15.8141 12.4579 15.7837 12.4579H15.6205V12.7038H15.5134V12.0997H15.7941C15.8399 12.0997 15.8785 12.1078 15.908 12.1204C15.9672 12.1482 15.9976 12.1984 15.9976 12.269C15.9976 12.3037 15.9889 12.3362 15.9741 12.3601C15.9612 12.377 15.946 12.3924 15.9295 12.4075L15.9339 12.4106C15.9451 12.4185 15.9563 12.4263 15.9628 12.4378C15.9778 12.4543 15.9846 12.482 15.9858 12.5177L15.9885 12.5946C15.9889 12.6143 15.9905 12.6296 15.9927 12.6405ZM15.8661 12.3435C15.8835 12.3323 15.8916 12.31 15.8916 12.276C15.8916 12.2401 15.8792 12.2162 15.8549 12.2042C15.8399 12.1984 15.8214 12.1942 15.7964 12.1942H15.6205V12.3639H15.7867C15.8198 12.3639 15.846 12.3571 15.8661 12.3435Z" fill="white"/>
  </svg>
  `;
  let xbox = `<svg id="xbox"  viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 0C7.75357 0 8.79048 0.40056 9.73452 1.07423C9.75 1.07423 9.75 1.09244 9.75 1.11064C9.75 1.12885 9.73452 1.12885 9.71905 1.12885C8.5119 0.819328 6.68571 2.03922 6.51548 2.16667H6.5H6.48452C6.31429 2.03922 4.4881 0.819328 3.28095 1.12885C3.26548 1.12885 3.25 1.12885 3.25 1.11064C3.25 1.09244 3.25 1.07423 3.26548 1.07423C4.20952 0.40056 5.24643 0 6.5 0ZM10.6537 11.4392C11.6287 10.4302 8.40504 6.86712 6.5023 5.41667C6.5023 5.41667 6.48658 5.41667 6.48658 5.43243C4.59957 6.86712 1.3602 10.4302 2.35088 11.4392C3.45164 12.4167 4.91407 13 6.5023 13C8.09054 13 9.53724 12.4167 10.6537 11.4392ZM1.78082 2.19751C1.7734 2.19751 1.76969 2.20158 1.76598 2.20566C1.76227 2.20973 1.75856 2.2138 1.75114 2.2138C0.667808 3.40327 0 5.04896 0 6.8576C0 8.34035 0.460046 9.72534 1.21689 10.817C1.21689 10.8333 1.23174 10.8333 1.24658 10.8333C1.26142 10.8333 1.26142 10.817 1.24658 10.8007C0.78653 9.25282 3.11644 5.52149 4.31849 3.95726L4.33333 3.94097C4.33333 3.93257 4.33333 3.9285 4.3313 3.92653C4.32939 3.92467 4.32568 3.92467 4.31849 3.92467C2.49315 1.93681 1.8847 2.14863 1.78082 2.19751ZM8.66667 3.93424L8.68151 3.91793C10.5068 1.94443 11.1153 2.15646 11.2043 2.18908C11.2105 2.18908 11.2141 2.18908 11.2173 2.19025C11.2217 2.1919 11.2253 2.19586 11.234 2.20539C12.3322 3.39602 13 5.04332 13 6.85372C13 8.33792 12.54 9.72426 11.7831 10.817C11.7831 10.8333 11.7683 10.8333 11.7534 10.8333V10.8007C12.1986 9.25127 9.88356 5.5163 8.68151 3.95055C8.66667 3.95055 8.66667 3.93424 8.66667 3.93424Z" fill="white"/>
  </svg>
  `;
  let pc = `<svg id="pc"  viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.95833H5.95833V0.998704L13 0V5.95833ZM5.41667 1.08333V5.95833H0V1.80612L5.41667 1.08333ZM5.41667 6.5H0V11.1145L5.41667 11.9167V6.5ZM5.95833 11.912V6.5H13V13L5.95833 11.912Z" fill="white"/>
  </svg>
  `;

  let android = `<svg   id="android" xmlns="http://www.w3.org/2000/svg"  fill="white"
  viewBox="0 0 13 13" >
  <path  d="M 1.923 4.4873 c -0.2386 0 -0.4414 0.0832 -0.6078 0.2498 c -0.1664 0.1665 -0.2497 0.3663 -0.2497 0.5994 v 3.58 c 0 0.2385 0.0833 0.4411 0.2497 0.6076 c 0.1664 0.1666 0.3691 0.2497 0.6077 0.2497 c 0.2387 0 0.4399 -0.0831 0.6036 -0.2497 c 0.1638 -0.1665 0.2457 -0.3691 0.2457 -0.6076 V 5.3364 c 0 -0.2332 -0.0833 -0.4329 -0.2498 -0.5994 C 2.356 4.5705 2.1561 4.4873 1.923 4.4873 z M 3.1054 10.1902 c 0 0.2553 0.0888 0.4717 0.2664 0.6494 c 0.1776 0.1774 0.394 0.2662 0.6494 0.2662 h 0.6161 l 0.0084 1.8899 c 0 0.2387 0.0833 0.4412 0.2497 0.6077 c 0.1664 0.1665 0.3663 0.2498 0.5994 0.2498 c 0.2388 0 0.4413 -0.0832 0.6078 -0.2498 c 0.1665 -0.1666 0.2497 -0.369 0.2497 -0.6077 v -1.8899 h 1.1488 v 1.8899 c 0 0.2387 0.0832 0.4412 0.2497 0.6077 c 0.1666 0.1665 0.3692 0.2498 0.6079 0.2498 c 0.2385 0 0.4411 -0.0832 0.6075 -0.2498 c 0.1664 -0.1666 0.2496 -0.369 0.2496 -0.6077 v -1.8899 h 0.6245 c 0.2496 0 0.4634 -0.0886 0.6409 -0.2662 c 0.1776 -0.1776 0.2665 -0.3941 0.2665 -0.6494 V 4.6454 H 3.1054 V 10.1902 z M 8.8164 1.2738 L 9.4073 0.1831 c 0.0389 -0.0721 0.0249 -0.1276 -0.0415 -0.1664 c -0.0723 -0.0333 -0.1277 -0.0167 -0.1664 0.05 L 8.5998 1.1655 c -0.5273 -0.2331 -1.0849 -0.3497 -1.6733 -0.3497 c -0.5883 0 -1.1461 0.1166 -1.6734 0.3497 L 4.6537 0.0667 c -0.0387 -0.0667 -0.0943 -0.0833 -0.1664 -0.05 c -0.0666 0.0388 -0.0804 0.0943 -0.0416 0.1664 l 0.5911 1.0906 c -0.5995 0.3052 -1.0767 0.7312 -1.432 1.2779 c -0.3552 0.5467 -0.5328 1.1448 -0.5328 1.7941 h 7.701 c 0 -0.6493 -0.1776 -1.2474 -0.5328 -1.7941 C 9.8847 2.005 9.4104 1.579 8.8164 1.2738 z M 5.3988 2.8597 c -0.0638 0.0639 -0.1401 0.0958 -0.2289 0.0958 c -0.0888 0 -0.1637 -0.0319 -0.2248 -0.0958 c -0.061 -0.0638 -0.0916 -0.1401 -0.0916 -0.2289 c 0 -0.0888 0.0306 -0.1652 0.0916 -0.229 c 0.061 -0.0639 0.136 -0.0957 0.2248 -0.0957 c 0.0887 0 0.165 0.0318 0.2289 0.0957 c 0.0639 0.0639 0.0958 0.1402 0.0958 0.229 C 5.4946 2.7196 5.4627 2.7958 5.3988 2.8597 z M 8.9081 2.8597 c -0.0612 0.0639 -0.1361 0.0958 -0.2249 0.0958 c -0.0888 0 -0.165 -0.0319 -0.2288 -0.0958 c -0.0639 -0.0638 -0.0957 -0.1401 -0.0957 -0.2289 c 0 -0.0888 0.0318 -0.1652 0.0957 -0.229 c 0.0639 -0.0639 0.14 -0.0957 0.2288 -0.0957 c 0.0888 0 0.1637 0.0318 0.2249 0.0957 c 0.0609 0.0639 0.0915 0.1402 0.0915 0.229 C 8.9996 2.7196 8.969 2.7958 8.9081 2.8597 z M 12.5378 4.7328 c -0.1664 -0.1637 -0.369 -0.2456 -0.6077 -0.2456 c -0.233 0 -0.4328 0.0819 -0.5993 0.2456 c -0.1665 0.1638 -0.2498 0.365 -0.2498 0.6036 v 3.58 c 0 0.2385 0.0833 0.4411 0.2498 0.6076 c 0.1664 0.1666 0.3662 0.2497 0.5993 0.2497 c 0.2387 0 0.4413 -0.0831 0.6077 -0.2497 c 0.1666 -0.1665 0.2498 -0.3691 0.2498 -0.6076 V 5.3364 C 12.7876 5.0978 12.7044 4.8966 12.5378 4.7328 z"/>
  </svg>`;

  let linux = `<svg  id="linux" xmlns="http://www.w3.org/2000/svg"  
  viewBox="0 0 13 13"  fill="white">
  <path fill-rule="evenodd" clip-rule="evenodd"  d="M 8.4825 13.4534 c -0.0782 0 -0.1551 0 -0.2334 0 c -0.0686 -0.0165 -0.1373 -0.0288 -0.2045 -0.0508 c -0.243 -0.0782 -0.3899 -0.2622 -0.5079 -0.475 c -0.0206 -0.0371 -0.0439 -0.0577 -0.0865 -0.0673 c -1.0008 -0.232 -1.9974 -0.1757 -2.9941 0.0288 c -0.0206 0.0041 -0.0439 0.0233 -0.0549 0.0412 c -0.1977 0.3391 -0.5148 0.4846 -0.9047 0.4201 c -0.3157 -0.0522 -0.6136 -0.1579 -0.9129 -0.265 c -0.3418 -0.1222 -0.6795 -0.2595 -1.0378 -0.3254 c -0.2471 -0.0453 -0.497 -0.0741 -0.7441 -0.1194 c -0.1963 -0.0357 -0.3885 -0.0879 -0.5587 -0.1963 c -0.1812 -0.1153 -0.2293 -0.2526 -0.1647 -0.4585 c 0.0426 -0.1373 0.0865 -0.2746 0.1304 -0.4118 c 0.07 -0.2155 0.0755 -0.4297 -0.0014 -0.6452 c -0.0233 -0.0645 -0.0371 -0.1318 -0.0494 -0.1991 c -0.0549 -0.2952 0.0673 -0.4901 0.3542 -0.5711 c 0.022 -0.0069 0.0439 -0.0096 0.0673 -0.0165 c 0.1524 -0.0398 0.3061 -0.0741 0.4558 -0.1236 c 0.2251 -0.0755 0.416 -0.2018 0.5244 -0.4228 c 0.081 -0.1647 0.1757 -0.3157 0.3446 -0.4036 c -0.0728 -0.2155 -0.0865 -0.4324 -0.022 -0.6452 c 0.0426 -0.1387 0.1194 -0.2663 0.173 -0.4022 c 0.1318 -0.3405 0.2691 -0.6795 0.383 -1.0269 c 0.1949 -0.5876 0.475 -1.1257 0.8635 -1.6089 c 0.1963 -0.2444 0.3748 -0.5024 0.5615 -0.7537 c 0.0645 -0.0865 0.1098 -0.1826 0.1153 -0.2897 c 0.0151 -0.2897 0.0398 -0.5807 0.0302 -0.869 c -0.0137 -0.4269 -0.0549 -0.8539 -0.0782 -1.2808 c -0.0192 -0.3432 -0.0041 -0.6864 0.0755 -1.0227 c 0.0865 -0.3569 0.2471 -0.6686 0.5587 -0.8827 C 4.8089 0.2471 5.0752 0.1332 5.3608 0.0686 c 0.129 -0.0288 0.2595 -0.0467 0.3899 -0.0686 c 0.1194 0 0.2375 0 0.3569 0 c 0.0178 0.0041 0.0343 0.011 0.0522 0.0124 c 0.6342 0.0714 1.1216 0.372 1.4387 0.9294 c 0.2636 0.464 0.3789 0.9733 0.416 1.5005 c 0.0261 0.3693 0.0329 0.7399 0.0577 1.1092 c 0.0275 0.4187 0.1496 0.8045 0.4022 1.1477 c 0.2416 0.3281 0.4722 0.6631 0.7015 0.9994 c 0.3556 0.5217 0.6988 1.0502 0.9733 1.6199 c 0.1606 0.3336 0.2567 0.6823 0.2595 1.0557 c 0.0027 0.3377 -0.0384 0.6699 -0.1181 0.998 c -0.0069 0.0261 -0.0014 0.0659 0.0151 0.0837 c 0.1936 0.21 0.2924 0.4517 0.2828 0.7413 c -0.0069 0.2224 0.0741 0.4173 0.2526 0.5532 c 0.1181 0.0906 0.2526 0.1634 0.3871 0.2279 c 0.2869 0.1387 0.3652 0.4352 0.1743 0.6905 c -0.0851 0.1139 -0.2004 0.1936 -0.3226 0.2608 c -0.3199 0.1757 -0.6425 0.3487 -0.961 0.5299 c -0.3665 0.2087 -0.7235 0.4269 -1.0255 0.729 c -0.0741 0.0741 -0.173 0.129 -0.2704 0.1702 C 8.7159 13.4026 8.5965 13.4219 8.4825 13.4534 z M 4.2818 4.1802 c 0.0041 0.0247 0.0082 0.048 0.011 0.07 c 0.0027 0.0247 0.0041 0.0508 0.0027 0.0755 c -0.0165 0.442 -0.1702 0.8319 -0.4366 1.182 c -0.0453 0.059 -0.0947 0.1208 -0.1236 0.1881 c -0.1016 0.2444 -0.1991 0.4901 -0.291 0.7386 c -0.1043 0.2828 -0.1867 0.5752 -0.3418 0.836 c -0.2732 0.4599 -0.3871 0.9582 -0.372 1.4881 c 0.0096 0.3185 0.1085 0.6013 0.3556 0.8182 c 0.1222 0.1071 0.243 0.2155 0.3679 0.3185 c 0.2265 0.1853 0.4585 0.3638 0.6795 0.5546 c 0.0851 0.0728 0.1606 0.1647 0.2183 0.2608 c 0.1126 0.1881 0.0439 0.4311 -0.1455 0.5436 c -0.0549 0.0316 -0.1153 0.0535 -0.1743 0.0796 c 0.0014 0.0027 0.0027 0.0096 0.0069 0.0151 c 0.1743 0.2004 0.3473 0.4009 0.5244 0.5985 c 0.0178 0.0206 0.0549 0.0316 0.0837 0.0357 c 0.2938 0.0398 0.5889 0.0384 0.8827 0.011 c 0.2526 -0.0233 0.5079 -0.0439 0.7523 -0.103 c 0.5944 -0.1441 1.0502 -0.5066 1.4332 -0.9706 c 0.0178 -0.022 0.0233 -0.0577 0.0247 -0.0879 c 0.0055 -0.2265 0.0055 -0.453 0.0151 -0.6795 c 0.0082 -0.2004 0.0261 -0.4009 0.0439 -0.6013 c 0.0082 -0.092 0.0604 -0.1661 0.1496 -0.1853 c 0.0947 -0.0206 0.1936 -0.0192 0.291 -0.0233 c 0.0343 -0.0014 0.07 0.0082 0.1057 0.0137 c 0.0055 -0.0165 0.0082 -0.0261 0.0096 -0.0343 c 0.1634 -0.6905 0.1592 -1.3755 -0.0631 -2.0551 c -0.2581 -0.7866 -0.5766 -1.5499 -0.9211 -2.3008 c -0.1318 -0.2883 -0.2787 -0.5697 -0.4228 -0.8525 c -0.0426 -0.0851 -0.07 -0.0906 -0.162 -0.0645 c -0.0247 0.0069 -0.0494 0.0124 -0.0714 0.0247 c -0.1689 0.0865 -0.3377 0.173 -0.5052 0.2608 c -0.2567 0.1359 -0.5107 0.2759 -0.7674 0.4091 c -0.1455 0.0755 -0.2993 0.0728 -0.442 -0.0027 c -0.129 -0.0673 -0.254 -0.1455 -0.3679 -0.2347 C 4.5124 4.4081 4.4039 4.2927 4.2818 4.1802 z M 3.5473 12.9867 c 0.0563 -0.0151 0.1249 -0.0151 0.1661 -0.048 c 0.1043 -0.0837 0.2059 -0.1757 0.2897 -0.2787 c 0.1222 -0.1496 0.1428 -0.3267 0.0879 -0.5121 c -0.0577 -0.1922 -0.1702 -0.3514 -0.2952 -0.5052 c -0.1167 -0.1441 -0.2347 -0.2869 -0.335 -0.442 c -0.2293 -0.3583 -0.4393 -0.7276 -0.6713 -1.0845 c -0.1016 -0.1551 -0.2306 -0.2938 -0.3556 -0.4324 c -0.0508 -0.0563 -0.1208 -0.0975 -0.1894 -0.1332 c -0.1153 -0.0604 -0.1963 -0.0412 -0.2759 0.0631 c -0.0412 0.0535 -0.0741 0.1153 -0.1071 0.1757 c -0.048 0.0879 -0.0906 0.1798 -0.14 0.2663 c -0.07 0.1222 -0.173 0.2059 -0.3103 0.243 c -0.0906 0.0247 -0.1812 0.0453 -0.2718 0.0686 c -0.1345 0.0357 -0.2704 0.0686 -0.4022 0.1112 c -0.1098 0.0357 -0.1606 0.1167 -0.1483 0.2334 c 0.0082 0.0728 0.0165 0.1455 0.0329 0.2169 c 0.048 0.2032 0.0453 0.4022 -0.0178 0.6013 c -0.0439 0.1373 -0.0865 0.2759 -0.1112 0.416 c -0.0275 0.1592 0.0137 0.2238 0.1689 0.2608 c 0.2265 0.0535 0.4558 0.0975 0.685 0.1359 c 0.3336 0.0563 0.6631 0.1222 0.9747 0.265 c 0.1867 0.0851 0.3816 0.1524 0.5752 0.221 C 3.108 12.9002 3.3208 12.9647 3.5473 12.9867 z M 8.4194 9.762 c -0.0178 -0.0014 -0.0384 -0.0055 -0.059 -0.0055 c -0.1208 -0.0014 -0.1689 0.0384 -0.1757 0.1579 c -0.0041 0.0796 0.0014 0.1606 0.0041 0.2402 c 0.0082 0.2471 0.0426 0.4956 0.0206 0.7386 c -0.0316 0.3473 -0.1002 0.6919 -0.162 1.0351 c -0.0343 0.1922 -0.07 0.3816 -0.0316 0.5779 c 0.0892 0.4503 0.4214 0.6123 0.8237 0.3995 c 0.2004 -0.1057 0.3693 -0.2512 0.5313 -0.4077 c 0.0782 -0.0755 0.1592 -0.1551 0.2526 -0.21 c 0.3254 -0.1894 0.6576 -0.3665 0.987 -0.5505 c 0.1318 -0.0741 0.2636 -0.1455 0.3899 -0.2293 c 0.0879 -0.0577 0.092 -0.1387 0.0206 -0.2169 c -0.0371 -0.0398 -0.0796 -0.0769 -0.1249 -0.1057 c -0.0769 -0.0494 -0.1551 -0.0975 -0.2375 -0.1373 c -0.1757 -0.0837 -0.2855 -0.2224 -0.3542 -0.3995 c -0.0535 -0.1359 -0.0728 -0.2773 -0.0686 -0.4228 c 0.0027 -0.1249 -0.0316 -0.2361 -0.1414 -0.313 c -0.0069 0.0055 -0.0096 0.0069 -0.011 0.0082 c -0.0192 0.0343 -0.0384 0.0673 -0.0577 0.1016 c -0.1318 0.2444 -0.3212 0.4201 -0.5917 0.4997 c -0.1071 0.0316 -0.2169 0.0631 -0.3267 0.0714 c -0.3803 0.0275 -0.5917 -0.1139 -0.6589 -0.4887 C 8.4317 9.994 8.429 9.8814 8.4194 9.762 z M 5.2921 4.4945 c 0.0714 -0.0247 0.1496 -0.0398 0.2155 -0.0755 c 0.3514 -0.1936 0.7015 -0.3926 1.0488 -0.593 c 0.0975 -0.0563 0.1057 -0.1538 0.0206 -0.2279 c -0.0618 -0.0535 -0.1318 -0.1016 -0.2059 -0.1318 c -0.2691 -0.1085 -0.5423 -0.2059 -0.8113 -0.313 c -0.14 -0.0563 -0.2677 -0.0357 -0.3899 0.0426 c -0.0275 0.0178 -0.0563 0.0316 -0.081 0.0522 c -0.2032 0.1634 -0.4063 0.3254 -0.6068 0.4915 c -0.0206 0.0165 -0.0329 0.0659 -0.0247 0.0892 c 0.022 0.059 0.0522 0.1181 0.092 0.1647 c 0.1592 0.1867 0.3652 0.3157 0.5738 0.4407 C 5.1713 4.463 5.229 4.4726 5.2921 4.4945 z M 6.0184 3.0078 c 0.0041 -0.0096 0.0055 -0.0124 0.0055 -0.0137 c -0.0069 -0.0192 -0.0137 -0.0384 -0.0192 -0.0577 c -0.0412 -0.1414 -0.0384 -0.2814 0.0288 -0.4132 c 0.059 -0.1167 0.1441 -0.2032 0.2855 -0.2032 c 0.14 0 0.2265 0.0865 0.2855 0.2032 c 0.1139 0.2279 0.0563 0.4777 -0.1483 0.6576 c 0.1798 0.0906 0.1469 0.1071 0.2869 -0.0343 c 0.3103 -0.313 0.3006 -0.906 -0.0124 -1.2163 c -0.2183 -0.2169 -0.5299 -0.2375 -0.7646 -0.0453 c -0.2883 0.2347 -0.3583 0.6672 -0.2334 0.9898 c 0.0069 0.0165 0.0247 0.0316 0.0412 0.0398 C 5.8536 2.9447 5.9346 2.9762 6.0184 3.0078 z M 4.8583 3.027 c 0.0686 -0.048 0.1249 -0.1057 0.1922 -0.1318 c 0.0906 -0.0343 0.1153 -0.0947 0.1181 -0.1812 c 0.0124 -0.2526 -0.0316 -0.4887 -0.2032 -0.685 c -0.1743 -0.2004 -0.4297 -0.2004 -0.6095 -0.0041 c -0.0247 0.0275 -0.0494 0.0549 -0.0673 0.0865 c -0.1936 0.3418 -0.1991 0.6878 -0.0027 1.0282 c 0.0412 0.0728 0.1167 0.1249 0.1785 0.184 c 0.011 0.011 0.0439 0.0178 0.0535 0.0096 c 0.0604 -0.0467 0.1181 -0.0988 0.1716 -0.1455 c -0.0563 -0.0192 -0.1098 -0.0275 -0.1524 -0.0535 c -0.2004 -0.1263 -0.2636 -0.5148 -0.1181 -0.7029 c 0.0755 -0.0975 0.1894 -0.1222 0.2814 -0.0426 c 0.0645 0.0563 0.1181 0.1332 0.1538 0.2114 C 4.9174 2.736 4.9133 2.8801 4.8583 3.027 z"/>
  </svg>`;

  let mac = `<svg id="mac" fill="white" viewBox="0 0 900 1000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304.998 304.998"><path d="M702 960c-54.2 52.6-114 44.4-171 19.6-60.6-25.3-116-26.9-180 0-79.7 34.4-122 24.4-170-19.6-271-279-231-704 77-720 74.7 4 127 41.3 171 44.4 65.4-13.3 128-51.4 198-46.4 84.1 6.8 147 40 189 99.7-173 104-132 332 26.9 396-31.8 83.5-72.6 166-141 227zM423 237C414.9 113 515.4 11 631 1c15.9 143-130 250-208 236z"/></svg>`;

  /*let li = "";
  let listItems = "";*/
  let loader = `
  <div class="loader">
    <div class="loading"></div>
  </div>
`;

  /*--------events listeners---------- */

  if (window.innerWidth <= 767) {
    let searchBtnMovil = document.querySelector("#searchBtnMovil");

    searchBtnMovil.addEventListener("click", () => {
      console.log(header.style.height);

      if (header.style.height === "170px") {
        header.style.height = "104px";
      } else {
        header.style.height = "170px";
      }
    });
  }
  /*
  mainContent.addEventListener("scroll", (e) => {
    if (
      mainContent.offsetHeight + mainContent.scrollTop >=
      mainContent.scrollHeight
    ) {
      console.log("llegue al fin!");
      if (nextGamesPage.length > 0) {
        // getNextPageGames(nextGamesPage);
      }
    }
  });
*/
  searchInput.addEventListener("focus", () => {
    header.classList.add("showOverflow");
  });

  /*searchInput.addEventListener("blur", () => {
    header.classList.remove("showOverflow");
    hideSuggestions();
  });
*/
  logOutBtn.addEventListener("click", logOut);

  searchBtn.addEventListener("click", () => {
    search(searchInput.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      search(searchInput.value);
    }
  });

  searchInput.addEventListener(
    "keyup",
    debounce(() => {
      searchSuggestions(searchInput.value);
    }, 200)
  );

  sideMenuToggle.addEventListener("click", () => {
    if (sideNavMenu.classList.contains("sideNav")) {
      sideNavMenu.style.left = "0px";
      /* pageTitle.classList.add("h1SideMenu");*/
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id !== "sideMenuToggle") {
      sideNavMenu.style.left = "-500px";
    }
  });

  gridToggleBtn.addEventListener("click", () => {
    if (gridView === false) {
      let gameCardDesc = document.querySelectorAll(".gameCardDesc");
      let cardParagraph = document.querySelectorAll(".cardDescriptionP");
      let gameCardAtt = document.querySelectorAll(".gameCardAtt");
      let genResListed = document.querySelectorAll(".marg-l");
      let genResValListed = document.querySelectorAll(".pad-l");
      let gridNumber = document.querySelector("#h5GridNumber");

      gridNumber.classList.remove("hide");

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
      let gridNumber = document.querySelector("#h5GridNumber");

      gridNumber.classList.add("hide");

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

  lastSearches.addEventListener("click", displaySearchList);

  homeAnchor.addEventListener("click", getGames);

  /*-----------------------------------------------------------------------end of events listeners---------- */

  /*-----------------------------------------------------------------------Async functions------- */
  async function getGames() {
    listContent.innerHTML = loader;
    if (listContent.classList.contains("lastSearches")) {
      listContent.classList.remove("lastSearches");
    }

    try {
      console.log("getGames");
      const response = await fetch(
        "https://api.rawg.io/api/games?key=c7b6f273e3984c5e83fb3f76702937f2&page_size=39"
      );

      const json = await response.json();

      /*-----Ask for more game pages?-------*/
      if (json.next) {
        nextGamesPage = json.next;
      }

      ngFor(json.results);
    } catch (error) {
      throw Error(error);
    }
  }

  async function getNextPageGames(link) {
    try {
      console.log("Inside getNextPageGames");
      const response = await fetch(link);
      const json = await response.json();
      ngFor(json.results);
    } catch (error) {
      throw Error(error);
    }
  }

  async function search(searchQuery) {
    if (!lastSearchesList.includes(searchQuery)) {
      lastSearchesList.push(searchQuery);
      localStorage.setItem("lastSearches", JSON.stringify(lastSearchesList));
    }

    if (searchQuery.length === 0) {
      getGames();
    } else {
      listContent.innerHTML = loader;
      firstTimeFetching = true;
      try {
        response = await fetch(
          `https://api.rawg.io/api/games?key=c7b6f273e3984c5e83fb3f76702937f2&search=${searchQuery}&page_size=39`
        );

        let data = await response.json();
        ngFor(data.results);
      } catch (error) {
        throw Error(error);
      }
    }
  }

  async function searchSuggestions(searchQuery) {
    let suggestionListRetrieved = "";

    if (searchInput.value.length >= 3) {
      try {
        response = await fetch(
          `https://api.rawg.io/api/games?key=c7b6f273e3984c5e83fb3f76702937f2&search=${searchQuery}`
        );

        let data = await response.json();
        for (let index = 1; index < 4; index++) {
          const game = data.results[index];
          suggestionListRetrieved += `<li>${game.name}</li>`;
        }
        renderSuggestions(suggestionListRetrieved);
      } catch (error) {
        throw Error(error);
      }
    } else {
      hideSuggestions();
    }
  }

  async function getDescription(id) {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}?key=c7b6f273e3984c5e83fb3f76702937f2`
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
      `https://api.rawg.io/api/games/${id}?key=c7b6f273e3984c5e83fb3f76702937f2`
    );

    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  async function getScreenShots(id) {
    const response = await fetch(
      `https://api.rawg.io/api/games/${id}/screenshots?key=c7b6f273e3984c5e83fb3f76702937f2`
    );
    if (response.ok) {
      return response.json();
    } else {
      return Error(response.statusText);
    }
  }

  /*----------------------------------------------------------------------End of Async functions------- */

  /*----------------------------------------------------------------------initial list game ---------*/
  getGames();

  let ul = "";

  /*------- function for listing games------ */
  async function ngFor(listOfGames) {
    let i = 1;
    let listItems = "";
    let li = "";

    let gameDescription = null;
    listContent.innerHTML = "";
    /*forEachGame-------------------------------------- */

    //for (const game of listOfGames) {
    listOfGames.forEach(async (game) => {
      let genRes = game.genres || [];
      let genResString = "not defined";
      let background =
        game.background_image || "../assets/img/image-not-found-pikachu.jpg";
      let platforms = "";

      /*---get list genres------- */
      if (genRes) {
        genResString = genRes[0].name;
      }

      /*get desc for each game */

      let description = await getDescription(game.id);
      description = description.replaceAll("<p>", "");
      description = description.replaceAll("</p>", "");

      /*get platforms for each game */

      if (game.parent_platforms.length > 0) {
        game.parent_platforms.forEach((platform) => {
          switch (platform.platform.name) {
            case "PC":
              platforms += `${pc}`;
              break;
            case "PlayStation":
              platforms += `${playstation}`;
              break;
            case "Xbox":
              platforms += `${xbox}`;
              break;
            case "Nintendo":
              platforms += `${nintendoSwitch}`;
              break;
            case "Linux":
              platforms += `${linux}`;
              break;
            case "Apple Macintosh":
              platforms += `${mac}`;
              break;
            case "Android":
              platforms += `${android}`;
              break;
          }
        });
      }

      li = `
        
              <button data-game=${game.id}  class="btnCard">
                  <div class="gameCard">
                      <img
                          src="${background}"
                          class="gameCardCover"
                          alt="game cover"
                      />
                      <div class="gameCardDesc">
                          <div class="gameCardData">
                              <h3>${game.name}</h3>
                              <div class="gameCardAtt">
                                  <h6>Release date</h6>
                                  <h6>${game.released || "not defined"}</h6>
                                  <h6 class="marg-l">Genres</h6>
                                  <h6 class="pad-l">${genResString}</h6>
                              </div>
                          </div>
                          <div class="gameCardIcons">
                              <div class="icons">${platforms}</div>
                              
                              <h5 id="h5GridNumber">#${i}</h5>
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
        `;
      listItems += li;
      i++;

      let liNode = document.createElement("LI");
      liNode.innerHTML = li;

      listContent.appendChild(liNode);
      //listContent.innerHTML = listItems;
      console.log("LIST ITEMS INSIDE");
      /*
    if (firstTimeFetching) {
      listContent.innerHTML = listItems;
      firstTimeFetching = false;
    } else {
      listContent.innerHTML += listItems;
    }
*/
      /*ul = `<ul id="listContent">${listItems}</ul>`;
    mainContent.innerHTML = ul;
      */
      /*
    if(firstTimeFetching){
      mainContent.innerHTML = ul;
    }else{
      mainContent.
    }
    */
    });

    console.log("LIST ITEMS OUTSIDE");
    //listContent.innerHTML = listItems;

    //cosoooooo */

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

        let game = await getDetails(idGame).then(async (game) => {
          let genRes = game.genres;
          let genResString = [];
          let gameDevelopers = [];
          let gamePublishers = [];
          let ersbRating = "";
          let description = game.description;
          let listOfImages = "";
          let background =
            game.background_image ||
            "../assets/img/image-not-found-pikachu.jpg";
          let platforms = "";

          description = description.replaceAll("<p>", "");
          description = description.replaceAll("</p>", "");

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
              gameDevelopers.push(developer.name);
            });
            gameDevelopers = gameDevelopers.join(", ");
          } else {
            gameDevelopers = "developer not found";
          }

          /*get game publishers */

          if (game.publishers.length > 0) {
            game.publishers.forEach((publisher) => {
              gamePublishers.push(publisher.name);
            });
            gamePublishers.join(", ");
          } else {
            gamePublishers = "game publisher not found";
          }

          /*get ersb rating */
          if (game.esrb_rating !== null) {
            ersbRating = game.esrb_rating.name;
          } else {
            ersbRating = "not defined";
          }

          /*get platforms for each game */

          if (game.parent_platforms.length > 0) {
            game.parent_platforms.forEach((platform) => {
              switch (platform.platform.name) {
                case "PC":
                  platforms += `${pc}`;
                  break;
                case "PlayStation":
                  platforms += `${playstation}`;
                  break;
                case "Xbox":
                  platforms += `${xbox}`;
                  break;
                case "Nintendo":
                  platforms += `${nintendoSwitch}`;
                  break;
                case "Linux":
                  platforms += `${linux}`;
                  break;
                case "Apple Macintosh":
                  platforms += `${mac}`;
                  break;
                case "Android":
                  platforms += `${android}`;
                  break;
              }
            });
          }

          /*getScreenshots */

          let listOfSS = await getScreenShots(idGame);
          let SS = listOfSS.results;
          for (let index = 0; index < 5; index++) {
            if (listOfSS.results.length) {
              listOfImages += `<li><img src="${SS[index].image}" alt="Screenshot" /></li>`;
            } else {
              listOfImages += `<li><img src="../assets/img/image-not-found-pikachu.jpg" alt="Screenshot" /></li>`;
            }
          }

          modalContent = `
      <div class="modalContent">
        <div class="modalBackground">
          <img src="${background}" alt="Screenshot" />
        </div>
        <div class="modalWrapper">
        
        <button id="closeModalBtn" class="closeModal">
          <svg id="closeModalBtnSvg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="closeModalBtnPath" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.354 4.646C5.26011 4.55211 5.13278 4.49937 5 4.49937C4.86722 4.49937 4.73989 4.55211 4.646 4.646C4.55211 4.73989 4.49937 4.86722 4.49937 5C4.49937 5.13278 4.55211 5.26011 4.646 5.354L7.293 8L4.646 10.646C4.59951 10.6925 4.56264 10.7477 4.53748 10.8084C4.51232 10.8692 4.49937 10.9343 4.49937 11C4.49937 11.0657 4.51232 11.1308 4.53748 11.1916C4.56264 11.2523 4.59951 11.3075 4.646 11.354C4.73989 11.4479 4.86722 11.5006 5 11.5006C5.06574 11.5006 5.13084 11.4877 5.19158 11.4625C5.25232 11.4374 5.30751 11.4005 5.354 11.354L8 8.707L10.646 11.354C10.6925 11.4005 10.7477 11.4374 10.8084 11.4625C10.8692 11.4877 10.9343 11.5006 11 11.5006C11.0657 11.5006 11.1308 11.4877 11.1916 11.4625C11.2523 11.4374 11.3075 11.4005 11.354 11.354C11.4005 11.3075 11.4374 11.2523 11.4625 11.1916C11.4877 11.1308 11.5006 11.0657 11.5006 11C11.5006 10.9343 11.4877 10.8692 11.4625 10.8084C11.4374 10.7477 11.4005 10.6925 11.354 10.646L8.707 8L11.354 5.354C11.4005 5.30751 11.4374 5.25232 11.4625 5.19158C11.4877 5.13084 11.5006 5.06574 11.5006 5C11.5006 4.93426 11.4877 4.86916 11.4625 4.80842C11.4374 4.74768 11.4005 4.69249 11.354 4.646C11.3075 4.59951 11.2523 4.56264 11.1916 4.53748C11.1308 4.51232 11.0657 4.49937 11 4.49937C10.9343 4.49937 10.8692 4.51232 10.8084 4.53748C10.7477 4.56264 10.6925 4.59951 10.646 4.646L8 7.293L5.354 4.646Z" fill="white"/>
          </svg>

        
        </button>
        <div class="modalData">
          <div class="modalPlatformsIcons">
          ${platforms}
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

    /*COSOOOOO */
  }

  function closeModalAction() {
    modalWindow.style.display = "none";
    backgroundOutisdeModal.classList.remove("showBackgroundOutsideModal");
  }

  function displaySearchList() {
    let lastSearchesToMain = "";
    listContent.classList.add("lastSearches");
    if (lastSearchesList.length > 0) {
      lastSearchesList.forEach((search) => {
        lastSearchesToMain += `
          <li>${search}</li>
        `;
      });
      listContent.innerHTML = lastSearchesToMain;
    } else {
      listContent.innerHTML = "empty list";
    }
  }

  function debounce(func, delay) {
    let debounceTimer;

    return function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(func, delay);
    };
  }

  function renderSuggestions(list) {
    searchInput.classList.add("suggestionsDisplayed");
    suggestionList.innerHTML = list;
    addListenerToLi();
  }

  function hideSuggestions() {
    suggestionList.innerHTML = "";
    searchInput.classList.remove("suggestionsDisplayed");
  }

  function addListenerToLi() {
    let liSuggestions = document.querySelectorAll("#suggestionList>li");

    liSuggestions.forEach((li) => {
      li.addEventListener("click", (e) => {
        let valueSelected = e.target.innerText;
        valueSelected = valueSelected.replaceAll("<li>", "");
        valueSelected = valueSelected.replaceAll("</li>", "");
        console.log(valueSelected);

        search(valueSelected);
        searchInput.value = valueSelected;
        hideSuggestions();
      });

      li.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          let valueSelected = e.target.innerText;
          valueSelected = valueSelected.replaceAll("<li>", "");
          valueSelected = valueSelected.replaceAll("</li>", "");
          console.log(valueSelected);
          search(valueSelected);

          hideSuggestions();
        }
      });
    });
  }

  function logOut() {
    window.location.replace("../login/index.html");
  }
});
