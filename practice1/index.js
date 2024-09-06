// const people = [];

// // post - method that helsps us to create resource on the server (in databasa)
// const url = "https://solar-poised-salad.glitch.me/todos";

// const getTodos = () => {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// };

// getTodos();

// const todo = {
//   title: "learn",
//   isCompleted: "false",
// };

// const addTodo = () => {
//   fetch(url, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(todo),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// };
// const getBtn = document.querySelector("#get");
// const createBtn = document.querySelector("#post");
// getBtn.addEventListener("click", () => {
//   getTodos();
// });

// createBtn.addEventListener("click", () => {
//   addTodo();
// });

//////////

// const url2 = "https://solar-poised-salad.glitch.me/students";

// const nameSurname = document.querySelector (#"surName")
// const mail= document.querySelector (#"email")
// const button = document.querySelector (#"save")

// const getStudents = () => {
//   fetch(url2)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// };

// getStudents();

// const addStudent = () => {
//   const students = {
//     fullName: "name.value",
//     email: "email.value",
//     status: "true",
//   };
//   fetch(url2, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(students),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// };
// const surName = document.querySelector("#surName");
// const email = document.querySelector("#email");
// surName.addEventListener("click", () => {
//   getStudents();
// });

// email.addEventListener("click", () => {
//   getStudents();
// });

const url = "https://solar-poised-salad.glitch.me/students";
const inputName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputStatus = document.getElementById("status");
const button = document.querySelector("#add");
const ulEl = document.querySelector("ul");
const updateBtn = document.querySelector("#update");

const getStudent = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const filterData = data.filter(
        (f) => f.fullname !== "" && f.email !== ""
      );
      console.log(filterData);
      filterData.forEach((element) => {
        let { fullname, email, status } = element;
        // console.log(fullname, email, status);

        const renderStudent = `
        <li>${fullname}</li>
        <li>Email: ${email}</li>
        <li> ${status ? "🟢" : "🔴"}</li>`;

        ulEl.insertAdjacentHTML("beforeend", renderStudent);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

getStudent();

const addStudent = () => {
  inputName.value = "";
  inputEmail.value = "";
  const studentData = {
    fullname: inputName.value,
    email: inputEmail.value,
    status: inputStatus.value,
  };
  console.log(studentData);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error); // Обработка ошибок
    });
};

button.addEventListener("click", () => {
  addStudent();
});

const updateStudent = () => {
  const updatedStudent = {
    fullname: "Gaukhar",
    // email: "gggggg@gmail.com",
    email: inputEmail.value,
  };
  fetch(url + "/9", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getStudent();
    })
    .catch((error) => console.log(error));
};
updateBtn.addEventListener("click", updateStudent);
