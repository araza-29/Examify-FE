"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

/* ------------------------ Custom Block Blot for Span ------------------------ */
const Block = Quill.import("blots/block")
const BlockEmbed = Quill.import("blots/block/embed")
const Parchment = Quill.import("parchment")

// This allows natural line breaks with Enter key

/* ------------------------ List formats whitelist ------------------------ */
const List = Quill.import("formats/list")
List.whitelist = ["ordered", "bullet", "checked", "unchecked"]
Quill.register(List, true)

/* ------------------------ Custom list style attributor ------------------------ */
class ListStyleAttributor extends Parchment.Attributor.Attribute {}
const listStyleAttr = new ListStyleAttributor("listStyle", "data-list-style", {
  scope: Parchment.Scope.BLOCK_BLOT,
  whitelist: ["lower-alpha", "lower-roman"],
})
Quill.register(listStyleAttr, true)

/* ------------------------ Subscript / Superscript ------------------------ */
const Inline = Quill.import("blots/inline")
class SubscriptBlot extends Inline {
  static create() {
    return super.create()
  }
}
SubscriptBlot.blotName = "subscript"
SubscriptBlot.tagName = "sub"
Quill.register(SubscriptBlot)

class SuperscriptBlot extends Inline {
  static create() {
    return super.create()
  }
}
SuperscriptBlot.blotName = "superscript"
SuperscriptBlot.tagName = "sup"
Quill.register(SuperscriptBlot)


/* ------------------------ Bold Chemical Line (Arrow) - RESTORED & FIXED ------------------------ */
const Embed = Quill.import("blots/embed")
class ChemicalLine extends Embed {
  static create(value) {
    const node = super.create()
    const opts = typeof value === "object" && value ? value : { w: 40, color: "#000000" }
    node.setAttribute("contenteditable", "false")
    node.setAttribute("data-chemical-type", "single") 

    // All styling is inline, as requested
    node.style.cssText = `
      display: inline-block !important;
      position: relative !important;
      width: ${opts.w}px !important;
      height: 0 !important;
      vertical-align: middle !important;
      margin: 0 4px !important;
      border-bottom: 2px solid ${opts.color} !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      background: transparent !important;
      list-style: none !important;
    `
    
    // Create arrow head with more defensive styling
    const arrowHead = document.createElement("span")
    arrowHead.setAttribute("data-arrow-head", "single")
    arrowHead.style.cssText = `
      content: "" !important;
      position: absolute !important;
      right: -1px !important;
      top: -4px !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 5px solid transparent !important;
      border-bottom: 5px solid transparent !important;
      border-left: 7px solid ${opts.color} !important;
      border-right: none !important;
      pointer-events: none !important;
      display: block !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      z-index: 1000 !important;
    `
    node.appendChild(arrowHead)
    
    return node
  }
}
ChemicalLine.blotName = "chemline"
ChemicalLine.tagName = "CHEMICAL-LINE"
Quill.register(ChemicalLine)

/* ------------------------ Reversible Chemical Line (Double Arrow) - FIXED ------------------------ */
class ChemicalReversible extends Embed {
  static create(value) {
    const node = super.create();
    // ... (keep the existing create function as is)
    const opts = typeof value === "object" && value ? value : { w: 40, color: "#000000" };
    node.setAttribute("contenteditable", "false");
    node.setAttribute("data-chemical-type", "reversible"); // Add identifier
    
    // More defensive inline styles
    node.style.cssText = `
      display: inline-block !important;
      position: relative !important;
      width: ${opts.w}px !important;
      height: 10px !important;
      vertical-align: middle !important;
      margin: 0 4px !important;
      background: transparent !important;
      border: none !important;
      list-style: none !important;
      counter-reset: none !important;
      counter-increment: none !important;
    `;

    // Create top line with more defensive styling
    const topLine = document.createElement("span");
    topLine.setAttribute("data-line-type", "top");
    topLine.style.cssText = `
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      top: 0 !important;
      border-bottom: 2px solid ${opts.color} !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      height: 0 !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      display: block !important;
      z-index: 1000 !important;
    `;
    
    // Top arrow head (pointing right)
    const topArrow = document.createElement("span");
    topArrow.setAttribute("data-arrow-head", "top-right");
    topArrow.style.cssText = `
      position: absolute !important;
      right: -1px !important;
      top: -4px !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 5px solid transparent !important;
      border-bottom: 5px solid transparent !important;
      border-left: 7px solid ${opts.color} !important;
      border-right: none !important;
      pointer-events: none !important;
      display: block !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      z-index: 1001 !important;
    `;
    topLine.appendChild(topArrow);

    // Create bottom line with more defensive styling
    const bottomLine = document.createElement("span");
    bottomLine.setAttribute("data-line-type", "bottom");
    bottomLine.style.cssText = `
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      border-bottom: 2px solid ${opts.color} !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      height: 0 !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      display: block !important;
      z-index: 1000 !important;
    `;
    
    // Bottom arrow head (pointing left)
    const bottomArrow = document.createElement("span");
    bottomArrow.setAttribute("data-arrow-head", "bottom-left");
    bottomArrow.style.cssText = `
      position: absolute !important;
      left: -1px !important;
      top: -4px !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 5px solid transparent !important;
      border-bottom: 5px solid transparent !important;
      border-right: 7px solid ${opts.color} !important;
      border-left: none !important;
      pointer-events: none !important;
      display: block !important;
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      z-index: 1001 !important;
    `;
    bottomLine.appendChild(bottomArrow);
    
    node.appendChild(topLine);
    node.appendChild(bottomLine);
    
    return node;
  }

  // Add this function
  static value(node) {
    const line = node.querySelector('[data-line-type="top"]')
    return {
      w: parseInt(node.style.width, 10) || 40,
      color: line ? line.style.borderBottomColor : "#000000",
    }
  }

  // ⭐ THIS IS THE KEY FIX ⭐
  // Add this function to unambiguously identify the blot
  static formats(domNode) {
    if (domNode.querySelector('[data-line-type="top"]')) {
      return { [this.blotName]: this.value(domNode) }
    }
    return super.formats(domNode)
  }
}
ChemicalReversible.blotName = "chemreversible"
ChemicalReversible.tagName = "CHEMICAL-REVERSIBLE"
Quill.register(ChemicalReversible)
Quill.register(ChemicalReversible)

/* ------------------------ Symbols (FULL LIST) ------------------------ */
const symbolCategories = {
  "Text Format": [
    { symbol: "x₂", action: "subscript", label: "Make text subscript" },
    { symbol: "x²", action: "superscript", label: "Make text superscript" },
    { symbol: "→", action: "chemline", label: "Insert chemical reaction arrow" },
    { symbol: "⇌", action: "chemreversible", label: "Insert reversible reaction double arrow" },
  ],
  "Greek Letters": [
    "α",
    "β",
    "γ",
    "δ",
    "ε",
    "ζ",
    "η",
    "θ",
    "ι",
    "κ",
    "λ",
    "μ",
    "ν",
    "ξ",
    "ο",
    "π",
    "ρ",
    "σ",
    "τ",
    "υ",
    "φ",
    "χ",
    "ψ",
    "ω",
    "Α",
    "Β",
    "Γ",
    "Δ",
    "Ε",
    "Ζ",
    "Η",
    "Θ",
    "Ι",
    "Κ",
    "Λ",
    "Μ",
    "Ν",
    "Ξ",
    "Ο",
    "Π",
    "Ρ",
    "Σ",
    "Τ",
    "Υ",
    "Φ",
    "Χ",
    "Ψ",
    "Ω",
  ],
  "Mathematical Symbols": [
    "∞",
    "∑",
    "∏",
    "∫",
    "∮",
    "∂",
    "∇",
    "√",
    "∛",
    "∜",
    "∝",
    "∴",
    "∵",
    "∀",
    "∃",
    "∄",
    "∅",
    "∈",
    "∉",
    "∋",
    "∌",
    "∩",
    "∪",
    "⊂",
    "⊃",
    "⊄",
    "⊅",
    "⊆",
    "⊇",
    "⊈",
    "⊉",
    "ℕ",
    "ℤ",
    "ℚ",
    "ℝ",
    "ℂ",
    "∧",
    "∨",
    "¬",
    "⊕",
    "⊗",
    "⊙",
    "⊘",
  ],
  "Operators & Relations": [
    "±",
    "∓",
    "×",
    "÷",
    "≈",
    "≠",
    "≡",
    "≢",
    "≤",
    "≥",
    "≪",
    "≫",
    "≮",
    "≯",
    "≰",
    "≱",
    "∼",
    "≃",
    "≅",
    "≆",
    "≇",
    "≉",
    "≊",
    "≋",
    "≌",
    "≍",
    "≎",
    "≏",
    "≐",
    "≑",
    "≒",
    "≓",
    "∣",
    "∤",
    "∥",
    "∦",
    "∧",
    "∨",
    "⊻",
    "⊼",
    "⊽",
    "∴",
    "∵",
    "∶",
    "∷",
    "∸",
    "∹",
    "∺",
  ],
  Arrows: [
    "→",
    "←",
    "↑",
    "↓",
    "↔",
    "↕",
    "↖",
    "↗",
    "↘",
    "↙",
    "↚",
    "↛",
    "↜",
    "↝",
    "↞",
    "↟",
    "↠",
    "↡",
    "↢",
    "↣",
    "↤",
    "↥",
    "↦",
    "↧",
    "↨",
    "↩",
    "↪",
    "↫",
    "↬",
    "↭",
    "↮",
    "↯",
    "⇒",
    "⇐",
    "⇑",
    "⇓",
    "⇔",
    "⇕",
    "⇖",
    "⇗",
    "⇘",
    "⇙",
    "⇚",
    "⇛",
    "⇜",
    "⇝",
    "⇞",
    "⇟",
  ],
  "Chemical Symbols": [
    "₀",
    "₁",
    "₂",
    "₃",
    "₄",
    "₅",
    "₆",
    "₇",
    "₈",
    "₉",
    "₊",
    "₋",
    "₌",
    "₍",
    "₎",
    "⁰",
    "¹",
    "²",
    "³",
    "⁴",
    "⁵",
    "⁶",
    "⁷",
    "⁸",
    "⁹",
    "⁺",
    "⁻",
    "⁼",
    "⁽",
    "⁾",
    "→",
    "⇌",
    "⇋",
    "⇄",
    "⇆",
  ],
}

// Generate unique ID for each editor instance
let editorCounter = 0

export const cleanupHTMLForPDF = (html, fontSize = 20) => {
  if (!html) return ""
  console.log("HTMLCHECK", html)
  try {
    const cleanedHTML = html
      .replace(
        /<p([^>]*)>/g,
        `<div$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize}px; margin: 0 0 4px 0; line-height: 0.5; color: #1f2937;">`,
      )
      .replace(/<\/p>/g, "</div>")
      .replace(/<strong([^>]*)>/g, '<strong$1 style="font-weight: bold;">')
      .replace(/<em([^>]*)>/g, '<em$1 style="font-style: italic;">')
      .replace(/<u([^>]*)>/g, '<u$1 style="text-decoration: underline;">')
      .replace(
        /<h1([^>]*)>/g,
        `<h1$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize * 1.8}px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; color: #1f2937;">`,
      )
      .replace(
        /<h2([^>]*)>/g,
        `<h2$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize * 1.5}px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; color: #1f2937;">`,
      )
      .replace(
        /<h3([^>]*)>/g,
        `<h3$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize * 1.3}px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; color: #1f2937;">`,
      )
      .replace(/<ol([^>]*)>/g, `<ol$1 style="margin-top: 8px; margin-bottom: 0px; padding-left: 24px; line-height: 0.5;">`)
      .replace(/<ul([^>]*)>/g, `<ul$1 style="margin-top: 8px; margin-bottom: 0px; padding-left: 24px; line-height: 0.5;">`)
      .replace(/<li([^>]*)>/g, `<li$1 style="margin-bottom: 8px; line-height: 0.5;">`)
      .replace(/<br>/g, "<br>")
      .replace(/(<br>\s*){3,}/g, "<br><br>")
      .trim()

    if (
      !cleanedHTML ||
      cleanedHTML ===
        `<div style="font-family: 'TimesNewRoman'; font-size: ${fontSize}px; margin: 0 0 8px 0; line-height: 1.4; color: #1f2937;"></div>`
    ) {
      return ""
    }

    return cleanedHTML
  } catch (error) {
    console.warn("HTML cleanup failed:", error)
    return html
  }
}

const convertSpansToParagraphs = (html) => {
  if (!html) return ""

  try {
    const convertedHTML = html
      .replace(/<div[^>]*>/g, "<p>")
      .replace(/<\/div>/g, "</p>")
      .trim()

    return convertedHTML || ""
  } catch (error) {
    console.warn("Span to paragraph conversion failed:", error)
    return html
  }
}

export default function TextEditor(props) {
  const { value = "", onChange, placeholder = "Write your question here..." } = props
  const [content, setContent] = useState(() => convertSpansToParagraphs(value))
  const [showSymbols, setShowSymbols] = useState(false)
  const [symbolSearch, setSymbolSearch] = useState("")
  const [editorId] = useState(() => `editor-${++editorCounter}`)
  const fontSize = 15
  const quillRef = useRef(null)

  useEffect(() => {
    const convertedValue = convertSpansToParagraphs(value)
    if (convertedValue !== content) {
      setContent(convertedValue)
    }
  }, [value])

  const filteredSymbols = useMemo(() => {
    return Object.fromEntries(
      Object.entries(symbolCategories)
        .map(([cat, symbols]) => [
          cat,
          symbols.filter((s) => {
            const str = typeof s === "string" ? s : s.symbol || s.label || ""
            return (
              str.toLowerCase().includes(symbolSearch.toLowerCase()) ||
              cat.toLowerCase().includes(symbolSearch.toLowerCase())
            )
          }),
        ])
        .filter(([, arr]) => arr.length),
    )
  }, [symbolSearch])

  const getEditor = () => quillRef.current?.getEditor()

  const applyListStyleToSelectionContainer = (value) => {
    const editor = getEditor()
    if (!editor) return
    const selection = editor.getSelection(true)
    if (!selection) return
    const [leaf] = editor.getLeaf(selection.index)
    const dom = leaf && leaf.domNode
    if (!dom || !dom.closest) return
    const li = dom.closest("li")
    const container = li && li.parentElement
    if (container && container.tagName === "OL") {
      if (value) {
        container.setAttribute("data-list-style", value)
        container.style.listStyleType = "none"
      } else {
        container.removeAttribute("data-list-style")
        container.style.listStyleType = ""
      }
    }
  }

  const handleSymbolClick = (symbol) => {
    const editor = getEditor()
    if (!editor) return
    editor.focus()
    let range = editor.getSelection()
    if (!range) {
      const len = editor.getLength()
      editor.setSelection(len, 0)
      range = editor.getSelection()
    }

    if (typeof symbol === "object" && symbol.action) {
      if (symbol.action === "subscript") {
        const currentFormat = editor.getFormat(range.index, range.length)
        if (currentFormat.subscript) {
          editor.format("subscript", false)
        } else {
          editor.format("subscript", true)
          editor.format("superscript", false)
        }
      } else if (symbol.action === "superscript") {
        const currentFormat = editor.getFormat(range.index, range.length)
        if (currentFormat.superscript) {
          editor.format("superscript", false)
        } else {
          editor.format("superscript", true)
          editor.format("subscript", false)
        }
      } else if (symbol.action === "chemline") {
        const idx = range.index ?? editor.getLength() - 1
        editor.insertEmbed(idx, "chemline", { w: 40, color: "#000000" })
        editor.setSelection(idx + 1, 0)
      } else if (symbol.action === "chemreversible") {
        const idx = range.index ?? editor.getLength() - 1
        editor.insertEmbed(idx, "chemreversible", { w: 40, color: "#000000" })
        editor.setSelection(idx + 1, 0)
      }
    } else {
      const idx = range.index ?? editor.getLength() - 1
      const text = String(symbol)
      editor.insertText(idx, text)
      editor.setSelection(idx + text.length, 0)
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: `#custom-toolbar-${editorId}`,
        handlers: {
          list: (value) => {
            const editor = getEditor()
            if (!editor) return
            editor.focus()
            let range = editor.getSelection(true)
            if (!range) {
              const len = editor.getLength()
              editor.setSelection(len, 0)
              range = editor.getSelection(true)
            }

            const current = editor.getFormat(range)

            if (value === "lower-alpha" || value === "lower-roman") {
              const isActive = current.list === "ordered" && current.listStyle === value
              if (isActive) {
                editor.format("listStyle", false)
                editor.format("list", false)
                applyListStyleToSelectionContainer(null)
              } else {
                editor.format("list", false)
                editor.format("listStyle", false)
                setTimeout(() => {
                  editor.format("list", "ordered")
                  editor.format("listStyle", value)
                  setTimeout(() => applyListStyleToSelectionContainer(value), 10)
                }, 10)
              }
              return
            }

            const isSame = current.list === value
            if (isSame) {
              editor.format("listStyle", false)
              editor.format("list", false)
              applyListStyleToSelectionContainer(null)
              return
            }
            if (value === "bullet") {
              editor.format("listStyle", false)
              editor.format("list", "bullet")
              applyListStyleToSelectionContainer(null)
            } else if (value === "ordered") {
              editor.format("list", "ordered")
              editor.format("listStyle", false)
              applyListStyleToSelectionContainer(null)
            } else {
              editor.format("listStyle", false)
              editor.format("list", value)
              applyListStyleToSelectionContainer(null)
            }
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
      keyboard: {
        bindings: {
          enter: {
            key: "Enter",
            handler: (range, context) => {
              return true
            },
          },
        },
      },
    }),
    [editorId],
  )

 const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "ordered",
    "listStyle",
    "subscript",
    "superscript",
    "chemline",       // <-- Ensure this is here
    "chemreversible", // <-- Ensure this is here
  ]

useEffect(() => {
  const styleId = `quill-custom-styles-${editorId}`
  if (document.getElementById(styleId)) return

  const style = document.createElement("style")
  style.id = styleId
  style.textContent = `
    .text-editor-wrapper-${editorId} {
      border: 1px solid #e9ddff; 
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 4px 16px rgba(91,33,182,0.07);
      overflow: hidden;
      --editor-font-family: "Times New Roman", Times, serif;
      --editor-font-size: ${fontSize}px;
      font-family: var(--editor-font-family);
      font-size: var(--editor-font-size);
    }
    
    #custom-toolbar-${editorId} {
      background: #fbfaff; 
      border-bottom: 1px solid #e9ddff;
      padding: 8px 12px;
      display: flex; 
      flex-wrap: wrap; 
      gap: 6px; 
      align-items: center;
    }
    
    #custom-toolbar-${editorId} .toolbar-select {
      height: 32px; 
      padding: 0 8px;
      border: 1px solid #d7c9ff; 
      border-radius: 6px;
      background: #fff; 
      color: #3a2d6f; 
      font-size: 14px;
    }
    
    #custom-toolbar-${editorId} .toolbar-select:focus { 
      outline: none; 
      border-color: #7c3aed; 
      box-shadow: 0 0 0 1px #7c3aed; 
    }

    #custom-toolbar-${editorId} button {
      height: 32px; 
      width: 32px; 
      padding: 6px;
      border: 1px solid #d7c9ff; 
      border-radius: 6px;
      background: #fff; 
      color: #4c1d95; 
      cursor: pointer; 
      transition: all 0.15s ease;
      display: flex; 
      align-items: center; 
      justify-content: center;
    }
    
    #custom-toolbar-${editorId} button:hover { 
      background: #ede9fe; 
      border-color: #7c3aed; 
    }
    
    #custom-toolbar-${editorId} button.ql-active { 
      background: #7c3aed; 
      color: #fff; 
      border-color: #7c3aed; 
    }
    
    #custom-toolbar-${editorId} .material-icons {
      font-size: 18px;
    }
    
    #custom-toolbar-${editorId} .symbols-toggle-btn {
      background: #7c3aed !important;
      color: #fff !important;
      border: none !important;
    }
    
    #custom-toolbar-${editorId} .symbols-toggle-btn:hover {
      background: #6d28d9 !important;
    }
    
    #custom-toolbar-${editorId} .symbols-toggle-btn.active {
      background: #5b21b6 !important;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    #custom-toolbar-${editorId} .list-style-label {
      font-weight: 600;
      font-size: 14px;
      color: #4c1d95;
      line-height: 1;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #custom-toolbar-${editorId} button .list-style-label {
      color: inherit;
    }

    #custom-toolbar-${editorId} button.ql-active .list-style-label {
      color: #fff;
    }

    .text-editor-wrapper-${editorId} .ql-container { border: none !important; }
    .text-editor-wrapper-${editorId} .ql-toolbar { border: none !important; }
    
    .text-editor-wrapper-${editorId} .ql-editor { 
      padding: 16px; 
      min-height: 160px; 
      font-size: var(--editor-font-size); 
      line-height: 1.4; 
      color: #1f2937;
      font-family: var(--editor-font-family);
    }

    .text-editor-wrapper-${editorId} .ql-editor p {
      margin: 0 0 0.5em 0;
      line-height: 1.4;
    }

    .text-editor-wrapper-${editorId} .ql-editor p:last-child {
      margin-bottom: 0;
    }

    .text-editor-wrapper-${editorId} .ql-editor > p:first-child {
      margin-top: 0;
    }
    
    .text-editor-wrapper-${editorId} .ql-editor.ql-blank::before { 
      color: #a78bfa; 
      font-style: italic; 
    }
    
    .text-editor-wrapper-${editorId} .ql-editor sub { 
      vertical-align: sub; 
      font-size: 0.75em; 
    }
    /* Chemical line reset for lists - add this to your existing CSS */
    .text-editor-wrapper-${editorId} .ql-editor li [data-chemical-type] {
      list-style: none !important;
      counter-reset: none !important;
      counter-increment: none !important;
    }

    .text-editor-wrapper-${editorId} .ql-editor li [data-chemical-type] * {
      list-style: none !important;
      counter-reset: none !important;
      counter-increment: none !important;
    }
    .text-editor-wrapper-${editorId} .ql-editor sup { 
      vertical-align: super; 
      font-size: 0.75em; 
    }

    .text-editor-wrapper-${editorId} .ql-editor ol,
    .text-editor-wrapper-${editorId} .ql-editor ul {
      margin: 0.5em 0;
      padding-left: 1.5em;
      line-height: 1.4;
    }

    .text-editor-wrapper-${editorId} .ql-editor li {
      margin-bottom: 0.2em;
      line-height: 1.4;
    }

    .text-editor-wrapper-${editorId} .ql-editor li p {
      margin: 0;
      display: inline;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style] {
      list-style: none;
      counter-reset: custom-counter;
      padding-left: 2em !important;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style] li {
      counter-increment: custom-counter;
      position: relative;
      padding-left: 0.5em;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style="lower-alpha"] li::before {
      content: counter(custom-counter, lower-alpha) ". ";
      position: absolute;
      left: -2em;
      width: 1.5em;
      text-align: right;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style="lower-roman"] li::before {
      content: counter(custom-counter, lower-roman) ". ";
      position: absolute;
      left: -2em;
      width: 1.5em;
      text-align: right;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style] ol[data-list-style] {
      counter-reset: custom-counter-2;
      padding-left: 2em !important;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style] ol[data-list-style] li {
      counter-increment: custom-counter-2;
      padding-left: 0.5em;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style] ol[data-list-style="lower-alpha"] li::before {
      content: counter(custom-counter-2, lower-alpha) ". ";
      position: absolute;
      left: -2em;
      width: 1.5em;
      text-align: right;
    }

    .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style] ol[data-list-style="lower-roman"] li::before {
      content: counter(custom-counter-2, lower-roman) ". ";
      position: absolute;
      left: -2em;
      width: 1.5em;
      text-align: right;
    }
    
    .text-editor-wrapper-${editorId} .symbols-panel { 
      border-top: 1px solid #e9ddff; 
      background: #faf7ff; 
      padding: 14px; 
      max-height: 320px; 
      overflow-y: auto; 
    }
    
    .text-editor-wrapper-${editorId} .symbols-search { 
      width: 100%; 
      margin-bottom: 12px; 
      padding: 8px 12px; 
      border: 1px solid #d7c9ff; 
      border-radius: 8px; 
      background: #fff; 
    }
    
    .text-editor-wrapper-${editorId} .symbol-category-title { 
      font-weight: 700; 
      color: #4c1d95; 
      margin-bottom: 6px; 
      font-size: 14px; 
    }
    
    .text-editor-wrapper-${editorId} .symbol-grid { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 6px; 
    }
    
    .text-editor-wrapper-${editorId} .symbol-btn {
      background: #fff; 
      border: 1px solid #d7c9ff; 
      border-radius: 8px; 
      padding: 6px 10px;
      cursor: pointer; 
      font-size: 16px; 
      min-width: 32px; 
      height: 34px;
      display: flex; 
      align-items: center; 
      justify-content: center; 
      transition: all .15s ease; 
      color: #3a2d6f;
    }
    
    .text-editor-wrapper-${editorId} .symbol-btn:hover { 
      background: #ede9fe; 
      border-color: #7c3aed; 
    }
  `
  document.head.appendChild(style)

  if (!document.getElementById("material-icons")) {
    const link = document.createElement("link")
    link.id = "material-icons"
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }

  return () => {
    const existingStyle = document.getElementById(styleId)
    if (existingStyle) {
      existingStyle.remove()
    }
  }
}, [editorId])

const cleanContent = (html) => {
  if (!html) return ""
  console.log("HTMLCHECK", html)
  try {
    const cleanedHTML = html
      .replace(
        /<p([^>]*)>/g,
        `<span$1 style="font-family: 'TimesNewRoman'; font-size: 15px; margin: 0 0 8px 0; line-height: 1.4; color: #1f2937;">`,
      )
      .replace(/<\/p>/g, "</span>")
      .replace(/<strong([^>]*)>/g, '<strong$1 style="font-weight: bold;">')
      .replace(/<em([^>]*)>/g, '<em$1 style="font-style: italic;">')
      .replace(/<u([^>]*)>/g, '<u$1 style="text-decoration: underline;">')
      .replace(
        /<h1([^>]*)>/g,
        `<h1$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize * 1.8}px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; color: #1f2937;">`,
      )
      .replace(
        /<h2([^>]*)>/g,
        `<h2$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize * 1.5}px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; color: #1f2937;">`,
      )
      .replace(
        /<h3([^>]*)>/g,
        `<h3$1 style="font-family: 'TimesNewRoman'; font-size: ${fontSize * 1.3}px; font-weight: bold; margin: 0 0 8px 0; line-height: 1.2; color: #1f2937;">`,
      )
      .replace(
        /<ol([^>]*)>/g,
        `<ol$1 style="margin-top: 8px; margin-bottom: 8px; padding-left: 24px; line-height: 1.4; font-family: 'TimesNewRoman'; font-size: ${fontSize}px; color: #1f2937;">`,
      )
      .replace(
        /<ul([^>]*)>/g,
        `<ul$1 style="margin-top: 8px; margin-bottom: 8px; padding-left: 24px; line-height: 1.4; font-family: 'TimesNewRoman'; font-size: ${fontSize}px; color: #1f2937;">`,
      )
      .replace(/<li([^>]*)>/g, `<li$1 style="margin-bottom: 3px; line-height: 1.4;">`)
      .replace(/<sub([^>]*)>/g, '<sub$1 style="vertical-align: sub; font-size: 12px;">')
      .replace(/<sup([^>]*)>/g, '<sup$1 style="vertical-align: super; font-size: 12px;">')
      .replace(/(<br>\s*){3,}/g, "<br><br>")
      .trim()

    console.log("CLEANEDHTML", cleanedHTML)
    return cleanedHTML || ""
  } catch (error) {
    console.warn("Content cleanup failed:", error)
    return html
  }
}

  const handleChange = (html) => {
    setContent(html)
    const cleanedHTML = cleanContent(html)
    onChange?.(cleanedHTML)
  }

  return (
    <div className={`text-editor-wrapper-${editorId}`}>
      <div id={`custom-toolbar-${editorId}`}>
        <select className="toolbar-select ql-header" defaultValue="">
          <option value="">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
        </select>

        <button className="ql-bold" title="Bold">
          <span className="material-icons">format_bold</span>
        </button>

        <button className="ql-italic" title="Italic">
          <span className="material-icons">format_italic</span>
        </button>

        <button className="ql-underline" title="Underline">
          <span className="material-icons">format_underlined</span>
        </button>

        <button className="ql-list" value="ordered" title="Numbered list">
          <span className="material-icons">format_list_numbered</span>
        </button>

        <button className="ql-list" value="bullet" title="Bulleted list">
          <span className="material-icons">format_list_bulleted</span>
        </button>

        <button className="ql-list" value="lower-alpha" title="a), b), c)">
          <span className="list-style-label">a)</span>
        </button>

        <button className="ql-list" value="lower-roman" title="i), ii), iii)">
          <span className="list-style-label">i)</span>
        </button>

        <button
          type="button"
          onClick={() => setShowSymbols((s) => !s)}
          className={`symbols-toggle-btn ${showSymbols ? "active" : ""}`}
          title="Symbols"
        >
          <span className="material-icons">functions</span>
        </button>
      </div>

      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={placeholder}
      />

      {showSymbols && (
        <div className="symbols-panel">
          <input
            type="text"
            placeholder="Search symbols..."
            value={symbolSearch}
            onChange={(e) => setSymbolSearch(e.target.value)}
            className="symbols-search"
          />
          {Object.entries(filteredSymbols).map(([category, symbols]) => (
            <div key={category} className="symbol-category" style={{ marginBottom: 16 }}>
              <div className="symbol-category-title">{category}</div>
              <div className="symbol-grid">
                {symbols.map((s, i) => {
                  const isObj = typeof s === "object"
                  const text = isObj ? s.symbol : s
                  const title = isObj ? s.label : s
                  return (
                    <button
                      key={`${category}-${i}`}
                      onClick={() => handleSymbolClick(s)}
                      title={title}
                      className="symbol-btn"
                    >
                      {text}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}