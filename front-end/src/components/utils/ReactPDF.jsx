import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import {useSelector, useDispatch} from "react-redux";
import {handleGenerate} from "../../features/interns/narrativeReducer";
import colegioLogo from "../../assets/img/CDSGA.png";
import oldEngFont from "../../assets/font/OLDENGL.TTF";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date) => {
  const dateArr = date.split("-");
  return `${months[parseInt(dateArr[0].slice(1)) - 1]} ${dateArr[1]}, ${
    dateArr[2]
  }`;
};

Font.register({
  family: "Old English Text MT",
  src: oldEngFont,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: "30",
    paddingLeft: "140",
    paddingRight: "70",
    paddingBottom: "20",
    fontSize: 12,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Old English Text MT",
    color: "maroon",
  },
  header: {
    borderBottom: 1,
    textAlign: "center",
    fontSize: 9,
  },
  colegioLogo: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 12,
  },
  companyLogo: {
    height: 50,
    width: 50,
    position: "absolute",
    right: 0,
    top: 12,
  },
  topContent: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  table: {
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flex: 1,
  },
  tableHeader: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontWeight: "bold",
    flex: 1,
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
        supervisor,
      },
    },
  } = useSelector((state) => state.user);
  const {
    generatingDocument: {reports, week},
  } = useSelector((state) => state.narrative);
  const dispatch = useDispatch();

  let totalHours = 0;

  const computeTotalRendered = () => {
    // return reports.reduce((total, num) => {
    //   return parseFloat(total.totalRendered) + parseFloat(num.totalRendered);
    // });
    reports.forEach((item) => {
      totalHours += parseFloat(item.totalRendered);
    });
  };

  computeTotalRendered();

  return (
    <div className="pdf-container">
      <PDFViewer>
        <Document>
          <Page size="Legal" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Colegio de San Gabriel Arcangel, Inc.
              </Text>
              <Text>Founded 1993</Text>
              <Text>
                Area E, Fatima 1, Sapang Palay, City of San Jose del Monte,
                Bulacan.
              </Text>
              <Text>Recognized by the Government: DepEd, TESDA and CHED</Text>
              <Text>PACUCOA Accredited -- Level 1 Status</Text>
              <Text>Telefax No. (044) 7600-301 /  0915-810-5686</Text>
              <Image style={styles.colegioLogo} src={colegioLogo} />
              <Image style={styles.companyLogo} src={link} />
            </View>
            <View style={styles.topContent}>
              <Text>
                Bachelor of Science in Information Technology On-the-Job
                Training Weekly Accomplishment Report
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.contentSection}>
                <Text>Student Number: {studentNumber}</Text>
                <Text>{`Student Name: ${firstName} ${lastName}`}</Text>
                <Text>Program: On-the-Job Training</Text>
              </View>
              <View style={styles.contentSection}>
                <Text>
                  Training Hours Required:
                  {requiredHours}
                </Text>

                <Text>{`Company: ${companyName}`}</Text>
                <Text>Department: IT Department</Text>
              </View>
            </View>
            <View style={[styles.section, {marginTop: 20}]}>
              <Text>Week Number: {week}</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.tableHeader}>DATE</Text>
                <Text style={styles.tableHeader}>TASK</Text>
                <Text style={styles.tableHeader}>N0. OF HOURS</Text>
                <Text style={styles.tableHeader}>REMARKS</Text>
              </View>
              {reports.map((item, index) => {
                const {
                  date,
                  isPresent,
                  narrative: {content},
                  totalRendered,
                } = item;
                return (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{formatDate(date)}</Text>
                    <Text style={styles.cell}>{content}</Text>
                    <Text style={styles.cell}>{totalRendered}</Text>
                    <Text style={styles.cell}>
                      {isPresent ? "Accomplished" : "Absent"}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{marginBottom: 10, alignItems: "flex-end"}}>
              <Text>Total Number of Hours: {totalHours}</Text>
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{marginBottom: 6}}>ATTESTED BY:</Text>
              <Text style={{marginBottom: 6, textDecoration: "underline"}}>
                {supervisor}
              </Text>
              <Text style={{marginBottom: 6}}>Immediate Supervisor</Text>
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{marginBottom: 6}}>APPROVED BY:</Text>
              <Text style={{marginBottom: 6, textDecoration: "underline"}}>
                JIMMY DE VERA ROLDAN
              </Text>
              <Text style={{marginBottom: 6}}>Practicum Adviser</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <button onClick={() => dispatch(handleGenerate())}>Close</button>
    </div>
  );
});

export default ReactPDF;
