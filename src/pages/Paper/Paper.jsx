import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { Loader } from '../../components/sectionHandler/sectionHandler';
import { Font } from '@react-pdf/renderer';

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
    fontWeight: 'bold',
    marginBottom: 2,
  },
  examTitle: {
    fontSize: 12,
    fontFamily: 'TimesNewRoman',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    textTransform: 'uppercase'
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
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: 16,
    textDecorationThickness: 10,
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
  urduSectionHeader: {
    fontFamily: 'TimesNewRoman',
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
  noteContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urduNoteContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteAsQuestion: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 'bold',
    flex: 5
  },
  urduNoteAsQuestion: {
    fontFamily: 'TimesNewRoman',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 5,
    direction: 'rtl',
    textAlign: 'right',
  },
  normalNote: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 5
  },
  urduNormalNote: {
    fontFamily: 'TimesNewRoman',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 5,
    direction: 'rtl',
    textAlign: 'right',
  },
  sectionMarks: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1
  },
  urduSectionMarks: {
    fontFamily: 'TimesNewRoman',
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 10,
    flex: 1,
    direction: 'rtl',
    textAlign: 'left',
    writingDirection: 'rtl',
  },
  question: {
    marginBottom: 5,
    fontSize: 20,
  },
  descriptiveQuestion: {
    marginBottom: 5,
    fontSize: 12,
  },
  choice: {
    marginLeft: 10,
    fontSize: 15,
  },
  questionImage: {
      width: '400px',
      marginTop: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block'
  },
  urduText: {
    fontFamily: 'TimesNewRoman',
    fontSize: 16,
    direction: 'rtl',
    textAlign: 'right',
    lineHeight: 1.5,
  },
  urduQuestion: {
    fontFamily: 'TimesNewRoman',
    fontSize: 15,
    textAlign: 'right',
    marginVertical: 4,
    direction: 'rtl',
  },
  urduChoice: {
    fontFamily: 'TimesNewRoman',
    fontSize: 14,
    textAlign: 'right',
    marginVertical: 2,
    direction: 'rtl',
  }
});

// Function to transform textEditor HTML to paper-compatible HTML
const htmlChange = (html) => {
  if (!html) return '';
  
  // Paper-specific styling (different from textEditor)
  const paperStyles = {
    fontSize: '14px',
    lineHeight: '1',
    marginBottom: '2px', // Different from textEditor's 8px
    color: '#1f2937',
    fontFamily: 'TimesNewRoman'
  };

  let transformedHtml = html;

  // Transform textEditor styles to paper styles
  transformedHtml = transformedHtml
    // Convert divs (from textEditor paragraphs) with paper-specific styles
    .replace(
      /<div[^>]*style="[^"]*font-family:[^;]*TimesNewRoman[^;]*;[^"]*"[^>]*>/g,
      `<div style="font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; margin: 2 0 ${paperStyles.marginBottom} 0; line-height: ${paperStyles.lineHeight}; color: ${paperStyles.color};">`
    )
    
    // Update list styles for paper
    .replace(
      /<ol[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paperStyles.lineHeight}; font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; color: ${paperStyles.color};">`
    )
    .replace(
      /<ul[^>]*style="[^"]*margin-top:[^;]*8px[^;]*;[^"]*"[^>]*>/g,
      `<ul style="margin-top: 4px; margin-bottom: 4px; padding-left: 10px; line-height: ${paperStyles.lineHeight}; font-family: ${paperStyles.fontFamily}; font-size: ${paperStyles.fontSize}; color: ${paperStyles.color};">`
    )
    .replace(
      /<li[^>]*style="[^"]*margin-bottom:[^;]*3px[^;]*;[^"]*"[^>]*>/g,
      `<li style="margin-bottom: 2px; line-height: ${paperStyles.lineHeight};">`
    )
    
    // Update heading styles for paper
    .replace(
      /<h1[^>]*style="[^"]*font-size:[^;]*27px[^;]*;[^"]*"[^>]*>/g,
      `<h1 style="font-family: ${paperStyles.fontFamily}; font-size: 22px; font-weight: bold; margin: 0 0 ${paperStyles.marginBottom} 0; line-height: 1.2; color: ${paperStyles.color};">`
    )
    .replace(
      /<h2[^>]*style="[^"]*font-size:[^;]*22\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h2 style="font-family: ${paperStyles.fontFamily}; font-size: 18px; font-weight: bold; margin: 0 0 ${paperStyles.marginBottom} 0; line-height: 1.2; color: ${paperStyles.color};">`
    )
    .replace(
      /<h3[^>]*style="[^"]*font-size:[^;]*19\.5px[^;]*;[^"]*"[^>]*>/g,
      `<h3 style="font-family: ${paperStyles.fontFamily}; font-size: 16px; font-weight: bold; margin: 0 0 ${paperStyles.marginBottom} 0; line-height: 1.2; color: ${paperStyles.color};">`
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
    .replace(/text-decoration-line:\s*[^;]+;/g, '');

  return transformedHtml;
};

const MCQComponent = ({ htmlString, choices, index, imageUrl, isUrdu }) => {
  const transformedHtml = htmlChange(htmlString);
  const transformedChoices = choices.map(choice => htmlChange(choice));

  return (
    <View style={{ marginBottom: 10, direction: isUrdu ? 'rtl' : 'ltr' }}>
      <View style={{ 
        flexDirection: isUrdu ? 'row-reverse' : 'row', 
        marginBottom: 8,
        justifyContent: isUrdu ? 'flex-end' : 'flex-start' 
      }}>
        <Text style={isUrdu ? styles.urduQuestion : { 
          fontFamily: "TimesNewRoman", 
          marginRight: isUrdu ? 0 : 8,
          marginLeft: isUrdu ? 8 : 0,
          fontSize: 15, 
          minWidth: 20 
        }}>
          {`${toRoman(index)}.`}
        </Text>
        <View style={{ flex: 1 }}>
          <Html>
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
        flexDirection: isUrdu ? 'row-reverse' : 'row', 
        justifyContent: isUrdu ? 'flex-end' : 'flex-start', 
        paddingLeft: isUrdu ? 0 : 28,
        paddingRight: isUrdu ? 28 : 0
      }}>
        <View style={{ width: '45%' }}>
          <Html>
            {`<div style="font-family: TimesNewRoman; font-size: 15px; margin-bottom: 3px;">• ${transformedChoices[0]}</div>`}
          </Html>
          <Html>
            {`<div style="font-family: TimesNewRoman; font-size: 15px; margin-bottom: 3px;">• ${transformedChoices[1]}</div>`}
          </Html>
        </View>
        <View style={{ width: '45%' }}>
          <Html>
            {`<div style="font-family: TimesNewRoman; font-size: 15px; margin-bottom: 3px;">• ${transformedChoices[2]}</div>`}
          </Html>
          <Html>
            {`<div style="font-family: TimesNewRoman; font-size: 15px; margin-bottom: 3px;">• ${transformedChoices[3]}</div>`}
          </Html>
        </View>
      </View>
    </View>
  );
};

function toRoman(num) {
  const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"];
  
  if (num <= 20) {
    return romanNumerals[num - 1];
  } else {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    
    if (tens === 2) {
      return ones === 0 ? "xx" : "xx" + romanNumerals[ones - 1];
    } else if (tens === 3) {
      return ones === 0 ? "xxx" : "xxx" + romanNumerals[ones - 1];
    } else if (tens === 4) {
      return ones === 0 ? "xl" : "xl" + romanNumerals[ones - 1];
    } else if (tens === 5) {
      return ones === 0 ? "l" : "l" + romanNumerals[ones - 1];
    }
    
    return romanNumerals[num - 1] || `${num}`;
  }
}

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

const PaperHeader = ({ BasicInfo }) => (
  <View style={styles.header} fixed>
    <Text style={styles.instituteName}>
      {BasicInfo.header}
    </Text>
    <View style={styles.examDetailsRow}>
      <View style={styles.leftDetails}>
        <Text style={styles.detailText}>
          Date: {BasicInfo.date}
        </Text>
        <Text style={styles.detailText}>
          Time: {formatTimeRange(BasicInfo.time, BasicInfo.duration)}
        </Text>
      </View>
      <View style={styles.centerDetails}>
        <Text style={styles.examTitle}>
          {BasicInfo.examination} EXAMINATION, {BasicInfo.ExaminationYear}
        </Text>
        <Text style={styles.examTitle}>
          {BasicInfo.subject} - {BasicInfo.class} ({BasicInfo.center})
        </Text>
      </View>
      <View style={styles.rightDetails}>
        <Text style={styles.detailText}>
          Max. Marks: {BasicInfo.marks}
        </Text>
      </View>
    </View>
  </View>
);

const PaperPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section, isUrdu }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PaperHeader BasicInfo={BasicInfo} />
        
        {section.map((sec, secIndex) => {
          let sectionQuestionNumber = 1;
          for (let i = 0; i < secIndex; i++) {
            const prevSection = section[i];
            if (prevSection.type.toLowerCase() === 'descriptive questions') {
              const prevQuestions = htmlQuestions.filter(q => q.section === prevSection.name).length;
              sectionQuestionNumber += prevQuestions;
            } else {
              sectionQuestionNumber += 1;
            }
          }

          return (
            <View key={secIndex} style={{ direction: isUrdu ? 'rtl' : 'ltr' }}>
              <View style={styles.sectionHeaderContainer}>
                <View style={styles.sectionNameWrapper}>
                  <Text style={isUrdu ? styles.urduSectionHeader : styles.sectionHeader}>
                    {sec.name}
                  </Text>
                  <Text style={isUrdu ? styles.urduSectionHeaderType : styles.sectionHeaderType}>
                    ({sec.displayType})
                  </Text>
                </View>
              </View>
              
              <View style={isUrdu ? styles.urduNoteContainer : styles.noteContainer}>
                {isUrdu ? (
                  <>
                    <Text style={styles.urduSectionMarks}>
                      {"   کل نشانات : ("+ sec.marks +")"}
                    </Text>
                    {sec.type.toLowerCase() === 'descriptive questions' ? (
                      <Text style={styles.urduNormalNote}>
                        نوٹ: {sec.description}
                      </Text>
                    ) : (
                      <Text style={styles.urduNoteAsQuestion}>
                        سوال نمبر {sectionQuestionNumber}. {sec.description}
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    {sec.type.toLowerCase() === 'descriptive questions' ? (
                      <Text style={styles.normalNote}>
                        NOTE: {sec.description}
                      </Text>
                    ) : (
                      <Text style={styles.noteAsQuestion}>
                        Q{sectionQuestionNumber}. {sec.description}
                      </Text>
                    )}
                    <Text style={styles.sectionMarks}>
                      ({sec.marks} Marks)
                    </Text>
                  </>
                )}
              </View>

              {htmlQuestions
                .filter(q => q.section === sec.name)
                .map((q, idx) => {
                  const isDescriptive = sec.type.toLowerCase() === 'descriptive questions';
                  const transformedHtml = htmlChange(q.name);
                  
                  return (
                    <View key={idx} style={isDescriptive ? styles.descriptiveQuestion : styles.question}>
                      <View style={{ 
                        flexDirection: isUrdu ? 'row-reverse' : 'row', 
                        marginBottom: 5,
                        justifyContent: isUrdu ? 'flex-end' : 'flex-start' 
                      }}>
                        <Text style={isUrdu ? styles.urduQuestion : { 
                          fontFamily: "TimesNewRoman",
                          marginRight: isUrdu ? 0 : 8,
                          marginLeft: isUrdu ? 8 : 0,
                          fontSize: 15, 
                          minWidth: 20 
                        }}>
                          {isDescriptive ? 
                            `Q${sectionQuestionNumber + idx}.`
                            : 
                            `${toRoman(idx + 1)}.`
                          }
                        </Text>
                        <View style={{ flex: 1 }}>
                          <Html>
                            {transformedHtml}
                          </Html>
                          {q.image && (
                            <Image 
                              src={q.image} 
                              style={styles.questionImage}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  );
                })}

              {htmlMCQ
                .filter(q => q.section === sec.name)
                .map((q, idx) => {
                  return (
                    <View key={idx}>
                      <MCQComponent 
                        index={idx + 1}
                        htmlString={q.name} 
                        choices={[q.choice1, q.choice2, q.choice3, q.choice4]}
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

const Paper = ({ BasicInfo, htmlQuestions, htmlMCQ, section, loading, webPreview }) => {
  if (loading) return <Loader />;
  const isUrdu = BasicInfo.medium === "Urdu";
  
  return (
    <PDFViewer showToolbar={false} style={{ width: '100%', height: '100vh', border: 'none' }}>
      <PaperPDF
        BasicInfo={BasicInfo}
        htmlQuestions={htmlQuestions}
        htmlMCQ={htmlMCQ}
        section={section}
        isUrdu={isUrdu}
      />
    </PDFViewer>
  );
};

export { PaperPDF, htmlChange };
export default Paper;