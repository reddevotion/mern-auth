import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [
        {
          email
        }
      ];

    try {
        const response = await mailtrapClient.send(
            {
                from: sender,
                to: recipients,
                subject: "Verify your email",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                category: "Email Verification",
              }
        )
        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification email: ${error}`)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, username) => {
  const recipients = [
    {
      email
    }
  ];
   try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Welcome to our App",
      html: WELCOME_TEMPLATE.replaceAll("{username}", username),
      category: "Welcome letter",
    })
    console.log("Welcome email sent successfully", response)
   } catch (error) {
    console.error(`Error sending verification email: ${error}`)
    throw new Error(`Error sending verification email: ${error}`)  
   }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipients = [
    {
      email
    }
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
      
    })
    console.log("Reset password email sent successfully", response)
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`)
    throw new Error(`Error sending password reset email: ${error}`)  
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipients = [
    {
      email
    }
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Password Seset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
      
    })
    console.log("Reset password email sent successfully", response)
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`)
    throw new Error(`Error sending password reset email: ${error}`) 
  }
}