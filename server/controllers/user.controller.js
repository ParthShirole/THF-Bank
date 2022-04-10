import UserModel from "../models/user.js"
import TransactionModel from "../models/transactions.js"
import DepositModel from "../models/deposit.js"
import fdModel from "../models/fd.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register_user = async(req, res) => {
    console.log(req.body)
    try {
        //Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //Create entry
        await UserModel.create({
            f_name: req.body.firstName,
            l_name: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            contact: req.body.contact,
            aadhar: req.body.aadhar,
            balance: req.body.balance,
            city: req.body.city,
            state: req.body.region,
            zip: req.body.zip,
        })
        //Send confirmation
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: 'duplicate email'})
    }
}

export const login_user = async(req, res) => {
    //Find user using email
    const user = await UserModel.findOne({
        email: req.body.email,
    })
    //Validate user
    if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

    //Compare stored hashed password with entered password
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
        //Assign token
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token})
	} else {
		return res.json({ status: 'error', user: false })
	}
}



export const get_balance = async(req, res) => {
    //Get token 
    const token = req.headers['x-access-token']
    try {
        //Verify token
        const decoded = jwt.verify(token, 'secret123')
        const userEmail = decoded.email
        //Find user with email as userEmail
        const user = await UserModel.findOne({email: userEmail})
        //Send response with the balance
        res.json({status: 'ok', balance: user.balance})
    } catch (error) {
        console.log(error)
        res.json({status: 'error', error: 'Invalid token'})
    }
}

//Deposit money
export const update_balance = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const userEmail = decoded.email
        //Increment balance with the entered value as input
        const user = await UserModel.updateOne(
            {email: userEmail},
            {$inc: {balance: req.body.balance}}
        )
        
        //Create a new deposit entry 
        const newDeposit = await DepositModel.create({
            customerId: user._id,
            name: user.name,
            amount: req.body.balance,
            
        })

        console.log(newDeposit.createdAt)

        return res.json({status: 'ok', message: "updated"})
    } catch (error) {
        console.log(error)
        return res.json({status: error, error: "Invalid token"})
    }
}

export const get_info = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
       
        const userEmail = decoded.email
        const user = await UserModel.findOne({
            email: userEmail
        })

        const userFd = await fdModel.findOne({
            id: user._id,
        })

        let fd = 0
        userFd ? fd = userFd.amount : fd = 0


        return res.json({
            status: 'ok', 
            id: user._id.toHexString(),
            email: user.email, 
            fname: user.f_name,
            lname: user.l_name,
            address: user.address,
            contact: user.contact,
            aadhar: user.aadhar,
            city: user.city,
            state: user.state,
            zip: user.zip,
            balance: user.balance,
            fd_amount: fd,

        })
    } catch (error) {
        return res.json({status: 'error', error: "Invalid token"})
    }
}

export const transfer_balance = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const userSenderEmail = decoded.email
        const userSender = await UserModel.findOne({
            email: userSenderEmail
        })

        

    
        const userReceiverEmail = req.body.email
        const transferBalance = req.body.balance
    
        const userReceiver = await UserModel.findOne({
            email: userReceiverEmail,
        })

        userReceiver.balance = Number(userReceiver.balance) + Number(transferBalance)  
        userSender.balance = Number(userSender.balance) - Number(transferBalance)
        userSender.save()
        userReceiver.save()

        await TransactionModel.create({
            senderId: userSender._id,
            receiverId: userReceiver._id,
            receiverFName: userReceiver.f_name,
            receiverLName: userReceiver.l_name,
            amount: transferBalance,
            desc: req.body.desc
        })

        return res.json({status: 'ok', message: "successful"})
        
    } catch (error) {
        console.log(error)
        return res.json({status: 'error', error: "failed"})
    }
}


export const fixed_deposit = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const userEmail = decoded.email
        const amount = req.body.amount
        const time = req.body.time
        const user = await UserModel.findOne(
            {email: userEmail}
        )
        console.log(userEmail)
        console.log(req.body.fd)

        user.balance = user.balance - amount
        user.fd_balance = user.fd_balance + amount
        user.save()

        const userFd = await fdModel.findOne({
            id: user._id,
        })

        if(userFd){
            userFd.amount = Number(userFd.amount) + Number(amount)
            userFd.save()
        }
        else{
            await fdModel.create({
                id: user._id,
                amount: amount,
                duration: time
            })
        }

        return res.json({status: 'ok', message: 'added to fd'})
    } catch (error) {
        console.log(error)
        return res.json({status: 'error'})
        
    }
}

// export const create_fd = async(req, res) => {
//     const token = req.headers['x-access-token']
//     try {
//         const decoded = jwt.verify(token, 'secret123')
//         const userEmail = decoded.email
//         const user = await UserModel.findOne({
//             email: userEmail
//         })


//     } catch (error) {
        
//     }
// }
export const update_fd = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const userEmail = decoded.email
        const user = await UserModel.find({
            email: userEmail,
        })

        const userFd = await fdModel.findOne({
            id: user._id
        })

        const curr = new Date(Date.now());
        const curr_unix = curr.getTime();

        const initTime = userFd.createdAt();
        const init_unix = initTime.getTime();

        console.log("curr:"+curr);
        console.log("prev:"+init_time);

        const timeinMinutes = Math.floor((curr_unix-init_unix)/60000);
        const compoundamount = 1000*(Math.pow((1+2/526500/100),(timeinMinutes*526500)));
        
        userFd.amount = userFd.amount + compoundamount
        userFd.save()

        res.json({status: 'ok', message: 'fd updated'})
        
    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: 'couldnt update fd'})
    }
    
}

export const get_transactions = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const userEmail = decoded.email
        console.log(userEmail)
        const user = await UserModel.findOne({
            email: userEmail,
        })
       
        const sent = await TransactionModel.find({
            senderId: user._id,
        })

        const received = await TransactionModel.find({
            receiverId: user._id
        })

        return res.json({status: 'ok', objSent: sent, objReceived: received})
    } catch (error) {
        console.log(error)
        return res.json({status: 'errpr', error: 'failed to fetch transaction'})
    }
}

export const get_updated_fd = async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const userEmail = decoded.email
        console.log(userEmail)
        const user = await UserModel.findOne({
            email: userEmail,
        })

        const userFd = await fdModel.findOne({
            id: user._id,
        })

        let addFd = 0
        userFd ? addFd = userFd.amount : addFd = 0

        console.log(userFd.amount)

        return res.json({status: 'ok', newFd: addFd})
    } catch(error){
        console.log(error)
        return res.json({status: 'error', error: 'couldnt fetch updated fd'})

    }
}




