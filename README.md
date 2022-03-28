# FORMATION DEVELOPPEUR WEB - OPEN CLASSROOMS - PROJET 6 #
# Construction d'une API sécurisée pour une application d'avis gastronomiques #
![piiquante logo](https://user-images.githubusercontent.com/94392055/160183909-35ac8aff-bd5c-40fc-bd41-495fb63dfa18.png)
### CONTEXTE ###

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

L'application frontend a été développée en amont, elle est disponible [ce repository](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).

Notre mission est de développer une **API REST sécurisée** pour cette application.
<hr>

### CONTRAINTES ###

<hr>

### TECHNOLOGIES ###

#### Environnement de développement : ####

- Utilisation du runtime **Node.js**
- Utilisation du framework **Express**
- Utilisation de **MongoDB** pour l'hébergement et la gestion de la base de données

#### Packages utilisés : ####

- **bcrypt :** pour le cryptage des mots de passe grâce à son algorithme unidirectionnel 
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
