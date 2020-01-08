# BUG MANAGER


## INTRODUCTION

Ce projet consiste à la création d'une application web permettant de faire la gestion des bugs informatique d'une infrastructure. Nous l'avons intitulé **Bug Manager** .

L'application a été scindée en deux parties: **core-api** ET **app-front**


### CORE-API
Cette première partie constitue le coeur de metier du projet, nommé API(Application Programming Interface), elle a été developpée avec les technologies suivantes:
- Express.js: utilisé dans ce projet en tant que framework du back end.
- GraphQL: est le langage de requête et de manipulation de données que nous avons utilisé afin de simplifer le developpement de l'API.
- MongoDB: Constitue la base de données Non Relationnelle que nous avons utilisé dans ce projet
- ...

actuellement déployé sur *Heroku* => [https://bug-manager-core.herokuapp.com](https://bug-manager-core.herokuapp.com) en mode dev pour que tu puisses utiliser le Playground de Graphql.
la base de données est également déployée en ligne sur [mongodb.com](https://www.mongodb.com/)

### APP-FRONT
À cette seconde partie, le developpement concerne de mettre en place une interface WEB permettant d'utiliser l'API de manieère plus naturelle. Le technologies que nous avons utilisés entre autres:
- React.js: utilisé comme Framework front end de l'application
- Material UI: est une implémentatin de "Material Design" en React.js, c'est un système adaptable, qui vient avec des componsants que nous pouvons utiliser à notre guise. 

actuellement déployé sur *Firebase* => [bug-manager.io](https://bug-manager-e2e19.firebaseapp.com/), créer vos propres utilisateurs ou utiliser les utilisateurs suivants
```
Admin:
- email: admin@bug.co
- password: password

Developer:
- email: dev@bug.co
- password: password

User:
- email: user@bug.co
- password: password
```


## INSTALLATION

L'installation de l'application a été rendue très accessible et facile à mettre en place.

QUELQUES ETAPES À SUIVRE:

- Avoir une version de **NODE.JS >= v12.13.\*** et une version **NPM >= 6.13.\***
- Se rendre dans les dossiers **core-api** et **app-front**, en suite taper `npm install`
- parametrer le fichier `.env` à la racine des dossiers **core-api** et **app-front** .
- Pour lancer l'application en local, taper la commande `npm start` sur les dossiers **core-api** et **app-front**
- Pour plus d'informations
    - lire les fichiers `core-api/readme.md` et `core-api/readme.md` 
    - consulter les documentations de technologies:
        - [Documentation de React.js](https://reactjs.org/docs/getting-started.html)
        - [Documentation de GraphQL](https://graphql.org/graphql-js/)
        - [Documentation de Material UI](https://material-ui.com/)

## CONTRIBUTEURS
- Safiy Errahmane ZAGHBANE
- Ludwing NICE
- Nadir SI MOHAMMED
- Abdoul Mouctar DIALLO