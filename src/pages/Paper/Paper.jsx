import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'TimesNewRoman',
  src: 'https://db.onlinewebfonts.com/t/32441506567973bb1e65e8c3fbada474.ttf',
  fontWeight: 'normal',
});

Font.register({
  family: 'TimesNewRoman-Bold',
  src: 'https://db.onlinewebfonts.com/t/860c3ec7bbc5da3e97233ccecafe512e.ttf',
  fontWeight: 'bold',
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
  family: 'MehrNastaleeq',
  src: 'https://cdn.jsdelivr.net/gh/tariq-abdullah/urdu-web-font-CDN/MehrNastaleeq.ttf',
  fontWeight: 'normal',
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Times-Roman',
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
        fontFamily: 'Times-Bold',
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
        fontFamily: 'Times-Roman',
        marginBottom: 2,
    },
    examTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        textAlign: 'center',
        marginBottom: 2,
        textTransform: 'uppercase'
    },
    timeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    leftColumn: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    date: {
        position: 'absolute',
        left: 10,
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    rightGroup: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    Time: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        marginRight: 10,
    },
    marks: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    subjectText: {
        fontSize: 12,
        fontFamily: 'Times-Roman',
        marginBottom: 3,
    },
    maxMarksText: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
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
        fontFamily: 'Times-Bold',
        textDecorationLine: 'underline',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        textDecoration: 'underline'
    },
    sectionSubheader: {
        textAlign: 'center',
        fontFamily: 'Times-Roman',
        fontSize: 10,
        marginBottom: 5,
    },
    question: {
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    noteContainer:{
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteAsQuestion: {
        marginBottom: 8,
        fontSize: 12,
        fontFamily: 'Times-Bold',
        fontWeight: 'bold',
        flex: 5
    },
    sectionMarks: {
        marginBottom: 8,
        fontFamily: 'Times-Roman',
        fontSize: 14,
        flex: 1
    },
    normalNote: {
        marginBottom: 8,
        fontSize: 12,
        fontFamily: 'Times-Bold',
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 5
    },
    descriptiveQuestion: {
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    choice: {
        marginLeft: 10,
        fontSize: 10,
        fontFamily: 'Times-Roman',
    },
    leftRightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        fontSize: 10,
        fontFamily: 'Times-Roman',
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: '100%',
        marginBottom: 10,
    },
    questionImage: {
        width: '200px',
        marginTop: 5
    },
    urduText: {
        fontFamily: 'MehrNastaleeq',
        fontSize: 16,
        direction: 'rtl',
        textAlign: 'right',
        lineHeight: 1.5,
    },
    urduSectionHeader: {
        fontFamily: 'MehrNastaleeq',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
        direction: 'rtl',
    },
    urduInstruction: {
        fontFamily: 'MehrNastaleeq',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 6,
        direction: 'rtl',
    },
    urduMarks: {
        fontFamily: 'MehrNastaleeq',
        fontSize: 16,
        textAlign: 'right',
        marginVertical: 2,
        direction: 'rtl',
    },
    urduQuestion: {
        fontFamily: 'MehrNastaleeq',
        fontSize: 15,
        textAlign: 'right',
        marginVertical: 4,
        direction: 'rtl',
    },
    urduChoice: {
        fontFamily: 'MehrNastaleeq',
        fontSize: 14,
        textAlign: 'right',
        marginVertical: 2,
        direction: 'rtl',
    },
});

const MCQComponent = ({ htmlString, choices, index, imageUrl, isUrdu }) => {
    const parsedElements = parse(htmlString);
    const parsedChoices = choices.map(q => parse(q));

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: isUrdu ? 'flex-end' : 'flex-start' }}>
                <Text style={isUrdu ? styles.urduQuestion : { fontFamily: "Times-Roman", marginRight: 8, fontSize: 12, minWidth: 20 }}>
                    {isUrdu ? `${toUrduRoman(index)}.` : `${toRoman(index)}.`}
                </Text>
                <View style={{ flex: 1 }}>
                    <Text style={isUrdu ? styles.urduQuestion : { fontSize: 12, fontFamily: "Times-Roman", lineHeight: 1.3 }}>
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

            <View style={{ flexDirection: 'row', justifyContent: isUrdu ? 'flex-end' : 'flex-start', paddingLeft: 28 }}>
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
    return romanNumerals[num - 1] || num;
}

function toUrduRoman(num) {
    const urduRomans = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨', '١٩', '٢٠'];
    return urduRomans[num - 1] || num;
}

const PaperPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section, isUrdu }) => {
    const getUrduTextStyle = (defaultStyle) => (isUrdu ? [defaultStyle, styles.urduText] : defaultStyle);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.instituteName}>{BasicInfo.header}</Text>    
                    <View style={styles.examDetailsRow}>
                        <View style={styles.leftDetails}>
                            <Text style={styles.detailText}>Date: {BasicInfo.date}</Text>
                            <Text style={styles.detailText}>Time: {BasicInfo.time}</Text>
                        </View>
                        <View style={styles.centerDetails}>
                            <Text style={styles.examTitle}>{BasicInfo.examination} EXAMINATION, {BasicInfo.ExaminationYear}</Text>
                            <Text style={styles.examTitle}>{BasicInfo.subject} - {BasicInfo.class} ({BasicInfo.center})</Text>
                        </View>
                        <View style={styles.rightDetails}>
                            <Text style={styles.detailText}>Max. Marks: {BasicInfo.marks}</Text>
                        </View>
                    </View>
                </View>

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
                                    <Text style={getUrduTextStyle(styles.sectionHeader)}>({sec.type})</Text>
                                </View>
                            </View>
                            <View style={styles.noteContainer}>
                                {sec.type.toLowerCase() === 'descriptive questions' ? (
                                    <Text style={getUrduTextStyle(styles.normalNote)}>
                                        NOTE: {sec.description}
                                    </Text>
                                ) : (
                                    <Text style={getUrduTextStyle(styles.noteAsQuestion)}>
                                        Q{questionCounter}. {sec.description}
                                    </Text>
                                )}
                                <Text style={styles.sectionMarks}>({sec.marks} Marks)</Text>
                            </View>

                            {htmlQuestions
                                .filter(q => q.section === sec.name)
                                .map((q, idx) => {
                                    const isDescriptive = sec.type.toLowerCase() === 'descriptive questions';
                                    const currentQuestionNumber = questionCounter + idx;
                                    
                                    return (
                                        <View key={idx} style={isDescriptive ? styles.descriptiveQuestion : styles.question}>
                                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                                <Text style={{ fontFamily: "Times-Roman", marginRight: 8, fontSize: 12, minWidth: 20 }}>
                                                    {isDescriptive ? `Q${currentQuestionNumber}.` : `${toRoman(idx + 1)}.`}
                                                </Text>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={getUrduTextStyle({ fontSize: 12, fontFamily: "Times-Roman", lineHeight: 1.3 })}>
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

const PDFComponent = ({ htmlContent, htmlQuestions, htmlMCQ, BasicInfo, section }) => {
    console.log('PDF Data:', {
        BasicInfo,
        htmlQuestions,
        htmlMCQ,
        section
    });

    return (
        <PDFViewer
            showToolbar={false}
            style={{ width: '100%', height: '100vh', border: 'none' }}
        >
            <PaperPDF
                BasicInfo={BasicInfo}
                htmlContent={htmlContent}
                htmlMCQ={htmlMCQ}
                htmlQuestions={htmlQuestions}
                section={section}
                isUrdu={BasicInfo.medium === "Urdu"}
            />
        </PDFViewer>
    );
};

export default PDFComponent;