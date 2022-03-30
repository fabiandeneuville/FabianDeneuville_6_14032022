# FORMATION DEVELOPPEUR WEB - OPEN CLASSROOMS - PROJET 6 #
# Construction d'une API sécurisée pour une application d'avis gastronomiques #
![piiquante logo](https://user-images.githubusercontent.com/94392055/160183909-35ac8aff-bd5c-40fc-bd41-495fb63dfa18.png)
### CONTEXTE ###

**Piiquante** se dédie à la **création de sauces épicées** dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une **application web** dans laquelle les utilisateurs peuvent **ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres**.

L'application frontend a été développée en amont, elle est disponible [ce repository](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).

Notre mission est de développer une **API REST sécurisée** pour cette application.
<hr>

### CONTRAINTES ###

#### 8 routes à implémenter ####
- Une route **POST /api/auth/signup** permettant l'insciption d'un utilisateur
- Une route **POST /api/auth/login** permettant la connexion d'un utilisateur
- Une route **GET /api/sauces** pour l'affichage de toutes les sauces présentes dans la base de données
- Une route **GET /api/sauces/:id** pour l'affichage d'une sauce en particulier
- Une route **POST /api/sauces** pour publier une nouvelle sauce
- Une route **PUT /api/sauces/:id** pour modifier une sauce éxistante
- Une route **DELETE /api/sauces/:id** pour supprimer une sauce
- Une route **POST /api/sauces/:id/like** pour évaluer une sauce

#### Exigences de sécurité : ####
- Le **mot de passe** de l'utilisateur doit être **haché**
- L'**Authentification** doit être **renforcée** sur toutes les routes sauce requises
- Les **adresses électroniques** dans la base de données sont **uniques** et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs
- La sécurité de la base de données MongoDB ne doit **pas empêcher l'application de se lancer** sur la machine d'un utilisateur
- Un plugin Mongoose doit assurer la **remontée des erreurs** issues de la base de données
- Les **versions les plus récentes des logicels** sont utilisées avec des correctifs de sécurité actualisés
- Le contenu du **dossier images ne doit pas être téléchargé sur GitHub**

<hr>

### TECHNOLOGIES ###

#### Environnement de développement : ####

- Utilisation du runtime **Node.js**
- Utilisation du framework **Express**
- Utilisation de **MongoDB** pour l'hébergement et la gestion de la base de données

#### Packages utilisés : ####

- **bcrypt :** pour le cryptage des mots de passe grâce à son algorithme unidirectionnel
- **crypto-js :** pour le cryptage du mail avant l'enregistrement dans la base de données
- **dotenv :** pour l'utilisation des variables d'environnement 
- **email-validator :** pour la validation des adresses mail lors de l'inscription
- **http :** package natif de node pour la création du serveur
- **password-validator :** pour la vérification des mots de passe lors de l'inscription
- **jsonwebtoken :** pour créer et vérifier les tokens d'authentification
- **mongoose :** pour connecter l'application avec la base de données
- **mongoose-unique-validator :** pour assurer que deux utilisateurs ne puissent s'inscrire avec la même adresse email
- **multer :** pour la gestion des fichiers envoyés dans les requêtes
- **nodemon :** afin d'éviter de devoir relancer le serveur à chaque modification

<hr>

### INSTALLATION ###
