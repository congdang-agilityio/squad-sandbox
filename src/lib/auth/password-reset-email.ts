// Server-side helper: do not import from client components.

export type PasswordResetEmailLocale = 'vi' | 'en';

// Paragraphs of the email; the reset link goes between `before` and `after`.
const TEXTS: Record<PasswordResetEmailLocale, { subject: string; before: string; after: string }> =
  {
    en: {
      subject: 'Reset your TodoNow password',
      before:
        'Hello,\n\nWe received a request to reset the password of your TodoNow account.\n' +
        'Open this link to set a new password. It works once and expires in 1 hour:',
      after:
        'If you did not ask for this, you can ignore this email. Your password stays the same.',
    },
    vi: {
      subject: 'Đặt lại mật khẩu TodoNow',
      before:
        'Xin chào,\n\nChúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản TodoNow của bạn.\n' +
        'Mở liên kết này để đặt mật khẩu mới. Liên kết chỉ dùng được một lần và hết hạn sau 1 giờ:',
      after: 'Nếu bạn không yêu cầu, hãy bỏ qua email này. Mật khẩu của bạn vẫn giữ nguyên.',
    },
  };

/** Builds the password reset email (S-04) in the person's interface language (A-13). */
export function passwordResetEmail(
  locale: PasswordResetEmailLocale,
  link: string,
): { subject: string; text: string } {
  const { subject, before, after } = TEXTS[locale === 'vi' ? 'vi' : 'en'];
  return { subject, text: [before, link, after, 'TodoNow'].join('\n\n') };
}
