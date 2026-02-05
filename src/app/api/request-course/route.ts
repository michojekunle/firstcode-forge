import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

// // Initialize Supabase client (only if env vars are set)
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
// const supabase =
//   supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, courseTopic, details } = body;

    // Validate required fields
    if (!name || !email || !courseTopic) {
      return NextResponse.json(
        { error: "Name, email, and course topic are required" },
        { status: 400 },
      );
    }

    // // Store in Supabase if configured
    // if (supabase) {
    //   const { error: dbError } = await supabase.from("course_requests").insert({
    //     name,
    //     email,
    //     course_topic: courseTopic,
    //     details: details || null,
    //     created_at: new Date().toISOString(),
    //   });

    //   if (dbError) {
    //     console.error("Supabase error:", dbError);
    //     // Continue even if DB fails - we'll still send email
    //   }
    // }

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    if (adminEmail && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"FirstCode Forge" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `🎓 New Course Request: ${courseTopic}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00E676;">New Course Request</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Requested Course:</strong> ${courseTopic}</p>
              ${details ? `<p><strong>Details:</strong> ${details}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">
              This request was submitted through the FirstCode Forge website.
            </p>
          </div>
        `,
      });
    }

    // Send confirmation to user
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"FirstCode Forge" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thanks for your course request! 🎓`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00E676;">Thanks, ${name}!</h2>
            <p>We've received your request for a course on <strong>${courseTopic}</strong>.</p>
            <p>Our team will review your suggestion and consider it for future course development.</p>
            <p>We appreciate you helping us build something amazing! 💚</p>
            <br/>
            <p style="color: #666;">— The FirstCode Forge Team</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Course request submitted successfully",
    });
  } catch (error) {
    console.error("Error processing course request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
