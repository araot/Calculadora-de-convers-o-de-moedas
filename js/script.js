
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('currency-converter');
    if (!form) return; // Se o formulário não for encontrado, não faz nada.
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const amount = document.getElementById('amount').value;
      const fromCurrency = document.getElementById('from-currency').value;
      const toCurrency = document.getElementById('to-currency').value;
  
      // Validar a entrada
      if (fromCurrency === toCurrency) {
        Swal.fire('Erro', 'As moedas de origem e destino não podem ser as mesmas.', 'error');
        return;
      }
  
      if (isNaN(amount) || amount <= 0) {
        Swal.fire('Erro', 'Por favor, insira um valor válido.', 'error');
        return;
      }
  
      // URL da API com a chave
      const apiUrl = `https://v6.exchangerate-api.com/v6/a4ec4b7dce987f1f4f09d50e/latest/${fromCurrency}`;
  
      // Requisição para obter os dados de cotação
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao obter os dados da API');
          }
          return response.json();
        })
        .then(data => {
          const rate = data.conversion_rates[toCurrency];
          if (!rate) {
            throw new Error('Não foi possível encontrar a taxa de conversão para a moeda destino.');
          }
          const convertedAmount = (rate * amount).toFixed(2);
  
          // Formatando o valor convertido com separadores de milhar e casas decimais
          const formattedAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: toCurrency === 'AOA' ? 'AOA' : toCurrency === 'USD' ? 'USD' : 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(convertedAmount);
  
          // Exibindo o resultado formatado
          document.getElementById('conversion-result').textContent = formattedAmount;
          Swal.fire('Conversão realizada', `O valor convertido é: ${formattedAmount}`, 'success');
        })
        .catch(error => {
          Swal.fire('Erro', `Erro ao realizar a conversão: ${error.message}`, 'error');
        });
    });
  });
   