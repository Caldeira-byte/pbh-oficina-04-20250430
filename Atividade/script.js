// script.js

const entradaTarefa = document.getElementById("entradaTarefa");
const botaoAdicionarTarefa = document.getElementById("botaoAdicionarTarefa");
const botaoRemoverTodas = document.getElementById("botaoRemoverTodas");
const listaTarefas = document.getElementById("listaTarefas");

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach((tarefa) => criarElementoTarefa(tarefa));
}

function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.textContent = tarefa.texto;
  if (tarefa.concluida) li.classList.add("concluida");

  li.onclick = () => {
    tarefa.concluida = !tarefa.concluida;
    li.classList.toggle("concluida");
    atualizarLocalStorage();
  };

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.onclick = (e) => {
    e.stopPropagation();
    removerTarefa(tarefa.texto);
    li.remove();
  };

  li.appendChild(botaoRemover);
  listaTarefas.appendChild(li);
}

function adicionarTarefa() {
  const textoTarefa = entradaTarefa.value.trim();
  if (textoTarefa === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  const tarefa = { texto: textoTarefa, concluida: false };
  criarElementoTarefa(tarefa);
  salvarTarefa(tarefa);
  entradaTarefa.value = "";
}

function salvarTarefa(tarefa) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function removerTarefa(textoTarefa) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas = tarefas.filter((tarefa) => tarefa.texto !== textoTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function atualizarLocalStorage() {
  const tarefas = [];
  document.querySelectorAll("li").forEach((li) => {
    const tarefa = {
      texto: li.firstChild.textContent,
      concluida: li.classList.contains("concluida"),
    };
    tarefas.push(tarefa);
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function removerTodasTarefas() {
  if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
    localStorage.removeItem("tarefas");
    listaTarefas.innerHTML = "";
  }
}

botaoAdicionarTarefa.addEventListener("click", adicionarTarefa);
botaoRemoverTodas.addEventListener("click", removerTodasTarefas);

entradaTarefa.addEventListener("keydown", (event) => {
  if (event.key === "Enter") adicionarTarefa();
});

carregarTarefas();
