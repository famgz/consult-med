# Consult Med

### Gerencie suas consultas médicas.

<br>


Aplicativo desenvolvido com a ferramenta Angular 17 para gerenciamento de consultas médicas.

<br>
<br>


![mobile version](https://raw.githubusercontent.com/famgz/famgz/main/presentations/consult-med/mobile.jpg)

![desktop version screen1](https://raw.githubusercontent.com/famgz/famgz/main/presentations/consult-med/desktop1.jpg)

![desktop version screen2](https://raw.githubusercontent.com/famgz/famgz/main/presentations/consult-med/desktop2.jpg)

![desktop version screen3](https://raw.githubusercontent.com/famgz/famgz/main/presentations/consult-med/desktop3.jpg)


<br>
<br>

---

<br>
<br>


# Angular II - Projeto final

## O que?

Desenvolver, utilizando os conceitos abordados ao longo do módulo, uma aplicação de gerenciamento de consultas médicas.

---

## Como?

A aplicação consiste em um sistema de gerenciamento de consultas médicas, que deverá ter, obrigatoriamente:

- Uma tela de cadastro de usuário, levando em conta os perfis possíveis (`USER` e `ADMIN`).

- Uma tela de login, onde usuário poderá autenticar-se na aplicação.

- Uma tela de dashboard, onde o usuário poderá visualizar e gerenciar as consultas.

---

- De acordo com o perfil do usuário autenticado, apresentar as telas e recursos possíveis a esse usuário:

- `ADMIN`

  - Verá todas as consultas agendadas, para todos os usuários, e poderá cancelar ou marcar como concluída cada uma delas.

- `USER`

  - Verá somente as suas próprias consultas, podendo editar ou cancelar qualquer uma delas
  - Uma consulta concluída náo poderá ser editada ou cancelada, assim como uma consulta cancelada nao pode ser editada ou marcada como concluída

- Os status possíveis para uma consulta são `SCHEDULED` (agendada, valor padrão, quando uma consulta é criada), `DONE` (concluída) e `CANCELED` (cancelada)

---

## Entrega

Última aula, dia 22/05

---

## Observações

Para a persistência das consultas, utilizaremos uma API, similar à utilizada em aula, que está disponível neste [repositório](https://github.com/ivirson/appointments-api).


<br>
<br>

---

<br>
<br>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
