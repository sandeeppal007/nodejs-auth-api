import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplate.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verifciation",
    });

    console.log("email send  succesfuuly", response);
  } catch (error) {
    console.log("error sending verification email", error.message);
    throw new Error("error sending verification email", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {


  const recipent = [{email}];

  try {
   const response =  await mailtrapClient.send({
      from: sender,
      to: recipent,
      template_uuid: "2ea5eaad-cfdf-4169-8e86-3f804a841379",
      template_variables: {
        company_info_name: "Auth company",
        name: name,
      },
    });
console.log("email send succesfully",response)

  } catch (error) {
 console.log("error in sending welcome email",error.message)
 throw new Error("error sending welcome email");

  }
};

export const sendForgotPasswordEmail = async(email,resetToken)=>{
  const recipent = [{email}];
try {

  const response = await mailtrapClient.send({
    from:sender,
    to:recipent,
    subject:"Reset Password",
    html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",`http://locahost/api/auth/forgot-password/${resetToken}`)

  })

  console.log("forgot password email send succesfully",response)
  
} catch (error) {
  console.log("error in sending forgot email",error.message)
}




}

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
