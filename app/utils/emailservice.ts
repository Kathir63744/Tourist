// emailservice.ts - Updated with proper TypeScript typing

// Define interfaces for type safety
interface BookingData {
  checkIn: string | Date;
  checkOut: string | Date;
  nights: number;
  price: number;
  totalPrice?: number;
  name: string;
  email: string;
  roomType: string;
  bookingId?: string;
  bookingDate?: string | Date;
  // Add other properties as needed
}

interface UserData {
  name: string;
  email: string;
  // Add other properties as needed
}

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
};

// Test email connection
async function testEmailConnection(): Promise<boolean> {
  try {
    // Your email connection testing logic here
    console.log('Testing email connection...');
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Email connection test failed:', error.message);
    } else {
      console.error('Unknown error occurred during email connection test');
    }
    return false;
  }
}

// Format date helper function
function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Calculate nights between dates
function calculateNights(checkIn: string | Date, checkOut: string | Date): number {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Calculate total price
function calculateTotalPrice(nights: number, price: number): number {
  return nights * price;
}

// Send booking confirmation email
async function sendBookingConfirmation(bookingData: BookingData): Promise<boolean> {
  try {
    // Calculate nights if not provided
    const nights = bookingData.nights || calculateNights(bookingData.checkIn, bookingData.checkOut);
    
    // Calculate total price
    const totalPrice = bookingData.totalPrice || calculateTotalPrice(nights, bookingData.price);
    
    // Format dates
    const checkInFormatted = formatDate(bookingData.checkIn);
    const checkOutFormatted = formatDate(bookingData.checkOut);
    
    // Create email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Confirmation</h2>
        <p>Dear ${bookingData.name},</p>
        <p>Thank you for your booking! Here are your booking details:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Booking Details</h3>
          <p><strong>Booking ID:</strong> ${bookingData.bookingId || 'N/A'}</p>
          <p><strong>Check-in Date:</strong> ${checkInFormatted}</p>
          <p><strong>Check-out Date:</strong> ${checkOutFormatted}</p>
          <p><strong>Number of Nights:</strong> ${nights}</p>
          <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
          <p><strong>Price per Night:</strong> $${bookingData.price.toFixed(2)}</p>
          <p><strong>Total Price:</strong> $${totalPrice.toFixed(2)}</p>
        </div>
        
        <p>If you have any questions, please contact us.</p>
        <p>Best regards,<br>The Tourist Team</p>
      </div>
    `;
    
    // Email options
    const mailOptions: EmailOptions = {
      from: emailConfig.auth.user,
      to: bookingData.email,
      subject: 'Booking Confirmation - Tourist App',
      html: htmlContent
    };
    
    // Send email logic here (using nodemailer or your email service)
    console.log('Sending booking confirmation to:', bookingData.email);
    
    // Simulate email sending
    // In real implementation, use nodemailer or similar:
    // const transporter = nodemailer.createTransport(emailConfig);
    // await transporter.sendMail(mailOptions);
    
    console.log('Booking confirmation email sent successfully');
    return true;
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to send booking confirmation:', error.message);
    } else {
      console.error('Unknown error occurred while sending booking confirmation');
    }
    return false;
  }
}

// Send admin notification
async function sendAdminNotification(bookingData: BookingData): Promise<boolean> {
  try {
    // Calculate nights if not provided
    const nights = bookingData.nights || calculateNights(bookingData.checkIn, bookingData.checkOut);
    
    // Calculate total price
    const totalPrice = bookingData.totalPrice || calculateTotalPrice(nights, bookingData.price);
    
    // Format dates
    const checkInFormatted = formatDate(bookingData.checkIn);
    const checkOutFormatted = formatDate(bookingData.checkOut);
    const bookingDateFormatted = formatDate(bookingData.bookingDate || new Date());
    
    // Admin email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Booking Notification</h2>
        <p>A new booking has been made. Details:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Booking Information</h3>
          <p><strong>Booking ID:</strong> ${bookingData.bookingId || 'N/A'}</p>
          <p><strong>Booking Date:</strong> ${bookingDateFormatted}</p>
          <p><strong>Customer Name:</strong> ${bookingData.name}</p>
          <p><strong>Customer Email:</strong> ${bookingData.email}</p>
          <p><strong>Check-in Date:</strong> ${checkInFormatted}</p>
          <p><strong>Check-out Date:</strong> ${checkOutFormatted}</p>
          <p><strong>Number of Nights:</strong> ${nights}</p>
          <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
          <p><strong>Price per Night:</strong> $${bookingData.price.toFixed(2)}</p>
          <p><strong>Total Amount:</strong> $${totalPrice.toFixed(2)}</p>
        </div>
        
        <p>This is an automated notification. Please log into the admin panel for more details.</p>
      </div>
    `;
    
    // Get admin email from environment or use default
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    const mailOptions: EmailOptions = {
      from: emailConfig.auth.user,
      to: adminEmail,
      subject: `New Booking: ${bookingData.name} - ${checkInFormatted}`,
      html: htmlContent
    };
    
    // Send email logic here
    console.log('Sending admin notification to:', adminEmail);
    
    // Simulate email sending
    // const transporter = nodemailer.createTransport(emailConfig);
    // await transporter.sendMail(mailOptions);
    
    console.log('Admin notification sent successfully');
    return true;
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to send admin notification:', error.message);
    } else {
      console.error('Unknown error occurred while sending admin notification');
    }
    return false;
  }
}

// Send password reset email
async function sendPasswordResetEmail(userData: UserData, resetToken: string): Promise<boolean> {
  try {
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hello ${userData.name},</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        
        <p>Best regards,<br>The Tourist Team</p>
      </div>
    `;
    
    const mailOptions: EmailOptions = {
      from: emailConfig.auth.user,
      to: userData.email,
      subject: 'Password Reset Request - Tourist App',
      html: htmlContent
    };
    
    // Send email logic here
    console.log('Sending password reset email to:', userData.email);
    
    // const transporter = nodemailer.createTransport(emailConfig);
    // await transporter.sendMail(mailOptions);
    
    console.log('Password reset email sent successfully');
    return true;
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to send password reset email:', error.message);
    } else {
      console.error('Unknown error occurred while sending password reset email');
    }
    return false;
  }
}

// Send welcome email
async function sendWelcomeEmail(userData: UserData): Promise<boolean> {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Tourist App!</h2>
        <p>Hello ${userData.name},</p>
        <p>Thank you for registering with Tourist App. We're excited to have you on board!</p>
        
        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Get Started</h3>
          <p>Here are some things you can do:</p>
          <ul>
            <li>Browse and book hotels</li>
            <li>Save your favorite destinations</li>
            <li>Get exclusive member discounts</li>
            <li>Receive travel tips and updates</li>
          </ul>
        </div>
        
        <p>If you have any questions, feel free to contact our support team.</p>
        
        <p>Happy travels!<br>The Tourist Team</p>
      </div>
    `;
    
    const mailOptions: EmailOptions = {
      from: emailConfig.auth.user,
      to: userData.email,
      subject: 'Welcome to Tourist App!',
      html: htmlContent
    };
    
    // Send email logic here
    console.log('Sending welcome email to:', userData.email);
    
    // const transporter = nodemailer.createTransport(emailConfig);
    // await transporter.sendMail(mailOptions);
    
    console.log('Welcome email sent successfully');
    return true;
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to send welcome email:', error.message);
    } else {
      console.error('Unknown error occurred while sending welcome email');
    }
    return false;
  }
}

// Export all functions
export {
  testEmailConnection,
  sendBookingConfirmation,
  sendAdminNotification,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
  export type {
    BookingData,
    UserData
  };

// Optional: Export as default object
const EmailService = {
  testEmailConnection,
  sendBookingConfirmation,
  sendAdminNotification,
  sendPasswordResetEmail,
  sendWelcomeEmail
};

export default EmailService;