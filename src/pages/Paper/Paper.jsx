import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import parse from 'html-react-parser';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Times-Roman',
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    instituteName: {
        fontSize: 18,
        fontFamily: 'Times-Bold',
        marginBottom: 5,
    },
    examTitle: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Times-Roman',
    },
    timeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'Times-Roman',
    },
    leftColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rightColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    sectionNameWrapper: {
        flex: 1,
        textAlign: 'center',
    },
    sectionHeader: {
        paddingTop: 10,
        fontFamily: 'Times-Bold',
        textDecoration: 'underline',
        fontSize: 16,
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
                <View fixed>
                    <View style={styles.header}>
                        <Text style={styles.instituteName}>{BasicInfo.header}</Text>
                        <Text style={styles.examTitle}>{BasicInfo.examination} EXAMINATION {BasicInfo.ExaminationYear}</Text>
                        <Text style={styles.examTitle}>{BasicInfo.subject}</Text>
                    </View>

                    <View style={styles.timeDetails}>
                        <View style={styles.leftColumn}>
                            <Text>Date: {BasicInfo.date}</Text>
                            <Text>Time: {BasicInfo.time}</Text>
                        </View>
                        <View style={styles.rightColumn}>
                            <Text>Max. Marks: {BasicInfo.marks}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
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