# Statistiques des Joueurs de Tennis API

Bienvenue dans le projet de l'API de statistiques des joueurs de tennis. Cette API fournit des fonctionnalités pour récupérer des informations sur les joueurs de tennis, y compris l'IMC, la médiane, la moyenne, les détails du joueur et les statistiques de victoires.

## Liens de Déploiement

- [Frontend](https://tenisu.s3.eu-west-3.amazonaws.com/front.html)
- [API](https://2qv0plxjkg.execute-api.eu-west-3.amazonaws.com/prod/)

## Fonctionnalités

### Calcul de l'IMC (/imc)

- Endpoint: `/imc`
- Utilisation: `/imc?tab=true`

### Calcul de la Médiane (/median)

- Endpoint: `/median`
- Utilisation: `/median?tab=true`

### Calcul de la Moyenne (/moyen)

- Endpoint: `/moyen`
- Utilisation: `/moyen?tab=true&weight=true&height=true&points=true&age=true&imc=true&all=true`

### Détails du Joueur (/player)

- Endpoint: `/player`
- Utilisation: `/player?id=n`

### Statistiques de Victoires (/win)

- Endpoint: `/win`
- Utilisation: `/win?tab=true`

## Utilisation

Toutes les routes supportent un paramètre de requête `tab=true` pour retourner les résultats sous forme de tableau plus complet. De plus, le paramètre `id` peut être spécifié pour les requêtes liées à un joueur spécifique.

Exemple: `/player?id=1`

## Déploiement

Le front-end est déployé sur [https://tenisu.s3.eu-west-3.amazonaws.com/front.html](https://tenisu.s3.eu-west-3.amazonaws.com/front.html).

L'API est déployée sur [https://2qv0plxjkg.execute-api.eu-west-3.amazonaws.com/prod/](https://2qv0plxjkg.execute-api.eu-west-3.amazonaws.com/prod/).
