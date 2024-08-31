
export const fetchCenterId = () => {
  try {
     const response = fetch('http://127.0.0.1:5000/center_id')
    const data = response.json()
    return data
  } catch (error) {
    console.error(error);
  }
};
// Export an empty array to be used until the API data is loaded







export const categoryInputs = [
    {
      fieldName: "category_name",
      id: 1,
      label: "Category Name",
      type: "text",
      placeholder: "E.g: Applied Mathematics",
    },
    {
      fieldName: "no_of_quiz",
      id: 2,
      label: "Number of Quiz",
      type: "number",
      placeholder: "E.g: 10",
    },
  ];
  
  export const quizInputs = [
    {
      fieldName: "category_id",
      id: 1,
      label: "Category Id",
      type: "number",
      placeholder: "E.g: 2",
    },
    {
      fieldName: "quiz_no",
      id: 2,
      label: "Quiz Number",
      type: "text",
      placeholder: "E.g: Quiz 3",
    },
    {
      fieldName: "quiz_name",
      id: 3,
      label: "Quiz Name",
      type: "text",
      placeholder: "E.g: The Scientific Method",
    },
    {
      fieldName: "no_of_questions",
      id: 4,
      label: "Number of Questions",
      type: "number",
      placeholder: "E.g: 20",
    },
    {
      fieldName: "description",
      id: 5,
      label: "Description",
      type: "text",
      placeholder: "E.g: Let's put your memory on our first topic to test.",
    },
    {
      fieldName: "no_of_attempts",
      id: 6,
      label: "No of Attempts",
      type: "dropdown",
      options: ["one", "unlimited"],
      placeholder: "Select",
    },
    {
      fieldName: "status",
      id: 7,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];

  export const centerInputs = [
    {
      fieldName: "name",
      id: 1,
      label: "Center Name",
      type: "text",
      placeholder: "E.g: John",
    },
    {
      fieldName: "address",
      id: 2,
      label: "Address",
      type: "text",
      placeholder: "E.g: HNO .... SNO ..... City",
    },
    {
      fieldName: "phone_no",
      id: 3,
      label: "Phone Number",
      type: "text",
      placeholder: "E.g: 03-- --------",
    },
    {
      fieldName: "status",
      id: 4,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];
 
  export const accountInputs = [
    {
      fieldName: "center_id",
      id: 1,
      label: "Center Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "user_id",
      id: 2,
      label: "User Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "description",
      id: 3,
      label: "Description",
      type: "text",
      placeholder: "Info about amount",
    },
    {
      fieldName: "bank_id",
      id: 4,
      label: "Bank Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "amount",
      id: 5,
      label: "Amount",
      type: "text",
      placeholder: "E.g: 200",
    },
    {
      fieldName: "transaction_id",
      id: 6,
      label: "Transaction Id",
      type: "text",
      placeholder: "E.g: raza33010",
    },
    {
      fieldName: "transaction_type",
      id: 7,
      label: "Transaction Type",
      type: "text",
      placeholder: "E.g: Debit Or Credit",
    },
    {
      fieldName: "status",
      id: 8,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];

  export const expenseInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "user_id",
      id: 2,
      label: "User",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "description",
      id: 3,
      label: "Description",
      type: "text",
      placeholder: "Info about amount",
    },
    {
      fieldName: "account_id",
      id: 4,
      label: "Account",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "amount",
      id: 5,
      label: "Amount",
      type: "text",
      placeholder: "E.g: 200",
    },
    {
      fieldName: "transaction_id",
      id: 6,
      label: "Transaction",
      type: "text",
      placeholder: "E.g: raza33010",
    },
    {
      fieldName: "status",
      id: 8,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];


  export const userInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: Abbas",
    },
    {
      fieldName: "email",
      id: 3,
      label: "Email",
      type: "text",
      placeholder: "E.g: @gmail.com",
    },
    {
      fieldName: "phone_no",
      id: 4,
      label: "Phone Number",
      type: "text",
      placeholder: "E.g: 03-- ------",
    },
    {
      fieldName: "role_id",
      id: 5,
      label: "Role",
      type: "select", // Change the type to "select"
      placeholder: "Select a Role", // Optional placeholder for the dropdown
    },    
    {
      fieldName: "password",
      id: 6,
      label: "Password",
      type: "text",
      placeholder: "E.g: any",
    },
    {
      fieldName: "status",
      id: 7,
      label: "Status",
      type: "select", // Change the type to "select"
      placeholder: "Select a Status", // Optional placeholder for the dropdown
      // options: [
      //   { value: "0", label: "0" }, // Add your dropdown options here
      //   { value: "1", label: "1" }, // Add more options as needed
      // ],
    }, 
  ];

  export const cooInputs = [
    {
      fieldName: "center_id",
      id: 1,
      label: "Center Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: Abbas",
    },
    {
      fieldName: "email",
      id: 3,
      label: "Email",
      type: "text",
      placeholder: "E.g: @gmail.com",
    },
    {
      fieldName: "phone_no",
      id: 4,
      label: "Phone Number",
      type: "text",
      placeholder: "E.g: 03-- ------",
    },
    {
      fieldName: "role_id",
      id: 5,
      label: "Role Id",
      type: "select", // Change the type to "select"
      placeholder: "Select a Role", // Optional placeholder for the dropdown
    },    
    {
      fieldName: "password",
      id: 6,
      label: "Password",
      type: "text",
      placeholder: "E.g: any",
    },
    {
      fieldName: "status",
      id: 7,
      label: "Status",
      type: "select", // Change the type to "select"
      placeholder: "Select a Status", // Optional placeholder for the dropdown
      options: [
        { value: "0", label: "0" }, // Add your dropdown options here
        { value: "1", label: "1" }, // Add more options as needed
      ],
    }, 
  ];

  export const cooInputsn = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: Abbas",
    },
    {
      fieldName: "email",
      id: 3,
      label: "Email",
      type: "text",
      placeholder: "E.g: @gmail.com",
    },
    {
      fieldName: "phone_no",
      id: 4,
      label: "Phone Number",
      type: "text",
      placeholder: "E.g: 03-- ------",
    },
    {
      fieldName: "role_id",
      id: 5,
      label: "Role ",
      type: "select", // Change the type to "select"
      placeholder: "Select a Role", // Optional placeholder for the dropdow
    },    
    {
      fieldName: "password",
      id: 6,
      label: "Password",
      type: "text",
      placeholder: "E.g: any",
    },
    // {
    //   fieldName: "status",
    //   id: 7,
    //   label: "Status",
    //   type: "select", // Change the type to "select"
    //   placeholder: "Select a Status", // Optional placeholder for the dropdown
    //   options: [
    //     { value: "0", label: "0" }, // Add your dropdown options here
    //     { value: "1", label: "1" }, // Add more options as needed
    //   ],
    // }, 
  ];

  
  export const batchInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: C-12",
    },
    {
      fieldName: "year",
      id: 3,
      label: "Year",
      type: "text",
      placeholder: "E.g: 20--",
    },
    // {
    //   fieldName: "status",
    //   id: 3,
    //   label: "Status",
    //   type: "number",
    //   placeholder: "E.g: 1 or 0",
    // },
  ];  

  export const nbatchInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: C-12",
    },
    {
      fieldName: "status",
      id: 3,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  

  export const classInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: X",
    },
    {
      fieldName: "total_students",
      id: 3,
      label: "Total Students",
      type: "text",
      placeholder: "E.g: 24",
    },
    {
      fieldName: "subjects_id",
      id: 4,
      label: "Subject Id",
      type: "text",
      placeholder: "E.g: 2",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ]; 
  export const cchapterInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Chapter Name",
      type: "text",
      placeholder: "Write chapter name",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ]; 

  export const unitInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Unit",
      type: "text",
      placeholder: "Write unit name",
    },
    {
      fieldName: "month",
      id: 3,
      label: "Month in which it will be completed",
      type: "month",
      placeholder: "write month",
    },
    {
      fieldName: "description",
      id: 4,
      label: "Description about Unit",
      type: "text",
      placeholder: "Give comments about units.....",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ]; 


  export const nclassInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Name",
      type: "text",
      placeholder: "E.g: X",
    },
    {
      fieldName: "total_students",
      id: 3,
      label: "Total Students",
      type: "text",
      placeholder: "E.g: 24",
    },
    {
      fieldName: "subjects_id",
      id: 4,
      label: "Subject Id",
      type: "text",
      placeholder: "E.g: 2",
    },
    // {
    //   fieldName: "status",
    //   id: 5,
    //   label: "Status",
    //   type: "number",
    //   placeholder: "E.g: 1 or 0",
    // },
  ]; 

  export const dutyInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "user_id",
      id: 2,
      label: "Users",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "job",
      id: 3,
      label: "Job",
      type: "text",
      placeholder: "E.g Invagilator",
    },
    {
      fieldName: "date",
      id: 4,
      label: "Date",
      type: "date",
      placeholder: "E.g: YYYY-MM-DD",
    },
    {
      fieldName: "duty_time",
      id: 5,
      label: "Time",
      type: "time",
      placeholder: "E.g: HH:MM:SS",
    },
    {
      fieldName: "description",
      id: 6,
      label: "Description",
      type: "text",
      placeholder: "E.g: John",
    },
    {
      fieldName: "status",
      id: 7,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];

  export const groupInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "class_id",
      id: 2,
      label: "Class",
      type: "text",
      placeholder: "E.g:X",
    },
    {
      fieldName: "batch_id",
      id: 3,
      label: "Batch",
      type: "text",
      placeholder: "E.g C-?",
    },
    {
      fieldName: "subject_id",
      id: 4,
      label: "Subjects",
      type: "text",
      placeholder: "E.g: maths,physics....",
    },
    {
      fieldName: "name",
      id: 5,
      label: "Group Name",
      type: "text",
      placeholder: "E.g: ",
    },
    {
      fieldName: "status",
      id: 7,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ]; 

  export const studentInputs = [
    {
      fieldName: "name",
      id: 1,
      label: "Name",
      type: "text",
      placeholder: "E.g Abbas",
    },
    {
      fieldName: "phone",
      id: 2,
      label: "Phone Number",
      type: "text",
      placeholder: "E.g 03456667771",
    },
    {
      fieldName: "father_name",
      id: 3,
      label: "Father Name",
      type: "text",
      placeholder: "E.g Abbas",
    },
    {
      fieldName: "father_phone",
      id: 4,
      label: "Father Phone Number",
      type: "text",
      placeholder: "E.g 03456667771",
    },
    {
      fieldName: "email",
      id: 5,
      label: "Email",
      type: "text",
      placeholder: "E.g @gmail.com",
    },
    {
      fieldName: "address",
      id: 6,
      label: "Address",
      type: "text",
      placeholder: "E.g H.NO .... S.NO",
    },
    {
      fieldName: "batch_id",
      id: 9,
      label: "Batch",
      type: "text",
      placeholder: "E.g 1",
    },
    {
      fieldName: "class_id",
      id: 10,
      label: "Class",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
    {
      fieldName: "group_id",
      id: 12,
      label: "Group",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
    {
      fieldName: "description",
      id: 13,
      label: "About Student",
      type: "text",
      placeholder: "E.g: write about student",
    },
    {
      fieldName: "ref_name",
      id: 14,
      label: "Reference Name",
      type: "text",
      placeholder: "E.g: refernce name .....",
    },
    {
      fieldName: "ref_phone_no",
      id: 15,
      label: "Refernce Phone Number",
      type: "text",
      placeholder: "E.g: number should be of 11 digits",
    },
    {
      fieldName: "last_class",
      id: 16,
      label: "Last Class Attended",
      type: "text",
      placeholder: "E.g: 1 or 0",
    },
    {
      fieldName: "last_grade",
      id: 17,
      label: "Last Grade",
      type: "text",
      placeholder: "E.g: A+,A.....",
    },
    {
      fieldName: "percentage",
      id: 18,
      label: "Last Percentage",
      type: "text",
      placeholder: "E.g: 90....",
    },
  ];

  export const lateformInputs = [
    {
      fieldName: "reason",
      id: 2,
      label: "Reason For Late",
      type: "text",
      placeholder: "E.g any....",
    },
    {
      fieldName: "time",
      id: 3,
      label: "Time",
      type: "time",
      placeholder: "E.g ",
    },
    {
      fieldName: "date",
      id: 4,
      label: "Date",
      type: "Date",
      placeholder: "E.g .",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];
  export const timetableInputs = [
    {
      fieldName: "user_id",
      id: 2,
      label: "Teacher Name",
      type: "text",
      placeholder: "E.g any....",
    },
    {
      fieldName: "class_id",
      id: 3,
      label: "Class",
      type: "text",
      placeholder: "E.g ",
    },
    {
      fieldName: "subject_id",
      id: 4,
      label: "Subject",
      type: "text",
      placeholder: "E.g .",
    },
    {
      fieldName: "day",
      id: 5,
      label: "Day",
      type: "day",
      placeholder: "E.g .",
    },    
    {
      fieldName: "start_slot_time",
      id: 6,
      label: "Start Time",
      type: "time",
      placeholder: "E.g .",
    },
    {
      fieldName: "end_slot_time",
      id: 7,
      label: "End Time",
      type: "time",
      placeholder: "E.g .",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];



  export const teacher_attendanceInputs = [
    {
      fieldName: "user_id",
      id: 2,
      label: "Teacher Name",
      type: "text",
      placeholder: "E.g any....",
    },
    {
      fieldName: "class_id",
      id: 3,
      label: "Class",
      type: "text",
      placeholder: "E.g ",
    },
    {
      fieldName: "subject_id",
      id: 4,
      label: "Subject",
      type: "text",
      placeholder: "E.g .",
    },
    {
      fieldName: "day",
      id: 5,
      label: "Day",
      type: "day",
      placeholder: "E.g .",
    },    
    {
      fieldName: "start_slot_time",
      id: 6,
      label: "Start Time",
      type: "time",
      placeholder: "E.g .",
    },
    {
      fieldName: "end_slot_time",
      id: 7,
      label: "End Time",
      type: "time",
      placeholder: "E.g .",
    },
    {
      fieldName: "teacher_status",
      id: 8,
      label: "Teacher Status",
      type: "text",
      placeholder: "E.g .",
    },
    {
      fieldName: "date",
      id: 9,
      label: "Date",
      type: "date",
      placeholder: "E.g .",
    },
    {
      fieldName: "user_rep_id",
      id: 10,
      label: "Replacment Teacher",
      type: "text",
      placeholder: "E.g .",
    },
    {
      fieldName: "subject_rep_id",
      id: 12,
      label: "Replacement Subject",
      type: "text",
      placeholder: "E.g .",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];

  export const leaveformInputs = [
    {
      fieldName: "reason",
      id: 2,
      label: "Reason For Leave",
      type: "text",
      placeholder: "E.g any....",
    },
    {
      fieldName: "start_date_time",
      id: 3,
      label: "From Date",
      type: "datetime-local",
      placeholder: "E.g ",
    },
    {
      fieldName: "end_date_time",
      id: 4,
      label: "To Date",
      type: "datetime-local",
      placeholder: "E.g ",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];
  export const halfleaveformInputs = [
    {
      fieldName: "reason",
      id: 2,
      label: "Reason For Leave",
      type: "text",
      placeholder: "E.g any....",
    },
    {
      fieldName: "start_date_time",
      id: 3,
      label: "From Date",
      type: "datetime-local",
      placeholder: "E.g ",
    },
    {
      fieldName: "end_date_time",
      id: 4,
      label: "To Date",
      type: "datetime-local",
      placeholder: "E.g ",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];
  export const absentformInputs = [
    {
      fieldName: "reason",
      id: 2,
      label: "Reason For Absent",
      type: "text",
      placeholder: "E.g any....",
    },
    {
      fieldName: "date",
      id: 3,
      label: "Date",
      type: "date",
      placeholder: "E.g ",
    },

    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];

  export const feesformInputs = [
    // {
    //   fieldName: "reason",
    //   id: 2,
    //   label: "Reason For Absent",
    //   type: "text",
    //   placeholder: "E.g any....",
    // },
    {
      fieldName: "date",
      id: 3,
      label: "Date",
      type: "date",
      placeholder: "E.g ",
    },
    {
      fieldName: "amount",
      id: 4,
      label: "Amount",
      type: "text",
      placeholder: "E.g ",
    },
    {
      fieldName: "amount_type",
      id: 5,
      label: "Amount Type",
      type: "text",
      placeholder: "E.g ",
    },
    {
      fieldName: "description",
      id: 6,
      label: "Description",
      type: "text",
      placeholder: "E.g ",
    },
    {
      fieldName: "status",
      id: 11,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];


  export const subjectInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Subject Name",
      type: "text",
      placeholder: "E.g: Subject Name",
    },
    // {
    //   fieldName: "class_id",
    //   id: 3,
    //   label: "Class",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "user_id",
      id: 4,
      label: "User",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  

  export const nsubjectInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Subject Name",
      type: "text",
      placeholder: "E.g: Subject Name",
    },
    // {
    //   fieldName: "class_id",
    //   id: 3,
    //   label: "Class",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "user_id",
      id: 4,
      label: "User",
      type: "text",
      placeholder: "E.g: 1",
    },
    // {
    //   fieldName: "status",
    //   id: 5,
    //   label: "Status",
    //   type: "number",
    //   placeholder: "E.g: 1 or 0",
    // },
  ];  

  export const teacherInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "user_id",
      id: 2,
      label: "Teacher",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "subject_id",
      id: 3,
      label: "Subject",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "class_id",
      id:4,
      label: "Class",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  


  export const resultInputs = [
    {
      fieldName: "center_id",
      id: 1,
      label: "Center Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "exam_id",
      id: 2,
      label: "Exam Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "student_id",
      id: 3,
      label: "Student Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "mark",
      id:4,
      label: "Marks",
      type: "text",
      placeholder: "E.g: Enter Marks",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  

  export const resultgenerationInputs = [
    {
      fieldName: "result_type",
      id: 1,
      label: "Result For",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "class_id",
      id: 2,
      label: "Class Name",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "student_id",
      id: 3,
      label: "Student Name",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "type",
      id:4,
      label: "Result for a/the",
      type: "text",
      placeholder: "E.g: Enter Marks",
    },
    {
      fieldName: "month",
      id: 5,
      label: "Month",
      type: "month",
      placeholder: "E.g: 1 or 0",
    },
  ];  


  export const roleInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Role Name",
      type: "text",
      placeholder: "write role name",
    },
    {
      fieldName: "screen_id",
      id: 3,
      label: "Screen",
      type: "text",
      placeholder: "E.g: ",
    },
    {
      fieldName: "status",
      id: 4,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  


  export const studentrecordInputs = [
    {
      fieldName: "center_id",
      id: 1,
      label: "Center Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "student_id",
      id: 2,
      label: "Student Id",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "description",
      id: 3,
      label: "Description",
      type: "text",
      placeholder: "E.g: description about student",
    },    {
      fieldName: "date",
      id: 4,
      label: "Date",
      type: "text",
      placeholder: "E.g: YYYY-MM-DD",
    },
    {
      fieldName: "status",
      id: 5,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];

  export const rolescreenInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center Id",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "name",
      id: 2,
      label: "Screen Name",
      type: "text",
      placeholder: "Enter screen name",
    },
    {
      fieldName: "status",
      id: 3,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  

  export const examinationInputs = [
    // {
    //   fieldName: "center_id",
    //   id: 1,
    //   label: "Center",
    //   type: "text",
    //   placeholder: "E.g: 1",
    // },
    {
      fieldName: "class_id",
      id: 2,
      label: "Class",
      type: "text",
      placeholder: "E.g: Abbas",
    },
    {
      fieldName: "subject_id",
      id: 3,
      label: "Subject",
      type: "text",
      placeholder: "E.g: 1",
    },
    {
      fieldName: "type",
      id: 4,
      label: "Paper Type",
      type: "text",
      placeholder: "E.g: Abbas",
    },
    {
      fieldName: "month",
      id: 5,
      label: "Month",
      type: "month",
      placeholder: "E.g: September",
    },
    {
      fieldName: "date",
      id: 6,
      label: "Date",
      type: "Date",
      placeholder: "E.g: YYYY-MM-DD",
    },
    {
      fieldName: "total_marks",
      id: 7,
      label: "Total Marks",
      type: "text",
      placeholder: "E.g: 60",
    },
    {
      fieldName: "user_id",
      id: 8,
      label: "Invigilator",
      type: "text",
      placeholder: "E.g: Abbas",
    },
    {
      fieldName: "duration",
      id: 15,
      label: "Duration",
      type: "text",
      placeholder: "E.g: how many hours???",
    },
    {
      fieldName: "schedule_start_time",
      id: 9,
      label: "Scheduled Start Time",
      type: "time",
      placeholder: "E.g: HH:MM:SS",
    },
    {
      fieldName: "schedule_end_time",
      id: 10,
      label: "Scheduled End Time",
      type: "time",
      placeholder: "E.g: HH:MM:SS",
    },
    {
      fieldName: "start_time",
      id: 11,
      label: "Start Time",
      type: "time",
      placeholder: "E.g: HH:MM:SS",
    },
    {
      fieldName: "end_time",
      id: 12,
      label: "End Time",
      type: "time",
      placeholder: "E.g: HH:MM:SS",
    },
    {
      fieldName: "checking_status",
      id: 13,
      label: "Checking Status",
      type: "text",
      placeholder: "E.g: Done",
    },
    {
      fieldName: "status",
      id: 14,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];  
  const total_marks = localStorage.getItem('total_marks');

  export const awardlistInputs = [
    {
      fieldName: "number",
      id: 2,
      label: "Obtain Number",
      type: "number",
      placeholder: `Enter number out of ${total_marks}`,
    },
  ];
  

















  export const questionInputs = [
    {
      fieldName: "quiz_id",
      id: 1,
      label: "Quiz Id",
      type: "number",
      placeholder: "E.g: 2",
    },
    {
      fieldName: "question",
      id: 2,
      label: "Question",
      type: "text",
      placeholder: "E.g: What is the smallest unit of life?",
    },
    {
      fieldName: "option_1",
      id: 3,
      label: "Option 1",
      type: "text",
      placeholder: "E.g: Cell",
    },
    {
      fieldName: "option_2",
      id: 4,
      label: "Option 2",
      type: "text",
      placeholder: "E.g: Atom",
    },
    {
      fieldName: "option_3",
      id: 5,
      label: "Option 3",
      type: "text",
      placeholder: "E.g: Molecule",
    },
    {
      fieldName: "option_4",
      id: 6,
      label: "Option 4",
      type: "text",
      placeholder: "E.g: Tissue",
    },
    {
      fieldName: "correct_option",
      id: 7,
      label: "Correct Option",
      type: "text",
      placeholder: "E.g: Cell",
    },
    {
      fieldName: "status",
      id: 8,
      label: "Status",
      type: "number",
      placeholder: "E.g: 1 or 0",
    },
  ];
  