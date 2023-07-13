
## `npx create-react-app` Crear el proyecto
    1. Abre la terminal 
    2. Asegurate de tener una version de Node.js instalada
    3. Ejecuta el siguiente comando "npx create-react-app mi-proyecto"
        Remplaza "mi-proyecto" con el nombre que deseas darle al proyecto
    4. Espera a que se descarguen todas las dependencias 

## `npm install` Inicializar el proyecto
    1. Abre la terminal
    2. Dirigete al directorio raiz del proyecto usando cd
        cd "/ruta/del/proyecto"
    3. Ejecuta el siguiente comando para instalar todas las dependencias 
        "npm install"

## `npm start` Iniciar la aplicacion
    1. Abre la terminal
    2. Ejecuta el siguiente comando "npm start"
    3. El comando anterior correrá la aplicación en modo desarrollo
    4. Para visualizar tu aplicación abre: [http://localhost:3000]

## `react router dom` Instalar router de la aplicacion
    1. Abre la terminal 
    2. Ejecuta el siguiente comando "npm install react-router-dom@6"
    

## `ant design` Instalar librería de componentes de UI
    1. Abre la terminal
    2. Ejecuta el siguiente comando "npm install antd"
    3. Puedes acceder a la documentacion y catalogo de componentes en [https://ant.design/]

## `React icons` Instalar librería de iconos para react
    1. Abre la terminal
    2. Ejecuta el siguiente comando "npm install react-icons --save"
    3. Puedes acceder a la documentación y catálogo de iconos en [https://react-icons.github.io/react-icons]

## Deploy git hub pages
    1. npm install gh-pages --save-dev
    2. "homepage": "http://{your_username}.github.io/{your_repo-name}"
        "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
        }

    3. So after adding this, app doesn't work because The paths which are inside of my code need to be change.
        For example:
        '/' paths should become '/[YourProjectName]' or
        '/test' should become '/[YourProjectName]/test'
        
    4. npm run deploy
