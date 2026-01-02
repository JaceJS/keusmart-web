import { config } from "./config";

type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * Custom Logger for Frontend
 * Centralizes logging logic and styling
 */
class Logger {
  private isDev = config.app.isDevelopment;

  private styles = {
    info: "color: #3b82f6; font-weight: bold;", // Blue
    warn: "color: #f59e0b; font-weight: bold;", // Amber
    error: "color: #ef4444; font-weight: bold;", // Red
    debug: "color: #10b981; font-weight: bold;", // Green
    reset: "color: inherit;",
  };

  private log(level: LogLevel, message: string, data?: any) {
    if (!this.isDev) return;

    const timestamp = new Date().toLocaleTimeString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    const style = this.styles[level];

    switch (level) {
      case "error":
        console.error(`%c${prefix} ${message}`, style, data || "");
        break;
      case "warn":
        console.warn(`%c${prefix} ${message}`, style, data || "");
        break;
      case "debug":
        console.debug(`%c${prefix} ${message}`, style, data || "");
        break;
      case "info":
      default:
        console.log(`%c${prefix} ${message}`, style, data || "");
        break;
    }
  }

  info(message: string, data?: any) {
    this.log("info", message, data);
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  error(message: string, data?: any) {
    this.log("error", message, data);
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data);
  }
}

export const logger = new Logger();
