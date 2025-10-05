"use client"

import { useLayoutEffect, useMemo, useRef, useState } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const A4_WIDTH = 700;   // px
const A4_HEIGHT = 991;  // px (this maintains the ratio)
const PAGE_PADDING = 30 // px
const CONTENT_WIDTH = A4_WIDTH - PAGE_PADDING * 2
export const SECTION_MIN_START_SPACE = 300 // if remaining space < this, push section to next page

function toRoman(num) {
  const romanNumerals = [
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
    "viii",
    "ix",
    "x",
    "xi",
    "xii",
    "xiii",
    "xiv",
    "xv",
    "xvi",
    "xvii",
    "xviii",
    "xix",
    "xx",
  ]

  if (num <= 20) return romanNumerals[num - 1]
  const tens = Math.floor(num / 10)
  const ones = num % 10
  if (tens === 2) return ones === 0 ? "xx" : "xx" + romanNumerals[ones - 1]
  if (tens === 3) return ones === 0 ? "xxx" : "xxx" + romanNumerals[ones - 1]
  if (tens === 4) return ones === 0 ? "xl" : "xl" + romanNumerals[ones - 1]
  if (tens === 5) return ones === 0 ? "l" : "l" + romanNumerals[ones - 1]
  return romanNumerals[num - 1] || `${num}`
}

function formatTimeRange(startTime, durationHours) {
  if (!startTime || !durationHours) return ""
  const parts = String(startTime).split(":")
  let hour = Number.parseInt(parts[0], 10)
  let minute = parts.length > 1 ? Number.parseInt(parts[1], 10) : 0
  if (isNaN(hour)) hour = 0
  if (isNaN(minute)) minute = 0
  if (hour >= 24) hour -= 24
  const start = new Date(2000, 0, 1, hour, minute, 0)
  const end = new Date(start)
  end.setHours(start.getHours() + Number(durationHours))
  const fmt = (d) => {
    let h = d.getHours()
    const m = d.getMinutes().toString().padStart(2, "0")
    const ampm = h >= 12 ? "PM" : "AM"
    h = h % 12 || 12
    return `${h}:${m} ${ampm}`
  }
  return `${fmt(start)} - ${fmt(end)}`
}

function isEmptyHtmlString(html) {
  if (!html) return true
  const text = String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim()
  return text.length === 0
}

export function htmlChange(html) {
  if (!html) return ""
  const paper = {
    fontSize: "14px",
    lineHeight: "1",
    marginBottom: "2px",
    color: "#1f2937",
    fontFamily: "Times New Roman, Times, serif",
  }

  let transformed = html

  // chemistry symbols
  transformed = transformed
    .replace(
      /<chemical-line[^>]*data-chemical-type="single"[^>]*>.*?<\/chemical-line>/gi,
      '<span style="font-family: Times New Roman, Times, serif; font-size: 14px; margin: 0 4px; display: inline-block;">→</span>',
    )
    .replace(
      /<chemical-reversible[^>]*>.*?<\/chemical-reversible>/gi,
      '<span style="font-family: Times New Roman, Times, serif; font-size: 14px; margin: 0 4px; display: inline-block;">⇌</span>',
    )

  // normalize text styles
  transformed = transformed
    .replace(
      /<span[^>]*style="[^"]*font-family:[^;]*TimesNewRoman[^;]*;[^"]*"[^>]*>/g,
      `<span style="font-family: ${paper.fontFamily}; font-size: ${paper.fontSize}; margin-top: 2px; margin-bottom: ${paper.marginBottom}; line-height: ${paper.lineHeight}; color: ${paper.color}; display: inline-block; width: 100%;">`,
    )
    .replace(
      /<ol[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paper.lineHeight}; font-family: ${paper.fontFamily}; font-size: ${paper.fontSize}; color: ${paper.color};">`,
    )
    .replace(
      /<ul[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ul style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paper.lineHeight}; font-family: ${paper.fontFamily}; font-size: ${paper.fontSize}; color: ${paper.color};">`,
    )
    .replace(
      /<li[^>]*style="[^"]*margin-bottom:[^;]*3px[^;]*;[^"]*"[^>]*>/g,
      `<li style="margin-bottom: 2px; line-height: ${paper.lineHeight};">`,
    )
    .replace(
      /<h1[^>]*style="[^"]*font-size:[^;]*27px[^;]*;[^"]*"[^>]*>/g,
      `<h1 style="font-family: ${paper.fontFamily}; font-size: 22px; font-weight: bold; margin-top: 0px; margin-bottom: ${paper.marginBottom}; line-height: 1.2; color: ${paper.color};">`,
    )
    .replace(
      /<h2[^>]*style="[^"]*font-size:[^;]*22\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h2 style="font-family: ${paper.fontFamily}; font-size: 18px; font-weight: bold; margin-top: 0px; margin-bottom: ${paper.marginBottom}; line-height: 1.2; color: ${paper.color};">`,
    )
    .replace(
      /<h3[^>]*style="[^"]*font-size:[^;]*19\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h3 style="font-family: ${paper.fontFamily}; font-size: 16px; font-weight: bold; margin-top: 0px; margin-bottom: ${paper.marginBottom}; line-height: 1.2; color: ${paper.color};">`,
    )
    .replace(/font-family:\s*'TimesNewRoman'/g, "font-family: Times New Roman, Times, serif")
    .replace(/font-family:\s*"TimesNewRoman"/g, "font-family: Times New Roman, Times, serif")
    .replace(/(?:overflow-wrap|word-wrap|word-break)\s*:\s*[^;]+;?/gi, "")
    .replace(/margin:\s*([^;]+);/g, (match, values) => {
      const parts = values.trim().split(/\s+/)
      if (parts.length === 4)
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[2]}; margin-left: ${parts[3]};`
      if (parts.length === 3)
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[2]}; margin-left: ${parts[1]};`
      if (parts.length === 2)
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[0]}; margin-left: ${parts[1]};`
      if (parts.length === 1)
        return `margin-top: ${parts[0]}; margin-right: ${parts[0]}; margin-bottom: ${parts[0]}; margin-left: ${parts[0]};`
      return match
    })
    .replace(/padding:\s*([^;]+);/g, (match, values) => {
      const parts = values.trim().split(/\s+/)
      if (parts.length === 4)
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[2]}; padding-left: ${parts[3]};`
      if (parts.length === 3)
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[2]}; padding-left: ${parts[1]};`
      if (parts.length === 2)
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[0]}; padding-left: ${parts[1]};`
      if (parts.length === 1)
        return `padding-top: ${parts[0]}; padding-right: ${parts[0]}; padding-bottom: ${parts[0]}; padding-left: ${parts[0]};`
      return match
    })
    .replace(/text-decoration-thickness:\s*[^;]+;/g, "")
    .replace(/text-decoration-line:\s*[^;]+;/g, "")
    .replace(/data-[^=]*="[^"]*"/g, "")
    .replace(/contenteditable="[^"]*"/g, "")
    .replace(/<\/?\s*chemical-[^>]*>/gi, "")

  transformed = transformed
    .replace(/<span[^>]*>\s*(?:&nbsp;)?\s*<\/span>/gi, "")
    .replace(/<b[^>]*>\s*(?:&nbsp;)?\s*<\/b>/gi, "")
    .replace(/<i[^>]*>\s*(?:&nbsp;)?\s*<\/i>/gi, "")
    .replace(/<u[^>]*>\s*(?:&nbsp;)?\s*<\/u>/gi, "")
    .replace(/<div[^>]*>\s*(?:&nbsp;)?\s*<\/div>/gi, "")
    .replace(/<p[^>]*>\s*(?:&nbsp;)?\s*<\/p>/gi, "")

  const safe = (transformed || "").trim()
  return safe.length > 0 ? safe : " "
}

function PaperHeader({ BasicInfo }) {
  const headerStyle = {
    textAlign: "center",
    marginBottom: 20,
    paddingTop: 2,
    paddingBottom: 2,
    borderBottom: "2px solid #333",
  }
  const instituteName = {
    fontSize: 18,
    fontFamily: "Times New Roman, Times, serif",
    fontWeight: 700,
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  }
  const row = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  }
  const left = { display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1.05 }
  const center = { display: "flex", flexDirection: "column", alignItems: "center", flex: 2 }
  const right = { display: "flex", flexDirection: "column", alignItems: "flex-end", flex: 1 }
  const detail = {
    fontSize: 12,
    fontFamily: "Times New Roman, Times, serif",
    fontWeight: 700,
    marginBottom: 2,
  }
  const examTitle = {
    fontSize: 12,
    fontFamily: "Times New Roman, Times, serif",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 2,
    textTransform: "uppercase",
  }

  return (
    <div style={headerStyle} data-header>
      <div style={instituteName}>{BasicInfo?.header}</div>
      <div style={row}>
        <div style={left}>
          <div style={detail}>Date: {BasicInfo?.date}</div>
          <div style={detail}>Time: {formatTimeRange(BasicInfo?.time, BasicInfo?.duration)}</div>
        </div>
        <div style={center}>
          <div style={examTitle}>
            {BasicInfo?.examination} EXAMINATION, {BasicInfo?.ExaminationYear}
          </div>
          <div style={examTitle}>
            {BasicInfo?.subject} - {BasicInfo?.class} ({BasicInfo?.center})
          </div>
        </div>
        <div style={right}>
          <div style={detail}>Max. Marks: {BasicInfo?.marks}</div>
        </div>
      </div>
    </div>
  )
}

function SectionHeaderBlock({ sec, isUrdu, isDescriptive, sectionQuestionNumber }) {
  const sectionHeader = {
    paddingTop: 10,
    fontWeight: 700,
    textDecoration: "underline",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "Times New Roman, Times, serif",
  }
  const sectionHeaderType = {
    paddingTop: 10,
    fontWeight: 700,
    textDecoration: "underline",
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "Times New Roman, Times, serif",
  }
  const urduSectionHeader = {
    fontFamily: '"Noto Nastaliq Urdu", serif',
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
    margin: "8px 0",
  }
  const urduSectionHeaderType = {
    fontFamily: '"Noto Nastaliq Urdu", serif',
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    margin: "8px 0",
  }
  const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  }
  const nameWrap = { flex: 5, textAlign: "center" }
  const noteRow = {
    paddingTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  }
  const noteAsQuestion = {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 700,
    flex: 5,
    fontFamily: "Times New Roman, Times, serif",
    textAlign: "left",
  }
  const normalNote = {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 700,
    textAlign: "left",
    flex: 5,
    fontFamily: "Times New Roman, Times, serif",
  }
  const sectionMarks = {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 700,
    flex: 1,
    fontFamily: "Times New Roman, Times, serif",
  }

  const urduNoteAsQuestion = {
    fontFamily: '"Noto Nastaliq Urdu", serif',
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
    flex: 5,
    textAlign: "right",
  }
  const urduNormalNote = {
    fontFamily: '"Noto Nastaliq Urdu", serif',
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 8,
    flex: 5,
    textAlign: "right",
  }
  const urduSectionMarks = {
    fontFamily: '"Noto Nastaliq Urdu", serif',
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 8,
    marginLeft: 10,
    flex: 1,
    textAlign: "left",
  }

  return (
    <div data-block-kind="sectionHeader" style={{ breakInside: "avoid" }}>
      <div style={row}>
        <div style={nameWrap}>
          <div style={isUrdu ? urduSectionHeader : sectionHeader}>{sec?.name}</div>
          <div style={isUrdu ? urduSectionHeaderType : sectionHeaderType}>({sec?.displayType})</div>
        </div>
      </div>

      <div style={noteRow}>
        {isUrdu ? (
          <>
            <div style={urduSectionMarks}>{`   کل نشانات : (${sec?.marks})`}</div>
            {isDescriptive ? (
              <div style={urduNormalNote}>
                {"نوٹ: "}
                {sec?.description}
              </div>
            ) : (
              <div style={urduNoteAsQuestion}>
                {"سوال نمبر "}
                {sectionQuestionNumber}
                {". "}
                {sec?.description}
              </div>
            )}
          </>
        ) : (
          <>
            {isDescriptive ? (
              <div style={normalNote}>NOTE: {sec?.description}</div>
            ) : (
              <div style={noteAsQuestion}>
                Q{sectionQuestionNumber}. {sec?.description}
              </div>
            )}
            <div style={sectionMarks}>({sec?.marks} Marks)</div>
          </>
        )}
      </div>
    </div>
  )
}

function DescriptiveQuestionBlock({ q, indexInSection, isUrdu, sectionQuestionNumber }) {
  const row = {
    display: "flex",
    flexDirection: isUrdu ? "row-reverse" : "row",
    marginBottom: 5,
    justifyContent: isUrdu ? "flex-end" : "flex-start",
    alignItems: "flex-start",
  }
  const numStyle = isUrdu
    ? {
        fontFamily: '"Noto Nastaliq Urdu", serif',
        fontSize: 15,
        fontWeight: 400,
        textAlign: "right",
        margin: "4px 0",
        lineHeight: 1.8,
        minWidth: 20,
        marginLeft: 8,
      }
    : { fontFamily: "Times New Roman, Times, serif", fontSize: 15, minWidth: 20, marginRight: 8 }
  const htmlWrap = { flex: 1, textAlign: isUrdu ? "right" : "left" }
  const imgStyle = {
    width: 400,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    maxWidth: "100%",
  }

  const htmlString = htmlChange(q?.name || "")
  const answerHtml = htmlChange(q?.original_answer || "")
  const hasAnswerText = !isEmptyHtmlString(answerHtml)
  const answerImageSrc = q?.answerImage || (isProbablyImageUrl(q?.answer) ? q?.answer : undefined)

  return (
    <div data-block-kind="question" style={{ marginBottom: 5 }}>
      <div style={row}>
        <div style={numStyle}>{`Q${sectionQuestionNumber + indexInSection}.`}</div>
        <div style={htmlWrap}>
          {!isEmptyHtmlString(htmlString) && <div dangerouslySetInnerHTML={{ __html: htmlString }} />}
          {q?.image && <img alt="" src={q.image || "/placeholder.svg"} style={imgStyle} crossOrigin="anonymous" />}
        </div>
      </div>

      {/* Answer block (text) */}
      {hasAnswerText && (
        <div
          style={{
            display: "flex",
            flexDirection: isUrdu ? "row-reverse" : "row",
            justifyContent: "flex-start",
            marginTop: 10,
            backgroundColor: "#f0f9ff",
            padding: 8,
            borderRadius: 4,
            alignItems: "flex-start",
          }}
        >
          <div
            style={
              isUrdu
                ? {
                    fontSize: 14,
                    color: "green",
                    fontWeight: "bold",
                    marginLeft: 8,
                    fontFamily: '"Noto Nastaliq Urdu", serif',
                  }
                : {
                    fontSize: 14,
                    color: "green",
                    fontWeight: "bold",
                    marginRight: 8,
                    fontFamily: "Times New Roman, Times, serif",
                  }
            }
          >
            {isUrdu ? "جواب:" : "Answer:"}
          </div>
          <div
            style={
              isUrdu
                ? {
                    textAlign: "right",
                    direction: "rtl",
                    color: "green",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    maxWidth: 1000,
                    width: "100%",
                  }
                : {
                    color: "green",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    maxWidth: 1000,
                    width: "100%",
                  }
            }
            dangerouslySetInnerHTML={{ __html: answerHtml }}
          />
        </div>
      )}

      {/* Answer image (if provided) */}
      {answerImageSrc && (
        <img alt="" src={answerImageSrc || "/placeholder.svg"} style={imgStyle} crossOrigin="anonymous" />
      )}
    </div>
  )
}

function MCQBlock({ q, idx, isUrdu }) {
  const stemHtml = htmlChange(q?.name || "")
  const choices = [q?.choice1, q?.choice2, q?.choice3, q?.choice4].map((c) => htmlChange(c || ""))
  const row = {
    display: "flex",
    flexDirection: isUrdu ? "row-reverse" : "row",
    marginBottom: 8,
    justifyContent: isUrdu ? "flex-end" : "flex-start",
    textAlign: isUrdu ? "right" : "left",
    alignItems: "flex-start",
  }
  const numStyle = isUrdu
    ? {
        fontFamily: '"Noto Nastaliq Urdu", serif',
        fontSize: 15,
        fontWeight: 400,
        textAlign: "right",
        lineHeight: 1.8,
        minWidth: 20,
        marginLeft: 8,
      }
    : { fontFamily: "Times New Roman, Times, serif", fontSize: 15, minWidth: 20, marginRight: 8 }
  const imgStyle = {
    width: 400,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    maxWidth: "100%",
  }

  const bulletStyle = {
    fontFamily: "Times New Roman, Times, serif",
    fontSize: 15,
    marginRight: isUrdu ? 0 : 4,
    marginLeft: isUrdu ? 4 : 0,
  }
  const col = { width: "45%" }
  const choiceRow = {
    display: "flex",
    flexDirection: isUrdu ? "row-reverse" : "row",
    alignItems: "flex-start",
    marginBottom: 4,
  }
  const gridRow = {
    display: "flex",
    flexDirection: isUrdu ? "row-reverse" : "row",
    justifyContent: isUrdu ? "flex-end" : "flex-start",
    gap: 20,
    paddingLeft: isUrdu ? 0 : 28,
    paddingRight: isUrdu ? 28 : 0,
  }

  const answerHtml = htmlChange(q?.answer || "")
  const hasAnswerText = !isEmptyHtmlString(answerHtml)
  const answerImageSrc = q?.answerImage || (isProbablyImageUrl(q?.answer) ? q?.answer : undefined)

  return (
    <div data-block-kind="mcq" style={{ marginBottom: 10 }}>
      <div style={row}>
        <div style={numStyle}>{`${toRoman(idx)}.`}</div>
        <div style={{ flex: 1 }}>
          {!isEmptyHtmlString(stemHtml) && <div dangerouslySetInnerHTML={{ __html: stemHtml }} />}
          {q?.image && <img alt="" src={q.image || "/placeholder.svg"} style={imgStyle} crossOrigin="anonymous" />}
        </div>
      </div>
      <div style={gridRow}>
        <div style={col}>
          <div style={choiceRow}>
            <div style={bulletStyle}>•</div>
            <div style={{ flex: 1, 
              textAlign: isUrdu ? "right" : "left",
              direction: isUrdu ? "rtl" : "ltr",
              unicodeBidi: isUrdu ? "embed" : "normal",
              wordBreak: "break-word" }}>
              {!isEmptyHtmlString(choices[0]) && <div dangerouslySetInnerHTML={{ __html: choices[0] }} />}
            </div>
          </div>
          <div style={choiceRow}>
            <div style={bulletStyle}>•</div>
            <div style={{ flex: 1, textAlign: isUrdu ? "right" : "left" }}>
              {!isEmptyHtmlString(choices[1]) && <div dangerouslySetInnerHTML={{ __html: choices[1] }} />}
            </div>
          </div>
        </div>
        <div style={col}>
          <div style={choiceRow}>
            <div style={bulletStyle}>•</div>
            <div style={{ flex: 1, textAlign: isUrdu ? "right" : "left" }}>
              {!isEmptyHtmlString(choices[2]) && <div dangerouslySetInnerHTML={{ __html: choices[2] }} />}
            </div>
          </div>
          <div style={choiceRow}>
            <div style={bulletStyle}>•</div>
            <div style={{ flex: 1, textAlign: isUrdu ? "right" : "left" }}>
              {!isEmptyHtmlString(choices[3]) && <div dangerouslySetInnerHTML={{ __html: choices[3] }} />}
            </div>
          </div>
        </div>
      </div>

      {/* Answer block (text) */}
      {hasAnswerText && (
        <div
          style={{
            display: "flex",
            flexDirection: isUrdu ? "row-reverse" : "row",
            justifyContent: "flex-start",
            marginTop: 10,
            backgroundColor: "#f0f9ff",
            padding: 8,
            borderRadius: 4,
            alignItems: "flex-start",
          }}
        >
          <div
            style={
              isUrdu
                ? {
                    fontSize: 14,
                    color: "green",
                    fontWeight: "bold",
                    marginLeft: 8,
                    fontFamily: '"Noto Nastaliq Urdu", serif',
                  }
                : {
                    fontSize: 14,
                    color: "green",
                    fontWeight: "bold",
                    marginRight: 8,
                    fontFamily: "Times New Roman, Times, serif",
                  }
            }
          >
            {isUrdu ? "جواب:" : "Answer:"}
          </div>
          <div
            style={
              isUrdu
                ? {
                    textAlign: "right",
                    direction: "rtl",
                    color: "green",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    maxWidth: 450,
                    width: "100%",
                  }
                : {
                    color: "green",
                    fontWeight: "bold",
                    fontFamily: "Times New Roman, Times, serif",
                    maxWidth: 450,
                    width: "100%",
                  }
            }
            dangerouslySetInnerHTML={{ __html: answerHtml }}
          />
        </div>
      )}

      {/* Optional answer image */}
      {answerImageSrc && (
        <img alt="" src={answerImageSrc || "/placeholder.svg"} style={imgStyle} crossOrigin="anonymous" />
      )}
    </div>
  )
}

function computeBaseQuestionNumbers(sections, questionsArr) {
  const bases = []
  for (let secIndex = 0; secIndex < sections.length; secIndex++) {
    let base = 1
    for (let i = 0; i < secIndex; i++) {
      const prev = sections[i]
      if (String(prev?.type || "").toLowerCase() === "descriptive questions") {
        const prevCount = questionsArr.filter((q) => q.section === prev?.name).length
        base += prevCount
      } else {
        base += 1
      }
    }
    bases.push(base)
  }
  return bases
}

function buildBlocks({ sections, questionsArr, mcqArr, baseQuestionNumbers }) {
  const blocks = []
  for (let secIndex = 0; secIndex < sections.length; secIndex++) {
    const sec = sections[secIndex]
    const isDescriptive = String(sec?.type || "").toLowerCase() === "descriptive questions"
    const sectionQuestionNumber = baseQuestionNumbers[secIndex] || 1

    blocks.push({
      kind: "sectionHeader",
      id: `sec-${secIndex}-hdr`,
      sec,
      secIndex,
      isDescriptive,
      sectionQuestionNumber,
    })

    const sectionDescriptive = questionsArr.filter((q) => q.section === sec?.name)
    sectionDescriptive.forEach((q, idx) => {
      blocks.push({
        kind: "question",
        id: `sec-${secIndex}-q-${idx}`,
        sec,
        secIndex,
        isDescriptive: true,
        sectionQuestionNumber,
        q,
        qIndex: idx,
      })
    })

    const sectionMcqs = mcqArr.filter((q) => q.section === sec?.name)
    sectionMcqs.forEach((q, idx) => {
      blocks.push({
        kind: "mcq",
        id: `sec-${secIndex}-m-${idx + 1}`,
        sec,
        secIndex,
        isDescriptive: false,
        sectionQuestionNumber,
        q,
        qIndex: idx + 1, // index for roman numbering
      })
    })
  }
  return blocks
}

function MeasureBlock({ block, isUrdu }) {
  if (block.kind === "sectionHeader") {
    return (
      <div data-measure-id={block.id} style={{ width: "100%" }}>
        <SectionHeaderBlock
          sec={block.sec}
          isUrdu={isUrdu}
          isDescriptive={block.isDescriptive}
          sectionQuestionNumber={block.sectionQuestionNumber}
        />
      </div>
    )
  }
  if (block.kind === "question") {
    return (
      <div data-measure-id={block.id} style={{ width: "100%" }}>
        <DescriptiveQuestionBlock
          q={block.q}
          indexInSection={block.qIndex}
          isUrdu={isUrdu}
          sectionQuestionNumber={block.sectionQuestionNumber}
        />
      </div>
    )
  }
  // mcq
  return (
    <div data-measure-id={block.id} style={{ width: "100%" }}>
      <MCQBlock q={block.q} idx={block.qIndex} isUrdu={isUrdu} />
    </div>
  )
}

function PageFrame({ children, BasicInfo }) {
  const pageStyle = {
    width: `${A4_WIDTH}px`,
    height: `${A4_HEIGHT}px`,
    boxSizing: "border-box",
    background: "#ffffff", // ensure white page background
    color: "#000", // ensure black text color
    padding: `${PAGE_PADDING}px`,
    margin: "0 auto 12px",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
  }
  const contentStyle = {
    width: "100%",
  }
  return (
    <div data-page style={pageStyle}>
      <PaperHeader BasicInfo={BasicInfo} />
      <div style={contentStyle}>{children}</div>
    </div>
  )
}

export async function downloadPaperKeyPdf(filename) {
  const rootEl = document.querySelector('[data-paper-type="answer-key"]');
  if (!rootEl) {
    console.error('Paper key container not found');
    return;
  }
  
  const pages = Array.from(rootEl.querySelectorAll("[data-page]"));
  if (pages.length === 0) return;

  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH);
  }

  pdf.save(filename);
}


function Paper({ BasicInfo, htmlQuestions, htmlMCQ, section, loading, minSectionStartSpace }) {
  const containerRef = useRef(null)
  const measureRef = useRef(null)
  const headerMeasureRef = useRef(null)
  const [pages, setPages] = useState([])
  const info = BasicInfo || {}
  const isUrdu = info?.medium === "Urdu"

  const questionsArr = Array.isArray(htmlQuestions) ? htmlQuestions : []
  const mcqArr = Array.isArray(htmlMCQ) ? htmlMCQ : []
  const sections = Array.isArray(section) ? section : []

  const MIN_SECTION_SPACE = typeof minSectionStartSpace === "number" ? minSectionStartSpace : SECTION_MIN_START_SPACE

  const baseQuestionNumbers = useMemo(
    () => computeBaseQuestionNumbers(sections, questionsArr),
    [sections, questionsArr],
  )
  const blocks = useMemo(
    () => buildBlocks({ sections, questionsArr, mcqArr, baseQuestionNumbers }),
    [sections, questionsArr, mcqArr, baseQuestionNumbers],
  )

  // Measure header height and each block height offscreen, then paginate
  useLayoutEffect(() => {
    if (!measureRef.current) return

    // measure header
    const headerNode = headerMeasureRef.current
    const headerHeight = headerNode ? headerNode.offsetHeight : 0
    const contentHeight = A4_HEIGHT - PAGE_PADDING * 2 - headerHeight

    // measure blocks
    const heights = new Map()
    blocks.forEach((b) => {
      const el = measureRef.current.querySelector(`[data-measure-id="${b.id}"]`)
      if (el) heights.set(b.id, el.offsetHeight)
    })

    // paginate
    const newPages = []
    let current = []
    let used = 0

    const pushPage = () => {
      newPages.push(current)
      current = []
      used = 0
    }

    const spaceLeft = () => contentHeight - used

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]
      const h = heights.get(b.id) || 0

      // If this is a new section header, prefer moving the entire section start to next page
      // unless we have enough space to show at least the header + first block in this section.
      if (b.kind === "sectionHeader" && used > 0) {
        // find first content block in this section (question or mcq)
        let firstNextInSectionHeight = 0
        const next = blocks[i + 1]
        if (next && next.secIndex === b.secIndex && next.kind !== "sectionHeader") {
          firstNextInSectionHeight = heights.get(next.id) || 0
        }

        // Require enough space either for header + first block, or the configured minimum start space
        const requiredStart = Math.max(MIN_SECTION_SPACE, h + firstNextInSectionHeight)
        if (spaceLeft() < requiredStart) {
          if (current.length > 0) pushPage()
        }
      }

      // If this block doesn't fit on the current page, push a new page before placing it.
      if (used > 0 && h > spaceLeft()) {
        pushPage()
      }

      current.push(b)
      used += h
    }
    if (current.length > 0) newPages.push(current)

    setPages(newPages)
  }, [blocks, sections, questionsArr, mcqArr])

  // Loader (mimic original behavior)
  if (loading) {
    return (
      <div
        style={{ width: "100%", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14 }}>Loading...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} style={{ width: "100%", overflowX: "hidden" }}>
      {/* Hidden measuring stage */}
      <div
        style={{
          position: "absolute",
          left: -99999,
          top: 0,
          width: `${CONTENT_WIDTH}px`,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <div ref={headerMeasureRef} style={{ width: `${CONTENT_WIDTH}px`, padding: 0, margin: 0 }}>
          <PaperHeader BasicInfo={info} />
        </div>
        <div ref={measureRef}>
          {blocks.map((b) => (
            <MeasureBlock key={b.id} block={b} isUrdu={isUrdu} />
          ))}
        </div>
      </div>

      {/* Visible paginated preview */}
      <div data-paper-root data-paper-type="answer-key">
        {pages.map((pageBlocks, pageIndex) => (
          <PageFrame key={pageIndex} BasicInfo={info}>
            {pageBlocks.map((b) => {
              if (b.kind === "sectionHeader") {
                return (
                  <SectionHeaderBlock
                    key={b.id}
                    sec={b.sec}
                    isUrdu={isUrdu}
                    isDescriptive={b.isDescriptive}
                    sectionQuestionNumber={b.sectionQuestionNumber}
                  />
                )
              }
              if (b.kind === "question") {
                return (
                  <DescriptiveQuestionBlock
                    key={b.id}
                    q={b.q}
                    indexInSection={b.qIndex}
                    isUrdu={isUrdu}
                    sectionQuestionNumber={b.sectionQuestionNumber}
                  />
                )
              }
              return <MCQBlock key={b.id} q={b.q} idx={b.qIndex} isUrdu={isUrdu} />
            })}
          </PageFrame>
        ))}
      </div>
    </div>
  )
}

export default Paper

function isProbablyImageUrl(val) {
  if (!val || typeof val !== "string") return false
  const v = val.trim().toLowerCase()
  return (
    v.startsWith("data:image/") ||
    v.startsWith("blob:") ||
    v.endsWith(".png") ||
    v.endsWith(".jpg") ||
    v.endsWith(".jpeg") ||
    v.endsWith(".gif") ||
    v.endsWith(".webp") ||
    v.endsWith(".bmp") ||
    v.includes("/upload/") // common pattern from storage/CDN
  )
}
