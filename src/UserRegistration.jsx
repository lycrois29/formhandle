import { useState } from "react";

const hobbies = [
  {
    value: "music",
    name: "Music",
  },
  {
    value: "movie",
    name: "Movies",
  },
  {
    value: "plastic-model",
    name: "Plastic Model",
  },
];

const genders = [
  {
    value: "male",
    name: "Male",
  },
  {
    value: "female",
    name: "Female",
  },
  {
    value: "others",
    name: "Others",
  },
];

const departments = {
  accounting: {
    name: "Accounting",
    jobs: [
      {
        value: "accountant",
        name: "Accountant",
      },
      {
        value: "senior-accountant",
        name: "Senior Accountant",
      },
      {
        value: "payroll-officer",
        name: "Payroll Officer",
      },
    ],
  },

  it: {
    name: "IT",
    jobs: [
      {
        value: "developer",
        name: "Developer",
      },
      {
        value: "system-analyst",
        name: "System Analyst",
      },
      {
        value: "it-support",
        name: "IT Support",
      },
    ],
  },

  hr: {
    name: "Human Resources",
    jobs: [
      {
        value: "hr-officer",
        name: "HR Officer",
      },
      {
        value: "recruiter",
        name: "Recruiter",
      },
      {
        value: "hr-manager",
        name: "HR Manager",
      },
    ],
  },
};

const defaultForm = {
  username: "",
  firstname: "",
  lastname: "",
  gender: "",
  hobbies: [],
  department: "",
  job: "",
};

function UserRegistration() {
  const [formData, setFormData] = useState(defaultForm);
  const [submittedData, setSubmittedData] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleDepartmentChange(event) {
    const selectedDepartment = event.target.value;

    setFormData({
      ...formData,
      department: selectedDepartment,
      job: "",
    });
  }

  function handleHobbyChange(event) {
    const { value, checked } = event.target;

    let updatedHobbies;

    if (checked) {
      updatedHobbies = [...formData.hobbies, value];
    } else {
      updatedHobbies = formData.hobbies.filter(
        (hobby) => hobby !== value
      );
    }

    setFormData({
      ...formData,
      hobbies: updatedHobbies,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmittedData({
      ...formData,
      hobbies: [...formData.hobbies],
    });
  }

  function handleReset() {
    setFormData(defaultForm);
    setSubmittedData(null);
  }

  const availableJobs = formData.department
    ? departments[formData.department].jobs
    : [];

  function getHobbyNames(selectedHobbies) {
    return selectedHobbies
      .map((selectedHobby) => {
        const foundHobby = hobbies.find(
          (hobby) => hobby.value === selectedHobby
        );

        return foundHobby ? foundHobby.name : selectedHobby;
      })
      .join(", ");
  }

  function getGenderName(selectedGender) {
    const foundGender = genders.find(
      (gender) => gender.value === selectedGender
    );

    return foundGender ? foundGender.name : "";
  }

  function getJobName(department, selectedJob) {
    if (!department || !selectedJob) {
      return "";
    }

    const foundJob = departments[department].jobs.find(
      (job) => job.value === selectedJob
    );

    return foundJob ? foundJob.name : "";
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>User Registration</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formArea}>
            <div style={styles.formRow}>
              <label style={styles.label} htmlFor="username">
                Username
              </label>

              <input
                style={styles.input}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formRow}>
              <label style={styles.label} htmlFor="firstname">
                Firstname
              </label>

              <input
                style={styles.input}
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formRow}>
              <label style={styles.label} htmlFor="lastname">
                Lastname
              </label>

              <input
                style={styles.input}
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.formRow}>
              <span style={styles.label}>Gender</span>

              <div>
                {genders.map((gender) => (
                  <label key={gender.value} style={styles.option}>
                    <input
                      type="radio"
                      name="gender"
                      value={gender.value}
                      checked={formData.gender === gender.value}
                      onChange={handleInputChange}
                    />

                    {gender.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formRow}>
              <span style={styles.label}>Hobbies</span>

              <div>
                {hobbies.map((hobby) => (
                  <label key={hobby.value} style={styles.option}>
                    <input
                      type="checkbox"
                      name="hobbies"
                      value={hobby.value}
                      checked={formData.hobbies.includes(hobby.value)}
                      onChange={handleHobbyChange}
                    />

                    {hobby.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formRow}>
              <label style={styles.label} htmlFor="department">
                Department
              </label>

              <select
                style={styles.select}
                id="department"
                name="department"
                value={formData.department}
                onChange={handleDepartmentChange}
              >
                <option value="">-</option>

                {Object.entries(departments).map(
                  ([departmentValue, department]) => (
                    <option
                      key={departmentValue}
                      value={departmentValue}
                    >
                      {department.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div style={styles.formRow}>
              <label style={styles.label} htmlFor="job">
                Job Position
              </label>

              <select
                style={styles.select}
                id="job"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                disabled={!formData.department}
              >
                <option value="">-</option>

                {availableJobs.map((job) => (
                  <option key={job.value} value={job.value}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr style={styles.line} />

          <div style={styles.buttonArea}>
            <button
              type="button"
              onClick={handleReset}
              style={styles.resetButton}
            >
              Reset
            </button>

            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>

        {submittedData && (
          <div style={styles.result}>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Username</span>
              <span>{submittedData.username || "-"}</span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Firstname</span>
              <span>{submittedData.firstname || "-"}</span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Lastname</span>
              <span>{submittedData.lastname || "-"}</span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Hobbies</span>
              <span>
                {submittedData.hobbies.length > 0
                  ? getHobbyNames(submittedData.hobbies)
                  : "-"}
              </span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Gender</span>
              <span>
                {getGenderName(submittedData.gender) || "-"}
              </span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Department</span>
              <span>
                {submittedData.department
                  ? departments[submittedData.department].name
                  : "-"}
              </span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Job</span>
              <span>
                {getJobName(
                  submittedData.department,
                  submittedData.job
                ) || "-"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#252525",
    padding: "40px",
  },

  container: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "16px",
    backgroundColor: "white",
    color: "#666078",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    fontSize: "18px",
    fontWeight: "normal",
    margin: "0",
    paddingBottom: "8px",
    borderBottom: "1px solid #b8b4c0",
  },

  formArea: {
    paddingTop: "14px",
    paddingBottom: "8px",
  },

  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  label: {
    width: "125px",
    flexShrink: 0,
  },

  input: {
    width: "165px",
    height: "24px",
    boxSizing: "border-box",
  },

  select: {
    minWidth: "85px",
    height: "26px",
  },

  option: {
    marginRight: "10px",
  },

  line: {
    border: "none",
    borderTop: "1px solid #b8b4c0",
  },

  buttonArea: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    paddingTop: "8px",
    paddingBottom: "8px",
  },

  resetButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #666",
    cursor: "pointer",
  },

  submitButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid darkblue",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  },

  result: {
    marginTop: "8px",
    paddingTop: "12px",
    borderTop: "1px solid #b8b4c0",
  },

  resultRow: {
    display: "flex",
    marginBottom: "6px",
  },

  resultLabel: {
    width: "100px",
  },
};

export default UserRegistration;