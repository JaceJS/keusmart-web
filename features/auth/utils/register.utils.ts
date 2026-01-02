/**
 * Register step utility functions
 */

export type RegisterStep = 1 | 2 | 3;

/**
 * Get the title for the current registration step
 */
export const getRegisterStepTitle = (registerStep: RegisterStep): string => {
  switch (registerStep) {
    case 1:
      return "Masukkan Email";
    case 2:
      return "Verifikasi Email";
    case 3:
      return "Buat Password";
  }
};

/**
 * Get the description for the current registration step
 */
export const getRegisterStepDescription = (
  registerStep: RegisterStep,
  email: string
): string => {
  switch (registerStep) {
    case 1:
      return "Masukkan email untuk memulai pendaftaran";
    case 2:
      return `Kode OTP telah dikirim ke ${email}`;
    case 3:
      return "Buat password yang kuat untuk akunmu";
  }
};
