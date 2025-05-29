const form = document.getElementById('form-clima');
const inputCidade = document.getElementById('cidade');
const resultado = document.getElementById('resultado');

const API_KEY = 'SUA_API_KEY_AQUI'; // Substitua pela sua chave da OpenWeatherMap

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cidade = inputCidade.value.trim();
  if (!cidade) {
    mostrarErro('Por favor, digite o nome da cidade.');
    return;
  }

  try {
    resultado.innerHTML = 'Carregando...';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error('Cidade não encontrada.');
    }

    const dados = await resposta.json();
    mostrarClima(dados);
  } catch (error) {
    mostrarErro(error.message);
  }
});

function mostrarClima(dados) {
  const { name, sys, main, weather, wind } = dados;
  const icone = weather[0].icon;
  const descricao = weather[0].description;
  const temp = main.temp.toFixed(1);
  const tempMax = main.temp_max.toFixed(1);
  const tempMin = main.temp_min.toFixed(1);
  const umidade = main.humidity;
  const vento = wind.speed;

  resultado.innerHTML = `
    <div class="weather-card">
      <h2>${name}, ${sys.country}</h2>
      <img class="weather-icon" src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="${descricao}" />
      <p><strong>${descricao.charAt(0).toUpperCase() + descricao.slice(1)}</strong></p>
      <p>Temperatura: ${temp} °C</p>
      <p>Máx: ${tempMax} °C | Mín: ${tempMin} °C</p>
      <p>Umidade: ${umidade}%</p>
      <p>Vento: ${vento} m/s</p>
    </div>
  `;
}

function mostrarErro(msg) {
  resultado.innerHTML = `<p class="error-message">${msg}</p>`;
}

