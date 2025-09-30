import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { Loader } from '../../components/sectionHandler/sectionHandler';
import { Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'TimesNewRoman',
  fonts: [
    {
      src: 'https://db.onlinewebfonts.com/t/32441506567973bb1e65e8c3fbada474.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://db.onlinewebfonts.com/t/860c3ec7bbc5da3e97233ccecafe512e.ttf',
      fontWeight: 'bold',
    },
  ],
});

Font.register({
  family: 'JameelNooriNastaleeq',
  src: '/fonts/jameel-noori-nastaleeq-kasheeda/Jameel Noori Nastaleeq Kasheeda/Jameel Noori Nastaleeq Kasheeda.ttf'
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'TimesNewRoman',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
        paddingVertical: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
    },
    instituteName: {
        fontSize: 18,
        fontFamily: 'TimesNewRoman',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    examDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    leftDetails: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1.05,
    },
    centerDetails: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 2,
    },
    rightDetails: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        flex: 1,
    },
    detailText: {
        fontSize: 12,
        fontFamily: 'TimesNewRoman',
        marginBottom: 2,
        fontWeight: 'bold',
    },
    examTitle: {
        fontSize: 12,
        fontFamily: 'TimesNewRoman',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
        textTransform: 'uppercase'
    },
    sectionContainer: {
        marginBottom: 15,
    },
    sectionWithFirstQuestion: {
        wrap: false,
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    sectionNameWrapper: {
        flex: 5,
        textAlign: 'center',
    },
    sectionHeader: {
        paddingTop: 10,
        fontFamily: 'TimesNewRoman',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    sectionHeaderType: {
        paddingTop: 10,
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: 14,
        textDecorationThickness: 20,
        textAlign: 'center',
        textTransform: 'uppercase'
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
        fontFamily: 'TimesNewRoman',
    },
    noteContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteAsQuestion: {
        marginBottom: 8,
        fontSize: 13,
        fontFamily: 'TimesNewRoman',
        fontWeight: 'bold',
        flex: 5
    },
    sectionMarks: {
        marginBottom: 8,
        fontFamily: 'TimesNewRoman',
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1
    },
    normalNote: {
        marginBottom: 8,
        fontSize: 12,
        fontFamily: 'TimesNewRoman',
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 5
    },
    descriptiveQuestion: {
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'TimesNewRoman',
        display: "flex",
        flexDirection: "column"
    },
    choice: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: 'TimesNewRoman',
    },
    questionImage: {
        width: '400px',
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    debugText: {
        fontSize: 10,
        fontFamily: 'TimesNewRoman',
        marginBottom: 2,
    },
    urduText: {
        fontFamily: 'JameelNooriNastaleeq',
        fontSize: 16,
        direction: 'rtl',
        textAlign: 'right',
        lineHeight: 1.5,
    },
    urduSectionHeader: {
        fontFamily: 'JameelNooriNastaleeq',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
        direction: 'rtl',
    },
    urduSectionHeaderType: {
        fontFamily: 'TimesNewRoman',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
        direction: 'rtl',
    },
    urduInstruction: {
        fontFamily: 'JameelNooriNastaleeq',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 6,
        direction: 'rtl',
    },
    urduMarks: {
        fontFamily: 'JameelNooriNastaleeq',
        fontSize: 16,
        textAlign: 'right',
        marginVertical: 2,
        direction: 'rtl',
    },
    urduQuestion: {
        fontFamily: 'JameelNooriNastaleeq',
        fontSize: 15,
        textAlign: 'right',
        marginVertical: 4,
        direction: 'rtl',
    },
    urduChoice: {
        fontFamily: 'JameelNooriNastaleeq',
        fontSize: 14,
        textAlign: 'right',
        marginVertical: 2,
        direction: 'rtl',
    }
});

// Function to transform textEditor HTML to paper-compatible HTML
// Updated htmlChange function with better text wrapping
const htmlChange = (html) => {
  if (!html) return '';
  
  // Paper-specific styling with improved text wrapping
  const paperStyles = {
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '2px',
    color: '#1f2937',
    fontFamily: 'TimesNewRoman',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: '100%',
    width: '100%'
  };

  let transformedHtml = html;

  // Convert chemical elements to simple text arrows that will definitely render
  transformedHtml = transformedHtml
    .replace(
      /<chemical-line[^>]*data-chemical-type="single"[^>]*>.*?<\/chemical-line>/gi,
      '<span style="font-family: TimesNewRoman; font-size: 14px; margin: 0 4px; display: inline-block;">→</span>'
    )
    .replace(
      /<chemical-reversible[^>]*>.*?<\/chemical-reversible>/gi,
      '<span style="font-family: TimesNewRoman; font-size: 14px; margin: 0 4px; display: inline-block;">⇌</span>'
    );

  // Transform textEditor styles to paper styles with better wrapping
  transformedHtml = transformedHtml
    // In your htmlChange function, modify the span replacement:
    // In your htmlChange function, use this corrected span replacement:
    .replace(
    /<span[^>]*style="[^"]*font-family:[^;]*TimesNewRoman[^;]*;[^"]*"[^>]*>/g,
    // FIX: Re-added wrapping properties directly to the span, but without display:inline-block or width.
    // This explicitly tells the renderer to break long words within this specific span.
    `<span style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color}; overflow-wrap: break-word; word-wrap: break-word; word-break: break-all;">`
    )
    
    // Add wrapping to paragraphs and divs
    .replace(
      /<p([^>]*)>/g,
      `<p$1 style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; margin-bottom: 4px;">`
    )
    .replace(
      /<div([^>]*)>/g,
      `<div$1 style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%; width: 100%;">`
    )
    
    // Update list styles for paper with better wrapping
    .replace(
      /<ol[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paperStyles.lineHeight}; font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`
    )
    .replace(
      /<ul[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ul style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paperStyles.lineHeight}; font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`
    )
    .replace(
      /<li[^>]*style="[^"]*margin-bottom:[^;]*3px[^;]*;[^"]*"[^>]*>/g,
      `<li style="margin-bottom: 2px; line-height: ${paperStyles.lineHeight}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`
    )
    
    // Update heading styles for paper with better wrapping
    .replace(
      /<h1[^>]*style="[^"]*font-size:[^;]*27px[^;]*;[^"]*"[^>]*>/g,
      `<h1 style="font-family: ${paperStyles.fontFamily}; font-size: 22px; font-weight: bold; margin-top: 0px; margin-bottom: ${paperStyles.marginBottom}; line-height: 1.2; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`
    )
    .replace(
      /<h2[^>]*style="[^"]*font-size:[^;]*22\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h2 style="font-family: ${paperStyles.fontFamily}; font-size: 18px; font-weight: bold; margin-top: 0px; margin-bottom: ${paperStyles.marginBottom}; line-height: 1.2; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`
    )
    .replace(
      /<h3[^>]*style="[^"]*font-size:[^;]*19\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h3 style="font-family: ${paperStyles.fontFamily}; font-size: 16px; font-weight: bold; margin-top: 0px; margin-bottom: ${paperStyles.marginBottom}; line-height: 1.2; color: ${paperStyles.color}; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">`
    )
    
    // Remove quotes from font-family for react-pdf compatibility
    .replace(/font-family:\s*'TimesNewRoman'/g, 'font-family: TimesNewRoman')
    .replace(/font-family:\s*"TimesNewRoman"/g, 'font-family: TimesNewRoman')
    
    // Fix CSS shorthand for react-pdf
    .replace(/margin:\s*([^;]+);/g, (match, values) => {
      const parts = values.trim().split(/\s+/);
      if (parts.length === 4) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[2]}; margin-left: ${parts[3]};`;
      } else if (parts.length === 3) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[2]}; margin-left: ${parts[1]};`;
      } else if (parts.length === 2) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[1]}; margin-bottom: ${parts[0]}; margin-left: ${parts[1]};`;
      } else if (parts.length === 1) {
        return `margin-top: ${parts[0]}; margin-right: ${parts[0]}; margin-bottom: ${parts[0]}; margin-left: ${parts[0]};`;
      }
      return match;
    })
    .replace(/padding:\s*([^;]+);/g, (match, values) => {
      const parts = values.trim().split(/\s+/);
      if (parts.length === 4) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[2]}; padding-left: ${parts[3]};`;
      } else if (parts.length === 3) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[2]}; padding-left: ${parts[1]};`;
      } else if (parts.length === 2) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[1]}; padding-bottom: ${parts[0]}; padding-left: ${parts[1]};`;
      } else if (parts.length === 1) {
        return `padding-top: ${parts[0]}; padding-right: ${parts[0]}; padding-bottom: ${parts[0]}; padding-left: ${parts[0]};`;
      }
      return match;
    })
    
    // Remove unsupported CSS properties
    .replace(/text-decoration-thickness:\s*[^;]+;/g, '')
    .replace(/text-decoration-line:\s*[^;]+;/g, '')
    
    // Clean up any remaining custom elements or attributes
    .replace(/data-[^=]*="[^"]*"/g, '')
    .replace(/contenteditable="[^"]*"/g, '')
    .replace(/<\/?\s*chemical-[^>]*>/gi, '');

  return transformedHtml;
};

function formatTimeRange(startTime, durationHours) {
  if (!startTime || !durationHours) return "";
  const parts = startTime.split(":");
  let hour = parseInt(parts[0], 10);
  let minute = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  if (isNaN(hour)) hour = 0;
  if (isNaN(minute)) minute = 0;
  if (hour >= 24) hour -= 24;
  const start = new Date(2000, 0, 1, hour, minute, 0);
  const end = new Date(start);
  end.setHours(start.getHours() + Number(durationHours));
  const format = (date) => {
    let h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };
  return `${format(start)} - ${format(end)}`;
}

function toRoman(num) {
    const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"];
    return romanNumerals[num - 1] || num;
}

function toUrduRoman(num) {
    const urduRomans = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٤', '١٦', '١٧', '١٨', '١٩', '٢٠'];
    return urduRomans[num - 1] || num;
}

const PaperHeader = ({ BasicInfo, styles, isUrdu }) => (
  <View style={styles.header} fixed>
    <Text style={isUrdu ? [styles.instituteName, styles.urduText] : styles.instituteName}>
      {BasicInfo.header}
    </Text>
    <View style={styles.examDetailsRow}>
      <View style={styles.leftDetails}>
        <Text style={isUrdu ? [styles.detailText, styles.urduText] : styles.detailText}>
          {isUrdu ? 'تاریخ:' : 'Date:'} {BasicInfo.date}
        </Text>
        <Text style={isUrdu ? [styles.detailText, styles.urduText] : styles.detailText}>
          {isUrdu ? 'وقت:' : 'Time:'} {formatTimeRange(BasicInfo.time, BasicInfo.duration)}
        </Text>
      </View>
      <View style={styles.centerDetails}>
        <Text style={isUrdu ? [styles.examTitle, styles.urduText] : styles.examTitle}>
          {BasicInfo.examination} {isUrdu ? 'امتحان,' : 'EXAMINATION,'} {BasicInfo.ExaminationYear}
        </Text>
        <Text style={isUrdu ? [styles.examTitle, styles.urduText] : styles.examTitle}>
          {BasicInfo.subject} - {BasicInfo.class} ({BasicInfo.center})
        </Text>
      </View>
      <View style={styles.rightDetails}>
        <Text style={isUrdu ? [styles.detailText, styles.urduText] : styles.detailText}>
          {isUrdu ? 'زیادہ سے زیادہ نمبر:' : 'Max. Marks:'} {BasicInfo.marks}
        </Text>
      </View>
    </View>
  </View>
);

const MCQ = ({ htmlString, choices, index, answer, imageUrl, isUrdu }) => {
    const transformedHtml = htmlChange(htmlString);
    const transformedChoices = choices.map(choice => htmlChange(choice));
    const transformedAnswer = htmlChange(answer);
    
    return (
        <View style={styles.questionContainer}>
            <View style={{ 
                flexDirection: 'row', 
                marginBottom: 8,
                justifyContent: isUrdu ? 'flex-end' : 'flex-start'
            }}>
                <Text style={isUrdu ? styles.urduQuestion : { 
                    fontFamily: "TimesNewRoman", 
                    marginRight: 8, 
                    fontSize: 15,
                    minWidth: 20
                }}>
                    {isUrdu ? `${toUrduRoman(index)}.` : `${toRoman(index)}.`}
                </Text>
                <View style={{ flex: 1 }}>
                    <Html
                    style ={{
                        width: '70%'
                    }}>
                        {transformedHtml}
                    </Html>
                    {imageUrl && (
                        <Image 
                            src={imageUrl} 
                            style={styles.questionImage}
                        />
                    )}
                </View>
            </View>

            <View style={{ 
                flexDirection: 'row', 
                justifyContent: isUrdu ? 'flex-end' : 'flex-start',
                paddingLeft: 28,
            }}>
                <View style={{ width: isUrdu ? '100%' : '45%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                        <Text style={{ 
                            fontSize: 15,
                            fontFamily: isUrdu ? "JameelNooriNastaleeq" : "TimesNewRoman",
                            marginRight: 8,
                            color: choices[0] === answer ? 'green' : 'black',
                            textDecorationLine: choices[0] === answer ? 'underline' : 'none',
                            fontWeight: choices[0] === answer ? 'bold' : 'normal',
                        }}>•</Text>
                        <Html style={{ 
                            fontSize: 15,
                            fontFamily: isUrdu ? "JameelNooriNastaleeq" : "TimesNewRoman",
                            color: choices[0] === answer ? 'green' : 'black',
                            textDecorationLine: choices[0] === answer ? 'underline' : 'none',
                            fontWeight: choices[0] === answer ? 'bold' : 'normal',
                        }}>
                            {transformedChoices[0]}
                        </Html>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                        <Text style={{ 
                            fontSize: 15,
                            fontFamily: isUrdu ? "JameelNooriNastaleeq" : "TimesNewRoman",
                            marginRight: 8,
                            color: choices[1] === answer ? 'green' : 'black',
                            textDecorationLine: choices[1] === answer ? 'underline' : 'none',
                            fontWeight: choices[1] === answer ? 'bold' : 'normal',
                        }}>•</Text>
                        <Html style={{ 
                            fontSize: 15,
                            fontFamily: isUrdu ? "JameelNooriNastaleeq" : "TimesNewRoman",
                            color: choices[1] === answer ? 'green' : 'black',
                            textDecorationLine: choices[1] === answer ? 'underline' : 'none',
                            fontWeight: choices[1] === answer ? 'bold' : 'normal',
                        }}>
                            {transformedChoices[1]}
                        </Html>
                    </View>
                </View>
                {!isUrdu && (
                    <View style={{ width: '45%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                            <Text style={{ 
                                fontSize: 15,
                                fontFamily: "TimesNewRoman",
                                marginRight: 8,
                                color: choices[2] === answer ? 'green' : 'black',
                                textDecorationLine: choices[2] === answer ? 'underline' : 'none',
                                fontWeight: choices[2] === answer ? 'bold' : 'normal',
                            }}>•</Text>
                            <Html style={{ 
                                fontSize: 15,
                                fontFamily: "TimesNewRoman",
                                color: choices[2] === answer ? 'green' : 'black',
                                textDecorationLine: choices[2] === answer ? 'underline' : 'none',
                                fontWeight: choices[2] === answer ? 'bold' : 'normal',
                            }}>
                                {transformedChoices[2]}
                            </Html>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
                            <Text style={{ 
                                fontSize: 15,
                                fontFamily: "TimesNewRoman",
                                marginRight: 8,
                                color: choices[3] === answer ? 'green' : 'black',
                                textDecorationLine: choices[3] === answer ? 'underline' : 'none',
                                fontWeight: choices[3] === answer ? 'bold' : 'normal',
                            }}>•</Text>
                            <Html style={{ 
                                fontSize: 15,
                                fontFamily: "TimesNewRoman",
                                color: choices[3] === answer ? 'green' : 'black',
                                textDecorationLine: choices[3] === answer ? 'underline' : 'none',
                                fontWeight: choices[3] === answer ? 'bold' : 'normal',
                            }}>
                                {transformedChoices[3]}
                            </Html>
                        </View>
                    </View>
                )}
            </View>

            <View style={{ 
                flexDirection: 'row',
                justifyContent: isUrdu ? 'flex-end' : 'flex-start',
                marginTop: 10,
                backgroundColor: '#f0f9ff',
                padding: 8,
                borderRadius: 4
            }}>
                <Text style={isUrdu ? styles.urduQuestion : { 
                    fontSize: 14, 
                    fontFamily: "TimesNewRoman",
                    color: 'green',
                    fontWeight: 'bold',
                    marginRight: 8
                }}>
                    {isUrdu ? 'جواب:' : 'Answer:'}
                </Text>
                <Html style={isUrdu ? styles.urduQuestion : { 
                    fontSize: 14, 
                    fontFamily: "TimesNewRoman",
                    color: 'green',
                    fontWeight: 'bold'
                }}>
                    {transformedAnswer}
                </Html>
            </View>
        </View>
    );
};

const PaperKeyPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section, isUrdu, loading }) => {
    if (loading) return <Loader />;
    const getUrduTextStyle = (defaultStyle) => (isUrdu ? [defaultStyle, styles.urduText] : defaultStyle);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <PaperHeader BasicInfo={BasicInfo} styles={styles} isUrdu={isUrdu} />
                {section.map((sec, secIndex) => {
                    let questionCounter = 1;
                    
                    // Calculate question numbering for current section
                    for (let i = 0; i < secIndex; i++) {
                        const prevSection = section[i];
                        const prevQuestions = htmlQuestions.filter(q => q.section === prevSection.name);
                        const prevMCQs = htmlMCQ.filter(q => q.section === prevSection.name);
                        
                        if (prevSection.type.toLowerCase() === 'descriptive questions') {
                            questionCounter += prevQuestions.length;
                        } else {
                            questionCounter += 1;
                        }
                    }

                    const questionsInSection = htmlQuestions.filter(q => q.section === sec.name);
                    const mcqsInSection = htmlMCQ.filter(q => q.section === sec.name);
                    const hasContent = questionsInSection.length > 0 || mcqsInSection.length > 0;
                    const firstRegularQuestion = questionsInSection[0];
                    const firstMCQ = mcqsInSection[0];
                    const hasFirstQuestion = firstRegularQuestion || firstMCQ;
                    const isDescriptiveSection = sec.type.toLowerCase() === 'descriptive questions';

                    return (
                        <View key={secIndex} style={styles.sectionContainer}>
                            {hasFirstQuestion ? (
                                <View style={styles.sectionWithFirstQuestion}>
                                    <View style={styles.sectionHeaderContainer}>
                                        <View style={styles.sectionNameWrapper}>
                                            <Text style={getUrduTextStyle(styles.sectionHeader)}>{sec.name}</Text>
                                            <Text style={getUrduTextStyle(styles.sectionHeaderType)}>({sec.type})</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.noteContainer}>
                                        {isDescriptiveSection ? (
                                            <Text style={getUrduTextStyle(styles.normalNote)}>
                                                {isUrdu ? 'نوٹ:' : 'NOTE:'} {sec.description}
                                            </Text>
                                        ) : (
                                            <Text style={getUrduTextStyle(styles.noteAsQuestion)}>
                                                {isUrdu ? 'سوال' : 'Q'}{questionCounter}. {sec.description}
                                            </Text>
                                        )}
                                        <Text style={isUrdu ? [styles.sectionMarks, styles.urduText] : styles.sectionMarks}>
                                            ({sec.marks} {isUrdu ? 'نمبر' : 'Marks'})
                                        </Text>
                                    </View>

                                    {firstRegularQuestion && (
                                        <View style={styles.questionContainer}>
                                            <View style={isDescriptiveSection ? styles.descriptiveQuestion : styles.question}>
                                                <View style={{ 
                                                    flexDirection: 'row', 
                                                    marginBottom: 5,
                                                    justifyContent: isUrdu ? 'flex-end' : 'flex-start'
                                                }}>
                                                    <Text style={isUrdu ? styles.urduQuestion : { 
                                                        fontFamily: "TimesNewRoman", 
                                                        marginRight: 8, 
                                                        fontSize: 15,
                                                        minWidth: 20
                                                    }}>
                                                        {isDescriptiveSection ? 
                                                            (isUrdu ? `سوال${questionCounter}.` : `Q${questionCounter}.`) 
                                                            : 
                                                            (isUrdu ? `${toUrduRoman(1)}.` : `${toRoman(1)}.`)
                                                        }
                                                    </Text>
                                                    <View style={{ flex: 1 }}>
                                                        <Html style ={{
                                                            width: '70%'
                                                        }}>
                                                            {htmlChange(firstRegularQuestion.name)}
                                                        </Html>
                                                        {firstRegularQuestion.image && (
                                                            <Image 
                                                                src={firstRegularQuestion.image} 
                                                                style={styles.questionImage}
                                                            />
                                                        )}
                                                    </View>
                                                </View>
                                                
                                                <View style={{ 
                                                    flexDirection: 'row',
                                                    justifyContent: isUrdu ? 'flex-end' : 'flex-start',
                                                    marginTop: 5,
                                                    backgroundColor: '#f0f9ff',
                                                    padding: 8,
                                                    borderRadius: 4
                                                }}>
                                                    <Text style={isUrdu ? styles.urduQuestion : { 
                                                        fontSize: 14, 
                                                        fontFamily: "TimesNewRoman",
                                                        color: 'green',
                                                        fontWeight: 'bold',
                                                        marginRight: 8
                                                    }}>
                                                        {isUrdu ? 'جواب:' : 'Answer:'}
                                                    </Text>
                                                    <Html style={isUrdu ? styles.urduQuestion : { 
                                                        fontSize: 14, 
                                                        fontFamily: "TimesNewRoman",
                                                        color: 'green',
                                                        fontWeight: 'bold',
                                                        maxWidth: '450px',
                                                        width: '100%'  
                                                    }}>
                                                        {firstRegularQuestion.original_answer}
                                                    </Html>
                                                </View>
                                                
                                                {htmlChange(firstRegularQuestion.answer) && (
                                                    <Image 
                                                        src={firstRegularQuestion.answer} 
                                                        style={styles.questionImage}
                                                    />
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
                                            <Text style={getUrduTextStyle(styles.sectionHeader)}>{sec.name}</Text>
                                            <Text style={getUrduTextStyle(styles.sectionHeaderType)}>({sec.type})</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.noteContainer}>
                                        {isDescriptiveSection ? (
                                            <Text style={getUrduTextStyle(styles.normalNote)}>
                                                {isUrdu ? 'نوٹ:' : 'NOTE:'} {sec.description}
                                            </Text>
                                        ) : (
                                            <Text style={getUrduTextStyle(styles.noteAsQuestion)}>
                                                {isUrdu ? 'سوال' : 'Q'}{questionCounter}. {sec.description}
                                            </Text>
                                        )}
                                        <Text style={isUrdu ? [styles.sectionMarks, styles.urduText] : styles.sectionMarks}>
                                            ({sec.marks} {isUrdu ? 'نمبر' : 'Marks'})
                                        </Text>
                                    </View>
                                </>
                            )}

                            {questionsInSection.slice(1).map((q, idx) => {
                                const currentQuestionNumber = isDescriptiveSection ? questionCounter + idx + 1 : questionCounter;
                                return (
                                    <View key={idx} style={styles.regularQuestionContainer}>
                                        <View style={isDescriptiveSection ? styles.descriptiveQuestion : styles.question}>
                                            <View style={{ 
                                                flexDirection: 'row', 
                                                marginBottom: 5,
                                                justifyContent: isUrdu ? 'flex-end' : 'flex-start'
                                            }}>
                                                <Text style={isUrdu ? styles.urduQuestion : { 
                                                    fontFamily: "TimesNewRoman", 
                                                    marginRight: 8, 
                                                    fontSize: 15,
                                                    minWidth: 20
                                                }}>
                                                    {isDescriptiveSection ? 
                                                        (isUrdu ? `سوال${currentQuestionNumber}.` : `Q${currentQuestionNumber}.`) 
                                                        : 
                                                        (isUrdu ? `${toUrduRoman(idx + 2)}.` : `${toRoman(idx + 2)}.`)
                                                    }
                                                </Text>
                                                <View style={{ flex: 1 }}>
                                                    <Html>
                                                        {htmlChange(q.name)}
                                                    </Html>
                                                    {q.image && (
                                                        <Image 
                                                            src={q.image} 
                                                            style={styles.questionImage}
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                            
                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: isUrdu ? 'flex-end' : 'flex-start',
                                                marginTop: 5,
                                                backgroundColor: '#f0f9ff',
                                                padding: 8,
                                                borderRadius: 4
                                            }}>
                                                <Text style={isUrdu ? styles.urduQuestion : { 
                                                    fontSize: 14, 
                                                    fontFamily: "TimesNewRoman",
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                    marginRight: 8
                                                }}>
                                                    {isUrdu ? 'جواب:' : 'Answer:'}
                                                </Text>
                                                <Html style={isUrdu ? styles.urduQuestion : { 
                                                    fontSize: 14, 
                                                    fontFamily: "TimesNewRoman",
                                                    color: 'green',
                                                    fontWeight: 'bold',
                                                    maxWidth: '450px',
                                                    width: '100%'  
                                                }}>
                                                    {htmlChange(q.original_answer)}
                                                </Html>
                                            </View>
                                            
                                            {q.answer && (
                                                <Image 
                                                    src={q.answer} 
                                                    style={styles.questionImage}
                                                />
                                            )}
                                        </View>
                                    </View>
                                );
                            })}

                            {mcqsInSection.slice(firstRegularQuestion ? 0 : 1).map((q, idx) => {
                                const currentQuestionNumber = idx + 2;
                                return (
                                    <View key={idx} style={styles.regularQuestionContainer}>
                                        <MCQ 
                                            index={currentQuestionNumber}
                                            htmlString={q.name} 
                                            choices={[q.choice1, q.choice2, q.choice3, q.choice4]}
                                            answer={q.answer}
                                            imageUrl={q.image}
                                            isUrdu={isUrdu}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </Page>
        </Document>
    );
};

const PDFComponent = ({ htmlContent, htmlQuestions, htmlMCQ, BasicInfo, section, loading }) => {
    if (loading) return <Loader />;
    const isUrdu = BasicInfo.medium === "Urdu";
    
    return (
        <PDFViewer showToolbar={false} style={{ width: '100%', height: '100vh', border: 'none' }}>
            <PaperKeyPDF
                BasicInfo={BasicInfo}
                htmlQuestions={htmlQuestions}
                htmlMCQ={htmlMCQ}
                section={section}
                isUrdu={isUrdu}
                loading={loading}
            />
        </PDFViewer>
    );
};

export { PaperKeyPDF, htmlChange };
export default PDFComponent;