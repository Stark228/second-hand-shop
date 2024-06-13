

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require('multer');
const session = require('express-session');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }))

app.use(express.json());


//upoad image
app.use('/image',express.static('./uploads'));

//middleware
app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  auth: {
    user: 'b422d607bb43d0ee797c735f41ed1025',
    pass: 'bb75bc915a363cd9690d6c5b6ca362d9'
  }
});




app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));



//ROUTES

////////////////
  const storage = multer.diskStorage({
    destination: './uploads', // Uploads folder
    
    filename: (req, file, cb) => {
        cb(null, `image-${file.originalname}`); // Use original name for the uploaded file
    }
});

  const fileFilter = (req, file, cb) =>{
    //reject
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    } else{
        cb(null,false);
    } 
  };
  // Initialize multer upload object
  const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
    });
/////////////////
//create a todo





app.post("/furnitures",upload.single("image"), async (req,res) => {
    try{
        const { filename } = req.file;
        const {title,price,location,number,used,reason,category} = req.body;  
        const newFurniture = await pool.query("INSERT INTO furniture (title,price,location,number,used,reason,image,category) VALUES($1, $2, $3, $4,$5,$6,$7,$8) RETURNING * ",
            [title,price,location,number,used,reason,filename,category]
        );
        res.json(newFurniture.rows[0])
    } catch(err){
        console.error(err.message);
    }
})


app.post('/signup', (req, res) => {
  const { email, firstName, password, phoneNumber } = req.body;

  // Check if the email already exists
  pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (result.rows.length > 0) {
        // Email already exists, return an error response
        res.status(400).json({ message: 'Email already exists' });
      } else {
        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            // Store the user in the database
            pool.query(
              'INSERT INTO users (email, First_name, hash_password, phone_number) VALUES ($1, $2, $3, $4)',
              [email, firstName, hash, phoneNumber],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Internal server error' });
                } else {
                  console.log('User added');
                  res.status(200).json({ message: 'User added' });
                }
              }
            );
          }
        });
      }
    }
  });
});

  //api to get users
  app.get('/signup',async(req,res)=>{
    try {
        const user = await pool.query('SELECT * FROM users')
        res.json(user.rows)
    } catch (error) {
        console.error(error)
        
    }
  })

  //delete

  app.delete("/signup/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteFurnitures = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json("Furniture was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})
  //api to login 
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user with given email exists in the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Check if the provided password matches the hashed password stored in the database
    const passwordMatches = await bcrypt.compare(password, user.hash_password);
  
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log("login")
    // Set the user session
    req.session.user = {
      email: user.email,
      First_name: user.first_name,
      // lastName: user.last_name,
    };
    // console.log(req.session.user)
    const username = req.session.user.First_name;
    console.log(username)
  res.status(200).json({ email:user.email ,username});
  });

  app.post('/login', (req, res) => {
  // Check user credentials and generate a JWT if authenticated
  const user = authenticateUser(req.body.username, req.body.password);
  if (user) {
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


//forgotapassword
  app.post("/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if user with given email exists in the database
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a password reset token (e.g., using a library like "crypto-random-string")
      const resetToken = generateResetToken();
  
      // Store the reset token in the database for the user
      await pool.query('UPDATE users SET reset_token = $1 WHERE email = $2', [resetToken, email]);
  
      // Send the reset token to the user's email (e.g., using a mailing service)
  
      res.json({ message: 'Password reset token sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  

//get a furnitures // URL dynamic
app.get("/furnitures/:id", async (req,res)=>{
    try {
        const {id }=req.params;
        const furniture = await pool.query("SELECT * FROM furniture WHERE furn_id = $1", [id])
        res.json(furniture.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//get all todo
app.get("/furnitures", async(req,res)=>{
    try {
        const allFurnitures = await pool.query("SELECT * FROM furniture");
        res.json(allFurnitures.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//update a todo
app.put("/furnitures/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, location, number, used, reason, category } = req.body;
    let filename="";

    if (req.file) {
      filename = req.file.filename;
    } else {
      const furniture = await pool.query(
        "SELECT image FROM furniture WHERE furn_id = $1",[id]
      );
      filename = furniture.rows[0].image;
    }

    const updateFurniture = await pool.query("UPDATE furniture SET title = $1, price = $2, location = $3, number = $4, used = $5, reason = $6, image = $7, category = $8 WHERE furn_id = $9",
      [title, price, location, number, used, reason, filename, category, id]
    );

    res.json("Furniture was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});


//newsFeedack
app.post("/feedbacks", async (req,res) => {
    try{
        const {email,number,feedback} = req.body;  
        const newFeedback = await pool.query("INSERT INTO feedback (email,number,feedback) VALUES($1, $2, $3) RETURNING * ",
            [email,number,feedback]
        );
        res.json(newFeedback.rows[0])
    } catch(err){
        console.error(err.message);
    }
})
//get feedback
app.get("/feedbacks/:id", async (req,res)=>{
    try {
        const {id }=req.params;
        const feedback = await pool.query("SELECT * FROM feedback WHERE feed_id = $1", [id])
        res.json(feedback.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
//get all feedback
app.get("/feedbacks", async(req,res)=>{
    try {
        const allFeedback = await pool.query("SELECT * FROM feedback");
        res.json(allFeedback.rows)
    } catch (err) {
        console.error(err.message)
    }
})



//delete a todo
app.delete("/furnitures/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteFurnitures = await pool.query("DELETE FROM furniture WHERE furn_id = $1", [id]);
        res.json("Furniture was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})

app.delete("/feedbacks/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteFeedback = await pool.query("DELETE FROM feedback WHERE feed_id = $1", [id]);
        res.json("Feedback was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})

//payment create

app.post("/payments",async (req,res) => {
    try{
    
        const {title,price,book,location,phonenumber,accountname,accountnumber,code} = req.body;  

        const newPayment = await pool.query("INSERT INTO payment (title,price,book,location,phonenumber,accountname,accountnumber,code) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",
            [title,price,book,location,phonenumber,accountname,accountnumber,code]
        );
        res.json(newPayment.rows[0])
    } catch(err){
        console.error(err.message);
    }
})

//get a furnitures // URL dynamic
app.get("/payments/:id", async (req,res)=>{
    try {
        const {id }=req.params;
        const payment = await pool.query("SELECT * FROM payment WHERE pay_id = $1", [id])
        res.json(payment.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//get all todo
app.get("/payments", async(req,res)=>{
    try {
        const allPayment = await pool.query("SELECT * FROM payment");
        res.json(allPayment.rows)
    } catch (err) {
        console.error(err.message)
    }
})



app.delete("/payments/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deletePayment = await pool.query("DELETE FROM payment WHERE pay_id = $1", [id]);
        res.json("Feedback was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})





app.post("/cashs",async (req,res) => {
    try{
    
        const {title,price} = req.body;  

        const newCash = await pool.query("INSERT INTO cash (title,price) VALUES($1,$2) RETURNING * ",
            [title,price]
        );
        res.json(newCash.rows[0])
    } catch(err){
        console.error(err.message);
    }
})

//get a furnitures // URL dynamic
app.get("/cashs/:id", async (req,res)=>{
    try {
        const {id }=req.params;
        const cash = await pool.query("SELECT * FROM cash WHERE cash_id = $1", [id])
        res.json(cash.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//get all todo
app.get("/cashs", async(req,res)=>{
    try {
        const allCash = await pool.query("SELECT * FROM cash");
        res.json(allCash.rows)
    } catch (err) {
        console.error(err.message)
    }
})



app.delete("/cashs/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteCash = await pool.query("DELETE FROM cash WHERE cash_id = $1", [id]);
        res.json("Feedback was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})





//cashpayment
app.post("/cashpayments",async (req,res) => {
    try{
    
        const {titles,price,name,location,phonenumber,book} = req.body;  
        const newcashPayment = await pool.query("INSERT INTO cashpayment (titles,price,name,location,phonenumber,book) VALUES($1,$2,$3,$4,$5,$6) RETURNING * ",
            [titles,price,name,location,phonenumber,book]
        );
        res.json(newcashPayment.rows[0])
    } catch(err){
        console.error(err.message);
    }
})

//get a furnitures // URL dynamic
app.get("/cashpayments/:id", async (req,res)=>{
    try {
        const {id }=req.params;
        const cashPayment = await pool.query("SELECT * FROM cashpayment WHERE cashpay_id = $1", [id])
        res.json(cash.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})



//get all todo
app.get("/cashpayments", async(req,res)=>{
    try {
        const allcashPayment= await pool.query("SELECT * FROM cashpayment");
        res.json(allcashPayment.rows)
    } catch (err) {
        console.error(err.message)
    }
})



app.delete("/cashpayments/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteCash = await pool.query("DELETE FROM cashpayment WHERE cashpay_id = $1", [id]);
        res.json("Feedback was deleted!")
    } catch (err) {
        console.error(err.message)
    }
})


app.post('/admins', (req, res) => {
    const { email,firstName, password,phonenumber} = req.body;
  
    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        // Store the user in the database
        pool.query(
          'INSERT INTO admin (email,First_name, hash_password,phone_number) VALUES ($1, $2, $3, $4)',
          [email, firstName,hash,phonenumber],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Internal server error' });
            } else {
              console.log('User added');
              res.status(200).json({ message: 'User added' });
            }
          }
        );
      }
    });
  });
  //api to get users
  app.get('/admins',async(req,res)=>{
    try {
        const user = await pool.query('SELECT * FROM admin')
        res.json(user.rows)
    } catch (error) {
        console.error(error)
        
    }
  })
  //api to login 
  app.post('/logins', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user with given email exists in the database
    const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
    const user = result.rows[0];
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Check if the provided password matches the hashed password stored in the database
    const passwordMatches = await bcrypt.compare(password, user.hash_password);
  
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log("login")
    // Set the user session
    req.session.user = {
      email: user.email,
      First_name: user.first_name,
      // lastName: user.last_name,
    };
    // console.log(req.session.user)
    const username = req.session.user.First_name;
    console.log(username)
  res.status(200).json({ email:user.email ,username});
  });




//forgotapassword


app.post('/reset-password/:token', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate the password reset link
    const resetLink = ' ';

    // Configure the email options
    // secondhand648@gmail.com
    const mailOptions = {
      from: 'secondhand648@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click the button below to reset your password:</p>
      <a href="${resetLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      `};

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info);

    res.sendStatus(200);
  } catch (error) {
    console.log('Error sending password reset email:', error);
    res.sendStatus(500);
  }
});









app.listen(5000,() =>{
    console.log("server has started on port 5000")
});