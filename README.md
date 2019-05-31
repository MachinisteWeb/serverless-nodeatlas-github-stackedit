# Créer des sites web éditables pour GitHub hébergés gratuitement

Nous allons voir dans cet article comment créer des sites web statique qui peuvent non seulement être hébergé par GitHub, mais qui peuvent également être édité via des outils d'édition tiers comme StackEdit.io.

L'avantage de cette approche est que vous n'avez pas besoin de commander un espace d'hébergement web qui doit prendre en charge PHP, Node.js, JAVA, etc. ou de laisser votre machine personnelle tourné 24h/24 : c'est GitHub qui s'occupera de vos fichiers HTML statiques que vous aurez au préalable compilé.

Vous pourrez alors mettre à jour votre site web en mettant à jour votre projet sur GitHub afin que les moteurs de recherche puisse l'indexer.

Et petite cerise sur le gâteau, nous allons faire en sorte que le client final, lui, n'est pas besoin d'attendre que vous redéployez le site pour voir la modification de vos contenus ! Elle se fera en temps réel, comme sur un site non statique !

Pour réaliser cela nous allons :

1. Créer un dépôt GitHub qui hébergera le contenu du site web ainsi que le site web en lui-même.
2. Lier ce dépôt à StackEdit.io afin d'être capable de modifier le contenu du site dans un éditeur intuitif.
3. Créer le site web en question avec le framework NodeAtlas pour générer des pages statiques.
4. Mettre en place un mécanisme front-end pour aller chercher les contenus édité en temps réel.





## Le serveur web gratuit, GitHub

Pour commencer il va falloir créer un compte sur GitHub, ceci est gratuit. Tous les éditeurs de contenus sur votre site devrons également se créer un compte pour modifier le contenu du site à moins que vous partagiez un compte en commun.

1. Rendez-vous sur GitHub : https://github.com/
2. Cliquez sur Sign up (Inscription) ou Sign in (Se connecter)
3. Créez un dépôt en cliquant sur le bouton « New » en regard de « Repositories »
4. Créons notre espace pour le site web (je vous indique mes valeurs, mais vous êtes libre de mettre les votres) :
   - Repository name : `serverless-nodeatlas-github-stackedit`
   - Description : `Comment créer et gérer un site et son contenu sans serveur web`
   - Public : Cochez cette option
   - Puis cliquez sur le bouton « Create Repository »
   - Dans la partie « Quick Setup », copier coller le lien du dépôt : https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit

Nous allons ensuite ouvrir ce projet depuis un poste de travail avec Git. Dans cette exemple je vais utiliser Windows 10.

1. Cliquez sur « Clone and Download » pour obtenir l'adresse du projet sur GitHub : https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit.git
2. Ouvrez un invité de commande et entrez la commande suivante :

   ```
   git clone https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit.git
   ```
3. Rendez-vous dans le dossier en question et créez l'arborescence de dossier et de fichier suivante :

   ```
   └─ content/
      └─ pages/
         └─ index.md
   ```
4. Dans le fichier `index.md`, rentrez le contenu :
   ```
   # Bienvenue sur notre site web
   
   Ceci est un exemple de site web statique hébergé sur GitHub !
   ```
5. Puis mettez à jour les informations de votre machine vers le dépôt (`git commit`)

Vous constaterez en vous rendant sur https://github.com/Haeresis/serverless-nodeatlas-github-stackedit/blob/master/content/pages/index.md que votre fichier est bien rempli.





## L'éditeur de contenu, StackEdit.io

Nous allons mettre en place un éditeur vous permettant d'éditer les contenus de votre site web.

1. Rendez-vous sur StackEdit.io : https://stackedit.io/
2. Rendez vous dans le menu « # » en haut à droite puis sélectionnez « Workspaces »
3. Sélectionnez « Add a GitHub backed workspace »
4. Créons le lien entre StackEdit.io et le dépôt du site web
   - Repository URL : `https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit`
   - Folder path — optional : `content`
   - Puis cliquez sur le bouton « OK »
   - Cochez « Grant access to your private repositories » puis cliquez sur « OK »
   - Puis cliquez sur le bouton « Authorize Benweet »
   - Entrez votre « Password » puis confirmez

Vous allez maintenant voir que vous êtes sur le dépôt « content » dans la liste de droite. Créons un fichier de contenu pour tester StackEdit.io.

1. Cliquez sur le dossier en haut à gauche
2. Cliquez sur l'icone « new folder », appelez le `partials`, puis sélectionnez ce dossier
3. Cliquez sur l'icone « new file », appelez le `header`, puis sélectionnez ce fichier
4. Dans la zone de texte du fichier « header », rentrez le contenu :
   ```
   # Mon site web
   ```
5. Sauvegardez votre contenu avec le bouton synchronisation en haut à droite (double flèche en cercle)
6. Vous pourrez constater en vous rendant à https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit/tree/master/content que vos fichiers sont bien mis à jour.





## Le site web statique, NodeAtlas

Maintenant que les contenus et le serveur d'hébergement est en place, nous allons créer un site ! Pour cela nous allons utiliser un site template de NodeAtlas pour gagner du temps. Pour cela vous devrez au préalable installer Node.js et npm. Vous pourrez le faire en suivant cet article : https://blog.lesieur.name/installer-et-utiliser-nodejs-sous-windows/

1. Mettez à jour votre dépôt sous Windows pour qu'il contiennent votre dossier GitHub à jour (`git pull`)
2. Créez un dossier `source` :

   ```
   ├─ content/
   │  ├─ pages/
   │  │  └─ index.md
   │  └─ partials/
   │     └─ header.md
   └─ source/
   ```
2. Installer NodeAtlas avec la commande suivante dans un invité de commande :  

   ```
   npm install -g node-atlas
   ```
3. Dans le dossier `source`, créer un site NodeAtlas :

   ```
   node-atlas --create
   ```
4. Vous constaterez que votre arborescence ressemble à ceci :

   ```
   ├─ content/
   │  ├─ pages/
   │  │  └─ index.md
   │  └─ partials/
   │     └─ header.md
   └─ sources/
   │  ├─ assets/
   │  ├─ controllers/
   │  ├─ variations/
   │  ├─ views/
   │  ├─ README.md
   │  └─ webconfig.json
   ```
5. Lancez votre site avec la commande `node-atlas --browse`

À ce stade, avant de continuer, vous pouvez vous familiariser avec NodeAtlas en lisant ce qui s'affiche et en complétant cela avec la documentation au besoin : https://node-atlas.js.org/. Pour la suite, nous allons partir de cette base pour faire lire nos fichier `.md` et les afficher sur notre site !

1. Créer un fichier `package.json` dans le dossier `sources` et remplissez le ainsi :
   ```
   {
     "name": "serverless-nodeatlas-github-stackedit",
     "version": "0.1.0",
     "author": "Vous <votre@email.ici>",
     "description": "Exemple de développement d'un site serverless avec NodeAtlas / Github et StackEdit.io.",
     "private": false,
     "repository": {
       "type": "git",
       "url": "https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit.git"
     },
     "bugs": {
       "url": "https://github.com/[Votre-Nom-Sur-GitHub]/serverless-nodeatlas-github-stackedit/issues"
     },
     "dependencies": {
       "marked": "^0.6.2"
     },
     "readmeFilename": "README.md"
   }
   ```
2. Installez la nouvelle dépendance npm `marked` avec la commande suivante `npm install`
   3. Remplacez le contenu du fichier `controllers/common.js` par le suivant pour ajouter marked aux modules disponibles
   ```
   /* jshint node: true */
   
   exports.setModules = function () {
   	var NA = this;
   
   	NA.modules.marked = require('marked');
   };

   exports.setRoutes = function (next) {
   	var NA = this,
   		route = NA.webconfig.routes;
   
   	route.unshift({
   		"url": "/ajoutee/",
   		"output": "/ajoutee.html",
   		"view": "content.htm"
   	});
   	route.unshift({
   		"url": "/english/added/",
   		"output": "/english/added.html",
   		"view": "content.htm",
   		"languageCode": "en-us"
   	});
   
   	next();
   };
   ```
3. Remplacez le contenu du fichier `controllers/index.js` par le suivant pour remplir la page d'accueil avec les contenus des fichiers `.md`
   ```
   /* jshint node: true */
   exports.changeVariations = function (next, locals) {
   	var NA = this,
   		fs = NA.modules.fs,
   		marked = NA.modules.marked,
   		renderer = new marked.Renderer(),
   		async = NA.modules.async;
   
   	async.parallel([function (callback) {
   		fs.readFile(__dirname + '../../../content/partials/header.md', 'utf8', function (err, data) {
   			if (err) {
   				throw err;
   			}
   
   			locals.title = marked(data, { renderer: renderer });
   			callback(null);
   		});
   	}, function (callback) {
   		fs.readFile(__dirname + '../../../content/pages/index.md', 'utf8', function (err, data) {
   			if (err) {
   				throw err;
   			}
   
   			locals.content = marked(data, { renderer: renderer });
   			callback(null);
   		});
   	}], function(err) {
   		if (err) {
   			throw err;
   		}
   
       	next();
   	});
   };
   ```
4. Remplacez le contenu du fichier `views/index.htm` par le suivant pour remplir la page d'accueil avec les contenus des fichiers `.md`
   ```
   <?- include("partials/head.htm") ?>
   
   	<div class="main">
   		<div class="main--content">
   			<p>
   				<a href="<?= common.menu.href ?>" title="<?= common.menu.title ?>">
   					<?- common.menu.title ?>
   				</a>
   			</p>
   
   			<div class="main--content--title">
   				<?- title ?>
   			</div>
   			<section class="main--content--body">
   				<?- content ?>
   			</section>
   		</div>
   	</div>
   
   <?- include("partials/foot.htm") ?>
   ```
5. Lancez de nouveau le site en le coupant avec `Ctrl + C` dans l'invité de commande et en lançant de nouveau `node-atlas --browse`

Maintenant que nous avons constater que le site fonctionne en allant chercher le contenu des fichiers, il est temps de l'héberger sur GitHub

1. Dans le `webconfig.json` du dossier `sources`, ajouter la ligne suivante pour dire où générer le site
```
   {
   	...
   	"serverlessRelativePath": "../",
   	...
   }
```
2. Générer le site en le coupant avec `Ctrl + C` dans l'invité de commande puis lancez la commande `node-atlas --generate` pour le générer dans le dossier racine.
3. Mettez à jour les informations de votre machine vers le dépôt (`git commit`)
4. Rendez-vous dans les options de votre dépôt GitHub (https://github.com/Haeresis/serverless-nodeatlas-github-stackedit/settings)
5. Permettez à votre site d'être lu comme un site web en allant dans « GitHub Pages » en passant la sélection de « None » à « master branch ».
6. Constatez à l'adresse https://haeresis.github.io/serverless-nodeatlas-github-stackedit/index.html que le site fonctionne.





## La mise à jour temps réel, utilisation de fetch

Nous allons à présent apporter une surcouche JavaScript côté client pour que le site aille chercher les dernières versions des fichiers éditables. Vous pourrez dès lors générer votre site par exemple tous les mois mais permettre chaque semaine à vos équipes do modifier les contenus.

1. Modifier le contenu du fichier `views/partials/footer.htm` pour ajouter l'appel à des fichier JavaScript côté client
   ```
   		</div>
   		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.6.2/marked.min.js"></script>
   		<? if (routeParameters._className) { ?>
   		<script type="text/javascript" src="javascripts/<?- routeParameters._className ?>.js"></script>
		<? } ?>
   	</body>
   </html>
   ```
2. Modifier le contenu du fichier `webconfig.json` pour ajouter `_className` à la route de la page d'accueil
   ```
   {
   	...
   	"routes": [{
   		...
   	},{
   		"url": "/index.html",
   		"view": "index.htm",
   		"variation": "index.json",
   		"controller": "index.js",
   		"_className": "index"
   	}, {
   		...
   		...
   	}]
   }
   ```
3. Créer le fichier `assets/javascripts/index.js` qui va être appelé par la page d'accueil
   ```
   var renderer = new marked.Renderer(),
   	mainContentTitle = document.getElementsByClassName('main--content--title')[0],
   	mainContentBody = document.getElementsByClassName('main--content--body')[0];
   
   fetch('https://haeresis.github.io/serverless-nodeatlas-github-stackedit/content/partials/header.md')
   .then(function(response) {
   	response.text().then(function (data) {
   		mainContentTitle.innerHTML = marked(data, { renderer: renderer });
   	});
   });
   
   fetch('https://haeresis.github.io/serverless-nodeatlas-github-stackedit/content/pages/index.md')
   .then(function(response) {
   	response.text().then(function (data) {
   		mainContentBody.innerHTML = marked(data, { renderer: renderer });
   	});
   });
   ```
4. Générer le site en le coupant avec `Ctrl + C` dans l'invité de commande puis lancez la commande `node-atlas --generate` pour le générer dans le dossier racine.   
5. Mettez à jour les informations de votre machine vers le dépôt (`git commit`)
6. Testez le raffraichissement en allant changer les contenus des fichiers dans StackEdit.io pour constater que
   - Le code source n'a pas changé (puisqu'il date de la dernière génération du site avec `node-atlas --generate`)
   - La page affiche bien le nouveau contenu
   Note: Il est possible que vous deviez attendre quelques minutes le temps que GitHub mette à jour le cache serveur.