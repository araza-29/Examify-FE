import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { Font } from '@react-pdf/renderer';
import { Loader } from '../../components/sectionHandler/sectionHandler';

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
        textDecoration: 'underline',  // Use 'textDecoration' here too
        fontSize: 14,
        textDecorationThickness: 20,
        textAlign: 'center',
        textTransform: 'uppercase'
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
    // Urdu specific styles
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
    const urduRomans = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨', '١٩', '٢٠'];
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
    const parsedElements = parse(htmlString);
    const parsedChoices = choices.map(q => parse(q));
    console.log("Parsed Choices:", parsedChoices, answer);
    const getChoiceStyle = (choice) => ({
        fontSize: 15,
        fontFamily: isUrdu ? "JameelNooriNastaleeq" : "TimesNewRoman",
        marginBottom: 2,
        lineHeight: 1.3,
        color: choice === answer ? 'green' : 'black',
        textDecorationLine: choice === answer ? 'underline' : 'none',
        textDecorationColor: choice === answer ? 'green' : 'transparent',
        textDecorationThickness: choice === answer ? '2px' : '0',
        fontWeight: choice === answer ? 'bold' : 'normal',
        textAlign: isUrdu ? 'right' : 'left',
        direction: isUrdu ? 'rtl' : 'ltr'
    });

    return (
        <View style={{ marginBottom: 10 }}>
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
                    <Text style={isUrdu ? styles.urduQuestion : { 
                        fontSize: 15, 
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
                flexDirection: 'row', 
                justifyContent: isUrdu ? 'flex-end' : 'flex-start',
                paddingLeft: 28,
            }}>
                <View style={{ width: isUrdu ? '100%' : '45%' }}>
                    <Text style={getChoiceStyle(choices[0])}>
                        • {parsedChoices[0]}
                    </Text>
                    <Text style={getChoiceStyle(choices[1])}>
                        • {parsedChoices[1]}
                    </Text>
                </View>
                {!isUrdu && (
                    <View style={{ width: '45%' }}>
                        <Text style={getChoiceStyle(choices[2])}>
                            • {parsedChoices[2]}
                        </Text>
                        <Text style={getChoiceStyle(choices[3])}>
                            • {parsedChoices[3]}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const PaperPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section, isUrdu, loading }) => {
    if (loading) return <Loader />;
    
    const getUrduTextStyle = (defaultStyle) => (isUrdu ? [defaultStyle, styles.urduText] : defaultStyle);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <PaperHeader BasicInfo={BasicInfo} styles={styles} isUrdu={isUrdu} />
                
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
                        <View key={secIndex}>
                            <View style={styles.sectionHeaderContainer}>
                                <View style={styles.sectionNameWrapper}>
                                    <Text style={getUrduTextStyle(styles.sectionHeader)}>{sec.name}</Text>
                                    <Text style={getUrduTextStyle(styles.sectionHeaderType)}>({sec.type})</Text>
                                </View>
                            </View>
                            <View style={styles.noteContainer}>
                                {sec.type.toLowerCase() === 'descriptive questions' ? (
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

                            {htmlQuestions
                                .filter(q => q.section === sec.name)
                                .map((q, idx) => {
                                    const isDescriptive = sec.type.toLowerCase() === 'descriptive questions';
                                    const currentQuestionNumber = questionCounter + idx;
                                    
                                    return (
                                        <View key={idx} style={isDescriptive ? styles.descriptiveQuestion : styles.question}>
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
                                                    {isDescriptive ? 
                                                        (isUrdu ? `سوال${currentQuestionNumber}.` : `Q${currentQuestionNumber}.`) 
                                                        : 
                                                        (isUrdu ? `${toUrduRoman(idx + 1)}.` : `${toRoman(idx + 1)}.`)
                                                    }
                                                </Text>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={isUrdu ? styles.urduQuestion : { 
                                                        fontSize: 15, 
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
                                            <View style={{ 
                                                flexDirection: 'row',
                                                justifyContent: isUrdu ? 'flex-end' : 'flex-start',
                                                marginTop: 5
                                            }}>
                                                <Text style={isUrdu ? styles.urduQuestion : { 
                                                    fontSize: 15, 
                                                    fontFamily: "TimesNewRoman",
                                                    color: 'green',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {isUrdu ? 'جواب:' : 'Answer:'} {parse(q.original_answer)}
                                                </Text>
                                            </View>
                                            {q.answer && (
                                                <Image 
                                                    src={q.answer} 
                                                    style={styles.questionImage}
                                                />
                                            )}
                                        </View>
                                    );
                                })}

                            {htmlMCQ
                                .filter(q => q.section === sec.name)
                                .map((q, idx) => {
                                    const questionsInThisSection = htmlQuestions.filter(quest => quest.section === sec.name).length;
                                    const currentQuestionNumber = questionCounter + questionsInThisSection + idx;
                                    console.log("MCQS CHECK", q)
                                    return (
                                        <View key={idx}>
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
        <PDFViewer style={{ width: '100%', height: '100vh', border: 'none' }}>
            <PaperPDF
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

export { PaperPDF };
export default PDFComponent;