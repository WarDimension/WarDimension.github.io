let text = `この 森[もり]の 秘密[ひみつ]はなんだ？
知[し]らないのか？`;

const textElement = document.querySelector(".text");

text = text.replaceAll(
  /(^| |\n|)([^\[\]\s]+)\[([^\[\]\s]+)\]/g,
  (match, prefix, base, ruby) =>
    (prefix === '\n' ? '<br>' : '') + `<ruby>${base}<rt>${ruby}</rt></ruby>`
);

textElement.innerHTML = text;