// Definição das estruturas de cada tipo de arquivo
const fileStructures = {
    agenda: [
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'telefone', label: 'Telefone', type: 'tel', required: true },
        { name: 'email', label: 'E-mail', type: 'email', required: true }
    ],
    produtos: [
        { name: 'nome', label: 'Nome do Produto', type: 'text', required: true },
        { name: 'precoUnitario', label: 'Preço Unitário (R$)', type: 'number', required: true, step: '0.01' },
        { name: 'quantidade', label: 'Quantidade', type: 'number', required: true }
    ],
    filmes: [
        { name: 'titulo', label: 'Título', type: 'text', required: true },
        { name: 'genero', label: 'Gênero', type: 'text', required: true },
        { name: 'duracao', label: 'Duração (min)', type: 'number', required: true }
    ],
    musicas: [
        { name: 'titulo', label: 'Título', type: 'text', required: true },
        { name: 'cantor', label: 'Cantor/Artista', type: 'text', required: true },
        { name: 'duracao', label: 'Duração (seg)', type: 'number', required: true }
    ],
    alunos: [
        { name: 'matricula', label: 'Matrícula', type: 'text', required: true },
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'sexo', label: 'Sexo', type: 'select', required: true, options: ['Masculino', 'Feminino', 'Outro'] }
    ],
    clientes: [
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'cpf', label: 'CPF', type: 'text', required: true },
        { name: 'sexo', label: 'Sexo', type: 'select', required: true, options: ['Masculino', 'Feminino', 'Outro'] }
    ],
    professores: [
        { name: 'matricula', label: 'Matrícula', type: 'text', required: true },
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'formacao', label: 'Formação', type: 'text', required: true }
    ],
    disciplinas: [
        { name: 'codigo', label: 'Código', type: 'text', required: true },
        { name: 'descricao', label: 'Descrição', type: 'text', required: true },
        { name: 'cargaHoraria', label: 'Carga Horária (h)', type: 'number', required: true }
    ],
    associados: [
        { name: 'matricula', label: 'Matrícula', type: 'text', required: true },
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'sexo', label: 'Sexo', type: 'select', required: true, options: ['Masculino', 'Feminino', 'Outro'] }
    ],
    livros: [
        { name: 'titulo', label: 'Título', type: 'text', required: true },
        { name: 'editora', label: 'Editora', type: 'text', required: true },
        { name: 'numeroPaginas', label: 'Número de Páginas', type: 'number', required: true }
    ]
};

// Títulos amigáveis para cada tipo
const fileTitles = {
    agenda: 'Agenda Telefônica',
    produtos: 'Produtos',
    filmes: 'Filmes',
    musicas: 'Músicas',
    alunos: 'Alunos',
    clientes: 'Clientes',
    professores: 'Professores',
    disciplinas: 'Disciplinas',
    associados: 'Associados',
    livros: 'Livros'
};

// Armazenamento dos registros (simula arquivo) - AGORA SEPARADO POR TIPO
let allFiles = {
    agenda: [],
    produtos: [],
    filmes: [],
    musicas: [],
    alunos: [],
    clientes: [],
    professores: [],
    disciplinas: [],
    associados: [],
    livros: []
};

let currentFileType = '';

// Elementos do DOM
const fileTypeSelect = document.getElementById('fileType');
const formSection = document.getElementById('formSection');
const formTitle = document.getElementById('formTitle');
const recordForm = document.getElementById('recordForm');
const dynamicFields = document.getElementById('dynamicFields');
const listSection = document.getElementById('listSection');
const recordsList = document.getElementById('recordsList');
const recordCount = document.getElementById('recordCount');
const deleteFileBtn = document.getElementById('deleteFileBtn');

// Event Listeners
fileTypeSelect.addEventListener('change', handleFileTypeChange);
recordForm.addEventListener('submit', handleFormSubmit);
deleteFileBtn.addEventListener('click', handleDeleteFile);

// Função para lidar com mudança no tipo de arquivo
function handleFileTypeChange(e) {
    currentFileType = e.target.value;
    
    if (currentFileType === '') {
        formSection.style.display = 'none';
        listSection.style.display = 'none';
        return;
    }
    
    // Mostrar seções
    formSection.style.display = 'block';
    listSection.style.display = 'block';
    
    // Atualizar título
    formTitle.textContent = `Cadastrar ${fileTitles[currentFileType]}`;
    
    // Criar campos dinâmicos
    createDynamicFields();
    
    // Atualizar listagem com os registros salvos deste tipo
    updateRecordsList();
}

// Função para criar campos dinâmicos no formulário
function createDynamicFields() {
    dynamicFields.innerHTML = '';
    const structure = fileStructures[currentFileType];
    
    structure.forEach(field => {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'field-group';
        
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.name);
        
        let input;
        
        if (field.type === 'select') {
            input = document.createElement('select');
            input.className = 'form-input';
            
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Selecione --';
            input.appendChild(defaultOption);
            
            field.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                input.appendChild(opt);
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
            
            if (field.step) {
                input.step = field.step;
            }
            if (field.type === 'number') {
                input.min = '0';
            }
        }
        
        input.id = field.name;
        input.name = field.name;
        input.required = field.required;
        
        fieldGroup.appendChild(label);
        fieldGroup.appendChild(input);
        dynamicFields.appendChild(fieldGroup);
    });
}

// Função para lidar com envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(recordForm);
    const record = {};
    
    for (let [key, value] of formData.entries()) {
        record[key] = value;
    }
    
    // Adicionar registro ao array do tipo específico
    allFiles[currentFileType].push(record);
    
    // Limpar formulário
    recordForm.reset();
    
    // Atualizar listagem
    updateRecordsList();
    
    // Scroll para a lista
    listSection.scrollIntoView({ behavior: 'smooth' });
}

// Função para atualizar a listagem de registros
function updateRecordsList() {
    const records = allFiles[currentFileType];
    recordCount.textContent = records.length;
    
    if (records.length === 0) {
        recordsList.innerHTML = '<div class="empty-message">Nenhum registro cadastrado ainda.</div>';
        return;
    }
    
    recordsList.innerHTML = '';
    
    records.forEach((record, index) => {
        const card = document.createElement('div');
        card.className = 'record-card';
        
        const header = document.createElement('div');
        header.className = 'record-header';
        
        const recordNumber = document.createElement('div');
        recordNumber.className = 'record-number';
        recordNumber.textContent = `Registro #${index + 1}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteRecord(index);
        
        header.appendChild(recordNumber);
        header.appendChild(deleteBtn);
        
        const content = document.createElement('div');
        content.className = 'record-content';
        
        const structure = fileStructures[currentFileType];
        structure.forEach(field => {
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'record-field';
            
            const fieldLabel = document.createElement('strong');
            fieldLabel.textContent = field.label + ':';
            
            const fieldValue = document.createElement('span');
            fieldValue.textContent = record[field.name] || '-';
            
            fieldDiv.appendChild(fieldLabel);
            fieldDiv.appendChild(fieldValue);
            content.appendChild(fieldDiv);
        });
        
        card.appendChild(header);
        card.appendChild(content);
        recordsList.appendChild(card);
    });
}

// Função para excluir um registro específico
function deleteRecord(index) {
    if (confirm(`Deseja realmente excluir o Registro #${index + 1}?`)) {
        allFiles[currentFileType].splice(index, 1);
        updateRecordsList();
    }
}

// Função para remover o arquivo inteiro (todos os registros)
function handleDeleteFile() {
    const records = allFiles[currentFileType];
    
    if (records.length === 0) {
        alert('Não há registros para remover.');
        return;
    }
    
    if (confirm(`Deseja realmente remover TODOS os ${records.length} registros do arquivo ${fileTitles[currentFileType]}?`)) {
        allFiles[currentFileType] = [];
        updateRecordsList();
        alert('Arquivo removido com sucesso!');
    }
}