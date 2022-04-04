<h1> ScheduleBot</h1>
<h2>Состав команды:</h2>

3530904/90104:
+ Василевская Екатерина Витальевна
+ Свиридов Артём Александрович

3530904/90101:
+ Фёдоров Герман Юрьевич

<h2>Определение проблемы</h2>

Целью данного проекта является создание бота в телеграмме для поиска расписания занятий в СПБПУ
<h2>Роли</h2>

+ Фёдоров Герман - разработка бота на JS, изучение альтернативных способов реализации проекта
+ Василевская Екатерина - Упаковка бота в Docker контейнер и его деплой
+ Свиридов Артём - изучение предметной области, написание технической документации

В виду малых размеров проекта, деление не является строгим

<h2>Запуск и тестирование программы</h2>

Для запуска используем JavaScript версии ECMASript 6+ <br>

Также потребуется установить: <br>
+ Node.js

Для использования бота необходимо перейти в Telegram и найти его по следующему имени
+ @Polytech_tt_Bot

Для запуска тестов использовалась следующая команда 
+ Npm run dev
    
    
  1. Все возможные команды нашего бота:<br>
![image](https://user-images.githubusercontent.com/71269602/161543071-69cb810e-e52b-4b2e-acdc-ba5c3f565d92.png)<br>
  2. Ввод корректных данных:<br>
![image](https://user-images.githubusercontent.com/71269602/161543439-4154a7c7-ef7f-43e2-a35f-22f194278ba3.png)<br>
  3. Ввод ошибочных данных:<br>
![image](https://user-images.githubusercontent.com/71269602/161543706-bfe107f4-0589-4cc2-8bd9-5568685b9c2a.png)<br>
  4. Добавление заметок <br>
![image](https://user-images.githubusercontent.com/71269602/161544363-3e61132f-ee01-4e3e-bda4-e2eb137d2326.png)<br>
  5. Показать заметки для группы <br>
![image](https://user-images.githubusercontent.com/71269602/161544818-c903bd47-e5ea-4e93-a454-f93d35dafb98.png)<br>
  6. Удаление заметки для группы <br>
![image](https://user-images.githubusercontent.com/71269602/161545200-10320aed-2a2f-4757-9518-e9f85a1ebc9a.png)<br>
  7. Показать расписание<br>
![image](https://user-images.githubusercontent.com/71269602/161545404-73e22dc5-8c7d-4ba7-8ab6-895954177ec0.png)<br>
  8. Показать дополнительные ссылки <br>
![image](https://user-images.githubusercontent.com/71269602/161545367-41105ad9-2b9b-44c1-9546-884cb0d60b13.png)<br>



 



<h2>Упаковка бота в Docker контейнер и его деплой</h2>

Запуск в docker контейнере:
+ Перед работой с контейнерами потребуется установить Docker и docker-compose<br>
Инструкция для Windows 10 (вместе с docker сразу устанавливается docker-compose):
+ https://docs.microsoft.com/ru-ru/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-Server
<h2>Разработка архитектуры и детальное проектирование</h2>
C4 model
