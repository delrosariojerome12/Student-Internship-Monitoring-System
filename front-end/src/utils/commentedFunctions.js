// const checkDepartment = (department, mainIndex, index) => {
//   const newForm = [...form];
//   switch (department) {
//     case "College of Computer Studies and Engineering":
//       const CCSE = [
//         {
//           value: "Bachelor of Science in Information Technology",
//           label: "Bachelor of Science in Information Technology",
//         },
//         {
//           value: "Bachelor of Science in Computer Science",
//           label: "Bachelor of Science in Computer Science",
//         },
//         {
//           value: "Bachelor of Library Information System",
//           label: "Bachelor of Library Information System",
//         },
//         {
//           value: "Bachelor of Science in Computer Engineering",
//           label: "Bachelor of Science in Computer Engineering",
//         },
//         {
//           value: "Bachelor of Science in Electrical Engineering",
//           label: "Bachelor of Science in Electrical Engineering",
//         },
//         {
//           value:
//             "Bachelor of Science in Electronics and Communications Engineering",
//           label:
//             "Bachelor of Science in Electronics and Communications Engineering",
//         },
//       ];
//       newForm[mainIndex].forms[index + 1].options = CCSE.map((item) => {
//         const {label, value} = item;
//         return {
//           label,
//           value,
//         };
//       });
//       newForm[mainIndex].forms[index + 3].value = "640";
//       return;
//     case "College of Business":
//       const COB = [
//         {
//           value: "Bachelor of Science in Accountancy",
//           label: "Bachelor of Science in Accountancy",
//         },
//         {
//           value: "Bachelor of Science in Business Administration",
//           label: "Bachelor of Science in Business Administration",
//         },
//         {
//           value: "Bachelor of Science in Customs Administration",
//           label: "Bachelor of Science in Customs Administration",
//         },
//         {
//           value: "Bachelor of Science in Entrepreneurship",
//           label: "Bachelor of Science in Entrepreneurship",
//         },
//         {
//           value: "Bachelor of Science in Accounting Information System",
//           label: "Bachelor of Science in Accounting Information System",
//         },
//       ];

//       newForm[mainIndex].forms[index + 1].options = COB.map((item) => {
//         const {label, value} = item;
//         return {
//           label,
//           value,
//         };
//       });
//       newForm[mainIndex].forms[index + 3].value = "250";

//       return;
//     case "College of Tourism Management and Hospitality":
//       const CTMH = [
//         {
//           value: "Bachelor of Science in Hotel and Restaurant Management",
//           label: "Bachelor of Science in Hotel and Restaurant Management",
//         },
//         {
//           value: "Bachelor of Science in Tourism Management",
//           label: "Bachelor of Science in Tourism Management",
//         },
//       ];
//       newForm[mainIndex].forms[index + 1].options = CTMH.map((item) => {
//         const {label, value} = item;
//         return {
//           label,
//           value,
//         };
//       });
//       newForm[mainIndex].forms[index + 3].value = "250";
//       return;
//     case "College of Medical Allied Courses":
//       const CMAC = [
//         {
//           value: "Bachelor of Science in Biology",
//           label: "Bachelor of Science in Biology",
//         },
//         {
//           value: "Bachelor of Science in Pharmacy",
//           label: "Bachelor of Science in Pharmacy",
//         },
//         {
//           value: "Bachelor of Science in Midwifery",
//           label: "Bachelor of Science in Midwifery",
//         },
//       ];
//       newForm[mainIndex].forms[index + 1].options = CMAC.map((item) => {
//         const {label, value} = item;
//         return {
//           label,
//           value,
//         };
//       });
//       newForm[mainIndex].forms[index + 3].value = "250";

//       return;
//     default:
//       return;
//   }
// };

// verification
// {
//   type: "select",
//   id: "internship-type",
//   value: "",
//   placeholder: "Type of Internship",
//   isDisabled: false,
//   code: "internshipType",
//   options: [
//     {
//       value: "Onsite",
//       label: "Onsite",
//     },
//     {
//       value: "Online",
//       label: "Online",
//     },
//     {
//       value: "Hybrid",
//       label: "Hybrid",
//     },
//   ],
// },

// {
//   type: "select",
//   id: "department",
//   code: "department",
//   value: "",
//   placeholder: "Department",
//   options: [
//     {
//       value: "College of Computer Studies and Engineering",
//       label: "College of Computer Studies and Engineering",
//     },
//     {
//       value: "College of Business",
//       label: "College of Business",
//     },
//     {
//       value: "College of Tourism Management and Hospitality",
//       label: "College of Tourism Management and Hospitality",
//     },
//     {
//       value: "College of Medical Allied Courses",
//       label: "College of Medical Allied Courses",
//     },
//   ],
//   isDisabled: false,
// },
