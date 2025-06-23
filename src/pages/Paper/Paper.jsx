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
    gap: 8, // not supported in all versions, can replace with margin
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
    sectionMarks: {
        paddingTop: 10,
        fontFamily: 'Times-Roman',
        fontSize: 14,
        flex: 1
    },
    question: {
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
});

const PaperPDF = ({ BasicInfo, htmlQuestions, htmlMCQ, section }) => {
    function MCQ({ htmlString, choices, index }) {
        const parsedElements = parse(htmlString);
        const parsedChoices = choices.map(q => parse(q));
    
        function toRoman(num) {
            const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
            return romanNumerals[num - 1] || num;
        }
    
        return (
            <View>
                <View style={{ marginBottom: 4 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ fontFamily: "Times-Bold", marginRight: 5, fontSize: 11 }}>
                            {toRoman(index)}.
                        </Text>
                        <Text style={{ fontSize: 12, fontFamily: "Times-Roman" }}>
                            {parsedElements}
                        </Text>
                    </View>
    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                        <View style={{ width: '40%', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 11 }}>• {parsedChoices[0]}</Text>
                            <Text style={{ fontSize: 11 }}>• {parsedChoices[1]}</Text>
                        </View>
                        <View style={{ width: '40%', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 11 }}>• {parsedChoices[2]}</Text>
                            <Text style={{ fontSize: 11 }}>• {parsedChoices[3]}</Text>
                        </View>
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
                {section.map((sec, secIndex) => (
                    <View key={secIndex}>
                        <View style={styles.sectionHeaderContainer}>
                            <View style={styles.sectionNameWrapper}>
                                <Text style={styles.sectionHeader}>{sec.name}</Text>
                                <Text style={styles.sectionHeader}>({sec.type})</Text>
                            </View>
                            <Text style={styles.sectionMarks}>({sec.marks} Marks)</Text>
                        </View>
                        <Text style={styles.sectionSubheader}>{sec.description}</Text>

                        {htmlQuestions
                            .filter(q => q.section === sec.name)
                            .map((q, idx) => (
                                <View key={idx} style={styles.question}>
                                    <Text>Q{idx + 1}. {parse(q.name)}</Text>
                                </View>
                            ))}

                        {htmlMCQ
                            .filter(q => q.section === sec.name)
                            .map((q, idx) => (
                                <View key={idx}>
                                    <MCQ index={idx + 1} htmlString={q.name} choices={[q.choice1, q.choice2, q.choice3, q.choice4]}/>
                                </View>
                            ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

const PDFComponent = ({ htmlContent, htmlQuestions, htmlMCQ, BasicInfo, section }) => {
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