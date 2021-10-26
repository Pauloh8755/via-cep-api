'use stritic';

//Criando função assincrona
const pesquisarCep = async (cep) =>{
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    //fetch(url); pega uma url e faz uma requisição retornando o response
    // utlizando await para esperar o fetch responder
    const response = await fetch(url);
    //extraindo json do response
    const data = await response.json();
    return data;
}
//função para validação de cep com expressões regulares
const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

//função para limpar campos
const limparCampos = () =>{
    document.querySelector('#endereco').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';
}
// arrow para preencher os campos de endereço
const preencherEndereco = async (evento) => {
    //recebendo value do cep
    const cep = evento.target.value.replace('-', '');
    //limpando campos
    limparCampos();

    //validando se usuario n digitar
    if(cep === '') return 0;

    //validando cep
    if(cepValido(cep)){
        //recebendo informações de enreço
        const infoCep = await pesquisarCep(cep);
        // console.log(infoCep);
        if(infoCep.erro){
            alert("CEP não encontrado");
        }
        else{
            //Distribuindo dados do json nos inputs
            document.querySelector('#endereco').value = infoCep.logradouro;
            document.querySelector('#bairro').value = infoCep.bairro;
            document.querySelector('#cidade').value = infoCep.localidade;
            document.querySelector('#estado').value = infoCep.uf;
        }  
    }
    else{
        alert("Digite o CEP corretamente");
    }
    

};
//chamando evento quando o usuario sair do input e passando como parametro
document.querySelector('#cep').addEventListener('focusout', preencherEndereco);

