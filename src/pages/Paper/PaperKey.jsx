import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import parse from 'html-react-parser';
import { Font } from '@react-pdf/renderer';

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
    // Updated question style for continuous numbering
    question: {
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    // New style for notes as questions (non-descriptive sections)
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
    // New style for normal notes (descriptive sections)
    normalNote: {
        marginBottom: 8,
        fontSize: 12,
        fontFamily: 'Times-Bold',
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 5
    },
    // Style for descriptive questions with continuous numbering
    descriptiveQuestion: {
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'Times-Roman',
        display: "flex",
        flexDirection: "column"
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
});

const PaperPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section }) => {
    function toRoman(num) {
        const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"];
        return romanNumerals[num - 1] || num;
    }
    function MCQ({ htmlString, choices, index, answer }) {
    const parsedElements = parse(htmlString);
    const parsedChoices = choices.map(q => parse(q));

    console.log("Choice:", choices[0]);
    console.log("Answer:", answer);
    console.log("Equal?", choices[0] === answer);
    const getChoiceStyle = (choice) => ({
        fontSize: 11,
        fontFamily: "Times-Roman",
        marginBottom: 2,
        lineHeight: 1.3,
        color: choice === answer ? 'green' : 'black',
        fontWeight: choice === answer ? 'bold' : 'normal',
        backgroundColor: choice === answer ? '#d1ffd6' : 'transparent'
    });
    return (
        <View style={{ marginBottom: 10 }}>
            {/* Question header */}
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ 
                    fontFamily: "Times-Roman", 
                    marginRight: 8, 
                    fontSize: 12,
                    minWidth: 20
                }}>
                    {toRoman(index)}.
                </Text>
                <Text style={{ 
                    fontSize: 12, 
                    fontFamily: "Times-Roman",
                    flex: 1,
                    lineHeight: 1.3
                }}>
                    {parsedElements}
                </Text>
            </View>

            {/* Choices in two columns */}
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                paddingLeft: 28, // Align with question text
            }}>
                {/* Left column */}
                <View style={{ 
                    width: '100%',
                    alignItems: 'flex-start'
                }}>
                    <Text style={getChoiceStyle(choices[0])}>
                        • {parsedChoices[0]}
                    </Text>
                    
                    <Text style={getChoiceStyle(choices[1])}>
                        • {parsedChoices[1]}
                    </Text>
                </View>

                {/* Right column */}
                <View style={{ 
                    width: '45%',
                    alignItems: 'flex-start'
                }}>
                    <Text style={getChoiceStyle(choices[2])}>
                        • {parsedChoices[2]}
                    </Text>
                    
                    <Text style={getChoiceStyle(choices[3])}>
                        • {parsedChoices[3]}
                    </Text>
                </View>
            </View>
        </View>
    );
}

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Original Header */}
                <View style={styles.header}>
                    <Text style={styles.instituteName}>{BasicInfo.header}</Text>    
                    <View style={styles.examDetailsRow}>
                        {/* Left side - Date and Time */}
                        <View style={styles.leftDetails}>
                            <Text style={styles.detailText}>Date: {BasicInfo.date}</Text>
                            <Text style={styles.detailText}>Time: {BasicInfo.time}</Text>
                        </View>
                        
                        {/* Center - Examination details */}
                        <View style={styles.centerDetails}>
                            <Text style={styles.examTitle}>{BasicInfo.examination} EXAMINATION, {BasicInfo.ExaminationYear}</Text>
                            <Text style={styles.examTitle}>{BasicInfo.subject} - {BasicInfo.class} ({BasicInfo.center})</Text>
                        </View>
                        
                        {/* Right side - Max Marks */}
                        <View style={styles.rightDetails}>
                            <Text style={styles.detailText}>Max. Marks: {BasicInfo.marks}</Text>
                        </View>
                    </View>
                </View>

                {/* Sections */}
                {section.map((sec, secIndex) => {
                    // Calculate starting question number for this section
                    let questionCounter = 1;
                    
                    // For non-descriptive sections, count all previous questions and notes as questions
                    if (sec.type.toLowerCase() !== 'descriptive questions') {
                        for (let i = 0; i < secIndex; i++) {
                            const prevSection = section[i];
                            const prevQuestions = htmlQuestions.filter(q => q.section === prevSection.name).length;
                            const prevMCQs = htmlMCQ.filter(q => q.section === prevSection.name).length;
                            
                            if (prevSection.type.toLowerCase() === 'descriptive questions') {
                                // For previous descriptive sections, count questions normally
                                questionCounter += prevQuestions + prevMCQs;
                            } else {
                                // For previous non-descriptive sections, count questions + 1 for note
                                questionCounter += prevQuestions + prevMCQs + 1;
                            }
                        }
                    } else {
                        // For descriptive sections, count all previous questions and notes as questions
                        for (let i = 0; i < secIndex; i++) {
                            const prevSection = section[i];
                            const prevQuestions = htmlQuestions.filter(q => q.section === prevSection.name).length;
                            const prevMCQs = htmlMCQ.filter(q => q.section === prevSection.name).length;
                            
                            if (prevSection.type.toLowerCase() === 'descriptive questions') {
                                questionCounter += prevQuestions + prevMCQs;
                            } else {
                                questionCounter += prevQuestions + prevMCQs + 1; // +1 for note as question
                            }
                        }
                    }

                    return (
                        <View key={secIndex}>
                            <View style={styles.sectionHeaderContainer}>
                                <View style={styles.sectionNameWrapper}>
                                    <Text style={styles.sectionHeader}>{sec.name}</Text>
                                    <Text style={styles.sectionHeader}>({sec.type})</Text>
                                </View>
                            </View>
                            <View style={styles.noteContainer}>
                                {/* Handle notes based on section type */}
                                {sec.type.toLowerCase() === 'descriptive questions' ? (
                                    /* Normal note for descriptive sections */
                                    <Text style={styles.normalNote}>
                                        NOTE: {sec.description}
                                    </Text>
                                ) : (
                                    /* Note as question for non-descriptive sections */
                                    <Text style={styles.noteAsQuestion}>
                                        Q{questionCounter}. {sec.description}
                                    </Text>
                                )}
                                <Text style={styles.sectionMarks}>({sec.marks} Marks)</Text>
                            </View>
                            {/* Render questions with continuous numbering */}
                        {htmlQuestions
                            .filter(q => q.section === sec.name)
                            .map((q, idx) => {
                                const isDescriptive = sec.type.toLowerCase() === 'descriptive questions';
                                
                                if (isDescriptive) {
                                    // For descriptive sections, use regular Q numbering
                                    const currentQuestionNumber = questionCounter + idx;
                                    return (
                                        <View key={idx} style={styles.descriptiveQuestion}>
                                            <Text>Q{currentQuestionNumber}. {parse(q.name)}</Text>
                                            <Text>Answer: {parse(q.answer)}</Text>
                                        </View>
                                    );
                                } else {
                                    // For non-descriptive sections, use Roman numerals starting from i
                                    const romanIndex = toRoman(idx + 1);
                                    return (
                                        <View key={idx} style={styles.question}>
                                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                                <Text style={{ 
                                                    fontFamily: "Times-Roman", 
                                                    marginRight: 8, 
                                                    fontSize: 12,
                                                    minWidth: 20
                                                }}>
                                                    {romanIndex}.
                                                </Text>
                                                <View sx={{display: "flex", flexDirection: "column", flex: 1}}>
                                                    <Text style={{ 
                                                        fontSize: 12, 
                                                        fontFamily: "Times-Roman",
                                                    }}>
                                                        {parse(q.name)}
                                                    </Text>
                                                    <Text style={{ 
                                                        fontSize: 12, 
                                                        fontFamily: "Times-Roman",
                                                    }}>
                                                        Answer: {parse(q.answer)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }
                            })}

                            {/* Render MCQs with continuous numbering */}
                            {htmlMCQ
                                .filter(q => q.section === sec.name)
                                .map((q, idx) => {
                                    const questionsInThisSection = htmlQuestions.filter(quest => quest.section === sec.name).length;
                                    const currentQuestionNumber = 1
                                    
                                    return (
                                        <View key={idx}>
                                            <MCQ 
                                                index={currentQuestionNumber} 
                                                htmlString={q.name} 
                                                choices={[q.choice1, q.choice2, q.choice3, q.choice4]}
                                                answer={q.answer}
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
    console.log("Questions check for answer",htmlQuestions)
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
            />
        </PDFViewer>
    );
};

export default PDFComponent;