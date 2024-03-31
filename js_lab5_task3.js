class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  // Асинхронная функция для загрузки JSON с заданного URL
  async function loadJson(url) {
    const response = await fetch(url);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  
  // Асинхронная функция для получения пользователя GitHub
  async function getGithubUser() {
    let user;
  
    // Пока не получим приемлемого результата, как в примере
    while (!user) {
      let name = prompt("Введите логин?", "iliakan");
      try {
        const response = await fetch(`https://api.github.com/users/${name}`);
  
        if (response.status === 404) {
          alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        } else {
          // Если запрос прошел успешно, получаем данные о пользователе
          user = await response.json();
          alert(`Полное имя: ${user.name}.`);
        }
      } catch (err) {
        console.error('Ошибка:', err);
        alert("Произошла ошибка, пожалуйста, повторите ввод.");
      }
    }
    
    return user;
  }
  
  (async () => {
    try {
      const user = await getGithubUser();
      console.log('Пользователь:', user);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  })();
  