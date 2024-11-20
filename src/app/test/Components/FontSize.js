import { Extension } from "@tiptap/core";

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"], // Apply attributes to <p> tags
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ commands }) => {
          return commands.updateAttributes("paragraph", { fontSize });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.updateAttributes("paragraph", { fontSize: null });
        },
    };
  },
});

export default FontSize;
