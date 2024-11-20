"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link"; // Import Link extension
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight"; // For background color
// import HorizontalRule from "@tiptap/extension-horizontal-rule";

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
  FaRulerHorizontal
} from "react-icons/fa";

const CustomEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true, // Enable undo/redo
      }),
      TextStyle,
      Color,
      Underline,
      FontSize,
      Link.configure({
        openOnClick: false, // Prevent opening the link when clicked in the editor
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // Enable text alignment for headings and paragraphs
      }),
      Highlight.configure({
        multicolor: true, // Allow multiple highlight colors
      }),
      // HorizontalRule,
    ],
    content: "<p>Start writing here...</p>",
  });

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
    editor.chain().focus().setHorizontalRule().run(); // Add the <hr> tag
  };

  if (!editor) return null;
  console.log("editor.getHTML()) ===>>", editor?.getHTML());

  return (
    <div className="text-editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        {/* Undo/Redo */}
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
        >
          <FaUnderline />
        </button>
        {/* Horizontal Rule Button */}
        <button onClick={addHorizontalRule}>
          <FaRulerHorizontal />
        </button>
        {/* Text Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
        >
          <FaAlignJustify />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
        >
          <FaListOl />
        </button>

        {/* Link */}
        <button
          onClick={handleLink}
          className={editor.isActive("link") ? "active" : ""}
        >
          <FaLink />
        </button>

        {/* Background Color Picker */}
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
        <button onClick={() => editor.chain().focus().unsetHighlight().run()}>
          <FaEraser />
        </button>

        {/* Font Color Picker */}
        <div className="input-field">
          <label>Color</label>
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
          />
        </div>

        {/* Font Size */}
        <div className="input-field">
          {/* <label>Font Size</label> */}
          <select
            onChange={(e) => {
              // editor.chain().focus().setFontSize(e.target.value).run()
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
        {/* Font Size */}
        {/* <div className="input-field"> 
          <select
          onChange={(e) => editor.chain().focus().toggleOrderedList().run()}
        >
          <option value="decimal">1. Default</option>
          <option value="lower-alpha">a. Lower Alpha</option>
          <option value="upper-alpha">A. Upper Alpha</option>
          <option value="lower-roman">i. Lower Roman</option>
          <option value="upper-roman">I. Upper Roman</option>
        </select>
        </div> */}
      </div>

      {/* Text Editor */}
      <div className="text-input-field">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default CustomEditor;
