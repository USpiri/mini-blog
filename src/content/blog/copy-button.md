---
title: 'Agregando un botón "Copy code to clipboard"'
date: 2023-10-21
description: "Una funcionalidad útil a la hora de escribir artículos de programación"
tags: ["typescript"]
draft: false
---

A la hora de buscar documentación, ejemplos o artículos, muchas plataformas ofrecen la posibilidad de copiar el contenido de un bloque de código, mejorando así la experiencia para el desarrollador. Este pequeño detalle puede marcar la diferencia en la experiencia del desarrollador y, por lo tanto, es razonable desear incorporar esta funcionalidad en un blog.

## Bloques de código

Cuando trabajamos con archivos en formato .md o .mdx, los bloques de código se representan en HTML de la siguiente manera:

```html
<pre>
  <code>
    <span>...</span>
    <span>...</span>
  </code>
</pre>
```

Para implementar la funcionalidad de copiado, primero debemos identificar estos bloques de código `<pre>` y obtener el contenido de la etiqueta `<code>`.

Si en cambio hicieramos la búsqueda mediante los elementos `<code>`, estaríamos obteniendo los codigos "inline", y esto no es lo que estamos necesitando.

```javascript
// Obtenemos los bloques de código "<pre>"
let blocks = document.querySelectorAll("pre");

// Implementamos una acción para cada bloque
blocks.forEach((block) => {
  // Acciones
});
```

## Agregando Botones de Copia

Una vez identificados los bloques de código, el siguiente paso es agregar un botón (`<button>`) que permita copiar el contenido con un simple clic.

```js
// Creamos un botón
let button = document.createElement("button");
button.innerText = "Copiar";

// Lo añadimos al bloque
block.appendChild(button);

// Establecemos un evento para que se ejecute al hacer clic
button.addEventListener("click", () => {
  // Aquí realizaremos la copia del contenido
});
```

## Clipboard API

La mayoría de los navegadores modernos ofrecen soporte para la [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API), la herramienta que nos proporcionará las funcionalidades necesarias para copiar y pegar.

```js
// Buscamos los <code> dentro del bloque y guardamos su texto.
let code = block.querySelector("code");
let text = code.innerText;

// Copiamos el texto utilizando la API
await navigator.clipboard.writeText(text);
```

Ahora, para mejorar aún más la experiencia del usuario, podemos hacer que, por ejemplo, durante un breve lapso de tiempo, el mensaje del botón cambie a "¡Copiado!" tras realizar la acción de copiar.

## Resultado

```js
// Obtenemos los bloques de código "<pre>"
let blocks = document.querySelectorAll("pre");

// Implementamos una acción para cada bloque
blocks.forEach(async (block) => {
  if (navigator.clipboard) {
    // Creamos un botón
    let button = document.createElement("button");
    button.innerText = "Copiar";

    // Lo añadimos al bloque
    block.appendChild(button);

    // Establecemos un evento para que se ejecute al hacer clic
    button.addEventListener("click", async () => {
      // Buscamos los <code> dentro del bloque y guardamos su texto.
      let code = block.querySelector("code");
      let text = code.innerText;

      // Copiamos el texto utilizando la API
      await navigator.clipboard.writeText(text);

      // ¡Copiado!
      button.innerText = "¡Copiado!";
      setTimeout(() => {
        button.innerText = "Copiar";
      }, 1000);
    });
  }
});
```
