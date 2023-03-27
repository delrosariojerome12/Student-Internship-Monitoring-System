import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import {useSelector, useDispatch} from "react-redux";
import {handleGenerate} from "../../features/interns/narrativeReducer";

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontWeight: "500",
  },
  page: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    minHeight: "100vh",
    minWidth: "100vw",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  sectionContainer: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  PDFViewer: {
    height: "100%",
    width: "100%",
  },
});

const ReactPDF = React.memo(() => {
  const {
    user: {
      user: {firstName, lastName},
      schoolDetails: {program, requiredHours, studentNumber},
      internshipDetails: {
        companyName,
        logo: {link},
      },
    },
  } = useSelector((state) => state.user);
  const {
    generatingDocument: {reports, week},
  } = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  return (
    <div className="pdf-container">
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text>
                Bachelor of Science in Information Technology On-the-Job
                Training Weekly Accomplishment Report
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.section}>
                <Text>Student Number: {studentNumber}</Text>
                <Text>{`Student Name: ${firstName} ${lastName}`}</Text>
                <Text>Program: On-the-Job Training</Text>
              </View>
              <View style={styles.section}>
                <Text>Training Hours Required: {requiredHours}</Text>
                <Text>{`Company ${companyName}`}</Text>
                <Text>Department: IT Department</Text>
              </View>
            </View>
            <View style={[styles.section, {marginTop: 20}]}>
              <Text>Week Number: {week}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button onClick={() => dispatch(handleGenerate())}>Close</button>
    </div>
  );
});

export default ReactPDF;
