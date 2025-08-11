import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { Font } from '@react-pdf/renderer';
import { Loader } from '../../components/sectionHandler/sectionHandler';

// Register fonts
try {
  Font.register({
    family: 'TimesNewRoman',
    src: '/fonts/jameel-noori-nastaleeq-kasheeda.ttf',
  });
  console.log('Urdu font registered successfully');
} catch (err) {
  console.error('Failed to register Urdu font:', err);
}

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
    fontSize: 15,
    fontFamily: 'TimesNewRoman',
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
    textDecorationLine: 'underline',
    fontSize: 16,
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
  noteContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Updated styles for Urdu note container
  urduNoteContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteAsQuestion: {
    marginBottom: 8,
    fontSize: 12,
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
    flex: 1
  },
  urduSectionMarks: {
    fontFamily: 'TimesNewRoman',
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 10,
    flex: 1,
    direction: 'rtl',
    textAlign: 'left', // Align to left for marks position
    writingDirection: 'rtl',
  },
  question: {
    marginBottom: 5,
    fontSize: 12,
  },
  descriptiveQuestion: {
    marginBottom: 5,
    fontSize: 12,
  },
  choice: {
    marginLeft: 10,
    fontSize: 10,
  },
  questionImage: {
    width: 200,
    marginTop: 5,
    textAlign: 'center'
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

const MCQComponent = ({ htmlString, choices, index, imageUrl, isUrdu }) => {
  const parsedElements = parse(htmlString);
  const parsedChoices = choices.map(q => parse(q));

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
          fontSize: 12, 
          minWidth: 20 
        }}>
          {`${toRoman(index)}.`}
        </Text>
        <View style={{ flex: 1 }}>
          <Text style={isUrdu ? styles.urduQuestion : { 
            fontSize: 12, 
            fontFamily: "TimesNewRoman", 
            lineHeight: 1.3 
          }}>
            {parsedElements}
          </Text>
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
          <Text style={isUrdu ? styles.urduChoice : styles.choice}>• {parsedChoices[0]}</Text>
          <Text style={isUrdu ? styles.urduChoice : styles.choice}>• {parsedChoices[1]}</Text>
        </View>
        <View style={{ width: '45%' }}>
          <Text style={isUrdu ? styles.urduChoice : styles.choice}>• {parsedChoices[2]}</Text>
          <Text style={isUrdu ? styles.urduChoice : styles.choice}>• {parsedChoices[3]}</Text>
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
    // For numbers beyond 20, create roman numerals dynamically
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
    
    // Fallback for very large numbers
    return romanNumerals[num - 1] || `${num}`;
  }
}

function toUrduRoman(num) {
  const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"];
  // For numbers beyond 20, continue the pattern
  if (num <= 20) {
    return romanNumerals[num - 1];
  } else {
    // For larger numbers, create roman numerals dynamically
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    if (tens === 2) {
      return ones === 0 ? "xx" : "xx" + romanNumerals[ones - 1];
    } else if (tens === 3) {
      return ones === 0 ? "xxx" : "xxx" + romanNumerals[ones - 1];
    }
    // Add more cases as needed
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
          let questionCounter = 1;
          
          for (let i = 0; i < secIndex; i++) {
            const prevSection = section[i];
            const prevQuestions = htmlQuestions.filter(q => q.section === prevSection.name).length;
            const prevMCQs = htmlMCQ.filter(q => q.section === prevSection.name).length;
            
            if (prevSection.type.toLowerCase() === 'descriptive questions') {
              questionCounter += prevQuestions + prevMCQs;
            } else {
              questionCounter += prevQuestions + prevMCQs + 1;
            }
          }

          return (
            <View key={secIndex} style={{ direction: isUrdu ? 'rtl' : 'ltr' }}>
              <View style={styles.sectionHeaderContainer}>
                <View style={styles.sectionNameWrapper}>
                  <Text style={isUrdu ? styles.urduSectionHeader : styles.sectionHeader}>
                    {sec.name}
                  </Text>
                  <Text>
                    {console.log("Check check",sec)}
                    ({sec.displayType})
                  </Text>
                </View>
              </View>
              
              {/* Updated note container to swap positions for Urdu */}
              <View style={isUrdu ? styles.urduNoteContainer : styles.noteContainer}>
                {isUrdu ? (
                  // For Urdu: Marks on left, question text on right
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
                        سوال نمبر {questionCounter}. {sec.description}
                      </Text>
                    )}
                  </>
                ) : (
                  // For English: Question text on left, marks on right
                  <>
                    {sec.type.toLowerCase() === 'descriptive questions' ? (
                      <Text style={styles.normalNote}>
                        NOTE: {sec.description}
                      </Text>
                    ) : (
                      <Text style={styles.noteAsQuestion}>
                        Q{questionCounter}. {sec.description}
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
                  const currentQuestionNumber = questionCounter + idx;
                  
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
                          fontSize: 12, 
                          minWidth: 20 
                        }}>
                          {isDescriptive ? 
                            `Q${currentQuestionNumber}.`
                            : 
                            `${toRoman(idx + 1)}.`
                          }
                        </Text>
                        <View style={{ flex: 1 }}>
                          <Text style={isUrdu ? styles.urduQuestion : { 
                            fontSize: 12, 
                            fontFamily: "TimesNewRoman",
                            lineHeight: 1.3
                          }}>
                            {parse(q.name)}
                          </Text>
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
                  const questionsInThisSection = htmlQuestions.filter(quest => quest.section === sec.name).length;
                  const currentQuestionNumber = questionCounter + questionsInThisSection + idx;
                  
                  return (
                    <View key={idx}>
                      <MCQComponent 
                        index={currentQuestionNumber} 
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
  console.log("Paper component rendered with BasicInfo:", BasicInfo, htmlQuestions, htmlMCQ, section, loading, webPreview);
  if (loading) return <Loader />;
  const isUrdu = BasicInfo.medium === "Urdu";
  
  if (webPreview) {
    return <PaperWebPreview BasicInfo={BasicInfo} htmlQuestions={htmlQuestions} htmlMCQ={htmlMCQ} section={section} />;
  }
  
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

export { PaperPDF };
export default Paper;