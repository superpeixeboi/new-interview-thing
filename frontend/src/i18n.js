const messages = {
  "title": "Título",
  "Path `title` is required.": "Campo \"título\" é obrigatório.",
  "body": "Postagem",
  "Path `body` is required.": "Campo \"postagem\" é obrigatório.",
}

function __(key) {
  const message = messages[key]
  return message || key
}

export default __
