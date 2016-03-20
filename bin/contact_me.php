<?php
// check if fields passed are empty
$errors = array();
$data = array();
// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.
if (empty($_POST['name']))
  $errors['name'] = 'Name is required.';

if (empty($_POST['phone']))
  $errors['phone'] = 'Contact number is required.';

if (empty($_POST['email']))
  $errors['email'] = 'Email is required.';

if (!empty($errors)) {
  $data['errors']  = $errors;
} else {

   //Code to send Email Message 
   $name = $_POST['name'];
   $phone = $_POST['phone'];
   $email_address = $_POST['email'];
   $message = $_POST['message'];
      
   // create email body and send it 
   $to = 'your-email@your-domain.com'; // PUT YOUR EMAIL ADDRESS HERE
   $email_subject = "Modern Business Contact Form:  $name"; // EDIT THE EMAIL SUBJECT LINE HERE
   $email_body = "You have received a new message from your website's contact form.\n\n"."Here are the details:\n\nName: $name\n\nPhone: $phone\n\nEmail: $email_address\n\nMessage:\n$message";
   $headers = "From: noreply@your-domain.com\n";
   $headers .= "Reply-To: $email_address";   
   mail($to,$email_subject,$email_body,$headers);
   /*End Of Code*/
  $data['message'] = 'Your Message has been sent!';
}
// response back.
echo json_encode($data);

?>