

// module.exports.loginPost = (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(400).json({
//             message: 'email and pasword are required'
//         });
//         return;
//     }
//     if (!email.includes('@')) {
//         res.status(400).json({
//             message: 'email must be  valid',
//         });
//         return;
//     }
//     return res.status(200).json({
//         message: 'login successfull',
//         status: 'success',
//         token: new Date().getTime().toLocaleString(),
//         user : { email, password},
//         data: {
//             email,
//             password
//         }     
//     })

// }