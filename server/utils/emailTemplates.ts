const primaryColor = "#F97316";
const darkBg = "#020817";

export const getHeaderHtml = (title: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 0; color: #333333; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background: ${darkBg}; padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 0; font-weight: 800; }
    .header span { color: ${primaryColor}; }
    .content { padding: 32px 24px; line-height: 1.6; font-size: 15px; }
    .btn { display: inline-block; background-color: ${primaryColor}; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 50px; margin: 20px 0; }
    .footer { background-color: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AI Guru <span>Nepal</span></h1>
    </div>
    <div class="content">
`;

export const getFooterHtml = (): string => `
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} AI Guru Nepal. All rights reserved.</p>
      <p>Kathmandu, Nepal | Learn AI in Nepali & English</p>
    </div>
  </div>
</body>
</html>
`;

export const welcomeEmailTemplate = (name: string): string => `
  ${getHeaderHtml("Welcome to AI Guru Nepal")}
    <h2>Namaste ${name}! 🙏</h2>
    <p>Welcome to <strong>AI Guru Nepal</strong> — Nepal's primary AI education platform.</p>
    <p>You can now explore free courses, step-by-step AI roadmaps, practical prompts, and real-world tools tailored for beginners and professionals alike.</p>
    <div style="text-align: center;">
      <a href="https://aigurunepal.com/learn/ai-basics" class="btn">Start Your AI Journey</a>
    </div>
    <p>Happy Learning!<br/>The AI Guru Nepal Team</p>
  ${getFooterHtml()}
`;

export const resetPasswordEmailTemplate = (name: string, resetUrl: string): string => `
  ${getHeaderHtml("Reset Your Password")}
    <h2>Password Reset Request</h2>
    <p>Hello ${name},</p>
    <p>We received a request to reset your AI Guru Nepal account password. Click the button below to set a new password:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="btn">Reset Password</a>
    </div>
    <p>If you didn't request this email, you can safely ignore it.</p>
  ${getFooterHtml()}
`;

export const courseEnrollmentEmailTemplate = (name: string, courseTitle: string): string => `
  ${getHeaderHtml("Course Enrollment Confirmation")}
    <h2>Congratulations ${name}! 🎉</h2>
    <p>You have successfully enrolled in <strong>${courseTitle}</strong>.</p>
    <p>Access your course dashboard anytime to continue learning at your own pace.</p>
    <div style="text-align: center;">
      <a href="https://aigurunepal.com/my-learning" class="btn">Go to My Learning</a>
    </div>
  ${getFooterHtml()}
`;
