const btn = document.getElementById("addTask");
const lista = document.getElementById("taskList");

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarLista() {
  lista.innerHTML = "";
  tarefas.forEach((tarefa, index) => {
    const itemLista = document.createElement("li");
    itemLista.innerText = tarefa;
    itemLista.addEventListener("click", () => {
      const confirmacao = window.confirm("Tem certeza de que deseja apagar esta tarefa?");
      if (confirmacao) {
        tarefas.splice(index, 1);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        atualizarLista();
      }
    });
    lista.appendChild(itemLista);
  });
}

atualizarLista();

btn.addEventListener("click", () => {
  const valor = document.getElementById("taskInput").value.trim(); // Remover espaços em branco
  if (valor) {
    if (!tarefas.includes(valor)) { // Verificar duplicatas
      tarefas.push(valor);
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      atualizarLista();
      document.getElementById("taskInput").value = "";
    } else {
      alert("Esta tarefa já existe na lista.");
    }
  } else {
    alert("Por favor, insira uma tarefa válida.");
  }
});

const clearButton = document.createElement("button");
clearButton.innerText = "Limpar Tudo";
clearButton.addEventListener("click", () => {
  if (window.confirm("Tem certeza de que deseja limpar todas as tarefas?")) {
    localStorage.removeItem('tarefas');
    tarefas.length = 0;
    atualizarLista();
  }
});
document.body.appendChild(clearButton);
