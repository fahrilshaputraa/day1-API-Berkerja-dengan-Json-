$.getJSON("data/data.json", function (data) {
  const logo = data.logo;
  const kategoris = data.kategori;
  const menus = data.menus;

  // logo
  $("#logo").attr("src", "images/logo/" + logo);
  $("link[rel*='icon']").attr("href", "images/logo/" + logo);
  // menus
  // if
  let favorite = menus.reduce((max, current) => (current.suka > max.suka ? current : max), menus[0]);
  $(".favorite>img").attr("src", "images/menus/" + favorite.gambar);
  $(".favorite>.leading-normal>h5").text(favorite.nama);
  $(".favorite>.leading-normal>p").text(favorite.deskripsi);

  const codeHtml = (data) =>
    '<div class="w-full" <a href="#"> <img class="p-2 rounded-t-lg" src="images/menus/' +
    data.gambar +
    '" alt="' +
    data.nama +
    '" /> </a> <div class="px-2 pb-5"> <h5 class="text-lg font-bold tracking-tight text-gray-900 text-center">' +
    data.nama +
    '</h5><p class="text-md text-center mt-2.5 mb-5">' +
    data.deskripsi +
    "</p></div></div>";

  // function showMenu() {
  //   menus.map((menu) => $("#menu").append(codeHtml(menu)));
  // }

  // showMenu();

  // // kategoris
  // kategoris.map((kategori) => {
  //   $("#dropdownDotsHorizontal>ul").append('<li><a class="block px-4 py-2 hover:bg-gray-100">' + kategori.kategory + "</a></li>");
  //   $("#dropdownDotsHorizontal>ul>li").click(function () {
  //     let filter = $(this).text();
  //     let data = menus.filter((menu) => menu.kategory === filter);

  //     if (filter === "all menu") {
  //       $("#menu").html("");
  //       showMenu();
  //       return;
  //     }
  //     let content = "";
  //     data.map((g) => (content += codeHtml(g)));
  //     $("#menu").html(content);
  //   });
  // });

  //  short code
  function showMenu() {
    menus.map((menu) => $("#menu").append(codeHtml(menu)));
  }

  function updateMenu(filter) {
    let contentMenu = "";
    if (filter === "all menu") {
      $("#menu").html("");
      showMenu();
    } else {
      let data = menus.filter((menu) => menu.kategory === filter);
      data.map((g) => (contentMenu += codeHtml(g)));
      $("#menu").html(contentMenu);
    }
  }

  kategoris.map((kategori) => {
    $("#dropdownDotsHorizontal>ul").append('<li><a class="block px-4 py-2 hover:bg-gray-100">' + kategori.kategory + "</a></li>");
  });

  $("#dropdownDotsHorizontal>ul>li").click(function () {
    let filter = $(this).text();
    updateMenu(filter);
  });

  showMenu();
});
