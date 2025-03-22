import React, {useEffect, useState} from 'react';
import {PDFViewer, Document, Page, Text, View, StyleSheet, Font, Image} from '@react-pdf/renderer';
import parse from 'html-react-parser';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',  // Arrange children in a column
        backgroundColor: '#ffffff', // White background
        fontFamily: 'Times-Roman',  // Set font family
        padding: 2,               // Padding (use 2 for 16px, 20 for 20px, or adjust as needed)
        width: '100vw',           // Full viewport width
        height: '100vh',          // Full viewport height
        overflow: 'auto',         // Allow scrolling if content overflows
        display: 'flex',  
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        flexDirection: 'column',     // Add this to maintain vertical stacking
        alignContent: 'flex-start',
    },
    title: {
      fontSize: 15,
      fontWeight: 600,
      fontFamily: 'Times-Bold',
      textDecoration: "underline",
      textAlign: 'center',
      marginBottom: 10
    },
    subtitle: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 10
    },
    paragraph: {
      fontSize: 11,
      marginBottom: 10
    },
    bold: {
      fontFamily: 'Times-Bold'
    }
  });
const PaperPDF = ({htmlContent, htmlQuestions, htmlMCQ ,BasicInfo, section}) => {
    const filteredQuestions = htmlQuestions.filter(q => String(q.section).trim() === String(section.name).trim());
    console.log(`Filtered Questions for ${section.name}:`, filteredQuestions);
    function MyComponent({htmlString, index, marks}) {
        function replaceStrongWithBold(element) {
            if(typeof element ==='string') {
                return <Text>{element}</Text>;
            }
            if(element.type === 'strong') {
                return 
            }
        }
        const parsedElements = parse(htmlString);
        return <View>
            <View style={{ display: 'flex', justifyContent: "space-between", marginBottom: 4, flexDirection: 'row' }}>
                <View style={{fontSize: 11, display:'flex', flexDirection: 'row', marginRight: 40}}>
                    <Text style={{fontFamily: "Times-Bold", marginRight: 3}}>
                        Q{index}
                    </Text>
                    <Text style={{display:"flex"}}>
                        <View style={{display:"inline-block"}}>
                            <Text>{parsedElements}</Text>
                        </View>
                    </Text>
                </View>
                <View>
                    <Text style={{fontSize: 11, marginLeft: 3}}>({marks})</Text>
                </View>
            </View>
            {/*<View style={{display: 'flex',justifyContent: 'center', alignItems:'center', width:'100%', margin: 5}}>
                {false && <Image style={{width: '200rem'}} src={`${questionImage}`}></Image>}
            </View>*/}
        </View>
    }
    function MCQ({htmlString, choices ,index}) {
        function replaceStrongWithBold(element) {
            if(typeof element ==='string') {
                return <Text>{element}</Text>;
            }
            if(element.type === 'strong') {
                return 
            }
        }
        const parsedElements = parse(htmlString);
        const parsedChoices = choices.map((q)=>{
            return (parse(q))
        })
        // const questionsArray = Object.values(htmlQuestions).filter(item => typeof item === "object" && !Array.isArray(item));
        // console.log("questionsArray:", questionsArray);
        return <View>
            <View style={{ marginBottom: 4 }}>
                {/* First line with index and parsed elements */}
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontFamily: "Times-Bold", marginRight: 3, fontSize: 11 }}>
                        {index}-
                    </Text>
                    <Text style={{ fontSize: 12, fontFamily: "Times-Roman" }}>
                        {parsedElements}
                    </Text>
                </View>

                {/* Second line with choices */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 15 }}>
                    {parsedChoices.map((q, idx) => (
                        <View key={q} style={{ marginRight: 15, marginBottom: 5 }}>
                            <Text style={{ fontSize: 11 }}>
                                ({String.fromCharCode(97 + idx)}) {q}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            {/*<View style={{display: 'flex',justifyContent: 'center', alignItems:'center', width:'100%', margin: 5}}>
                {false && <Image style={{width: '200rem'}} src={`${questionImage}`}></Image>}
            </View>*/}
        </View>
    }
    return(
        <Document>
            <Page size="A4" >
                <View style={styles.section}>
                    <Text style={styles.title}>{BasicInfo.header}</Text>
                    <Text style={styles.subtitle}>{BasicInfo.class}</Text>
                    <Text style={styles.subtitle}>Examination {BasicInfo.ExaminationYear}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", fontSize: 14, marginBottom: 10 }}>
                        <Text>Time: {BasicInfo.duration} Hours</Text>
                        <View>
                            <Text>Dated: {BasicInfo.date}</Text>
                            <Text>Marks: {BasicInfo.marks}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{BasicInfo.subject}</Text>
                    <Text style={styles.paragraph}>Instructions: {BasicInfo.instruction}</Text>
                    {
                        section.map((letter,idx)=>(
                            <View key={letter.name}>
                                <Text style={styles.title}>{letter.name}</Text>
                                <Text style={styles.subtitle}>{letter.description}</Text>
                                {console.log("Paper check",section, htmlQuestions)}
                                {
                                    htmlQuestions.filter(q => q.section === letter.name)
                                    .map((q,Qidx)=>(
                                        <View key={Qidx}>
                                            {console.log(q)}
                                            <MyComponent index={Qidx + 1} marks={q.marks} htmlString={q.name} />
                                        </View>
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
            </Page>
        </Document>
    )
}
const PDFComponent = ({htmlContent, htmlQuestions,htmlMCQ, BasicInfo, section}) => {
    return (
        <PDFViewer showToolbar={false} style={{ 
            width: '100%', 
            height: '100vh', 
            border: 'none' 
        }}>
            {console.log("QuestionsPreview", htmlQuestions)}
            <PaperPDF BasicInfo={BasicInfo} htmlContent={htmlContent} htmlMCQ = {htmlMCQ} htmlQuestions={htmlQuestions} section={section}/>
        </PDFViewer>
    )
}
export default PDFComponent;