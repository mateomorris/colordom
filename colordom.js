import ColorThief from 'colorthief'
const colorThief = new ColorThief();

['backgroundColor','borderColor', 'color'].forEach(style => {
  const nodes = document.querySelectorAll(`[color-${style}]`)
  for (const node of nodes) {
    const url = node.attributes[`color-${style}`].nodeValue
    const existingColor = localStorage.getItem(`color--${url}`)
    if (existingColor) {
      node.style[style] = existingColor;
    } else {
      getColorFromURL(url, rgb => {
        node.style[style] = rgb;
        localStorage.setItem(`color--${url}`, rgb)
      })
    }
  }
})

export default function ColorDom(node, args) {
  const { url, style } = args
  console.log({node, url, style})
  const existingColor = localStorage.getItem(`color--${url}`)
  if (existingColor) {
    node.style[style] = existingColor;
  } else {
    getColorFromURL(url, rgb => {
      node.style[style] = rgb;
      localStorage.setItem(`color--${url}`, rgb)
    })
  }

  return {
    destroy() {
      // the node has been removed from the DOM
    }
  };

}

function getColorFromURL(url, fn) {
    var img = document.createElement("img"); 
    img.src = url
    img.crossOrigin = 'Anonymous'
    if (img.complete) {
    	fn(getRGB(img))
    } else {
        img.addEventListener('load', function() {
    		  fn(getRGB(img))
        });
    }
    function getRGB(img) {
        const [ dominant ] = colorThief.getPalette(img)
        const [ r, g, b ] = dominant
        return `rgb(${r},${g},${b})`
    }
}