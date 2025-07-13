function customRender(reactElement, container) {
  const domElement = document.createElement(reactElement.type);
  domElement.innerHTML = reactElement.children;
  domElement.setAttribute("href", reactElement.attributes.href);
  domElement.setAttribute("target", reactElement.attributes.target);
  container.appendChild(domElement);
}

const reactElement = {
  type: "a",
  attributes: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Google",
};
const mainContainer = document.getElementById("root");

customRender(reactElement, mainContainer);
