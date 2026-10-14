// Server-side helper: do not import from client components.

export type PasswordResetEmailLocale = 'vi' | 'en';

const TEXTS: Record<
  PasswordResetEmailLocale,
  { subject: string; lines: (link: string) => string[] }
> = {
  en: {
    subject: 'Reset your TodoNow password',
    lines: (link) => [
      'Hello,',
      '',
      'We received a request to reset the password of your TodoNow account.',
      'Open this link to set a new password. It works once and expires in 1 hour:',
      '',
      link,
      '',
      'If you did not ask for this, you can ignore this email. Your password stays the same.',
      '',
      'TodoNow',
    ],
  },
  vi: {
    subject: 'Đặt lại mật khẩu TodoNow',
    lines: (link) => [
      'Xin chào,',
      '',
      'Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản TodoNow của bạn.',
      'Mở liên kết này để đặt mật khẩu mới. Liên kết chỉ dùng được một lần và hết hạn sau 1 giờ:',
      '',
      link,
      '',
      'Nếu bạn không yêu cầu, hãy bỏ qua email này. Mật khẩu của bạn vẫn giữ nguyên.',
      '',
      'TodoNow',
    ],
  },
};

/** Builds the password reset email (S-04) in the person's interface language (A-13). */
export function passwordResetEmail(
  locale: PasswordResetEmailLocale,
  link: string,
): { subject: string; text: string } {
  const texts = TEXTS[locale === 'vi' ? 'vi' : 'en'];
  return { subject: texts.subject, text: texts.lines(link).join('\n') };
}
