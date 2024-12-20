import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle', 'paragraph'], // Targets both inline and block styles
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
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
          if (commands.setMark) {
            // Apply to inline (span)
            return commands.setMark('textStyle', { fontSize });
          } else {
            // Fallback to block (paragraph)
            return commands.updateAttributes('paragraph', { fontSize });
          }
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          if (commands.unsetMark) {
            // Remove inline (span)
            return commands.unsetMark('textStyle', { fontSize: null });
          } else {
            // Fallback to block (paragraph)
            return commands.updateAttributes('paragraph', { fontSize: null });
          }
        },
    };
  },
});

export default FontSize;
