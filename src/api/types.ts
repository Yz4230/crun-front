export type RunProgramRequest = {
  source: string;
}

export type Output = {
  stdout: string;
  stderr: string;
  exit_code: number;
}

export type RunProgramResponse = {
  compile_output?: Output;
  program_output?: Output;
}
