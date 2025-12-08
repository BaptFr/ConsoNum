<div align="center">

  <br>

  <img src="https://i.imgur.com/wo7Ph8I.png" width="300">

  <br>

**Mesurez. Comprenez. Réduisez.**
<br>
*L'application d'évaluation de l'empreinte numérique responsable.*

<p>
  <a href="#-le-projet">Le Projet</a> •
  <a href="#-équipe--gestion-de-projet">Équipe & Kanban</a> •
  <a href="#-stack-technique">Stack Technique</a> •
  <a href="#-architecture--concepts">Architecture</a> •
</p>

![Docker](https://img.shields.io/badge/Infra-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</br>

![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) |
![MariaDB](https://img.shields.io/badge/Data-MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white) |
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white) |
![Symfony](https://img.shields.io/badge/Backend-Symfony%207-000000?style=for-the-badge&logo=symfony&logoColor=white) |

</br>

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) |
![React.js](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)

</div>

---

**Le numérique représente aujourd’hui 4 % des émissions mondiales de gaz à effet de serre**, et ce chiffre pourrait doubler d’ici 2025. La notion de sobriété numérique est devenue centrale face aux enjeux climatiques : Green IT, éco-conception, labels “informatique verte” ou encore nouvelles obligations pour encourager des usages numériques plus responsables.


Dans ce contexte, nous souhaitons aider les utilisateurs à mieux comprendre et améliorer leurs pratiques numériques afin de les rendre plus sobres, plus responsables et moins énergivores.

## 🎯 Le Projet

**ConsoNum** est une application web basée sur un questionnaire interactif.

Elle permet à l’utilisateur:
-  **D'évaluer** ses habitudes numériques grâce à un score calculé à partir des réponses.
- **D' identifier** les pratiques énergivores ou peu responsables en repérant les questions avec un faible score.
- **Se situer** sur une échelle de sobriété numérique.
- **Recevoir** des conseils adaptés au profil obtenu.

## 📅 Équipe & Gestion de Projet

Ce projet a été mené en adoptant les rituels de la méthode **Agile**. La collaboration et le suivi des tâches ont été centralisés via un tableau Kanban sur GitHub Projects.

*   **Initialisation** : Rédactions des spécifications fonctionnelles, conception maquettes FIGMA </br>
 ​📑​ **[Voir le Cahier des charges fonctionnel](https://docs.google.com/document/d/1FqdncZFrJc4dKPAVO5PX_jIP3C2GqPn4RVxFdIiZkOM/edit?usp=sharing)** ​📑​
</br>

*   **Suivi** : Gestion des tickets (To Do, In Progress, Review, Done) et suivi via compte rendu hebdomadaire  </br>
 ​📅  **[Voir  tableau Kanban](https://github.com/orgs/it-akademy-students/projects/31/views/1)**  ​📅
</br>

*   **Versionning** : Respect des conventions et bonnes pratiques  (Nommages prefix de branches et commit, Pull Requests, Code Review).  </br>
 🏷️​  **[Voir fichier CONTRIBUTING.md](https://github.com/it-akademy-students/T27-G1/blob/main/CONTRIBUTING.md)**  🏷️​

</br>

## 🛠 Stack Technique

Le projet repose sur une architecture moderne séparant le Backend (API) du Frontend (SPA).

### 🧱 Backend (API REST)
L'API est le cœur logique de l'application.
*   **Langage** : PHP 8.2
*   **Framework** : **Symfony 6/7** (Structure robuste et modulaire).
*   **Sécurité** : `LexikJWTAuthenticationBundle` pour une authentification sans état (Stateless) via Tokens JWT.
*   **ORM** : **Doctrine** pour l'abstraction de la base de données et la gestion des Entités.
*   **Validation** : `Symfony Validator` pour assurer l'intégrité des données reçues.

### 🎨 Frontend (Interface)
L'interface utilisateur est construite pour être réactive et performante.
*   **Librairie** : **ReactJS 19** (React).
*   **Framework** : **Next.js 14**.
*   **Langage** : **Typescript**.
*   **Styling** : TailwindCSS + @heroui/react.
*   **Communication** : Fetch API / Axios pour consommer l'API Symfony.

### 💾 Base de Données & Outils
*   **SGBD** : **MariaDB**.
*   **Gestion SQL** : DBeaver (pour la modélisation et la vérification des données).
*   **Test API** : Postman (Tests d'intégration).

### 🐳 DevOps & Infrastructure
*   **Conteneurisation** : **Docker** & **Docker Compose**.
    *   Conteneur `php` (FPM)
    *   Conteneur `nginx` (Serveur Web)
    *   Conteneur `mariadb` (Base de données)
</br>


## 📐 Architecture & Concepts

Le projet suit une architecture **Headless** (Frontend et Backend découplés pour un travail d'quipe, une évolution possible sur une appli mobile) et respecte le pattern **MVC (Modèle-Vue-Contrôleur)**.

### 1. Le Modèle (Entity & Repository)
Nous utilisons **Doctrine** en "Code First". Les classes PHP (Entités) définissent la structure de la base de données.

### 2. Le Contrôleur
Les contrôleurs Symfony interceptent les requêtes HTTP, appliquent la logique métier et la sécurité (Rôles), puis renvoient une réponse JSON standardisée.
*   *Sécurité* : Utilisation des attributs PHP `#[IsGranted('ROLE_ADMIN')]` directement sur les routes.
*   *Services* : Injection de dépendances (Dependency Injection) pour accéder à l'`EntityManager` ou au `PasswordHasher`.

### 3. La Vue (Serialization)
En mode API, la "Vue" est la représentation JSON des données.
*   Utilisation du **Serializer Symfony** avec des **Groupes de sérialisation** (`groups=['question:read']`) pour filtrer précisément les données exposées et éviter les boucles infinies ou les fuites de données sensibles.

</br>


## 📁 Structure du Projet

```