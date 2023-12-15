# FinalProject
## Запуск
### Запуск сервера: 
в папке server 
npm start

### Запуск фронта
В папке front 
npm start

### проверка доступности сервера через cmd:
curl -G -d "name=admin" -d "email=admin@mail.com" http://localhost:5000/login


## Возможные ошибки
### ошибки базы
оишбка: "Client does not support authentication protocol requested by server; consider upgrading MySQL client'". 
Для устранения надо ввести вот эту команду:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
