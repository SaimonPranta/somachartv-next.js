"use client";
import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import FontSize from "./Components/FontSize";
import "./styles.scss";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaEraser,
  FaListUl,
  FaListOl,
  FaRulerHorizontal,
  FaRegCopy,
  FaPaste
} from "react-icons/fa";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { TfiEraser } from "react-icons/tfi";
import { GrCopy } from "react-icons/gr";
import { ImPaste } from "react-icons/im";
import { FaRegPaste } from "react-icons/fa6";
import { SiPurescript } from "react-icons/si";

const CustomEditor = ({
  value = "",
  placeholder = "<p>Start writing here...</p>",
  handleChange,
  name
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  let editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true
      }),
      TextStyle,
      Color,
      Underline,
      FontSize,
      Link.configure({
        openOnClick: false
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Highlight.configure({
        multicolor: true
      })
    ],
    content: value || placeholder
    // content: "<p>Start writing here...</p>"
  });

  useEffect(() => {
    if (editor?.getHTML() && handleChange && name) {
      const e = {
        target: {
          name: name,
          value: editor?.getHTML()
        }
      };

      handleChange(e);
    }
    return () => {
      editor = null;
    };
  }, [editor?.getHTML()]);

  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const handleLink = () => {
    if (editor?.isActive("link")) {
      removeLink();
    } else {
      addLink();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };
  const copyHtml = async () => {
    if (editor) {
      const htmlContent = editor.getHTML(); // Copy plain text
      // const content = editor.getText(); // Copy plain text
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([htmlContent], { type: "text/html" }),
            "text/plain": new Blob([htmlContent], { type: "text/plain" })
          })
        ]);
      } catch (error) {
        console.error("Failed to copy content:", error);
      }
    }
  };
  const purifyScript = async () => {
    if (editor) {
      const htmlContent = editor.getHTML();
      const container = document.createElement("div");
      container.innerHTML = htmlContent;
      try {
        const elementsWithStyle = container.querySelectorAll("[style]");

        elementsWithStyle?.forEach((element) => {
          element.removeAttribute("style");
        });

        editor.chain().focus().setContent(container.innerHTML).run();
      } catch (error) {}
    }
  };
  const copyPlainText = async () => {
    if (editor) {
      const content = editor.getText(); // Copy plain text
      try {
        await navigator.clipboard.writeText(content);
      } catch (error) {
        console.error("Failed to copy content:", error);
      }
    }
  };

  const pestPlainText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (editor) {
        editor.chain().focus().setContent(text).run();
      }
    } catch (error) {
      console.error("Failed to paste content:", error);
    }
  };
  const pasteHtmlContent = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();

      for (const item of clipboardItems) {
        const types = item.types;

        if (types.includes("text/html")) {
          const htmlBlob = await item.getType("text/html");
          const html = await htmlBlob.text();
          editor.chain().focus().setContent(html).run();
          return;
        } else if (types.includes("text/plain")) {
          const textBlob = await item.getType("text/plain");
          const text = await textBlob.text();
          editor.chain().focus().setContent(text).run();
          return;
        }
      }
    } catch (error) {
      console.error("Failed to paste content:", error);
    }
  };

  if (!editor) return null;
  console.log("editor.getHTML()) ===>>", editor?.getHTML());

  return (
    <div className={`text-editor-container ${fullScreen ? "full-screen" : ""}`}>
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <FaRedo />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
          title="Underline"
        >
          <FaUnderline />
        </button>
        <button onClick={addHorizontalRule} title="Divider">
          <FaRulerHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
          title="Left Align"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
          title="Center Align"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
          title="Right Align"
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
          title="Justify Align"
        >
          <FaAlignJustify />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Ordered List"
        >
          <FaListOl />
        </button>
        <button
          onClick={handleLink}
          className={editor.isActive("link") ? "active" : ""}
          title="link"
        >
          <FaLink />
        </button>
        <div className="input-field">
          <label>Background</label>
          <input
            type="color"
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .setHighlight({ color: e.target.value })
                .run()
            }
            title="Set Background Color"
          />
        </div>
        <button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          title="Erase Background"
        >
          <FaEraser />
        </button>
        <div className="input-field">
          <label>Color</label>
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
          />
        </div>
        <button
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Erase Color"
        >
          <TfiEraser />
        </button>
        <div className="input-field">
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === "unset") {
                editor.chain().focus().unsetFontSize().run();
              } else {
                editor.chain().focus().setFontSize(value).run();
              }
            }}
          >
            <option hidden>Font Size</option>
            <option value="unset">Default Size</option>
            <option value="12px">12px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
          </select>
        </div>
        <button onClick={purifyScript} title="Remove Styles">
          <SiPurescript />
        </button>
        <button onClick={copyHtml} title="Copy HTML">
          <GrCopy />
        </button>
        <button onClick={pasteHtmlContent} title="Paste HTML">
          <ImPaste />
        </button>

        <button onClick={copyPlainText} title="Copy Text">
          <FaRegCopy />
        </button>
        <button onClick={pestPlainText} title="Paste Text">
          <FaRegPaste />
        </button>
        <button
          className={"active"}
          onClick={() => setFullScreen((state) => !state)}
          title={fullScreen ? "Exit Full Screen" : "Full Screen"}
        >
          {fullScreen && <RiFullscreenExitLine />}
          {!fullScreen && <RiFullscreenFill />}
        </button>
      </div>
      <div className="text-input-field">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default CustomEditor;
