import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, subject, message } = data

    // Send confirmation email to user
    await resend.emails.send({
      from: 'portfolio@mukunda.dev',
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a2e6e; margin-bottom: 20px;">Thank you for reaching out!</h2>
            <p style="color: #333; line-height: 1.6;">Hi ${name},</p>
            <p style="color: #333; line-height: 1.6;">
              I've received your message and will get back to you as soon as possible. Thank you for your interest!
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <p style="color: #555; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #555; margin: 5px 0;"><strong>Message:</strong> ${message}</p>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Best regards,<br/>
              Mukunda Singh Khattri<br/>
              Digital Marketing Professional
            </p>
          </div>
        </div>
      `,
    })

    // Send notification email to me
    await resend.emails.send({
      from: 'portfolio@mukunda.dev',
      to: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || 'khattrikrishna123@gmail.com',
      subject: `New message from ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a2e6e; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
              <p style="color: #333; margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="color: #333; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p style="color: #333; margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
              <p style="color: #333; margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #333; margin: 10px 0;"><strong>Message:</strong></p>
              <p style="color: #666; white-space: pre-wrap; margin: 10px 0; background-color: white; padding: 10px; border-radius: 3px;">${message}</p>
            </div>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
