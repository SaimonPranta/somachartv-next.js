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
  initValue="",
  value = "",
  placeholder = "<p></p>",
  handleChange,
  name
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const editoryElement = document?.querySelector(".tiptap")
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
    content: value || placeholder,
  
  });
  useEffect(() => {
    if(initValue && editor){
      editor.chain().focus().setContent(initValue).run();
    }
  }, [initValue])

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

  useEffect(() => {
    // const editoryElement = document.querySelector(".tiptap")
    if(editoryElement){
      editoryElement.classList.add("html-view-page")
    }
  }, [editoryElement])

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

  return (
    <div className={`text-editor-container ${fullScreen ? "full-screen" : ""}`} >
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
          type="button"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
          type="button"

        >
          <FaRedo />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
          type="button"

        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
          type="button"

        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
          title="Underline"
          type="button"

        >
          <FaUnderline />
        </button>
         
          <button onClick={addHorizontalRule} title="Divider"  type="button" >
          <FaRulerHorizontal />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
          title="Left Align"
           type="button"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
          title="Center Align"
           type="button"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
          title="Right Align"
           type="button"
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
          title="Justify Align"
           type="button"
        >
          <FaAlignJustify />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet List"
           type="button"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Ordered List"
           type="button"
        >
          <FaListOl />
        </button>
        <button
          onClick={handleLink}
          className={editor.isActive("link") ? "active" : ""}
          title="link"
           type="button"
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
           type="button"
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
           type="button"
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
        <button onClick={purifyScript} title="Remove Styles"  type="button">
          <SiPurescript />
        </button>
        <button onClick={copyHtml} title="Copy HTML"  type="button">
          <GrCopy />
        </button>
        <button onClick={pasteHtmlContent} title="Paste HTML"  type="button">
          <ImPaste />
        </button>

        <button onClick={copyPlainText} title="Copy Text"  type="button">
          <FaRegCopy />
        </button>
        <button onClick={pestPlainText} title="Paste Text"  type="button">
          <FaRegPaste />
        </button>
        <button
          className={"active"}
          onClick={() => setFullScreen((state) => !state)}
          title={fullScreen ? "Exit Full Screen" : "Full Screen"}
           type="button"
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
