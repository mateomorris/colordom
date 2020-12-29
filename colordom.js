import { prominent } from 'https://cdn.skypack.dev/color.js';

['backgroundColor','borderColor', 'color'].forEach(style => {
  const nodes = document.querySelectorAll(`[color-${style}]`)
  for (const node of nodes) {
    const url = node.attributes[`color-${style}`].nodeValue
    const existingColor = localStorage.getItem(`color--${url}`)
    if (existingColor) {
      node.style[style] = existingColor;
    } else {
      prominent(url, { amount: 1 }).then(color => {
        const [ r, g, b ] = color
        const rgb = `rgb(${r},${g},${b})`
        node.style[style] = rgb;
        localStorage.setItem(`color--${url}`, rgb)
      })
    }
  }
})