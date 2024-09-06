// https://jsonplaceholder.typicode.com/todos/1

const url = "https://jsonplaceholder.typicode.com/photos";
async function getPhotos() {
  try {
    const response = await axios(url);
    console.log(response);
    // if (response.status ===200 ){
    //     alert('request was succesefull')
    //     console.log(response.data);

    // }
  } catch (error) {
    console.log(error);
  }
}
getPhotos();

// postrequest

// async function addProducts(){
//    try {
//     const product = {
//         imageUrl:,
//         title:"nokia",
//         price: 199,
//         description:"Phone"
//     }

//     const responce = await axios.post (url, product)
//    } catch (error) {

//    }
// }
