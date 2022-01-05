import { RunProgramResponse } from "./types";
import client from "./client"

type v1_interface = {
  RunProgramRequest: (source: string) => Promise<RunProgramResponse>;
}

const v1: v1_interface = {
  RunProgramRequest: async (source: string) => {
    const response = await client.post<RunProgramResponse>("/api/v1/run", { source });
    return response.data;
  }
};

export default v1;
