import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ndieme.wade@outlook.fr',
      replyTo: email,
      subject: `Nouveau message de ${name} via le Portfolio`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #2C1820;">
          <h2 style="color: #BE185D;">Nouveau message depuis ton Portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email de l'expéditeur :</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #F472B6; margin: 20px 0;" />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background-color: #FAF7F8; padding: 15px; border-radius: 8px;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erreur d\'envoi email :', error)
    return NextResponse.json({ error: 'Échec de l\'envoi du message.' }, { status: 500 })
  }
}