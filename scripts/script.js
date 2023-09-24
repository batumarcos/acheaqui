// Defina uma função para carregar os dados do arquivo JSON
function loadData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', '../dados/baturite.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}

// Função para realizar a pesquisa
function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");

    // Limpar resultados anteriores
    resultsContainer.innerHTML = "";

    // Carregar os dados do arquivo JSON
    loadData(function (data) {
        // Filtrar os dados com base na pesquisa
        const filteredData = data.filter(item => item.nome_fantasia.toLowerCase().includes(searchInput));

        // Exibir os resultados
        if (filteredData.length === 0) {
            resultsContainer.innerHTML = "Nenhum resultado encontrado.";
        } else {
            const resultList = document.createElement("ul");
            filteredData.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.nome_fantasia}, Contato: ${item.telefone1}`;
                resultList.appendChild(listItem);
            });
            resultsContainer.appendChild(resultList);
        }
    });
}

// Adicione um evento keydown ao campo de entrada
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", function(event) {
    // Verifique se a tecla pressionada é a tecla "Enter" (código 13)
    if (event.keyCode === 13) {
        // Chame a função search()
        search();
    }
});
