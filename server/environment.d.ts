declare namespace NodeJs {
  interface ProcessEnv {
    MONGODB_CONNECTION_STRING: string;
    EMAIL_PASS: string;
    EMAIL_UESR: string;
    FRONT_END: string;
  }
}
