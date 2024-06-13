import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import validator from 'validator';
import { AiOutlineAlignLeft, AiOutlineArrowLeft } from 'react-icons/ai';
import { NavLink } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify'
import bob from '../assets/Bank_of_Bhutan_logo.svg.png'
import tll from '../assets/T-Bank-Copy.jpg'
import bdb from '../assets/download.jpg'
import bnb from '../assets/download.png'


const CheckoutFormContainer = styled.div`
  font-family: Arial;
  font-size: 17px;
  padding: 8px;

  * {
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
`;

const Column = styled.div`
  flex: ${props => props.flexSize};
  padding: 0 16px;
`;

const Container = styled.div`
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
`;

const Button = styled.input`
  background-color: #04AA6D;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;

  &:hover {
    background-color: #45a049;
  }
`;

const Price = styled.span`
  float: right;
  color: grey;
`;
const Container1 = styled.div`
  padding-top: 2em;
  margin: auto 49%;
`;

const BackArrow = styled.div`
  font-size: 25px;
  line-height: 25px;
  width: 1.5em;
  height: 1.5em;
  padding: 6px;
  cursor: pointer;
  user-select: none;
  transform: rotate(180deg);
  color: white;
  border: 2px solid #F7931E;
  background:#F7931E;
  border-radius: 50%;
  touch-callout: none;

  &:hover {
    background:white;
    color:#F7931E;
  }

  &:active {
    position: relative;
    right: 2px;
  }
`;




function PaymentForm() {

  const [title, setTitle] = useState([]);
  const [price, setPrice] = useState('');
  const [book,setBook] = useState('Booked');
  const [location, setLocation] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [accountname, setAccountName] = useState('');
  const [accountnumber, setAccountNumber] = useState('');

  const [code, setCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};
  
    // Perform validation checks for each form field
    if (accountname.trim() === '') {
      newErrors.accountname = 'Accountname is required';
    }
  
    if (location.trim() === '') {
      newErrors.location = 'Location is required';
    }
  
 
  
    if (price.trim() === '') {
      newErrors.price = 'Price is required';
    }
  
    if (accountnumber.trim() === '') {
      newErrors.accountnumber = 'Account number is required';
    }
  
    if (code.trim() === '') {
      newErrors.code = 'Code is required';
    }
  
    if (phonenumber.trim() === '') {
      newErrors.phonenumber = 'Phone number is required';
    } else if (!/^17|77\d{6}$/.test(phonenumber.trim())) {
      newErrors.phonenumber = 'Invalid phone number. It should be 8 digits starting with 17 or 77';
    } else if (phonenumber.trim().length !== 8) {
      newErrors.phonenumber = 'Invalid phone number. It should have a length of 8 digits';
    }
  
  
    setErrors(newErrors);
  
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  

  const onSubmitForm = async (e) => {
    // e.preventDefault();

    // if (validateForm()) {
    //   try {
    //     setIsLoading(true);
    //     const body = { title, price,book,location, phonenumber,accountname,accountnumber,code };
    //     const response = await fetch('http://localhost:5000/cashs', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(body),
    //     });

          toast.success('Currently not available.');
          setTimeout(() => {
            window.location.reload('/his');
          },3000);
          
       
        
    //     setIsLoading(false);
    //     setTitle([])
    //     setPrice('')
    //     setBook('')
    //     setAccountName('');
    //     setLocation('');
    //     setPhoneNumber('');
    //     setAccountNumber('');
    //     setCode('');
    //     setErrors({});
    //     e.target.reset();
    //   } catch (err) {
    //     console.error(err.message);
    //     setIsLoading(false);
    //   }
    // }
  };
  

   


  useEffect(() => {
    // Retrieve the title and price values from the query string
    const urlParams = new URLSearchParams(window.location.search);
    // const titleParam = urlParams.get('title');
    const priceParam = urlParams.get('price');

    // Set the values to state variables
    // setTitle(titleParam || '');
    setPrice(priceParam || '');
    const titleParams = urlParams.getAll('title');

    // Create an array of objects with the title property
    const titlesArray = titleParams.map((title) => ({ title }));
  
   
    setTitle(titlesArray);
    }, []);

  const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


  return (
    <>
     <div style={{position:'fixed',top:'-30px',left:'10px'}} >
     <NavLink href="/his">
      <Container1>
      <BackArrow title="Back to Menu" href='/home'>&#10140;</BackArrow>
    </Container1>
      </NavLink> 
       
    </div>
    <ToastContainer/>
    <CheckoutFormContainer style={{marginTop:'8rem',width:'90%',marginLeft:'6rem'}}>

   
     
      <Row>
        <Column flexSize="75">
          <Container>
        
            <form onSubmit={onSubmitForm} style={{marginTop:'3rem'}}>
              <Row>
                <Column flexSize="50">
                <Column flexSize="25">
                <Container>
                  <h4>Cart <Price><i className="fa fa-shopping-cart"></i></Price></h4>
                  <p><a href="#"><input disabled 
                  style={{border:'1px solid #f2f2f2'}}
                   value={title.map((title) => title.title).join(',')}/></a> </p>
                 
                  <hr />
                  <p>Total <Price><b>{price}</b></Price></p>
                </Container>
        </Column>
                </Column>
                <Column flexSize="50">
                  <h3>Payment</h3>
                  <Label htmlFor="fname">Accepted Cards</Label>
                  <IconContainer>
                    <img src={bdb} width={60} height={60} style={{marginLeft:'7rem'}}></img>
                    <img src={bnb} width={60} height={60} style={{marginLeft:'4rem'}}></img>
                    <img src={bob} width={60} height={40} style={{marginLeft:'4rem'}}></img>
                    <img src={tll} width={160} height={10} style={{marginLeft:'4rem'}}></img>
                  </IconContainer>
                  <Label htmlFor="cname">Accountname</Label>
                  <Input type="text" id="cname" name="cardname" />
                  <Label htmlFor="ccnum">Account number</Label>
                  <Input type="text" id="ccnum" name="cardnumber" />
                  <Row>
                    <Column flexSize="50">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input type="text" id="cvv" name="cvv" placeholder="352" />
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Button type="submit"/>
            </form>
          </Container>
        </Column>
      </Row>
    </CheckoutFormContainer>
    </>
  );
}

export default PaymentForm;

