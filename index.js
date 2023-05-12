(function(){
    const livros = [];
    const $ = document.querySelector.bind(document);
    const btnCadastrar = $('#btnCadastrar');
    const formLivro = $('#formLivro');
    const divLivros = $('.livros');
    const filtroNome = $('#filtroNome');
    const filtroCategoria = $('#filtroCategoria');

    window.addEventListener('load', () => {
        btnCadastrar.addEventListener('click', cadastrarLivro, false);
        filtroNome.addEventListener('input', filtrarListaLivros, false);
        filtroCategoria.addEventListener('input', filtrarListaLivros, false);
        divLivros.addEventListener('click', delegarClique, false);
    }, false);
    function cadastrarLivro() {
        const livro = {};
        livro.nome = $('#nome').value;
        livro.categoria = $('#categoria').value;
        if(formLivro.dataset.mode === 'editing') {
            livros[formLivro.dataset.index] = livro;
            formLivro.removeAttribute('data-mode');
            formLivro.removeAttribute('data-index');
            updateView();
            return formLivro.reset();
        }
        livros.push(livro);
        updateView();
        formLivro.reset();
    }
    function updateView(listaLivros = livros) {
        divLivros.innerHTML = '';
        listaLivros.forEach((livro, index) => {
            divLivros.innerHTML += `
                <div>
                    <strong>Nome:</strong> ${livro.nome} - 
                    <strong>Categoria:</strong> ${livro.categoria}  
                    <button class="editar" data-index="${index}" type="button">Editar</button>
                    <button class="excluir" data-index="${index}" type="button">Excluir</button>                
                </div>
            `;
        });
    }
    function filtrarListaLivros() {
        if(!livros.length) return;
        const nome = filtroNome.value;
        const categoria = filtroCategoria.value;
        const livrosFiltradosCategoria = livros.filter(livro => {
            return livro.categoria.startsWith(categoria);
        });
        const livrosFiltrados = livrosFiltradosCategoria.filter(livro => {
            return livro.nome.startsWith(nome);
        });
        updateView(livrosFiltrados);
    }

    function delegarClique({ target }) {
        if(target.classList.contains('editar')) return atualizarLivro(target.dataset.index);
        if(target.classList.contains('excluir')) return apagarLivro(target.dataset.index);
    }
    function atualizarLivro(index) {
        const livro = livros[index];
        $('#nome').value = livro.nome;
        $('#categoria').value = livro.categoria;
        formLivro.dataset.mode = 'editing';
        formLivro.dataset.index = index;
    }
    function apagarLivro(index) {
        livros.splice(index, 1);
        updateView();
    }
})();
