// adding the isUrdu flag logic same as paper.jsx and ensuring answers render RTL in Urdu.

import { PDFViewer, Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import { Html } from "react-pdf-html"

// Match Paper.jsx font setup
Font.register({
  family: 'TimesNewRoman',
  src: '/fonts/times.ttf',
});

Font.register({
  family: 'TimesNewRoman',
  src: '/fonts/timesbd.ttf',
  fontWeight: 'bold',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "TimesNewRoman",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    paddingVertical: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
  instituteName: {
    fontSize: 18,
    fontFamily: "TimesNewRoman",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  examDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  leftDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1.05,
  },
  centerDetails: {
    flexDirection: "column",
    alignItems: "center",
    flex: 2,
  },
  rightDetails: {
    flexDirection: "column",
    alignItems: "flex-end",
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    fontFamily: "TimesNewRoman",
    marginBottom: 2,
    fontWeight: "bold",
  },
  examTitle: {
    fontSize: 12,
    fontFamily: "TimesNewRoman",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionWithFirstQuestion: {
    wrap: false,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionNameWrapper: {
    flex: 5,
    textAlign: "center",
  },
  sectionHeader: {
    paddingTop: 10,
    fontFamily: "TimesNewRoman",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sectionHeaderType: {
    paddingTop: 10,
    fontWeight: "bold",
    textDecoration: "underline",
    fontSize: 14,
    textDecorationThickness: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  questionContainer: {
    wrap: false,
    marginBottom: 10,
    minPresenceAhead: 100,
  },
  regularQuestionContainer: {
    marginBottom: 10,
  },
  question: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: "TimesNewRoman",
  },
  noteContainer: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteAsQuestion: {
    marginBottom: 8,
    fontSize: 13,
    fontFamily: "TimesNewRoman",
    fontWeight: "bold",
    flex: 5,
  },
  sectionMarks: {
    marginBottom: 8,
    fontFamily: "TimesNewRoman",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  normalNote: {
    marginBottom: 8,
    fontSize: 12,
    fontFamily: "TimesNewRoman",
    fontWeight: "bold",
    textAlign: "left",
    flex: 5,
  },
  descriptiveQuestion: {
    marginBottom: 5,
    fontSize: 12,
    fontFamily: "TimesNewRoman",
    display: "flex",
    flexDirection: "column",
  },
  choice: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "TimesNewRoman",
  },
  questionImage: {
    width: 400,
    marginTop: 5,
    alignSelf: "center",
  },
  debugText: {
    fontSize: 10,
    fontFamily: "TimesNewRoman",
    marginBottom: 2,
  },
  urduText: {
    fontFamily: "TimesNewRoman",
    fontSize: 16,
    direction: "rtl",
    textAlign: "right",
    lineHeight: 1.5,
  },
  urduSectionHeader: {
    fontFamily: "TimesNewRoman",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    direction: "rtl",
  },
  urduSectionHeaderType: {
    fontFamily: "TimesNewRoman",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    direction: "rtl",
  },
  urduInstruction: {
    fontFamily: "TimesNewRoman",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 6,
    direction: "rtl",
  },
  urduMarks: {
    fontFamily: "TimesNewRoman",
    fontSize: 16,
    textAlign: "right",
    marginVertical: 2,
    direction: "rtl",
  },
  urduQuestion: {
    fontFamily: "TimesNewRoman",
    fontSize: 15,
    textAlign: "right",
    marginVertical: 4,
    direction: "rtl",
  },
  urduChoice: {
    fontFamily: "TimesNewRoman",
    fontSize: 14,
    textAlign: "right",
    marginVertical: 2,
    direction: "rtl",
  },
  rtlText: {
    fontFamily: "TimesNewRoman",
    direction: "rtl",
    textAlign: "right",
  },
  rtlQuestion: {
    fontFamily: "TimesNewRoman",
    fontSize: 15,
    direction: "rtl",
    textAlign: "right",
    marginVertical: 4,
  },
})

// Function to transform textEditor HTML to paper-compatible HTML
const htmlChange = (html) => {
  if (!html) return ""

  const paperStyles = {
    fontSize: "14px",
    lineHeight: "1.4",
    marginBottom: "2px",
    color: "#1f2937",
    fontFamily: "TimesNewRoman",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    maxWidth: "100%",
    width: "100%",
  }

  let transformedHtml = html

  transformedHtml = transformedHtml
    .replace(
      /<chemical-line[^>]*data-chemical-type="single"[^>]*>.*?<\/chemical-line>/gi,
      '<span style="font-family: TimesNewRoman; font-size: 14px; margin: 0 4px; display: inline-block;">→</span>',
    )
    .replace(
      /<chemical-reversible[^>]*>.*?<\/chemical-reversible>/gi,
      '<span style="font-family: TimesNewRoman; font-size: 14px; margin: 0 4px; display: inline-block;">⇌</span>',
    )

  transformedHtml = transformedHtml
    .replace(
      /<span[^>]*style="[^"]*font-family:[^;]*TimesNewRoman[^;]*;[^"]*"[^>]*>/g,
      `<span style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color};">`,
    )
    .replace(
      /<p([^>]*)>/g,
      `<p$1 style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color}; max-width: 100%; margin-bottom: 4px;">`,
    )
    .replace(
      /<div([^>]*)>/g,
      `<div$1 style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color}; max-width: 100%; width: 100%;">`,
    )
    .replace(
      /<ol[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paperStyles.lineHeight}; font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; color: ${paperStyles.color}; max-width: 100%;">`,
    )
    .replace(
      /<ul[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ul style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paperStyles.lineHeight}; font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; color: ${paperStyles.color}; maxWidth: 100%;">`,
    )
    .replace(
      /<li[^>]*style="[^"]*margin-bottom:[^;]*3px[^;]*;[^"]*"[^>]*>/g,
      `<li style="margin-bottom: 2px; line-height: ${paperStyles.lineHeight}; max-width: 100%;">`,
    )
    .replace(
      /<h1[^>]*style="[^"]*font-size:[^;]*27px[^;]*;[^"]*"[^>]*>/g,
      `<h1 style="font-family: ${paperStyles.fontFamily}; font-size: 22px; font-weight: bold; margin-top: 0px; margin-bottom: ${paperStyles.marginBottom}; line-height: 1.2; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`,
    )
    .replace(
      /<h2[^>]*style="[^"]*font-size:[^;]*22\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h2 style="font-family: ${paperStyles.fontFamily}; font-size: 18px; font-weight: bold; margin-top: 0px; margin-bottom: ${paperStyles.marginBottom}; line-height: 1.2; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`,
    )
    .replace(
      /<h3[^>]*style="[^"]*font-size:[^;]*19\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h3 style="font-family: ${paperStyles.fontFamily}; font-size: 16px; font-weight: bold; margin-top: 0px; margin-bottom: ${paperStyles.marginBottom}; line-height: 1.2; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`,
    )
    .replace(/font-family:\s*'TimesNewRoman'/g, "font-family: TimesNewRoman")
    .replace(/font-family:\s*"TimesNewRoman"/g, "font-family: TimesNewRoman")
    // Strip unsupported CSS props if they slipped in
    .replace(/(?:overflow-wrap|word-wrap|word-break)\s*:\s*[^;]+;?/gi, "")
    .replace(/margin:\s*([^;]+);/g, (match, values) => {
      const parts = values.trim().split(/\s+/)
      if (parts.length === 4) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[2]}; margin-left: ${parts[3]};`
      } else if (parts.length === 3) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[2]}; margin-left: ${parts[1]};`
      } else if (parts.length === 2) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[0]}; margin-left: ${parts[1]};`
      } else if (parts.length === 1) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[0]}; margin-bottom: ${parts[0]}; margin-left: ${parts[0]};`
      }
      return match
    })
    .replace(/padding:\s*([^;]+);/g, (match, values) => {
      const parts = values.trim().split(/\s+/)
      if (parts.length === 4) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[2]}; padding-left: ${parts[3]};`
      } else if (parts.length === 3) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[2]}; padding-left: ${parts[1]};`
      } else if (parts.length === 2) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[0]}; padding-left: ${parts[1]};`
      } else if (parts.length === 1) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[0]}; padding-bottom: ${parts[0]}; padding-left: ${parts[0]};`
      }
      return match
    })
    .replace(/text-decoration-thickness:\s*[^;]+;/g, "")
    .replace(/text-decoration-line:\s*[^;]+;/g, "")
    .replace(/data-[^=]*="[^"]*"/g, "")
    .replace(/contenteditable="[^"]*"/g, "")
    .replace(/<\/?\s*chemical-[^>]*>/gi, "")

  // Remove empty tags that can produce invalid text runs in react-pdf-html
  transformedHtml = transformedHtml
    .replace(/<span[^>]*>\s*(?:&nbsp;)?\s*<\/span>/gi, "")
    .replace(/<b[^>]*>\s*(?:&nbsp;)?\s*<\/b>/gi, "")
    .replace(/<i[^>]*>\s*(?:&nbsp;)?\s*<\/i>/gi, "")
    .replace(/<u[^>]*>\s*(?:&nbsp;)?\s*<\/u>/gi, "")
    .replace(/<div[^>]*>\s*(?:&nbsp;)?\s*<\/div>/gi, "")
    .replace(/<p[^>]*>\s*(?:&nbsp;)?\s*<\/p>/gi, "")

  const safe = (transformedHtml || "").trim()
  return safe.length > 0 ? safe : " "
}

// Avoid feeding empty HTML to react-pdf-html to prevent layout crashes
const isEmptyHtmlString = (html) => {
  if (!html) return true
  const text = String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim()
  return text.length === 0
}

const RenderHtmlSafe = ({ children, html, style }) => {
  const content = typeof html === 'string' ? html : (typeof children === 'string' ? children : '')
  if (isEmptyHtmlString(content)) {
    return null
  }
  return <Html style={style}>{content}</Html>
}

function formatTimeRange(startTime, durationHours) {
  if (!startTime || !durationHours) return ""
  const parts = startTime.split(":")
  let hour = Number.parseInt(parts[0], 10)
  let minute = parts.length > 1 ? Number.parseInt(parts[1], 10) : 0
  if (isNaN(hour)) hour = 0
  if (isNaN(minute)) minute = 0
  if (hour >= 24) hour -= 24
  const start = new Date(2000, 0, 1, hour, minute, 0)
  const end = new Date(start)
  end.setHours(start.getHours() + Number(durationHours))
  const format = (date) => {
    let h = date.getHours()
    const m = date.getMinutes().toString().padStart(2, "0")
    const ampm = h >= 12 ? "PM" : "AM"
    h = h % 12 || 12
    return `${h}:${m} ${ampm}`
  }
  return `${format(start)} - ${format(end)}`
}

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
  return romanNumerals[num - 1] || num
}

function toUrduRoman(num) {
  // Keep Urdu layout (RTL) but use ASCII-safe numbering to ensure glyphs exist.
  // Using the same roman style as English avoids glyph-missing crashes.
  return toRoman(num)
}

const PaperHeader = ({ BasicInfo, styles, isUrdu }) => (
  <View style={styles.header} fixed>
    <Text style={isUrdu ? [styles.instituteName, styles.rtlText] : styles.instituteName}>{BasicInfo.header}</Text>
    <View style={styles.examDetailsRow}>
      <View style={styles.leftDetails}>
        <Text style={isUrdu ? [styles.detailText, styles.rtlText] : styles.detailText}>
          {isUrdu ? "تاریخ:" : "Date:"} {BasicInfo.date}
        </Text>
        <Text style={isUrdu ? [styles.detailText, styles.rtlText] : styles.detailText}>
          {isUrdu ? "وقت:" : "Time:"} {formatTimeRange(BasicInfo.time, BasicInfo.duration)}
        </Text>
      </View>
      <View style={styles.centerDetails}>
        <Text style={isUrdu ? [styles.examTitle, styles.rtlText] : styles.examTitle}>
          {BasicInfo.examination} {isUrdu ? "امتحان," : "EXAMINATION,"} {BasicInfo.ExaminationYear}
        </Text>
        <Text style={isUrdu ? [styles.examTitle, styles.rtlText] : styles.examTitle}>
          {BasicInfo.subject} - {BasicInfo.class} ({BasicInfo.center})
        </Text>
      </View>
      <View style={styles.rightDetails}>
        <Text style={isUrdu ? [styles.detailText, styles.rtlText] : styles.detailText}>
          {isUrdu ? "زیادہ سے زیادہ نمبر:" : "Max. Marks:"} {BasicInfo.marks}
        </Text>
      </View>
    </View>
  </View>
)

const MCQ = ({ htmlString, choices, index, answer, imageUrl, isUrdu }) => {
  const transformedHtml = htmlChange(htmlString)
  const transformedChoices = (choices || []).map((choice) => htmlChange(choice || ""))
  const transformedAnswer = htmlChange(answer || "")

  return (
    <View style={{ marginBottom: 10, direction: isUrdu ? 'rtl' : 'ltr' }}>
      <View style={{ 
        flexDirection: isUrdu ? 'row-reverse' : 'row', 
        marginBottom: 8,
        justifyContent: isUrdu ? 'flex-end' : 'flex-start',
        textAlign: isUrdu ? 'right' : 'left'
      }}>
        <Text style={isUrdu ? styles.rtlQuestion : { 
          fontFamily: "TimesNewRoman", 
          marginRight: isUrdu ? 0 : 8,
          marginLeft: isUrdu ? 8 : 0,
          fontSize: 15, 
          minWidth: 20 
        }}>
          {isUrdu ? `${toUrduRoman(index)}.` : `${toRoman(index)}.`}
        </Text>
        <View style={{ flex: 1 }}>
          <RenderHtmlSafe html={transformedHtml} />
          {imageUrl && (
            <Image 
              src={imageUrl} 
              style={styles.questionImage}
            />
          )}
        </View>
      </View>

      <View style={{ 
        flexDirection: isUrdu ? 'row-reverse' : 'row', 
        justifyContent: isUrdu ? 'flex-end' : 'flex-start', 
        paddingLeft: isUrdu ? 0 : 28,
        paddingRight: isUrdu ? 28 : 0,
        textAlign: isUrdu ? 'right' : 'left'
      }}>
        <View style={{ width: '45%', direction: isUrdu ? 'rtl' : 'ltr' }}>
          <View style={{ flexDirection: isUrdu ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 4 }}>
            <Text style={{ 
              fontFamily: "TimesNewRoman",
              fontSize: 15,
              marginLeft: isUrdu ? 4 : 0,
              marginRight: isUrdu ? 0 : 4
            }}>•</Text>
            {transformedChoices[0] && (
              <View style={{ flex: 1 }}>
                <RenderHtmlSafe html={transformedChoices[0]} />
              </View>
            )}
          </View>
          <View style={{ flexDirection: isUrdu ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 4 }}>
            <Text style={{ 
              fontFamily: "TimesNewRoman",
              fontSize: 15,
              marginLeft: isUrdu ? 4 : 0,
              marginRight: isUrdu ? 0 : 4
            }}>•</Text>
            {transformedChoices[1] && (
              <View style={{ flex: 1 }}>
                <RenderHtmlSafe html={transformedChoices[1]} />
              </View>
            )}
          </View>
        </View>
        <View style={{ width: '45%', direction: isUrdu ? 'rtl' : 'ltr' }}>
          <View style={{ flexDirection: isUrdu ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 4 }}>
            <Text style={{ 
              fontFamily: "TimesNewRoman",
              fontSize: 15,
              marginLeft: isUrdu ? 4 : 0,
              marginRight: isUrdu ? 0 : 4
            }}>•</Text>
            {transformedChoices[2] && (
              <View style={{ flex: 1 }}>
                <RenderHtmlSafe html={transformedChoices[2]} />
              </View>
            )}
          </View>
          <View style={{ flexDirection: isUrdu ? 'row-reverse' : 'row', alignItems: 'flex-start', marginBottom: 4 }}>
            <Text style={{ 
              fontFamily: "TimesNewRoman",
              fontSize: 15,
              marginLeft: isUrdu ? 4 : 0,
              marginRight: isUrdu ? 0 : 4
            }}>•</Text>
            {transformedChoices[3] && (
              <View style={{ flex: 1 }}>
                <RenderHtmlSafe html={transformedChoices[3]} />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Answer block - label on the right side in Urdu */}
      <View
        style={{
          flexDirection: isUrdu ? 'row-reverse' : 'row',
          justifyContent: isUrdu ? 'flex-start' : 'flex-start',
          marginTop: 10,
          backgroundColor: '#f0f9ff',
          padding: 8,
          borderRadius: 4,
          alignItems: 'flex-start'
        }}
      >
        {transformedAnswer && (isUrdu ? (
          <>
            <Text style={[styles.rtlText, { fontSize: 14, color: 'green', fontWeight: 'bold', marginLeft: 8 }]}>جواب:</Text>
            <RenderHtmlSafe style={{ fontFamily: 'TimesNewRoman', textAlign: 'right', direction: 'rtl', color: 'green', fontWeight: 'bold' }} html={transformedAnswer} />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 14, fontFamily: 'TimesNewRoman', color: 'green', fontWeight: 'bold', marginRight: 8 }}>Answer:</Text>
            <RenderHtmlSafe style={{ fontSize: 14, fontFamily: 'TimesNewRoman', color: 'green', fontWeight: 'bold' }} html={transformedAnswer} />
          </>
        ))}
      </View>
    </View>
  )
}

const PaperKeyPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section, isUrdu, loading }) => {
  const safeInfo = BasicInfo || {}
  const isUrduFlag = (typeof isUrdu === 'boolean') ? isUrdu : (safeInfo?.medium === 'Urdu')
  const questionsArr = Array.isArray(htmlQuestions) ? htmlQuestions : []
  const mcqArr = Array.isArray(htmlMCQ) ? htmlMCQ : []
  const sections = Array.isArray(section) ? section : []
  if (loading) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>{isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}</Text>
        </Page>
      </Document>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PaperHeader BasicInfo={safeInfo} styles={styles} isUrdu={isUrduFlag} />
        {sections.map((sec, secIndex) => {
          let questionCounter = 1

          for (let i = 0; i < secIndex; i++) {
            const prevSection = sections[i]
            const prevQuestions = questionsArr.filter((q) => q.section === prevSection.name)
            const prevMCQs = mcqArr.filter((q) => q.section === prevSection.name)
            if (prevSection.type.toLowerCase() === "descriptive questions") {
              questionCounter += prevQuestions.length
            } else {
              questionCounter += 1
            }
          }

          const questionsInSection = questionsArr.filter((q) => q.section === sec.name)
          const mcqsInSection = mcqArr.filter((q) => q.section === sec.name)
          const firstRegularQuestion = questionsInSection[0]
          const firstMCQ = mcqsInSection[0]
          const hasFirstQuestion = firstRegularQuestion || firstMCQ
          const isDescriptiveSection = sec.type.toLowerCase() === "descriptive questions"

          return (
            <View key={secIndex} style={[styles.sectionContainer, { direction: isUrduFlag ? 'rtl' : 'ltr' }]}>
              {hasFirstQuestion ? (
                <View style={styles.sectionWithFirstQuestion}>
                  <View style={styles.sectionHeaderContainer}>
                    <View style={styles.sectionNameWrapper}>
                      <Text style={isUrduFlag ? [styles.sectionHeader, styles.rtlText] : styles.sectionHeader}>
                        {sec.name}
                      </Text>
                      <Text style={isUrduFlag ? [styles.sectionHeaderType, styles.rtlText] : styles.sectionHeaderType}>
                        ({isUrduFlag ? sec.displayType : sec.type})
                      </Text>
                    </View>
                  </View>

                  <View
                    style={isUrduFlag ? [styles.noteContainer, { flexDirection: "row-reverse" }] : styles.noteContainer}
                  >
                    {isDescriptiveSection ? (
                      <>
                        {isUrduFlag && (
                          <Text style={[styles.sectionMarks, styles.rtlText]}>
                            {"   کل نشانات : (" + sec.marks + ")"}
                          </Text>
                        )}
                        <Text style={isUrduFlag ? [styles.normalNote, styles.rtlText] : styles.normalNote}>
                          {isUrduFlag ? "نوٹ: " : "NOTE:"} {sec.description}
                        </Text>
                        {!isUrduFlag && (
                          <Text style={styles.sectionMarks}>
                            ({sec.marks} {isUrduFlag ? "نمبر" : "Marks"})
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        {isUrduFlag && (
                          <Text style={[styles.sectionMarks, styles.rtlText]}>
                            {"   کل نشانات : (" + sec.marks + ")"}
                          </Text>
                        )}
                        <Text style={isUrduFlag ? [styles.normalNote, styles.rtlText] : styles.noteAsQuestion}>
                          {isUrduFlag
                            ? `سوال نمبر ${questionCounter}. ${sec.description}`
                            : `Q${questionCounter}. ${sec.description}`}
                        </Text>
                        {!isUrduFlag && (
                          <Text style={styles.sectionMarks}>
                            ({sec.marks} {isUrduFlag ? "نمبر" : "Marks"})
                          </Text>
                        )}
                      </>
                    )}
                  </View>

                  {firstRegularQuestion && (
                    <View style={styles.questionContainer}>
                      <View style={isDescriptiveSection ? styles.descriptiveQuestion : styles.question}>
                        <View
                          style={{
                            flexDirection: isUrdu ? "row-reverse" : "row",
                            marginBottom: 5,
                            justifyContent: isUrdu ? "flex-end" : "flex-start",
                            direction: isUrdu ? "rtl" : "ltr",
                          }}
                        >
                          <Text
                            style={
                              isUrduFlag
                                ? styles.rtlQuestion
                                : { fontFamily: "TimesNewRoman", marginRight: 8, fontSize: 15, minWidth: 20 }
                            }
                          >
                            {isDescriptiveSection
                              ? isUrduFlag
                                ? `سوال${questionCounter}.`
                                : `Q${questionCounter}.`
                              : isUrduFlag
                                ? `${toUrduRoman(1)}.`
                                : `${toRoman(1)}.`}
                          </Text>
                          <View style={{ flex: 1 }}>
                            <RenderHtmlSafe
                              style={
                                isUrduFlag
                                  ? { width: "70%", textAlign: "right", direction: "rtl", fontFamily: "TimesNewRoman" }
                                  : { width: "70%" }
                              }
                              html={htmlChange(firstRegularQuestion.name)}
                            />
                            {firstRegularQuestion.image && (
                              <Image
                                src={firstRegularQuestion.image || "/placeholder.svg"}
                                style={styles.questionImage}
                              />
                            )}
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: isUrdu ? "flex-end" : "flex-start",
                            marginTop: 5,
                            backgroundColor: "#f0f9ff",
                            padding: 8,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={
                            isUrduFlag
                                ? [styles.rtlText, { fontSize: 14, color: "green", fontWeight: "bold", marginLeft: 8 }]
                                : {
                                    fontSize: 14,
                                    fontFamily: "TimesNewRoman",
                                    color: "green",
                                    fontWeight: "bold",
                                    marginRight: 8,
                                  }
                            }
                          >
                            {isUrdu ? "جواب:" : "Answer:"}
                          </Text>
                          <RenderHtmlSafe
                            style={
                              isUrduFlag
                                ? {
                                    fontFamily: "TimesNewRoman",
                                    textAlign: "right",
                                    direction: "rtl",
                                    color: "green",
                                    fontWeight: "bold",
                                  }
                                : { fontSize: 14, fontFamily: "TimesNewRoman", color: "green", fontWeight: "bold" }
                            }
                            html={htmlChange(firstRegularQuestion.original_answer)}
                          />
                        </View>

                        {htmlChange(firstRegularQuestion.answer) && (
                          <Image src={firstRegularQuestion.answer || "/placeholder.svg"} style={styles.questionImage} />
                        )}
                      </View>
                    </View>
                  )}

                  {!firstRegularQuestion && firstMCQ && (
                    <MCQ
                      index={1}
                      htmlString={firstMCQ.name}
                      choices={[firstMCQ.choice1, firstMCQ.choice2, firstMCQ.choice3, firstMCQ.choice4]}
                      answer={firstMCQ.answer}
                      imageUrl={firstMCQ.image}
                      isUrdu={isUrdu}
                    />
                  )}
                </View>
              ) : (
                <>
                    <View style={styles.sectionHeaderContainer}>
                    <View style={styles.sectionNameWrapper}>
                      <Text style={isUrduFlag ? [styles.sectionHeader, styles.rtlText] : styles.sectionHeader}>
                        {sec.name}
                      </Text>
                      <Text style={isUrduFlag ? [styles.sectionHeaderType, styles.rtlText] : styles.sectionHeaderType}>
                        ({isUrduFlag ? sec.displayType : sec.type})
                      </Text>
                    </View>
                  </View>

                  <View
                    style={isUrduFlag ? [styles.noteContainer, { flexDirection: "row-reverse" }] : styles.noteContainer}
                  >
                    {isDescriptiveSection ? (
                      <>
                        {isUrduFlag && (
                          <Text style={[styles.sectionMarks, styles.rtlText]}>
                            {"   کل نشانات : (" + sec.marks + ")"}
                          </Text>
                        )}
                        <Text style={isUrduFlag ? [styles.normalNote, styles.rtlText] : styles.normalNote}>
                          {isUrduFlag ? "نوٹ: " : "NOTE:"} {sec.description}
                        </Text>
                        {!isUrduFlag && (
                          <Text style={styles.sectionMarks}>
                            ({sec.marks} {isUrduFlag ? "نمبر" : "Marks"})
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        {isUrduFlag && (
                          <Text style={[styles.sectionMarks, styles.rtlText]}>
                            {"   کل نشانات : (" + sec.marks + ")"}
                          </Text>
                        )}
                        <Text style={isUrduFlag ? [styles.normalNote, styles.rtlText] : styles.noteAsQuestion}>
                          {isUrduFlag
                            ? `سوال نمبر ${questionCounter}. ${sec.description}`
                            : `Q${questionCounter}. ${sec.description}`}
                        </Text>
                        {!isUrduFlag && (
                          <Text style={styles.sectionMarks}>
                            ({sec.marks} {isUrduFlag ? "نمبر" : "Marks"})
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                </>
              )}

              {questionsInSection.slice(1).map((q, idx) => {
                const currentQuestionNumber = isDescriptiveSection ? questionCounter + idx + 1 : questionCounter
                return (
                  <View key={idx} style={styles.regularQuestionContainer}>
                    <View style={isDescriptiveSection ? styles.descriptiveQuestion : styles.question}>
                      <View
                        style={{
                          flexDirection: isUrduFlag ? "row-reverse" : "row",
                          marginBottom: 5,
                          justifyContent: isUrduFlag ? "flex-end" : "flex-start",
                          direction: isUrduFlag ? "rtl" : "ltr",
                        }}
                      >
                        <Text
                          style={
                            isUrduFlag
                              ? styles.rtlQuestion
                              : { fontFamily: "TimesNewRoman", marginRight: 8, fontSize: 15, minWidth: 20 }
                          }
                        >
                          {isDescriptiveSection
                            ? isUrduFlag
                              ? `سوال${currentQuestionNumber}.`
                              : `Q${currentQuestionNumber}.`
                            : isUrduFlag
                              ? `${toUrduRoman(idx + 2)}.`
                              : `${toRoman(idx + 2)}.`}
                        </Text>
                        <View style={{ flex: 1 }}>
                          <RenderHtmlSafe
                            style={
                              isUrduFlag ? { textAlign: "right", direction: "rtl", fontFamily: "TimesNewRoman" } : undefined
                            }
                            html={htmlChange(q.name)}
                          />
                          {q.image && <Image src={q.image || "/placeholder.svg"} style={styles.questionImage} />}
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: isUrduFlag ? "flex-end" : "flex-start",
                          marginTop: 5,
                          backgroundColor: "#f0f9ff",
                          padding: 8,
                          borderRadius: 4,
                        }}
                      >
                        <Text
                          style={
                            isUrduFlag
                              ? [styles.rtlText, { fontSize: 14, color: "green", fontWeight: "bold", marginLeft: 8 }]
                              : {
                                  fontSize: 14,
                                  fontFamily: "TimesNewRoman",
                                  color: "green",
                                  fontWeight: "bold",
                                  marginRight: 8,
                                }
                          }
                        >
                          {isUrdu ? "جواب:" : "Answer:"}
                        </Text>
                        <RenderHtmlSafe
                          style={
                            isUrduFlag
                              ? {
                                  fontFamily: "TimesNewRoman",
                                  textAlign: "right",
                                  direction: "rtl",
                                  color: "green",
                                  fontWeight: "bold",
                                  maxWidth: "450px",
                                  width: "100%",
                                }
                              : {
                                  fontSize: 14,
                                  fontFamily: "TimesNewRoman",
                                  color: "green",
                                  fontWeight: "bold",
                                  maxWidth: "450px",
                                  width: "100%",
                                }
                          }
                          html={htmlChange(q.original_answer)}
                        />
                      </View>

                      {q.answer && <Image src={q.answer || "/placeholder.svg"} style={styles.questionImage} />}
                    </View>
                  </View>
                )
              })}

              {mcqsInSection.slice(firstRegularQuestion ? 0 : 1).map((q, idx) => {
                const currentQuestionNumber = idx + 2
                return (
                  <View key={idx} style={styles.regularQuestionContainer}>
                    <MCQ
                      index={currentQuestionNumber}
                      htmlString={q.name}
                      choices={[q.choice1, q.choice2, q.choice3, q.choice4]}
                      answer={q.answer}
                      imageUrl={q.image}
                      isUrdu={isUrduFlag}
                    />
                  </View>
                )
              })}
            </View>
          )
        })}
      </Page>
    </Document>
  )
}

const PaperKey = ({ htmlContent, htmlQuestions, htmlMCQ, BasicInfo, section, loading }) => {
  if (loading) return null
  const info = BasicInfo || {}
  const isUrdu = info?.medium === "Urdu"
  console.log("BASICINFO", htmlContent, htmlQuestions, htmlMCQ, info, section)
  return (
    <PDFViewer showToolbar={false} style={{ width: "100%", height: "100vh", border: "none" }}>
      <PaperKeyPDF
        BasicInfo={info}
        htmlQuestions={Array.isArray(htmlQuestions) ? htmlQuestions : []}
        htmlMCQ={Array.isArray(htmlMCQ) ? htmlMCQ : []}
        section={Array.isArray(section) ? section : []}
        isUrdu={isUrdu}
        loading={loading}
      />
    </PDFViewer>
  )
}

export { PaperKeyPDF, htmlChange }
export default PaperKey
