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
      return "Isi Data Diri";
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
      return "Lengkapi data diri & bisnis Anda";
    case 2:
      return `Kode OTP telah dikirim ke ${email}`;
    case 3:
      return "Buat password yang kuat untuk akunmu";
  }
};
