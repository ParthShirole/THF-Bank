// import { useNavigate } from "react-router-dom"



// export const registerUser = async (event) => {
//     event.preventDefault()
    
//     const response = await fetch("http://localhost:8000/api/register", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name,
//             email,
//             password
//         }),
//     })

//     const data = await response.json()
//     console.log(data)

//     if(data.status === 'ok'){
//         navigate('/login')
//     }
// }

// export const loginUser = async (event) => {
//     event.preventDefault()

//     const response = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email,
//             password,
//         }),
//     })

//     const data = await response.json()
//     console.log(data)

//     if(data.user){
//         localStorage.setItem('token', data.user)
//         alert("Login Successful")
//         window.location.href = '/profile'
//     }
//     else{
//         alert("Incorrect Credentials")
//     }
// }

// export const populateBalance = async() => {

//     const req = await fetch('http://localhost:8000/api/balance', {
//         headers: {
//             'x-access-token': localStorage.getItem('token')
//         },
//     })

//     const data = await req.json()
//     if (data.status === 'ok') {
//         setBalance(data.balance)
//     }
//     else {
//         alert(data.error)
//     }
// }

// export const populateInfo = async() =>  {

//     const req = await fetch('http://localhost:8000/api/user', {
//         headers: {
//             'x-access-token': localStorage.getItem('token')
//         },
//     })

//     const data = await req.json()
//     if (data.status === 'ok') {
//         setName(data.name)
//         setEmail(data.email)
//     }
//     else {
//         alert(data.error)
//     }
// }

// export const updateBalance = async(event) => {
//     event.preventDefault()

//     const req = await fetch('http://localhost:8000/api/balance', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': localStorage.getItem('token')
//         },
//         body: JSON.stringify({

//             balance: tempBalance

//         })
//     })

//     const data = await req.json()
//     console.log(data.status)
//     if (data.status === 'ok') {

//         setBalance(tempBalance)
//         setTempBalance(0)
//     }
//     else {
//         alert("error")
//     }
// }


// export const transferMoney = async(event) => {
//     event.preventDefault()

//     const req = await fetch('http://localhost:8000/api/transaction', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': localStorage.getItem('token')
//         },
//         body: JSON.stringify({
//             balance: sendBalance,
//             email: receiverEmail,
//         })
//     })

//     const data = await req.json()
//     console.log(data)
//     if(data.status === 'ok'){
//         navigate('/transaction')
//     }
// }


// export const fixedDeposit = async(event) => {
//     event.preventDefault()

//     const req = await fetch('http://localhost:8000/api/fd', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': localStorage.getItem('token')
//         },
//         body: JSON.stringify({
//             fd: addFd,
//             // duration: duration,
//         })
//     })

//     const data = await req.json()
//     console.log(data)
//     if(data.status === 'ok'){
//         navigate('/fixedeposit')
//     }
// }

