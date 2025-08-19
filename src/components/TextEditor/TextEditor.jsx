"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

/* ------------------------ List formats whitelist ------------------------ */
const List = Quill.import("formats/list")
List.whitelist = [
  "ordered",
  "bullet",
  "checked",
  "unchecked",
]
Quill.register(List, true)

/* ------------------------ Custom list style attributor ------------------------ */
const Parchment = Quill.import("parchment")
class ListStyleAttributor extends Parchment.Attributor.Attribute {}
const listStyleAttr = new ListStyleAttributor("listStyle", "data-list-style", {
  scope: Parchment.Scope.BLOCK_BLOT,
  whitelist: ["lower-alpha", "lower-roman"],
})
Quill.register(listStyleAttr, true)

/* ------------------------ Subscript / Superscript ------------------------ */
const Script = Quill.import("formats/script")
Quill.register(Script, true)

/* ------------------------ Bold Chemical Line (Arrow) ------------------------ */
const Embed = Quill.import("blots/embed")
class ChemicalLine extends Embed {
  static create(value) {
    const node = super.create()
    const opts = typeof value === "object" && value ? value : { w: 40, color: "#000000ff" }
    node.setAttribute("contenteditable", "false")
    node.classList.add("ql-chemline")
    node.dataset.w = String(opts.w)
    node.dataset.color = opts.color
    node.style.setProperty("--chemline-width", `${opts.w}px`)
    node.style.setProperty("--chemline-color", opts.color)
    return node
  }
  static value(node) {
    return {
      w: Number.parseInt(node.dataset.w || "40", 10),
      color: node.dataset.color || "#000000ff",
    }
  }
}
ChemicalLine.blotName = "chemline"
ChemicalLine.tagName = "SPAN"
Quill.register(ChemicalLine)

/* ------------------------ Reversible Chemical Line (Double Arrow) ------------------------ */
class ChemicalReversible extends Embed {
  static create(value) {
    const node = super.create()
    const opts = typeof value === "object" && value ? value : { w: 40, color: "#000000ff" }
    node.setAttribute("contenteditable", "false")
    node.classList.add("ql-chemreversible")
    node.dataset.w = String(opts.w)
    node.dataset.color = opts.color
    node.style.setProperty("--chemline-width", `${opts.w}px`)
    node.style.setProperty("--chemline-color", opts.color)

    const top = document.createElement("span")
    top.className = "line top"
    const bottom = document.createElement("span")
    bottom.className = "line bottom"
    node.appendChild(top)
    node.appendChild(bottom)
    return node
  }
  static value(node) {
    return {
      w: Number.parseInt(node.dataset.w || "40", 10),
      color: node.dataset.color || "#000000ff",
    }
  }
}
ChemicalReversible.blotName = "chemreversible"
ChemicalReversible.tagName = "SPAN"
Quill.register(ChemicalReversible)

/* ------------------------ Symbols (FULL LIST) ------------------------ */
const symbolCategories = {
  "Text Format": [
    { symbol: "x₂", action: "subscript", label: "Make text subscript" },
    { symbol: "x²", action: "superscript", label: "Make text superscript" },
    { symbol: "→", action: "chemline", label: "Insert chemical reaction arrow" },
    { symbol: "⇌", action: "chemreversible", label: "Insert reversible reaction double arrow" },
  ],
  "Greek Letters": ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"],
  "Mathematical Symbols": ["∞", "∑", "∏", "∫", "∮", "∂", "∇", "√", "∛", "∜", "∝", "∴", "∵", "∀", "∃", "∄", "∅", "∈", "∉", "∋", "∌", "∩", "∪", "⊂", "⊃", "⊄", "⊅", "⊆", "⊇", "⊈", "⊉", "ℕ", "ℤ", "ℚ", "ℝ", "ℂ", "∧", "∨", "¬", "⊕", "⊗", "⊙", "⊘"],
  "Operators & Relations": ["±", "∓", "×", "÷", "≈", "≠", "≡", "≢", "≤", "≥", "≪", "≫", "≮", "≯", "≰", "≱", "∼", "≃", "≅", "≆", "≇", "≉", "≊", "≋", "≌", "≍", "≎", "≏", "≐", "≑", "≒", "≓", "∣", "∤", "∥", "∦", "∧", "∨", "⊻", "⊼", "⊽", "∴", "∵", "∶", "∷", "∸", "∹", "∺"],
  Arrows: ["→", "←", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↜", "↝", "↞", "↟", "↠", "↡", "↢", "↣", "↤", "↥", "↦", "↧", "↨", "↩", "↪", "↫", "↬", "↭", "↮", "↯", "⇒", "⇐", "⇑", "⇓", "⇔", "⇕", "⇖", "⇗", "⇘", "⇙", "⇚", "⇛", "⇜", "⇝", "⇞", "⇟"],
  "Chemical Symbols": ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "₊", "₋", "₌", "₍", "₎", "⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "⁺", "⁻", "⁼", "⁽", "⁾", "→", "⇌", "⇋", "⇄", "⇆"],
}

// Generate unique ID for each editor instance
let editorCounter = 0

export default function TextEditor(props) {
  const { value = "", onChange, placeholder = "Write your question here..." } = props
  const [content, setContent] = useState(value)
  const [showSymbols, setShowSymbols] = useState(false)
  const [symbolSearch, setSymbolSearch] = useState("")
  const [editorId] = useState(() => `editor-${++editorCounter}`)
  const quillRef = useRef(null)

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
      if (value) container.setAttribute("data-list-style", value)
      else container.removeAttribute("data-list-style")
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
        const currentFormat = editor.getFormat(range.index, range.length).script
        editor.format("script", currentFormat === "sub" ? false : "sub")
      } else if (symbol.action === "superscript") {
        const currentFormat = editor.getFormat(range.index, range.length).script
        editor.format("script", currentFormat === "super" ? false : "super")
      } else if (symbol.action === "chemline") {
        const idx = range.index ?? editor.getLength() - 1
        editor.insertEmbed(idx, "chemline", { w: 40, color: "#000000ff" })
        editor.setSelection(idx + 1, 0)
      } else if (symbol.action === "chemreversible") {
        const idx = range.index ?? editor.getLength() - 1
        editor.insertEmbed(idx, "chemreversible", { w: 40, color: "#000000ff" })
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

            // Custom styles use ordered list + listStyle attribute
            if (value === "lower-alpha" || value === "lower-roman") {
              const isActive = current.list === "ordered" && current.listStyle === value
              if (isActive) {
                editor.format("listStyle", false)
                editor.format("list", false)
                applyListStyleToSelectionContainer(null)
              } else {
                editor.format("list", "ordered")
                editor.format("listStyle", value)
                applyListStyleToSelectionContainer(value)
              }
              return
            }

            // Built-in types; clear custom style when switching
            const isSame = current.list === value
            if (isSame) {
              editor.format("listStyle", false)
              editor.format("list", false)
              return
            }
            if (value === "bullet") {
              editor.format("listStyle", false)
              editor.format("list", "bullet")
              applyListStyleToSelectionContainer(null)
            } else if (value === "ordered") {
              // If previously had custom style, clear it and keep ordered
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
    "script",
    "chemline",
    "chemreversible",
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
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
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
        height: 30px; 
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
        font-weight: 700;
        font-size: 14px;
        color: #4c1d95;
        line-height: 1;
      }
      
      .text-editor-wrapper-${editorId} .ql-container { border: none !important; }
      .text-editor-wrapper-${editorId} .ql-toolbar { border: none !important; }
      
      .text-editor-wrapper-${editorId} .ql-editor { 
        padding: 16px; 
        min-height: 160px; 
        font-size: 16px; 
        line-height: 1.7; 
        color: #1f2937; 
      }
      
      .text-editor-wrapper-${editorId} .ql-editor.ql-blank::before { 
        color: #a78bfa; 
        font-style: italic; 
      }
      
      .text-editor-wrapper-${editorId} .ql-editor sub { 
        vertical-align: sub; 
        font-size: 0.75em; 
      }
      
      .text-editor-wrapper-${editorId} .ql-editor sup { 
        vertical-align: super; 
        font-size: 0.75em; 
      }

      /* Reversible Chemical Line (Double Arrow) */
      .text-editor-wrapper-${editorId} .ql-chemreversible {
        display: inline-block; 
        position: relative;
        width: var(--chemline-width, 40px);
        height: 10px; 
        vertical-align: middle; 
        margin: 0 4px;
      }
      .text-editor-wrapper-${editorId} .ql-chemreversible .line {
        position: absolute;
        left: 0;
        right: 0;
        border-bottom: 2px solid var(--chemline-color, #000000ff);
      }
      .text-editor-wrapper-${editorId} .ql-chemreversible .line.top { top: 0; }
      .text-editor-wrapper-${editorId} .ql-chemreversible .line.bottom { bottom: 0; }
      .text-editor-wrapper-${editorId} .ql-chemreversible .line.top::after {
        content: ""; position: absolute; right: -1px; top: -4px;
        border-top: 5px solid transparent; border-bottom: 5px solid transparent;
        border-left: 7px solid var(--chemline-color, #000000ff);
      }
      .text-editor-wrapper-${editorId} .ql-chemreversible .line.bottom::before {
        content: ""; position: absolute; left: -1px; top: -4px;
        border-top: 5px solid transparent; border-bottom: 5px solid transparent;
        border-right: 7px solid var(--chemline-color, #000000ff);
      }

      /* Custom list markers for alpha and roman with parenthesis using separate attribute */
      /* Ensure we override Quill's default decimal for these items */
      .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style="lower-alpha"] li::before { content: counter(list-0, lower-alpha) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol[data-list-style="lower-roman"] li::before { content: counter(list-0, lower-roman) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol[data-list-style="lower-alpha"] li::before { content: counter(list-1, lower-alpha) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol[data-list-style="lower-roman"] li::before { content: counter(list-1, lower-roman) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol ol[data-list-style="lower-alpha"] li::before { content: counter(list-2, lower-alpha) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol ol[data-list-style="lower-roman"] li::before { content: counter(list-2, lower-roman) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol ol ol[data-list-style="lower-alpha"] li::before { content: counter(list-3, lower-alpha) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol ol ol[data-list-style="lower-roman"] li::before { content: counter(list-3, lower-roman) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol ol ol ol[data-list-style="lower-alpha"] li::before { content: counter(list-4, lower-alpha) ") " !important; }
      .text-editor-wrapper-${editorId} .ql-editor ol ol ol ol ol[data-list-style="lower-roman"] li::before { content: counter(list-4, lower-roman) ") " !important; }

      /* Chemical Line */
      .text-editor-wrapper-${editorId} .ql-chemline {
        display: inline-block; 
        position: relative;
        width: var(--chemline-width, 40px);
        height: 0; 
        vertical-align: middle; 
        margin: 0 4px;
        border-bottom: 2px solid var(--chemline-color, #000000ff);
      }
      
      .text-editor-wrapper-${editorId} .ql-chemline::after {
        content: ""; 
        position: absolute; 
        right: -1px; 
        top: -4px;
        border-top: 5px solid transparent; 
        border-bottom: 5px solid transparent;
        border-left: 7px solid var(--chemline-color, #000000ff);
      }

      /* Symbols panel */
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
    
    // Load Material Icons
    if (!document.getElementById('material-icons')) {
      const link = document.createElement('link')
      link.id = 'material-icons'
      link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    
    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [editorId])

  return (
    <div className={`text-editor-wrapper-${editorId}`}>
      <div id={`custom-toolbar-${editorId}`}>
        {/* Header dropdown */}
        <select className="toolbar-select ql-header" defaultValue="">
          <option value="">Normal</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
        </select>

        {/* Formatting buttons with Material UI icons */}
        <button className="ql-bold" title="Bold">
          <span className="material-icons">format_bold</span>
        </button>

        <button className="ql-italic" title="Italic">
          <span className="material-icons">format_italic</span>
        </button>

        <button className="ql-underline" title="Underline">
          <span className="material-icons">format_underlined</span>
        </button>

        {/* List buttons */}
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

        {/* Symbols button */}
        <button 
          type="button" 
          onClick={() => setShowSymbols((s) => !s)} 
          className={`symbols-toggle-btn ${showSymbols ? 'active' : ''}`} 
          title="Symbols"
        >
          <span className="material-icons">functions</span>
        </button>
      </div>

      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={(html) => {
          setContent(html)
          onChange?.(html)
        }}
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