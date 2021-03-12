//const { response } = require("express");
alert("Loading Table"); {
  async function updateTable(root) {

    const table = root.querySelector(".table-refresh__table");
    const res = await fetch(root.dataset.url);
    const data = await res.json();

    table.querySelector("thead tr").innerHTML = "";
    table.querySelector("tbody").innerHTML = "";

    for (const header of data.headers) {
      table.querySelector("thead tr").insertAdjacentHTML("beforeend", '<th>${ header }</th>');
    }

    for (const row of data.rows) {
      table.querySelector("tbody").insertAdjacentHTML("beforeend", '<tr></tr>');     // ${ row.map(col => '<td> ${ col } < /td>').join("") } 
    }
  }



    for (const root of document.querySelectorAll(".table-refresh[data-url]")) {
      console.log(root);

      const table = document.createElement("table");

      table.classList.add("table-refresh__table");
      table.innerHTML = "<thead><tr></tr></thead>" +
        "<tbody><tr><td>Loading</td></tr></tbody>";

      root.append(table);

      updateTable(root);
    }
  }