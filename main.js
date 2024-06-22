// Seleciona o formulário pelo ID 'form-atividade'
const form = document.getElementById('form-atividade');

// Strings que representam imagens de emoji para aprovação e reprovação
const imgAprovado = '<img src="images/aprovado.png" alt="emoji festejando" />';
const imgReprovado = '<img src="images/reprovado.png" alt="emoji decepcionado" />';
const atividades = []; // Array para armazenar nomes das atividades
const notas = []; // Array para armazenar notas das atividades
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const NotaMinima = parseFloat(prompt("Digite a nota mínima: ")); // Solicita ao usuário a nota mínima

// Inicializa uma string vazia para armazenar as linhas da tabela
let linhas = '';

// Adiciona um evento de escuta para quando o formulário for submetido
form.addEventListener('submit', function(e) {
    // Previne o comportamento padrão de submissão do formulário
    e.preventDefault();

    // Chama as funções para adicionar uma nova linha na tabela e atualizar os dados exibidos
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

// Função para adicionar uma nova linha na tabela com os dados do formulário submetido
function adicionaLinha() {
    // Seleciona os inputs de nome e nota da atividade pelo ID
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Verifica se a atividade já foi adicionada
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida.`);
    } else {
        // Adiciona o nome e nota da atividade aos arrays correspondentes
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        
        // Cria uma linha da tabela HTML com os dados do formulário submetido
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; // Insere o nome da atividade
        linha += `<td>${inputNotaAtividade.value}</td>`; // Insere a nota da atividade
        // Insere o emoji de aprovação ou reprovação baseado na nota
        linha += `<td>${inputNotaAtividade.value >= NotaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
        
        // Adiciona a linha criada à variável que armazena todas as linhas da tabela
        linhas += linha;
    }

    // Limpa os campos de input do formulário após adicionar a linha
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

// Função para atualizar o corpo da tabela com todas as linhas criadas
function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); // Seleciona o corpo da tabela
    corpoTabela.innerHTML = linhas; // Atualiza o conteúdo do corpo da tabela com as linhas criadas
}

// Função para atualizar a média final das notas e exibir o resultado na página
function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal(); // Calcula a média final das notas
    // Atualiza o valor da média final e exibe se o aluno foi aprovado ou reprovado
    document.querySelector('#media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.querySelector('#media-final-resultado').innerHTML = mediaFinal >= NotaMinima ? spanAprovado : spanReprovado;
}

// Função para calcular a média final das notas armazenadas
function calculaMediaFinal() {
    let somaDasNotas = 0;
    // Itera sobre o array de notas e calcula a soma total das notas
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    // Retorna a média das notas
    return somaDasNotas / notas.length;
}
